import React from 'react';
import { style } from 'Components/Section/MainPage/BrandLogoStyle';
import { brandLogo } from 'Assets/Brand_Logo/index';

const BrandLogo = () => {
  return (
    <BrandContainer>
      <BrandImg>
        <img src={brandLogo.Carvana} alt="Carvana logo" />
      </BrandImg>
      <BrandImg>
        <img src={brandLogo.Devacurl} alt="Devacurl logo" />
      </BrandImg>
      <BrandImg>
        <img src={brandLogo.Fox} alt="Fox logo" />
      </BrandImg>
      <BrandImg>
        <img src={brandLogo.Intuit} alt="Intuit logo" />
      </BrandImg>
      <BrandImg>
        <img src={brandLogo.Kiva} alt="Kiva logo" />
      </BrandImg>
      <BrandImg>
        <img src={brandLogo.Lonelyplanet} alt="Lonelyplanet logo" />
      </BrandImg>
      <BrandImg>
        <img src={brandLogo.Target} alt="Target logo" />
      </BrandImg>
    </BrandContainer>
  );
};

export default BrandLogo;

const { BrandContainer, BrandImg } = style;
