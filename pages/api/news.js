import axios from "axios";
import { getForumsByBoardId, getArticleById } from "../../helpers/apiUrls";

export default async function getNews(req, res) {
  const newsUrl = getForumsByBoardId(15, 1, 3);
  const result = await axios
    .get(newsUrl, {
      headers: {
        'X-MAL-CLIENT-ID': 'e348f8ee5084215dcced2fd6ba8fb012'
      }
    })
    .then(({ data }) => {
			return data;
		})
		.catch(({ err }) => {
			return err;
		});
  
  const newsIds = [];

  result.data.forEach(element => {
		newsIds.push(element.id);
	});

  const articlesArray = Promise.all(newsIds.map(id => {
    const articleUrl = getArticleById(id);
    
    return axios
      .get(articleUrl, {
        headers: { 'X-MAL-CLIENT-ID': 'e348f8ee5084215dcced2fd6ba8fb012' }
      })
      .then(({ data }) => {
        return data;

      })
      .catch(({ err }) => {
        return err;
      });
  }));

  res.status(200).json(await articlesArray);

  return await articlesArray;
}
