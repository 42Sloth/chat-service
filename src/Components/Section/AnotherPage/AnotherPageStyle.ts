import styled from 'styled-components';
import { purple } from 'Styles/';

const Container = styled.main``;

const InnerContainer = styled.section`
  background-color: ${purple};
  padding: 160px 0 160px;
  display: flex;
  /* position: relative; */
  justify-content: center;
`;

const Content = styled.div`
  margin: 0 auto;
  display: flex;
  width: 1230px;
  max-width: 62.875rem;
  flex-direction: column;
`;

const Welcome = styled.div``;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 44px;
  font-weight: 700;
  line-height: 1.25;
  color: white;
`;
const WorkSpace = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-radius: 9px;
`;

const WorkSpaceTitle = styled.div`
  background-color: #ecdeec;
  border-radius: 5px 5px 0 0;
  font-size: 1.125rem;
  padding: 1rem !important;
`;

export const style = {
  Container,
  InnerContainer,
  Content,
  Welcome,
  Title,
  WorkSpace,
  WorkSpaceTitle,
};
