import React, { useEffect, useState } from "react";
import { Container } from "@/layouts/Container";
import NewsCard from "../Card/NewsCard";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { OvalLoader } from "../Loader/Oval";

interface INews {
  path?: string;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const PAGESIZE = 12;

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
    let url = "";

    if (category) {
      url = `${process.env.NEXT_PUBLIC_NEWS_API_URL}v2/everything?q=${category}&pageSize=${PAGESIZE}&page=${page}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_NEWS_API_URL}v2/everything?q=internation&pageSize=${PAGESIZE}&page=${page}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
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
        console.log("Error", error);
      })
      .finally(() => {
        setLoading(false);
        setProgress(100);
      });
  };

  const fetchNews = () => {
    let url = "";

    if (path) {
      url = `${process.env.NEXT_PUBLIC_NEWS_API_URL}v2/everything?q=${path}&pageSize=${PAGESIZE}&page=${page}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_NEWS_API_URL}v2/everything?q=internation&pageSize=${PAGESIZE}&page=${page}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
    }

    axios
      .get(url)
      .then((response) => {
        if (response?.data?.articles?.length) {
          setNewsList([...newsList, ...response?.data?.articles]);
          setTotalResults(response?.data?.totalResults);
          setPage(page + 1);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      })
      .finally(() => {});
  };

  useEffect(() => {
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
              newsList?.map((item, index) => (
                <NewsCard key={index} {...item} />
              ))}
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
