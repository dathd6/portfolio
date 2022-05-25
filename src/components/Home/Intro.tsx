import React from "react";

interface IntroProps {}

const Intro: React.FC<IntroProps> = ({}) => {
  return (
    <section className="scene-intro" id="intro">
      <div className="static-container">
        <h1 className="title">
          <span className="iuri">iuri</span>
          <span className="func">.is()</span>
        </h1>

        <div className="std">
          <p className="-purple">Iuri de Paula</p>
          <p className="-gray">
            Creative frontend developer,
            <br />
            designer, and illustrator.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Intro;
