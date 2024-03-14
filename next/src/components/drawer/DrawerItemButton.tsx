import clsx from "clsx";
import React from "react";

interface DrawerItemProps {
  text: string;
  className?: string;
  onClick?: () => Promise<void> | void;
}

export const DrawerItemButton = (props: DrawerItemProps) => {
  const { text, onClick } = props;

  return (
    <>
      <div
        className="w-full cursor-pointer rounded-lg border-2 border-slate-7 bg-slate-1 p-4 text-sm text-slate-12 opacity-90 shadow-depth-2 transition-all duration-300 hover:bg-slate-3 sm:text-base"
        onClick={onClick}
      >
        <p className="text-lg font-bold">ViettripGPT 🌴</p>
        <span className="line-clamp-1 text-left text-sm font-bold">{text}</span>
      </div>
    </>
  );
};

export const DrawerItemButtonLoader = () => {
  return <div className="w-50 mx-1.5 h-7 animate-pulse rounded-md bg-slate-6"></div>;
};
