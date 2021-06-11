import React from 'react';

export const Plus = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      fill="#a2abbd"
      viewBox="0 0 64 64"
      {...props}
    >
      <title>plus icon</title>
      <path
        d="M19.544 61.485A32.107 32.107 0 1132 64a31.883 31.883 0 01-12.456-2.515zM4 32A28 28 0 1032 4 28.031 28.031 0 004 32zm26.047 13.034V33.949H18.961a1.953 1.953 0 110-3.906h11.086V18.957a1.954 1.954 0 013.907 0v11.085h11.085a1.953 1.953 0 010 3.906H33.954v11.085a1.953 1.953 0 11-3.906 0z"
        className="a"
      ></path>
    </svg>
  );
};
