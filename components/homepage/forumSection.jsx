import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const colorArray = [
  "#e3bd41",
  "#46903c",
  "#c97821",
  "#ca5959",
  "#945ebd",
  "#25558f",
  "#5ebd94",
  "#458fe0"
];

const ForumWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  a.moreButton {
    flex-basis: 100%;
    justify-content: flex-end;
    display: flex;
    margin-top: 20px;

    &:hover {
      text-decoration: none;
    }
  }
`;

const Forum = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  flex-basis: 48%;
`;

const Initial = styled.div(props => ({
  width: '50px',
  height: '50px',
  border: `2px solid ${props.color}`,
  background: props.color,
  'border-radius': '100px',
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center',
  color: '#ffffff',
}));

const Post = styled.div`
  margin-left: 20px;
  flex: 1;

  .author {
    margin-left: 15px;
  }

  a.post:hover {
    text-decoration: none;
  }

  .textBubble {
    background-color: #151515;
    padding: 15px;
    border-radius: 10px;
    margin: 10px 0;
    transition: background-color 0.5s ease-in-out;

    &:hover {
      background-color: black;
    }
  }

  h4 {
    margin: 0 0 10px 0; 
  }
`;

const Comments = styled.div`
  text-align: right;
`;

const ForumSection = (props) => {
  const { forums } = props;

  const getRandomNum = (max) => {
    return Math.floor(Math.random() * max);
  };

  return (
    <ForumWrapper>
      {forums && forums.data.map(el => {
        const randomNum = getRandomNum(6);
        const initialColor = colorArray[randomNum];

        return (
          <Forum key={el.id}>
            <Initial color={initialColor}><h2>{el.created_by.name[0].toUpperCase()}</h2></Initial>
            <Post>
              <div className="details author">{el.created_by.name} wrote...</div>
              <a href={`https://myanimelist.net/forum/?topicid=${el.id}`} className="post" target="_blank" rel="noreferrer">
                <div className="textBubble">
                  <h4>{el.title}</h4>
                  <div className="details">
                    {moment(el.created_at).fromNow()}
                  </div>
                </div>
              </a>
              <Comments>
                <a href={`https://myanimelist.net/forum/?topicid=${el.id}`} target="_blank" rel="noreferrer">
                  {el.number_of_posts} {el.number_of_posts != 1 ? 'replies' : 'reply'}
                </a>
              </Comments>
            </Post>
          </Forum>
        )
      })}
      <a href="https://myanimelist.net/forum/" className="moreButton" target="_blank" rel="noreferrer">
        <button className="secondary">All Forums →</button>
      </a>
    </ForumWrapper>
  );
};

export default ForumSection;