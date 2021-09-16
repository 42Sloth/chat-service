import styled from 'styled-components';

const MenuList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 6rem;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 30px;
`;

const MenuItems = styled.li``;

const MenuTitle = styled.span`
  display: flex;
  font-weight: 700;
  height: 40px;
`;

const InnterMenuItems = styled.ul``;

const Item = styled.li`
  height: 40px;
  font-weight: 400;
  color: #454545;
`;

export const style = { MenuList, MenuItems, MenuTitle, InnterMenuItems, Item };
