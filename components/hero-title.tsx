import React from "react";

export const HeroTitle: React.FC<{ className: string }> = ({ className }) => {
  return <h1 className={`${className} animate-title`}>Barmanji</h1>;
};