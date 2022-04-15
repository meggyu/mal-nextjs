import React from 'react';
import styled from 'styled-components';

const NavigationWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
  position: fixed;
	width: 100%;
	z-index: 2;
	padding: 30px;
	left: 0;
	right: 0;
	background: linear-gradient(to top,rgba(27,27,27,0) 0%, rgba(27,27,27,0.7) 100%);

	a.logo {
		font-weight: bold;
		font-size: 20px;
	}

	a:hover {
		text-decoration: none;
	}

	img.search:hover {
		cursor: pointer;
	}
`;

const NavigationList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  a {
    margin: 0 30px;
    font-weight: 500;
  }
`;

const Navigation = () => {
	const navigationItems = [
		{
			title: 'Anime',
			href: '/anime'
		},
		{
			title: 'Manga',
			href: '/manga'
		},
		{
			title: 'Community',
			href: '/community'
		},
		{
			title: 'Industry',
			href: '/industry'
		},
		{
			title: 'Watch',
			href: '/watch'
		},
		{
			title: 'Read',
			href: '/read'
		},
		{
			title: 'Help',
			href: '/help'
		}
	];

	return (
		<NavigationWrapper>
			<a className="logo" href="/#top">MyAnimeList.net</a>
			<NavigationList>
        {navigationItems.map((item) => (
          <a key={item.title} href={item.href}>{item.title}</a>
        ))}
			</NavigationList>
			<img src="img/search-icon.png" className="search" alt="Search" />
		</NavigationWrapper>
	);
}

export default Navigation;
