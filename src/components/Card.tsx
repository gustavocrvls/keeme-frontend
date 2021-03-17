import styled from 'styled-components';
import STYLES from '../constants/Styles';

const Card = styled.div`
  padding: 15px;

  box-shadow: 1px 1px 5px rgba(119, 119, 119, 0.25);
  box-sizing: border-box;
  border-radius: ${STYLES.borderRadius};
`;

export { Card };
