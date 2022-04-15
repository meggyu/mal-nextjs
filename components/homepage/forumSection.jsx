import React from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';

const ForumWrapper = styled.div`
  
`;

const Forum = styled.div`
  padding: 30px;
  border: 3px solid #262626;
  border-radius: 15px;
  margin: 20px 0;
  display: flex;
  align-items: center;
`;

const Initial = styled.div`
  width: 70px;
  height: 70px;
  border: 2px solid #e3bd41;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e3bd41;
`;

const Post = styled.div`
  margin: 0 20px;
  flex: 1;

  h3 {
    margin-top: 0;
  }
`;

const Comments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100px;

  img.commentIcon {
    filter: invert(1);
    width: 30px;
    height: 30px;
  }

  h4 {
    margin: 10px;
  }
`;

const ForumSection = (props) => {
  const { forums } = props;

  return (
    <ForumWrapper>
      {forums && forums.data.map(el => {
        return (
          <Forum key={el.id}>
            <Initial><h1>{el.created_by.name[0].toUpperCase()}</h1></Initial>
            <Post>
              <a href={`https://myanimelist.net/forum/?topicid=${el.id}`} target="_blank">
                <h3>{el.title}</h3>
              </a>
              <div className="details">
                Posted by {el.created_by.name} at <Moment format="MM/DD/YYYY, HH:mm">{el.created_at}</Moment>
              </div>
            </Post>
            <Comments>
              <a href={`https://myanimelist.net/forum/?topicid=${el.id}`} target="_blank">
                <img className="commentIcon" src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_mode_comment_48px-512.png" />
                <h4>{el.number_of_posts} {el.number_of_posts != 1 ? 'replies' : 'reply'}</h4>
              </a>
            </Comments>
          </Forum>
        )
      })}
    </ForumWrapper>
  );
};

export default ForumSection;