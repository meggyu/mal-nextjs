import React, {
	useState,
	useEffect
} from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Search from './common/search';

const NavigationWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
  position: fixed;
	max-width: 100vw;
	z-index: 3;
	padding: 15px 30px;
	top: 0;
	left: 0;
	right: 0;
	background: #252525;
	transition: background 0.5s ease-in-out;

	&.sticky {
		background: #ffffff;
		
		a {
			color: #252525;
		}

		a:hover {
			border-bottom: 2px solid #2e51a2;
		}
	}

	.logo {
		font-weight: bold;
		font-size: 20px;
	}

	a {
		transition: border-bottom 0.2s;
	}

	a:hover {
		text-decoration: none;
		border-bottom: 2px solid #2e51a2;
	}

	img.search:hover {
		cursor: pointer;
	}

	@media screen and (max-width: 1080px) {
		display: none;
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

const MobileNavigationWrapper = styled.div`
	display: block;
	position: fixed;
	width: 100%;
	top: 0;

	@media screen and (min-width: 1080px) {
		display: none;
	}

	.logo {
		font-weight: bold;
		font-size: 18px;
	}
`

const Navbar = styled.div`
	width: 100%;
	height: 56px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #000000;
	padding: 0 20px;

	.hamburgerMenu {
		font-size: 18px;
		font-weight: bold;
	}
`;

const SlideoutMenu = styled.div`
	position: absolute;
	z-index: 2;
	top: 0;
	right: -500px;
	width: 100%;
	height: 100vh;
	background-color: #000000;
	transition: right 0.5s ease-in-out;

	&.active {
		right: 0;
	}

	.list {
		padding: 56px 20px 0 20px;
		font-size: 20px;

		div {
			margin-bottom: 20px;
		}
	}
`

const Navigation = () => {

	useEffect(() => {
		window.addEventListener('scroll', () => {
			const navigation = document.getElementById('navigation');
			if (navigation && document.documentElement.scrollTop > 50) {
				navigation.classList.add('sticky');
			} else if (document.documentElement.scrollTop < 50) {
				navigation.classList.remove('sticky');
			}
		})
	}, []);

	const [isNavOpen, setIsNavOpen] = useState("");

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
		<>
			<NavigationWrapper id="navigation">
				<div className="logo"><Link className="navLink" href="/">MyAnimeList.net</Link></div>
				<NavigationList>
					{navigationItems.map((item) => (
						<div key={item.title}>
							{item.external ?
								<a
									className="navLink"
									href={item.href}
									target={item.external ? '_blank' : ''}
									rel="noreferrer"
								>{item.title}</a>
								:
								<Link className="navLink" href={item.href}>{item.title}</Link>
							}
						</div>
					))}
				</NavigationList>
				<Search />
			</NavigationWrapper>

			<MobileNavigationWrapper>
				<Navbar>
					<div className="logo"><Link className="navLink" href="/#top">MyAnimeList.net</Link></div>
					<div className="hamburgerMenu" onClick={() => setIsNavOpen("active")}>≡</div>
				</Navbar>
				<SlideoutMenu className={isNavOpen}>
					<Navbar>
						<div className="logo"><Link className="navLink" href="/#top">MyAnimeList.net</Link></div>
						<div className="hamburgerMenu" onClick={() => setIsNavOpen("")}>X</div>
					</Navbar>

					<div className="list">
						{navigationItems.map((item) => (
								<div key={item.title}>
									{item.external ?
										<a
											className="navLink"
											href={item.href}
											target={item.external ? '_blank' : ''}
											rel="noreferrer"
										>{item.title}</a>
										:
										<Link className="navLink" href={item.href}>{item.title}</Link>
									}
								</div>
							))}
					</div>
				</SlideoutMenu>
			</MobileNavigationWrapper>
		</>
	);
}

export default Navigation;
