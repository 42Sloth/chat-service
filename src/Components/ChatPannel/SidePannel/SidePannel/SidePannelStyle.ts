import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

const SideContainer = styled.div`
  width: 260px;
  background: #fceb92;
`;

const HeaderContainer = styled.div`
  height: 50px;
  margin-bottom: 20px;
`;

const HeaderLink = styled(Link)`
  width: fit-content;
  padding: 0;
  margin-left: 10px;
  img {
    height: 50px;
  }
`;

export const style = {
  SideContainer,
  HeaderContainer,
  HeaderLink,
};
