import axios from 'axios';
import React from 'react';
import moment from 'moment';
import get from 'lodash/get';
import styled from 'styled-components';

import List from '../../components/common/list';
import capitalize from '../../helpers/capitalize';
import HorizontalList from '../../components/common/horizontalList';
import { getAnimeById } from '../../helpers/apiUrls';

const DetailWrapper = styled.div`
  margin-top: 150px;
  display: flex;
  justify-content: center;
  min-height: 100vh;

  @media screen and (max-width: 720px) {
    margin-top: 56px;
  }
`

const MainSection = styled.div`
  border-bottom: 1px solid #4e4e4e;
  margin-bottom: 20px;
  padding-bottom: 50px;

  h1 {
    margin-bottom: 5px;
  }

  h2.altTitle {
    margin: 0;
  }
`;

const Poster = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  @media screen and (min-width: 1080px) {
    flex-direction: row;
  }

  img {
    width: 280px;
  }
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (min-width: 1080px) {
    margin-left: 20px;
  }

  .boxes {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 20px;

    h2 {
      margin: 0;
    }

    .box {
      padding: 10px;
      text-align: center;
      margin-right: 20px;

      &:nth-last-child(1) {
        margin-right: 0;
      }

      @media screen and (min-width: 1080px) {
        border: 3px solid #4e4e4e;
        border-radius: 10px;
        width: 180px;
      }
    }
  }

  .ratings {
    display: flex;
    flex: 0.5;

    div:not(:last-child):after {
      content: '·';
      margin: 0 15px;
    }
  }

  .information {
    display: flex;
    flex-direction: row;

    p {
      margin: 10px 0;
    }

    .left {
      font-weight: bold;
      width: 100px;
    }
  }
`;

const Genres = styled.div`
  display: flex;

  .genre {
    border: 1px solid #bebebe;
    border-radius: 100px;
    color: #bebebe;
    padding: 5px 15px;
    margin-right: 15px;
  }
`;

const Synopsis = styled.div`
  margin-top: 30px;
`;

const RecommendedSection = styled.div`
  margin-bottom: 50px;
