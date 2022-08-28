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
import List from '../components/common/list';
import LoadingCard from "../components/common/loadingCard";
import ForumSection from "../components/homepage/forumSection";
import HorizontalList from "../components/common/horizontalList";
import FeaturedCarousel from '../components/homepage/featuredCarousel';
import NewsSection from "../components/homepage/newsSection";

const HomeWrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const LeftSection = styled.div`
	flex: 2.5;
	margin-right: 60px;
`;

const RightSection = styled.div`
	flex: 1;
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
					<LeftSection>
						<h3 className="section">Top Airing Anime</h3>
						<HorizontalList anime={airingAnime} />

						<h3 className="section">Top Upcoming Anime</h3>
						<HorizontalList anime={upcomingAnime} />

						<h3 className="section">News</h3>
						{isNewsLoading ?
							<>
								<LoadingCard height={430} />
								<LoadingCard height={430} />
							</>
							:
							<NewsSection news={news} />
						}
					</LeftSection>

					<RightSection>
						<h3 className="section">Forums</h3>
						{isForumsLoading ?
							<>
								<LoadingCard height={150} />
								<LoadingCard height={150} />
								<LoadingCard height={150} />
							</>
							:
							<ForumSection forums={forumBoards} />
						}

						<h3 className="section">Most Popular Anime</h3>
						<List anime={popularAnime} />
					</RightSection>
				</div>
			</HomeWrapper>
		</>
	);
}

export async function getStaticProps() {
	// Get Seasonal Anime
	const seasonalUrl = getAnimeBySeason(2022, 'summer', 5);
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
