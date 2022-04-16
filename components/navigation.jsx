import React from 'react';
import Link from 'next/link';
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

	.logo {
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
			title: 'Forums',
			href: 'https://myanimelist.net/forum/',
			external: true
		},
		{
			title: 'News',
			href: 'https://myanimelist.net/news',
			external: true
		},
		{
			title: 'Watch',
			href: 'https://myanimelist.net/watch/episode',
			external: true
		},
		{
			title: 'Read',
			href: 'https://myanimelist.net/store',
			external: true
		},
		{
			title: 'Help',
			href: 'https://myanimelist.net/about.php?go=contact',
			external: true
		}
	];

	return (
		<NavigationWrapper>
			<div className="logo"><Link href="/#top">MyAnimeList.net</Link></div>
			<NavigationList>
        {navigationItems.map((item) => (
					<div key={item.title}>
						{item.external ?
							<a
								href={item.href}
								target={item.external ? '_blank' : ''}
								rel="noreferrer"
							>{item.title}</a>
							:
							<Link href={item.href}>{item.title}</Link>
						}
					</div>
        ))}
			</NavigationList>
			<img src="img/search-icon.png" className="search" alt="Search" />
		</NavigationWrapper>
	);
}

export default Navigation;
