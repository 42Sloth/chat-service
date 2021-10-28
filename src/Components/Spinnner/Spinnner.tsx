import React from 'react';
import styled from 'styled-components';

const Spinnner = () => {
  return (
    <Container>
      <h1 data-text="LOADING">LOADING</h1>
    </Container>
  );
};

export default Spinnner;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  h1 {
    font-size: 2rem;
    color: #000;
    position: relative;
  }

  h1::before {
    content: attr(data-text);
    color: yellow;
    position: absolute;
    left: 0;
    z-index: 2;
    overflow: hidden;
    width: 100%;
    animation: loading 2s ease infinite;
  }

  h1::after {
    content: '';
    width: 100%;
    height: 3px;
    background: yellow;
    position: absolute;
    left: 0;
    bottom: -10px;
    animation: loadingLine 2s ease infinite;
  }

  @keyframes loading {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }

  @keyframes loadingLine {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
`;
