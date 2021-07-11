/* eslint-disable react/no-unescaped-entities */
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { BaseContainer } from '../../../../components/Container/BaseContainer';
import PageTitle from '../../../../components/PageTitle';
import { PublicFooter } from '../../../../components/PublicFooter';

export function About(): JSX.Element {
  return (
    <BaseContainer>
      <Flex
        minHeight="calc(100vh - 10px)"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box marginBottom={[10, 0]}>
          <PageTitle>Sobre o Projeto</PageTitle>

          <Box marginTop="5">
            <Text>
              O projeto KeeMe foi desenvolvido pelo discente Gustavo Carvalho
              Silva durante a disciplina de Trabalho de Conclusão de Curso do
              curso de Sistemas de Informação para atender uma demanda da
              Faculdade de Computação e Engenharia Elétrica. O KeeMe tem como
              objetivo principal contabilizar as ACCs realizadas pelos alunos
              dos cursos da FACEEL, e mostrar o seu avanço e o quanto ainda
              precisam para poder completar a pontuação necessária.
            </Text>
          </Box>
          <Box marginTop="5">
            <Heading as="h2" size="md">
              Por que "KeeMe"?
            </Heading>

            <Text>
              O nome KeeMe é uma abreviação da frase Keep it to Me, que
              traduzido significa "Guarda isso pra mim". Então é apenas uma
              brincadeira com o fato que a aplicação serve pra guardar as ACCs
              :)
            </Text>
          </Box>
          <Box marginTop="5">
            <Heading as="h2" size="md">
              O que são ACCs?
            </Heading>

            <Text>
              As Atividades Curriculares Complementares (ACCs) são todas as
              atividades que um discente realiza no decorrer do seu curso que
              não sejam matérias do próprio curso. São atividades como
              minicursos, participaçãod de palestras, congressos etc.
            </Text>
          </Box>
        </Box>
        <PublicFooter />
      </Flex>
    </BaseContainer>
  );
}
