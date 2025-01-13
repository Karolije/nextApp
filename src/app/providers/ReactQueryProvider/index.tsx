import React from 'react';
import { FC, ReactNode } from 'react';
import { ReactQueryProvider } from './ReactQueryProvider';

export type ProvidersProps = {
  children: ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export { Providers };
