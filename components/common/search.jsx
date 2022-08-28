import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  img.searchIcon {
    filter: invert(1);
    width: 25px;
    height: 25px;
    opacity: 1;

    &.hide {
      opacity: 0;
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

const SearchBar = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 0;
  opacity: 0;
  display: flex;
  align-items: center;
  transition: all 0.5s ease-in-out;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 30px;
  color: white;

  &.active {
    width: 20%;
    opacity: 1;
  }

  input {
    width: 100%;
    padding: 15px 20px;
    border-radius: 10px;
    background: transparent;
    border: 2px solid white;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 20px;
    font-weight: bold;
    color: white;
  }

  img.closeIcon {
    position: absolute;
    right: 15px;
    width: 25px;
    height: 25px;
    filter: invert(1);

    &:hover {
      cursor: pointer;
    }
  }
`;

const Search = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState(null);

  const getSearchText = (event) => {
    setSearchText(event.target.value);
    console.log(searchText);
  }

  return (
    <SearchWrapper>
      <img
        src="https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-glyph-1/32/-_Magnifier-Search-Zoom--256.png"
        alt="Search"
        className={`searchIcon ${isSearchActive ? 'hide' : ''}`}
        onClick={() => setIsSearchActive(!isSearchActive)}
      />
      <SearchBar className={`searchbar ${isSearchActive ? 'active' : ''}`}>
        <input
          type="text"
          id="searchbar"
          name="search"
          placeholder="Search..."
          onChange={getSearchText}
        />
        <img 
          src="https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Close-128.png"
          alt="Close"
          className="closeIcon"
          onClick={() => setIsSearchActive(!isSearchActive)}
        />
      </SearchBar>
    </SearchWrapper>
  );

};

export default Search;
