import {
  Box,
  Flex,
  ListItem,
  SkeletonCircle,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import ProgressRing from '../ProgressRing';
import { StudentPointsProps } from './dto';

export function StudentPoints({
  isLoading,
  summary,
  progress,
}: StudentPointsProps): JSX.Element {
  return (
    <Flex justifyContent="space-between">
      {isLoading ? (
        <SkeletonCircle size="20" />
      ) : (
        <ProgressRing
          stroke={10}
          radius={60}
          progress={progress}
          obtained={summary.approved_points}
          total={51}
        />
      )}

      <Box display="flex" alignItems="center">
        <UnorderedList listStyleType="none">
          <ListItem display="flex" justifyContent="space-between">
            <Text as="span">Aprovados:</Text>
            <strong>
              {summary.approved_points}
              pts
            </strong>
          </ListItem>
          <ListItem display="flex" justifyContent="space-between">
            <Text as="span">Em análise: </Text>
            <strong>
              {summary.under_analysis}
              pts
            </strong>
          </ListItem>
          <ListItem display="flex" justifyContent="space-between">
            <Text as="span">Reprovados: </Text>
            <strong>
              {summary.failed_points}
              pts
            </strong>
          </ListItem>
        </UnorderedList>
      </Box>
    </Flex>
  );
}