`;

const DetailPage = ({ details, recommendedAnime }) => {
  
  // Build out the data to be more readable
  const title = details.title;
  const altTitle = details.alternative_titles.en;
  const posterImg = details.main_picture.large;
  const boxes = [
    {
      title: `★ ${get(details, 'mean', 'N/A')}`,
      details: `${Intl.NumberFormat('en-US').format(details.num_scoring_users)} users`
    },
    {
      title: `#${details.popularity}`,
      details: 'Popularity'
    },
    {
      title: `#${get(details, 'rank', 'N/A')}`,
      details: 'Ranked'
    }
  ];
  const season = details.start_season ? `${capitalize(details.start_season.season)} ${details.start_season.year}` : details.start_date;
  const parentalRating = get(details, 'rating', 'NR').replace('_', ' ').toUpperCase();
  const media = details.media_type.toUpperCase();

  const isTV = details.media_type === 'tv';

  const formatAiredDate = (start, end) => {
    // Return a "?" if the title hasn't aired yet
    if (start && end && isTV) {
      // Return the full air date if the title has start and end dates
      return `${moment(start).format('MMM DD, YYYY')} — ${moment(end).format('MMM DD, YYYY')}`;
    } else if (start && isTV) {
      // Return the start date if no end date is found
      if (start.length > 5) {
        return `${moment(details.start_date).format('MMM DD, YYYY')} —`;
      } else {
        // Return only the year if that's all the start date contains
        return `${moment(details.start_date).format('YYYY')} —`;
      }
    } else if (start) {
      // Return the start date only
      return moment(details.start_date).format('MMM DD, YYYY');
    }
    return 'TBD';
  }

  const information = {
    "Studio": get(details, 'studios[0].name', 'None found'),
    "Episodes": details.num_episodes || '?',
    "Status": capitalize(details.status.replace(/_/g, ' ')),
    "Aired": formatAiredDate(details.start_date, details.end_date),
    "Duration": `${Math.round(details.average_episode_duration / 60)} minutes`
  }

  details.recommendations.forEach((element, index) => {
    if (index < 5) {
      recommendedAnime[index].num_list_users = element.num_recommendations;
    }
  });

  return (
    <DetailWrapper>
      <div className="page">
        <MainSection>
          <h1>{title}</h1>
          <h2 className="details altTitle">{altTitle}</h2>
          
          <Poster>
            <img src={posterImg} />
            
            <Stats>
              <div className="boxes">
                {boxes.map(box => {
                  return (
                    <div key={box.title} className="box">
                      <h2>{box.title}</h2>
                      <span className="details">{box.details}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="ratings details">
                <div>{season}</div>
                <div>{parentalRating}</div>
                <div>{media}</div>
              </div>
              
              <br />
              <div className="information">
                <div className="left">
                  {Object.keys(information).map(el => {
                    return <p key={el}>{el}</p>;
                  })}
                </div>
                <div className="right">
                  {Object.values(information).map(el => {
                    return <p key={el}>{el}</p>;
                  })}
                </div>
              </div>
            </Stats>
          </Poster>
          
          <Genres>
            {details.genres.map((el, index) => {
              if (index < 3) {
                return (
                  <div key={el.id} className="genre">{el.name}</div>
                );              
              }
            })}
          </Genres>
          
          <Synopsis>
            <div>{details.synopsis}</div>
            <br />
            <h2 className="sectionHeading">Background</h2>
            {details.background ?
              <div>{details.background}</div>
              :
              <p>No background information has been added to this title. Help improve our database by adding background information <a target="_blank" href={`https://myanimelist.net/dbchanges.php?aid=${details.id}&t=background`} rel="noreferrer">here</a>.</p>
            }
          </Synopsis>
        </MainSection>

        <RecommendedSection>
          <h2>Recommendations</h2>
          <p>Here’re what other users recommend based on this title.</p>
          <HorizontalList anime={recommendedAnime} />
        </RecommendedSection>
      </div>
    </DetailWrapper>
  )
};

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: 'blocking'
//   }
// }

// export async function getStaticProps() {
  
// }

export async function getServerSideProps({ params }) {
  console.log(params);
  const fields = [
    "id",
    "title",
    "main_picture",
    "alternative_titles",
    "start_date",
    "end_date",
    "synopsis",
    "mean",
    "rank",
    "popularity",
    "num_list_users",
    "num_scoring_users",
    "nsfw",
    "created_at",
    "updated_at",
    "media_type",
    "status",
    "genres",
    "my_list_status",
    "num_episodes",
    "start_season",
    "broadcast",
    "source",
    "average_episode_duration",
    "rating",
    "pictures",
    "background",
    "related_anime",
    "related_manga",
    "recommendations",
    "studios",
    "statistics"
  ];
  const detailUrl = getAnimeById(params.id, fields);
	const details = await axios
		.get(detailUrl, {
			headers: { 'X-MAL-CLIENT-ID': 'e348f8ee5084215dcced2fd6ba8fb012' }
		})
		.then(({ data }) => {
			return data;
		})
		.catch(({ err }) => {
			return err;
		});

  const recommendedIds = [];
  details.recommendations.forEach((element, index) => {
    if (index < 5) recommendedIds.push(element.node.id);
  });

  const recommendedArray = Promise.all(recommendedIds.map(id => {
    const fields = ['id', 'title', 'main_picture', 'mean', 'num_episodes', 'media_type'];
		const animeUrl = getAnimeById(id, fields);
		return axios
			.get(animeUrl, {
				headers: { 'X-MAL-CLIENT-ID': 'e348f8ee5084215dcced2fd6ba8fb012' }
			})
			.then(({ data }) => {
				return data;

			})
			.catch(({ err }) => {
				console.log(err);
				return err;
			});
	}));

  return {
    props: {
      details,
      recommendedAnime: await recommendedArray
    }
  }
}

export default DetailPage;
