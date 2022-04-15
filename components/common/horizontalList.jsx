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
    height: 170px;
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
          <a href={`/anime/${item.id}`}>
            <ListItem key={item.id}>
              <img src={item.main_picture.medium} alt={item.title} />
              <div className="detailCard">
                <h3>{item.title}</h3>
                <div className="details">⭐ {item.mean}</div>
                <div className="details">{Intl.NumberFormat('en-US').format(item.num_list_users)} users</div>
              </div>
            </ListItem>
          </a>
        );
      })}
    </HorizontalListWrapper>
  );
}

export default HorizontalList;
