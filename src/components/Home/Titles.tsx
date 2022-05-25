import React from "react";

interface TitlesProps {
  scene: string;
  children: React.ReactNode;
}

const Titles: React.FC<TitlesProps> = ({ scene, children }) => {
  return (
    <section className="scene" id={scene}>
      <div className="title-container">{children}</div>
    </section>
  );
};

export default Titles;
