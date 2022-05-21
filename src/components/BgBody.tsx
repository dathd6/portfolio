import React from "react";

type BgBodyProps = {};

const BgBody: React.FC<BgBodyProps> = ({}) => {
  return (
    <div className="body-bg">
      <div className="-default"></div>
      <div className="-mario"></div>
      <div className="-admin"></div>
      <div className="-confianca"></div>
      <div className="-desbravando"></div>
    </div>
  );
};

export default BgBody;
