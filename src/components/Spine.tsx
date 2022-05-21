import React from "react";

type SpineProps = {};

const Spine: React.FC<SpineProps> = ({}) => {
  return (
    <div>
      <div className="spine"></div>
      <div className="spine-target">
        <div className="circle"></div>
        <div className="pulse"></div>
      </div>
    </div>
  );
};

export default Spine;
