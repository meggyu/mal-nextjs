import React from 'react';
import styled from 'styled-components';

const HorizontalListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  
  a {
    &:hover {
      text-decoration: none;
    }
  }
`;

const ListItem = styled.div`
  width: 220px;
  transition: all 0.3s ease-in-out;

  img {
    width: 100%;
    height: 330px;
    object-fit: cover;
  }

  .detailCard {
    background-color: #262626;
    margin-top: -20px;
    padding: 10px 15px;
    border-radius: 5px;
    height: 200px;
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
    
    .detailCard {
      background-color: #151515;
    }
  }
`;

const HorizontalList = (props) => {
  const { anime } = props;

  return (
    <HorizontalListWrapper>
      {anime.map(item => {
        return (
          <a key={item.id} href={`/anime/${item.id}`}>
            <ListItem>
              <img src={item.main_picture.medium} alt={item.title} />
              <div className="detailCard">
                <h4>{item.title}</h4>
                <div className="details">⭐ {item.mean || 'N/A'}</div>
                <div className="details">Episodes: {item.num_episodes === 0 || !item.num_episodes ? '?' : item.num_episodes} ({item.media_type.toUpperCase()})</div>
              </div>
            </ListItem>
          </a>
        );
      })}
    </HorizontalListWrapper>
  );
}

export default HorizontalList;
