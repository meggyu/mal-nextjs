export const getAnimeById = (id, fields) => {
  let url = `https://api.myanimelist.net/v2/anime/${id}`;

  if (fields && fields.length > 0) {
    url = `https://api.myanimelist.net/v2/anime/${id}?fields=`
    for (let i = 0; i < fields.length; i++) {
      if (i < fields.length - 1) {
        url += `${fields[i]},`;
      } else {
        url += fields[i];
      }
    }
    return url;
  }
  return url;
};

export const getAnimeBySeason = (year, season, limit, fields) => {
  let url = `https://api.myanimelist.net/v2/anime/season/${year}/${season}?limit=${limit}&sort=anime_num_list_users&offset=2`;

  if (fields && fields.length > 0) {
    url = `https://api.myanimelist.net/v2/anime/season/${year}/${season}?limit=${limit}&fields=`
    for (let i = 0; i < fields.length; i++) {
      if (i < fields.length - 1) {
        url += `${fields[i]},`;
      } else {
        url += fields[i];
      }
    }
    return url;
  }
  return url;
}

export const getAnimeUrlByRanking = (rankingType, limit, fields) => {
  let url = `https://api.myanimelist.net/v2/anime/ranking?ranking_type=${rankingType}&limit=${limit}`;
  
  if (fields && fields.length > 0) {
    url = `https://api.myanimelist.net/v2/anime/ranking?ranking_type=${rankingType}&limit=${limit}&fields=`
    for (let i = 0; i < fields.length; i++) {
      if (i < fields.length - 1) {
        url += `${fields[i]},`;
      } else {
        url += fields[i];
      }
    }
    return url;
  }
  return url;
};

export const baseMangaUrl = 'https://api.myanimelist.net/v2/manga/';

export const getForumsByBoardId = (boardId, offset, limit) => {
  const url = `https://api.myanimelist.net/v2/forum/topics?board_id=${boardId}&offset=${offset}&limit=${limit}&sort=recent`;
  return url;
}

export const getArticleById = (id) => {
  return `https://api.myanimelist.net/v2/forum/topic/${id}`;
}
