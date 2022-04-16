import React from 'react';
import styled from 'styled-components';

const ListWrapper = styled.div`
`;

const Item = styled.div`
  display: flex;

  img {
    width: 130px;
    margin: 10px;
    height: auto;
  }

  h2.ranking {
    color: #8f8f8f;
    font-size: 30px;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
`;

const List = (props) => {

  const { anime, format } = props;
  
  return (
    <ListWrapper>
      {anime.map((item, index) => (
        <Item key={item.id}>
          <h2 className="ranking">{index + 1}</h2>
          <a href={`/anime/${item.id}`}><img src={item.main_picture.medium} alt={item.title} /></a>
          
          <ItemDetails>
            <a href={`/anime/${item.id}`}><h4>{item.title}</h4></a>
            {format !== "simple" &&
              <>
                <div className="details">⭐ {item.mean || 'N/A'}</div>
                <div className="details">
                  {Intl.NumberFormat('en-US').format(item.num_list_users)} {item.num_list_users === 1 ? 'user' : 'users'}
                </div>
              </>
            }
          </ItemDetails>

        </Item>
      ))}
    </ListWrapper>
  );
};

export default List;
