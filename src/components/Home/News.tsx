import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsCard from '../Card/NewsCard';
import { OvalLoader } from '../Loader/Oval';
import { Container } from '../../layouts/Container';

interface INews {
  path?: string;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

// const PAGESIZE = 12;

const News = ({ path, setProgress }: INews) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [newsList, setNewsList] = useState<
    {
      title?: string;
      author?: string;
      description?: string;
      urlToImage?: string;
      publishedAt?: string;
      content?: string;
    }[]
  >([]);

  const handleNews = (category?: string) => {
    setLoading(true);
    setProgress(10);
    let url = '';

    if (category) {
      url = `/api/news?q=${category}&page=${page}`;
    } else {
      url = `/api/news?q=internation&page=${page}`;
    }

    setProgress(20);

    axios
      .get(url)
      .then((response) => {
        setProgress(50);
        if (response?.data?.articles?.length) {
          setNewsList(response?.data?.articles);
          setTotalResults(response?.data?.totalResults);
          setPage(page + 1);
          setProgress(80);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      })
      .finally(() => {
        setLoading(false);
        setProgress(100);
      });
  };

  const fetchNews = () => {
    let url = '';

    if (path) {
      url = `/api/news?q=${path}&page=${page}`;
    } else {
      url = `/api/news?q=internation&page=${page}`;
    }

    axios
      .get(url)
      .then((response) => {
        if (response?.data?.articles?.length) {
          const data = newsList.concat(response?.data?.articles);
          setNewsList(data);
          setTotalResults(response?.data?.totalResults);
          setPage(page + 1);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    setNewsList([]);
    handleNews(path);
  }, [path]);

  return (
    <Container>
      <InfiniteScroll
        dataLength={newsList.length}
        next={fetchNews}
        hasMore={newsList.length !== totalResults}
        loader={
          <div className="flex w-full items-center justify-center">
            <OvalLoader />
          </div>
        }
      >
        {!loading && (
          <div className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {newsList &&
              newsList.length > 0 &&
              newsList?.map(
                (
                  {
                    author,
                    content,
                    description,
                    publishedAt,
                    title,
                    urlToImage,
                  },
                  index
                ) => (
                  <NewsCard
                    key={index}
                    author={author}
                    content={content}
                    description={description}
                    publishedAt={publishedAt}
                    title={title}
                    urlToImage={urlToImage}
                  />
                )
              )}
          </div>
        )}

        {loading && (
          <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center">
            <OvalLoader />
          </div>
        )}
      </InfiniteScroll>
    </Container>
  );
};

export { News };
