import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const colorArray = [
  "#e3bd41",
  "#46903c",
  "#c97821",
  "#ca5959",
  "#945ebd",
  "#25558f"
];

const ForumWrapper = styled.div``;

const Forum = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
`;

const Initial = styled.div(props => ({
  width: '50px',
  height: '50px',
  border: `2px solid ${props.color}`,
  'border-radius': '100px',
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center',
  color: props.color
}));

const Post = styled.div`
  margin-left: 20px;
  flex: 1;

  .author {
    margin-left: 15px;
  }

  .textBubble {
    background-color: #262626;
    padding: 15px;
    border-radius: 10px;
    margin: 10px 0;
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
              <a href={`https://myanimelist.net/forum/?topicid=${el.id}`} target="_blank">
                <div className="textBubble">
                  <h4>{el.title}</h4>
                  <div className="details">
                    {moment(el.created_at).fromNow()}
                  </div>
                </div>
              </a>
              <Comments>
                <a href={`https://myanimelist.net/forum/?topicid=${el.id}`} target="_blank">
                  {el.number_of_posts} {el.number_of_posts != 1 ? 'replies' : 'reply'}
                </a>
              </Comments>
            </Post>
          </Forum>
        )
      })}
    </ForumWrapper>
  );
};

export default ForumSection;