import React, { useState } from "react";
import { Header } from "@/layouts/Header";
import { GetServerSidePropsContext } from "next";
import { NAVLINK } from "@/constants/Index";
import { News } from "@/components/Home/News";
import LoadingBar from "react-top-loading-bar";

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
  const { pathName } = context?.query;
  const path = NAVLINK.find(({ path }) => path === pathName)?.path;

  if (!path) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      path,
    },
  };
}
