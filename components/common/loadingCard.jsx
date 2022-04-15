import React from 'react';
import styled, { keyframes } from 'styled-components';

const shine = keyframes`
  to {
    background-position-x: -200%;
  }
`;

const LoadingWrapper = styled.div`
  background: #151515;
  background: linear-gradient(110deg, #151515 8%, #262626 18%, #151515 33%);
  height: 100px;
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1.5s ${shine} linear infinite;
`;

const LoadingCard = () => {
  return (
    <LoadingWrapper />
  );
}

export default LoadingCard;
