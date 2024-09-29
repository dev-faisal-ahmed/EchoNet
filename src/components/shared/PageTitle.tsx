'use client';

import { PropsWithChildren, useEffect } from 'react';

interface PageTitleProps extends PropsWithChildren {
  title: string;
}

export function PageTitle({ title, children }: PageTitleProps) {
  useEffect(() => {
    document.title = `EchoNet | ${title}`;
  }, [title]);

  return children;
}
