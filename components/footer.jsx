import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 50px;
  padding: 30px;
  background-color: #2e51a2;
  text-align: center;
  font-size: 14px;

  .footerLinks {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (min-width: 1080px) {
      flex-direction: row;
    }

    a {
      margin: 0 10px;
    }
  }
`;

const Footer = () => {
  const footerLinks = [
    {
      title: 'Home',
      href: 'https://myanimelist.net/',
      external: true
    },
    {
      title: 'About',
      href: 'https://myanimelist.net/about.php',
      external: true
    },
    {
      title: 'Press Room',
      href: 'https://myanimelist.net/pressroom',
      external: true
    },
    {
      title: 'Support',
      href: 'https://myanimelist.net/about.php?go=contact',
      external: true
    },
    {
      title: 'Advertising',
      href: 'https://myanimelist.net/advertising',
      external: true
    },
    {
      title: 'FAQ',
      href: 'https://myanimelist.net/forum/?topicid=515949',
      external: true
    },
    {
      title: 'Terms',
      href: 'https://myanimelist.net/about/terms_of_use',
      external: true
    },
    {
      title: 'Privacy',
      href: 'https://myanimelist.net/about/privacy_policy',
      external: true
    },
    {
      title: 'Cookies',
      href: 'https://myanimelist.net/about/cookie_policy',
      external: true
    },
    {
      title: 'Notice at Collection',
      href: 'https://myanimelist.net/about/notice_at_collection',
      external: true
    },
    {
      title: 'Sitemap',
      href: 'https://myanimelist.net/about/sitemap',
      external: true
    }
  ];

  return (
    <FooterWrapper>
      <div className="footerLinks">
        {footerLinks.map(item => (
          <a 
            key={item.title}
            href={item.href}
            target={item.external ? '_blank' : ''}
            rel="noreferrer"
          >
            {item.title}
          </a>
        ))}
      </div>
      <div className="copyright">
        <b>MyAnimeList.net is a property of MyAnimeList Co.,Ltd. ©2022 All Rights Reserved.</b><br />
        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
      </div>
    </FooterWrapper>
  );
}

export default Footer;
