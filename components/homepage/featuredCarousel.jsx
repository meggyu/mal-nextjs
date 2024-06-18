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
  margin-top: 56px;
  background-color: #000000;

  .carousel-root {
    width: auto;
  }

  @media screen and (min-width: 1280px) {
    margin-top: 61px;

    .carousel-root {
      width: 1200px;
    }
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
  display: none;

  @media screen and (min-width: 1280px) {
    display: flex;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    left: 0;
    bottom: 20px;
    padding: 0 50px;
  }

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
    'https://nami.news/wordpress/wp-content/uploads/2024/02/Tokidoki-Bosotto-Russia-go-de-Dereru-Tonari-no-Alya-san-Anime-Key-Visual-scaled-e1708336968142.webp',
    'https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/08/lucy-happy-the-cat-and-natsu-in-the-fairy-tal-anime.jpg',
    'https://a.storyblok.com/f/178900/960x540/f9731c1847/suicide-squad-isekai.jpg/m/filters:quality(95)format(webp)',
    'https://pbs.twimg.com/media/Ejvz4LaXkAIgc9z.jpg:large',
    'https://en.anmosugoi.com/wp-content/uploads/2024/03/Gimai-Seikatsu-visual-min.webp',
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
                  <h3 className="section">Summer 2024</h3>
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
