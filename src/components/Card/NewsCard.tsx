import React from 'react';

const NOIMAGE =
  'https://asiapulppaper.com/documents/20123/37290/asia-pulp-paper-e-paper-logo-box.jpg';

interface INewsCard {
  title?: string;
  author?: string;
  description?: string;
  urlToImage?: string;
  publishedAt?: string;
  content?: string;
  url?: string;
}

const NewsCard = ({
  author,
  description,
  publishedAt,
  title,
  urlToImage,
  url,
}: INewsCard) => {
  return (
    <div className="h-full rounded-lg bg-white shadow-2xl">
      <div>
        <img
          src={urlToImage || NOIMAGE}
          alt=""
          className="h-full max-h-52 rounded-t-lg"
        />
      </div>
      <div className="flex flex-col gap-3 px-5 py-3">
        <div>
          <h4 className="font-Inter text-base font-medium leading-5 text-black">
            {title}
          </h4>
          <p className="mt-1 font-Inter text-sm font-normal leading-4 text-black opacity-80 line-clamp-3">
            {description}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium leading-5 text-black/90">
            Published At: {publishedAt}
          </p>
          <p className="text-sm font-medium leading-5 text-black/90">
            Author: {author}
          </p>
          {url && (
            <div className="flex items-center justify-end">
              <a
                href={url}
                target="_blank"
                className="block rounded-lg bg-purple-400 px-3 py-1 text-right text-sm font-medium leading-5 text-white"
              >
                Read more
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
