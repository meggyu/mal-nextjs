import axios from "axios";
import { getForumsByBoardId } from "../../helpers/apiUrls";

export default async function getForums(req, res) {
  const forumsUrl = getForumsByBoardId(1, 3, 4);
  const forums = await axios
    .get(forumsUrl, {
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
  
  res.status(200).json(await forums);

  return await forums;
}
