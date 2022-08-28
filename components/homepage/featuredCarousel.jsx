import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import List from '../common/list';

const FeaturedCarouselWrapper = styled.div`
  height: 950px;

  .carousel-root {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
  }

  &:hover .slideList {
    right: 0;
  }
`;

const Background = styled.img`
  width: inherit;
  height: 950px;
  object-fit: cover;
  object-position: center;
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

const SideList = styled.div`
  position: absolute;
  right: -300px;
  width: 500px;
  height: 950px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 50px;
  background: linear-gradient(to right, rgba(27,27,27,0) 0%, rgba(27, 27, 27, 0.8) 30%, rgba(27, 27, 27, 1) 70%);
  transition: all 0.5s ease-in-out;
`;  

const FeaturedCarousel = (props) => {
  const { featured } = props;
  const backgroundImages = [
    'https://i0.wp.com/www.animegeek.com/wp-content/uploads/2021/03/The-Devil-is-a-Part-Timer-Season-2-release-date-Hataraku-Maou-sama-Season-2-2021.jpg?fit=1200%2C675&ssl=1',
    'https://www.otaquest.com/wp-content/uploads/2021/02/detective-conan-and-shinichi-1024x533.jpg',
    'https://images-geeknative-com.exactdn.com/wp-content/uploads/2022/06/22110356/Overlord_IV-cover-b-scaled.jpg?strip=all&lossy=1&sharp=1&ssl=1',
    'https://randomc.net/image/Yofukashi%20no%20Uta/Yofukashi%20no%20Uta%20-%2001%20-%20Large%2034.jpg',
    'https://img1.ak.crunchyroll.com/i/spire1-tmb/81100674a7f7124d0c60a641c83fbdd61659111945_main.jpg'
  ];
  const parsedList = [];

  return (
    <FeaturedCarouselWrapper>
      <Carousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop
        emulateTouch
        autoPlay
      >
        {featured.data.map((el, index) => {
          const item = el.node;
          if (index < 3) parsedList.push(item);

          return (
            <a key={item.id} href={`/anime/${item.id}`}>
              <div>
                <Background src={backgroundImages[index]} />
                <Description>
                  <h1>{item.title}</h1>
                  <h3 className="section">Summer 2022</h3>
                </Description>
              </div>
            </a>
          )
        })}
      </Carousel>
      <SideList className="slideList">
        <h3 className="section">Summer 2022 Anime</h3>
        <List anime={parsedList} format="simple" />
        <button className="primary">View more →</button>
      </SideList>
    </FeaturedCarouselWrapper>
  );
};

export default FeaturedCarousel;
