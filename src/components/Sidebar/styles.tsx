import styled from 'styled-components';

const SidebarItem = styled.div`
  padding: 10px;
  font-size: 1rem;

  display: flex;
  align-items: center;

  transition: padding 0.2s;

  :hover {
    background-color: #31878c;
    padding-left: 13px;
  }
`;

export { SidebarItem };
