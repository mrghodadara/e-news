import type { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { Header } from '../layouts/Header';
import { NAVLINK } from '../constants/Index';
import { News } from '../components/Home/News';

const Index = ({ path }: { path: string }) => {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <LoadingBar height={2} color="#000" progress={progress} />
      <Header />
      <News path={path} setProgress={setProgress} />
    </div>
  );
};

export default Index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pathName = context?.query?.pathName;
  const getPath = NAVLINK.find(({ path }) => path === pathName)?.path;

  if (!getPath) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      path: getPath,
    },
  };
}
