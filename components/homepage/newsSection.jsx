import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

import { textParser, getThumbnail } from '../../helpers/textParser';
import createMarkup from '../../helpers/createMarkup';

const colorArray = [
  "#e3bd41",
  "#46903c",
  "#c97821",
  "#ca5959",
  "#945ebd",
  "#25558f"
];

const NewsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Article = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 360px;

  .thumbnail, .thumbnail img {
    height: 150px;
    width: 360px;
    object-fit: cover;
    object-position: top center;
    border-radius: 7px;
  }

  h1 {
    margin-top: 5px;
  }

  .snippet {
    display: -webkit-box;
    line-height: 1.5;
    height: 120px;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    img {
      display: none;
    }

    a {
      color: #a0bdff;
    }
  }
`;

const ArticleFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 0;

  a {
    color: #ffffff;
  }
  
  a:hover {
    text-decoration: none;
  }
`;

const NewsSection = (props) => {

  const getRandomNum = (max) => {
    return Math.floor(Math.random() * max);
  };

  const { news } = props;

  return (
    <NewsWrapper>
      {news && news.map(el => {
        const item = el.data;
        let post;
        let parsedSnippet;
        if (item.posts.length > 0) {
          post = item.posts[0];
          parsedSnippet = textParser(post.body);
        }

        let thumbnail = getThumbnail(parsedSnippet);
        if (thumbnail) thumbnail += "/>";

        const randomNum = getRandomNum(6);
        const thumbnailColor = colorArray[randomNum];

        return (
          <Article key={post.id}>
            {thumbnail ?
              <div className="thumbnail" dangerouslySetInnerHTML={createMarkup(thumbnail)}></div>
              :
              <div className="thumbnail" style={{ backgroundColor: thumbnailColor }}></div>
            }
            <a href={`https://myanimelist.net/news/${post.id}`} target="_blank" rel="noreferrer">
              <h2>{item.title}</h2>
            </a>
            {item.posts.length > 0 &&
              <>
                <div className="details">{moment(post.created_at).format("MM/DD/YYYY, HH:mm")}</div>
                <ArticleFooter>
                  <div className="details">✎ Written by {post.created_by.name}</div>
                  <a href={`https://myanimelist.net/news/${post.id}`} target="_blank" rel="noreferrer">
                    <button className="primary">Keep reading →</button>
                  </a>
                </ArticleFooter>
              </>
            }
          </Article>
        )
      })}

    </NewsWrapper>
  );
};

export default NewsSection;
