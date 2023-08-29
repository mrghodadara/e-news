import type { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  number?: string;
  numberHref?: string;
  logoHref?: string;
  className?: string;
};

const Main = (props: IMainProps) => {
  return (
    <div className="font-roboto w-full text-gray-700 antialiased">
      {props.meta}
      <main className="text-xl">{props.children}</main>
    </div>
  );
};

export { Main };
