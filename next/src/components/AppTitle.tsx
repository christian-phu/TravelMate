import React from "react";

import BannerBadge from "./BannerBadge";

const AppTitle = () => {
  return (
    <div id="title" className="relative mt-16 flex flex-col items-center">
      <div className="flex flex-row items-start">
        <span
          className="text-4xl font-bold text-slate-12 xs:text-5xl sm:text-7xl"
          style={{
            textShadow: "0px 5px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          Travel Mate AI
        </span>
      </div>
      <div className="mt-5 text-center font-mono text-[0.7em] font-bold text-white">
        <div>
          <BannerBadge className="md:hidden">Plan your next adventure</BannerBadge>
        </div>
        <div className="hidden md:flex">
          <BannerBadge>
            Turn your next trip into a hassle-free experience with Travel Mate AI.
          </BannerBadge>
        </div>
      </div>
    </div>
  );
};

export default AppTitle;
