import React from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';

import textParser from '../../helpers/textParser';
import createMarkup from '../../helpers/createMarkup';

const NewsWrapper = styled.div`
  
`;

const Article = styled.div`
  img.thumbnail {
    height: 240px;
    float: left;
    margin-right: 20px;
    margin-bottom: 10px;
  }

  h1 {
    margin-top: 5px;
  }

  .snippet {
    display: -webkit-box;
    line-height: 1.5;
    height: 240px;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    a {
      color: #a0bdff;
    }
  }
`;

const ArticleFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;

  a {
    color: #ffffff;
  }
  
  a:hover {
    text-decoration: none;
  }
`;

const NewsSection = (props) => {

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
        
        return (
          <Article key={post.id}>
            <Moment className="details" format="MM/DD/YYYY, HH:mm">{post.created_at}</Moment>
            <a href={`https://myanimelist.net/news/${post.id}`} target="_blank" rel="noreferrer">
              <h1>{item.title}</h1>
            </a>
            {item.posts.length > 0 &&
              <>
                <p className="snippet" dangerouslySetInnerHTML={createMarkup(parsedSnippet)}></p>
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
