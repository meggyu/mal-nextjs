import axios from "axios"
import React, {
	useEffect,
	useState,
} from 'react';
import styled from 'styled-components';

import { 
	getAnimeUrlByRanking,
	getAnimeById,
	getAnimeBySeason
} from "../helpers/apiUrls";

import LoadingCard from "../components/common/loadingCard";
import ForumSection from "../components/homepage/forumSection";
import HorizontalList from "../components/common/horizontalList";
import FeaturedCarousel from '../components/homepage/featuredCarousel';
import NewsSection from "../components/homepage/newsSection";

const HomeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.wideSection-news {
		background: linear-gradient(to right,#3e4046 0%,#000 100%);
		width: 100%;
		margin: 50px 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		/* .newsBackground {
			background-image: url('https://i.pinimg.com/originals/42/26/8f/42268ff9ae112984ac81a7a9338ff306.jpg');
			background-repeat: no-repeat;
			width: 100%;
			height: 100%;

			&:after {
				content: '';
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: brightness(0.4);
				background: linear-gradient(to right, transparent 0%, #000000 100%);
			}
		} */
	}
`;

const Home = ({
	seasonalAnime,
	airingAnime,
	popularAnime,
	upcomingAnime
}) => {
	const [forumBoards, setForumBoards] = useState(null);
	const [isForumsLoading, setIsForumsLoading] = useState(false);
	const [news, setNews] = useState(null);
	const [isNewsLoading, setIsNewsLoading] = useState(false);
 
	useEffect(() => {
		// Getting the list of forums from MAL's API takes forever, and we don't want the site to
		// keep loading while the forums and news lists are being populated
		setIsNewsLoading(true);
		fetch('api/news')
			.then((res) => res.json())
			.then((data) => {
				setNews(data);
				setIsNewsLoading(false);
			});
		
		setIsForumsLoading(true);
		fetch('api/forums')
      .then((res) => res.json())
      .then((data) => {
        setForumBoards(data);
        setIsForumsLoading(false);
      });
	}, []);

	return (
		<>
			<FeaturedCarousel featured={seasonalAnime} />
			
			<HomeWrapper>
				<div className="page">
					<h1 className="section">Top Airing Anime</h1>
					<HorizontalList anime={airingAnime} />

					<h1 className="section">Top Upcoming Anime</h1>
					<HorizontalList anime={upcomingAnime} />
				</div>

				<div className="wideSection-news">
					<div className="newsBackground"></div>
					<div className="page">
						<h1 className="section">News</h1>
						{isNewsLoading ?
							<>
								<LoadingCard height={430} />
								<LoadingCard height={430} />
							</>
							:
							<NewsSection news={news} />
						}
					</div>
				</div>

				<div className="page">
					<h1 className="section">Most Popular Anime</h1>
					<HorizontalList anime={popularAnime} />

					<h1 className="section">Forums</h1>
					{isForumsLoading ?
						<>
							<LoadingCard height={150} />
							<LoadingCard height={150} />
							<LoadingCard height={150} />
						</>
						:
						<ForumSection forums={forumBoards} />
					}
				</div>
			</HomeWrapper>
		</>
	);
}

export async function getStaticProps() {
	// Get Seasonal Anime
	const seasonalUrl = getAnimeBySeason(2022, 'fall', 5);
	const seasonalAnime = await axios
		.get(seasonalUrl, {
			headers: { 'X-MAL-CLIENT-ID': 'e348f8ee5084215dcced2fd6ba8fb012' }
		})
		.then(({ data }) => {
			return data;
		})
		.catch(({ err }) => {
			return err;
		});

	// Get Top Airing Anime
	const rankingUrl = getAnimeUrlByRanking('airing', 5);
  const result = await axios
		.get(rankingUrl, {
			headers: { 'X-MAL-CLIENT-ID': 'e348f8ee5084215dcced2fd6ba8fb012' }
		})
		.then(({ data }) => {
			return data;
		})
		.catch(({ err }) => {
			return err;
		});
  
	const rankingIds = [];

	result.data.forEach(element => {
		rankingIds.push(element.node.id);
	});

	const airingArray = Promise.all(rankingIds.map(id => {
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

	// Get Most Popular Anime
	const popularUrl = getAnimeUrlByRanking('bypopularity', 5);
  const popularResult = await axios
		.get(popularUrl, {
			headers: { 'X-MAL-CLIENT-ID': 'e348f8ee5084215dcced2fd6ba8fb012' }
		})
		.then(({ data }) => {
			return data;
		})
		.catch(({ err }) => {
			return err;
		});
	const popularIds = [];

	popularResult.data.forEach(element => {
		popularIds.push(element.node.id);
	});

	const popularArray = Promise.all(popularIds.map(id => {
		const fields = ['id', 'title', 'main_picture', 'mean', 'num_list_users', 'media_type'];
		const animeUrl = getAnimeById(id, fields);
		return axios
			.get(animeUrl, {
				headers: { 'X-MAL-CLIENT-ID': 'e348f8ee5084215dcced2fd6ba8fb012' }
			})
			.then(({ data }) => {
				return data;

			})
			.catch(({ err }) => {
				return err;
			});
	}));
	
	// Get Upcoming Anime
	const upcomingUrl = getAnimeUrlByRanking('upcoming', 5);
  const upcomingResult = await axios
		.get(upcomingUrl, {
			headers: { 'X-MAL-CLIENT-ID': 'e348f8ee5084215dcced2fd6ba8fb012' }
		})
		.then(({ data }) => {
			return data;
		})
		.catch(({ err }) => {
			return err;
		});
	
	const upcomingIds = [];
	upcomingResult.data.forEach(element => {
		upcomingIds.push(element.node.id);
	});

	const upcomingArray = Promise.all(upcomingIds.map(id => {
		const fields = ['id', 'title', 'main_picture', 'mean', 'num_list_users', 'media_type'];
		const animeUrl = getAnimeById(id, fields);
		return axios
			.get(animeUrl, {
				headers: { 'X-MAL-CLIENT-ID': 'e348f8ee5084215dcced2fd6ba8fb012' }
			})
			.then(({ data }) => {
				return data;
			})
			.catch(({ err }) => {
				return err;
			});
	}));

  return {
    props: {
			seasonalAnime: seasonalAnime || [],
			airingAnime: await airingArray,
			popularAnime: await popularArray,
			upcomingAnime: await upcomingArray
    },
  }
}

export default Home;
