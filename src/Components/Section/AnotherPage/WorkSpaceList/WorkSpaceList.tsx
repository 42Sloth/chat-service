import React from 'react';
import { IWorkSpaceList } from 'Types';
import { style } from './WorkSpaceListStyle';

const WorkSpaceList: React.FC<IWorkSpaceList> = ({ workSpaceList }) => {
  return (
    <ItemContainer>
      {workSpaceList.map((item) => {
        return (
          <WorkSpaceItem>
            <ItemDetail>
              <ItemImg src={item.img} alt="workSpaceLogo" />
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemNumbers>{item.numbers}명의 멤버</ItemNumbers>
              </ItemInfo>
              <WorkSpaceLink href={item.url}>ChatPong 실행</WorkSpaceLink>
            </ItemDetail>
          </WorkSpaceItem>
        );
      })}
    </ItemContainer>
  );
};

export default WorkSpaceList;

const {
  ItemContainer,
  WorkSpaceItem,
  ItemDetail,
  ItemImg,
  ItemInfo,
  ItemName,
  ItemNumbers,
  WorkSpaceLink,
} = style;
