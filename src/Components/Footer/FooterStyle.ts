import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

const FooterContainer = styled.footer``;

const FooterNavMenu = styled.div`
  width: 1230px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 auto;
`;

const NavLink = styled(Link)`
  img {
    width: 200px;
  }
`;

const NavMenu = styled.div``;

export const style = { FooterContainer, FooterNavMenu, NavLink, NavMenu };
