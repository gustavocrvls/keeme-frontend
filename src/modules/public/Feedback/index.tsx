import React, { FormEvent, useState } from 'react';
import { Box, Button, Flex, Textarea } from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { LimitedContainer } from '../../../components/Containers';
import PageTitle from '../../../components/PageTitle';
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from '../../../components/Notifications';
import { db } from '../../../services/firebase';

export function Feedback(): JSX.Element {
  const [feedback, setFeedback] = useState<string>('');

  const history = useHistory();

  async function sendFeedback(e: FormEvent) {
    e.preventDefault();

    if (!feedback || feedback.replaceAll(' ', '').length === 0) {
      notifyWarning('Você precisa escrever algo!');
      return;
    }

    try {
      await db.collection('feedbacks').doc(`${new Date().getTime()}`).set({
        description: feedback,
      });
      notifySuccess('Obrigado pelo Feedback! 😁');
      history.goBack();
    } catch (err) {
      console.error(err);
      notifyError('Não foi possível enviar o feedback 😅');
    }
  }

  return (
    <LimitedContainer>
      <>
        <PageTitle>Feedback</PageTitle>
        <Box>
          Aqui você pode enviar um feedback de como foi sua experiência no
          sistema, o que você acha que pode ser melhorado, ou falar sobre algum
          bug que você encontrou enquanto usava. Isso ajudará bastante na
          melhoria da ferramenta, então seja o mais verdadeiro possível :)
        </Box>
        <form onSubmit={sendFeedback}>
          <Textarea
            feedback={feedback}
            onChange={e => setFeedback(e.target.value)}
            rows={10}
          />
          <Flex justifyContent="center">
            <Button type="submit" colorScheme="teal" leftIcon={<FiSend />}>
              Enviar
            </Button>
          </Flex>
        </form>
      </>
    </LimitedContainer>
  );
}
