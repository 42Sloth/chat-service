import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

const Header = styled.header`
    position: absolute;
    width: 100%;
`;

const Nav = styled.nav`
    position: relative;
    width: 1024px;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    background-color: transparent;
    margin: 0 auto;
`;

const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    padding: 1rem;
    padding-left: 0;
    font-size: 20px;
    font-weight: 700;
    
    img {
        width: 200px;
        height: 80px;
    }
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;
`;

const NavBtn = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 24px;
    padding: 20px 0;
`;

const NavBtnLink = styled.div`
    border: 1px solid #611F66;
    border-radius: 4px;
    padding: 10px 22px;
    outline: none;
    text-decoration: none;
    cursor: pointer;
    margin-left: 8px;
    background: ${(props: {background: string, color: string}) => props.background};
    color: ${(props: {background: string, color: string}) => props.color};
`;

export const style =  {
  Header,Nav,NavLink,NavMenu,NavBtn,NavBtnLink
};