import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const PAGESIZE = 12;

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { q, page } = req.query;
  try {
    const url = `${process.env.NEXT_PUBLIC_NEWS_API_URL}v2/everything?q=${q}&pageSize=${PAGESIZE}&page=${page}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;

    axios
      .get(url)
      .then((response) => {
        res.send(response?.data);
      })
      .catch((error) => {
        res.status(400).send({
          data: error,
        });
      });
  } catch (error) {
    res.status(400).send({
      data: error,
    });
  }
};

export default handler;
