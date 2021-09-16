import React from 'react';
import { style } from './FooterMenuStyle';

const FooterMenu = () => {
  return (
    <MenuList>
      <MenuItems>
        <MenuTitle>SLACK 사용이유</MenuTitle>
        <InnterMenuItems>
          <Item>Slack vs Email</Item>
          <Item>채널</Item>
          <Item>참여</Item>
          <Item>확장성</Item>
          <Item>데모 보기</Item>
        </InnterMenuItems>
      </MenuItems>
      <MenuItems>
        <MenuTitle>제품</MenuTitle>
        <InnterMenuItems>
          <Item>기능</Item>
          <Item>통합</Item>
          <Item>Enterprise</Item>
          <Item>솔루션</Item>
        </InnterMenuItems>
      </MenuItems>
      <MenuItems>
        <MenuTitle>요금</MenuTitle>
        <InnterMenuItems>
          <Item>플랜</Item>
          <Item>유료 vs 무료</Item>
        </InnterMenuItems>
      </MenuItems>
      <MenuItems>
        <MenuTitle>리소스</MenuTitle>
        <InnterMenuItems>
          <Item>파트너</Item>
          <Item>개발자</Item>
          <Item>앱</Item>
          <Item>블로그</Item>
          <Item>고객지원센터</Item>
          <Item>이벤트</Item>
        </InnterMenuItems>
      </MenuItems>
      <MenuItems>
        <MenuTitle>회사</MenuTitle>
        <InnterMenuItems>
          <Item>Slack 소개</Item>
          <Item>리더십</Item>
          <Item>IR</Item>
          <Item>새 소식</Item>
          <Item>미디어 키트</Item>
          <Item>경력</Item>
        </InnterMenuItems>
      </MenuItems>
    </MenuList>
  );
};

export default FooterMenu;

const { MenuList, MenuItems, MenuTitle, InnterMenuItems, Item } = style;
