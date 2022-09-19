import React, { useState } from 'react';
import get from 'lodash/get';
import styled, { css } from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const FeaturedCarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  margin-top: 61px;
  background-color: #000000;

  .carousel-root {
    width: 1200px;
  }
`;

const Background = styled.img`
  width: 1200px;
  object-fit: cover;
  object-position: center;
  
  @media screen and (min-width: 1280px) {
    height: 45vh;
  }
`;

const Description = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  left: 0;
  bottom: 20px;
  padding: 0 50px;

  img {
    width: 180px !important;
    margin-right: 30px;
  }

  h1 {
    max-width: 500px;
    text-align: left;
    margin: 0;
    text-shadow: 2px 2px 20px #000000;
  }

  h3 {
    text-shadow: 2px 2px 20px #000000;
    margin-top: 10px;
  }
`;

const SliderThumbs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1200px;
  margin-top: 20px;
`

const Thumb = styled.div(props => 
  css`
    position: relative;
    width: calc(1200px / 5.5);
    height: 120px;
    border: 1.5px solid #ffffff;
    border-radius: 7px;
    padding: 5px;
    transition: transform 0.5s ease-in-out;

    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }

    .slideBackground {
      position: absolute;
      width: calc(1200px / 5.85);
      height: 105px;
      background-image: url(${props.background});
      background-position: center center;
      background-repeat: no-repeat;
      transition: backdrop-filter 0.5s ease-in-out;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        width: 101%;
        height: 100%;
        backdrop-filter: brightness(0.4);
      }
    }

    .slideText {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: 100%;
      z-index: 2;
      padding: 10px;

      h2 {
        margin: 0;
      }
    }
  `
);

const FeaturedCarousel = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const { featured } = props;
  const backgroundImages = [
    'https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/04/Spy-x-Family.jpg',
    'https://thecinemaholic.com/wp-content/uploads/2021/09/Screenshot-2021-09-25-221941.jpg',
    'https://i0.wp.com/twinfinite.net/wp-content/uploads/2021/12/Bleach-6.jpg?ssl=1',
    'https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/04/13/3396190008.jpg',
    'https://www.theanimedaily.com/wp-content/uploads/2022/04/Blue-Lock-Anime-Release-Date-1024x576.jpg'
  ];
  const parsedList = [];

  return (
    <FeaturedCarouselWrapper>
      <Carousel
        showStatus={false}
        showThumbs={false}
        interval={5000}
        selectedItem={currentSlide}
        infiniteLoop
        emulateTouch
        autoPlay
      >
        {featured.data.map((el, index) => {
          const item = el.node;
          parsedList.push(item);

          return (
            <a key={item.id} href={`/anime/${item.id}`}>
              <div>
                <Background src={backgroundImages[index]} />
                <Description>
                  <h1>{item.title}</h1>
                  <h3 className="section">Fall 2022</h3>
                </Description>
              </div>
            </a>
          )
        })}
      </Carousel>
      
      <SliderThumbs>
        {featured.data.map((el, index) => {
          const item = el.node;

          return (
            <Thumb
              key={item.id}
              background={get(item, 'main_picture.large')}
              onClick={() => setCurrentSlide(index)}
            >
              <div className="slideBackground"></div>
              <div className="slideText">
                <h2 className="ranking">{index + 1}</h2>
                <b>{item.title}</b>
              </div>
            </Thumb>
          )
        })}
      </SliderThumbs>
    </FeaturedCarouselWrapper>
  );
};

export default FeaturedCarousel;
