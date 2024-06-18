import axios from 'axios';
import moment from 'moment';
import React, {
	useEffect,
	useState,
} from 'react';
import styled from 'styled-components';

import { 
	getAnimeUrlByRanking,
	getAnimeById,
	getAnimeBySeason
} from '../helpers/apiUrls';

import getCurrentSeason from '../helpers/getCurrentSeason';

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
		background: linear-gradient(to right,#202c46 0%,#000 100%);
		width: 100%;
		margin: 60px 0 0;
		padding: 60px 0 80px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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

					{/* Top Airing Anime */}
					<div className="section">
						<h1>Top Airing Anime</h1>
						<a href="https://myanimelist.net/topanime.php?type=airing" target="_blank" rel="noreferrer">
							More →
						</a>
					</div>
					<HorizontalList anime={airingAnime} />
					
					{/* Top Upcoming Anime */}
					<div className="section">
						<h1>Top Upcoming Anime</h1>
						<a href="https://myanimelist.net/topanime.php?type=upcoming" target="_blank" rel="noreferrer">
							More →
						</a>
					</div>
					<HorizontalList anime={upcomingAnime} />
				</div>

				{/* News */}
				<div className="wideSection-news">
					<div className="page">
						<h1>News</h1>
						{isNewsLoading ?
							<>
								<LoadingCard height={430} />
							</>
							:
							<NewsSection news={news} />
						}
					</div>
				</div>

				<div className="page">
					{/* Most Popular Anime */}
					<div className="section">
						<h1>Most Popular Anime</h1>
						<a href="https://myanimelist.net/topanime.php?type=bypopularity" target="_blank" rel="noreferrer">
							More →
						</a>
					</div>
					<HorizontalList anime={popularAnime} />
					
					{/* Forums */}
					<h1 className="withPadding">Forums</h1>
					{isForumsLoading ?
						<>
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
	const date = new Date();
	const currentSeason = getCurrentSeason(date.getMonth());
	const currentYear = date.getFullYear();
	const seasonalUrl = getAnimeBySeason(currentYear, currentSeason, 5);
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
		const fields = ['id', 'title', 'main_picture', 'mean', 'num_list_users', 'media_type', 'num_episodes'];
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
