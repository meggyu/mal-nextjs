import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import List from '../common/list';

const FeaturedCarouselWrapper = styled.div`
  height: 950px;
  margin-bottom: 50px;

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
    'https://images.saymedia-content.com/.image/t_share/MTc1MTE0NDgwNDEyNTM0NTk2/animes-like-tate-no-yuusha-no-nariagari.jpg',
    'https://assets-prd.ignimgs.com/2022/04/10/spy-x-family-blogroll-1649617057064.jpg',
    'https://cdn.thetealmango.com/wp-content/uploads/2022/03/ks2.jpg',
    'https://www.otaquest.com/wp-content/uploads/2021/02/detective-conan-and-shinichi-1024x533.jpg',
    'https://s199.imacdn.com/ta/2022/03/27/d0b843980a6153fb_4330e3c88cb2bddb_9186516483669944734221.jpg'
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
                  <h3 className="section">Spring 2022</h3>
                </Description>
              </div>
            </a>
          )
        })}
      </Carousel>
      <SideList className="slideList">
        <h3 className="section">Spring 2022 Anime</h3>
        <List anime={parsedList} format="simple" />
        <button className="primary">View more</button>
      </SideList>
    </FeaturedCarouselWrapper>
  );
};

export default FeaturedCarousel;
