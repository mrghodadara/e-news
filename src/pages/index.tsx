import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { News } from '../components/Home/News';
import { Header } from '../layouts/Header';

const Index = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <LoadingBar height={2} color="#000" progress={progress} />
      <Header />
      <News setProgress={setProgress} />
    </div>
  );
};

export default Index;
