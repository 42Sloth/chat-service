import styled from 'styled-components';
import { style } from 'Components/Navbar/NavbarStyle';

const { NavLink } = style;

const Header = styled.header`
  width: 100%;
  background-color: #ffc806;
  box-shadow: 0 1px 0 0 rgb(89 16 53 / 10%);
  height: 40px;
  display: flex;
  justify-content: space-between;
`;

const HeaderLink = styled(NavLink)`
  width: fit-content;
  padding: 0;
  margin-left: 10px;
  img {
    width: 100px;
    height: 40px;
  }
`;

const Profile = styled.div`
  padding: 5px;

  img {
    width: 30px;
    height: 30px;
  }
`;

export const Headerstyle = {
  Header,
  HeaderLink,
  Profile,
};
