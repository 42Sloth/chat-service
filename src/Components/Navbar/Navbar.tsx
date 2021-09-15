import React from 'react'
import logo from 'Assets/Chatpong_logo_trans.png';
import {style} from './NavbarStyle';

const Navbar: React.FC = () => {
    return (
            <Header>
                <Nav>
                <NavLink to='/'>
                    <img src={logo} alt='logo'/>
                </NavLink>
                <NavMenu>
                    <NavLink to='/'>
                        Home
                    </NavLink>
                    <NavLink to='/'>
                        Chat
                    </NavLink>
                    <NavLink to='/'>
                        Game
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink background="transparent" color="#611f66">로그인</NavBtnLink>
                    <NavBtnLink background="#611f66" color="#fff">회원가입</NavBtnLink>
                </NavBtn>
            </Nav>
            </Header>
    )
}

export default Navbar;


const { Header, Nav, NavLink, NavMenu, NavBtn, NavBtnLink } = style;