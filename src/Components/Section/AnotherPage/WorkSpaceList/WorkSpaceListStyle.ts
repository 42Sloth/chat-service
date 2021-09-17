import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import { purple } from 'Styles';

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0 0 5px 5px;

  & > :not(:first-child) {
    border-top: 1px solid #ebeaeb;
  }
`;

const WorkSpaceItem = styled.div`
  padding: 1rem;
`;

const ItemDetail = styled.div`
  display: flex;
  align-items: center;
`;

const ItemImg = styled.img`
  margin-right: 1rem;
  border-radius: 5px;
`;

const ItemInfo = styled.div`
  margin: auto 0;
`;

const ItemName = styled.span`
  display: block;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const ItemNumbers = styled.div`
  color: #696969;
  display: block;
  font-size: 0.875rem;
  line-height: 20px;
`;

const WorkSpaceLink = styled.a`
  margin-left: auto;
  padding: 1rem;
  background-color: ${purple};
  text-decoration: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
`;

export const style = {
  ItemContainer,
  WorkSpaceItem,
  ItemDetail,
  ItemImg,
  ItemInfo,
  ItemName,
  ItemNumbers,
  WorkSpaceLink,
};
