import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const shine = keyframes`
  to {
    background-position-x: -200%;
  }
`;

const LoadingWrapper = styled.div(props =>
  css`
    background: #151515;
    background: linear-gradient(110deg, #151515 8%, #262626 18%, #151515 33%);
    height: ${props.height}px;
    border-radius: 5px;
    background-size: 200% 100%;
    margin-bottom: 20px;
    animation: 1.5s ${shine} linear infinite;
  `);

const LoadingCard = (props) => {
  const { height } = props;
  
  return (
    <LoadingWrapper height={height} />
  );
}

export default LoadingCard;
