import React from "react";

const Skeleton = () => {
  return (
    <div
      className="relative flex justify-between flex-wrap w-[300px] h-[100px] bg-gray-600/50 rounded-lg isolate
    overflow-hidden
    shadow-xl shadow-black/5
    before:border-t before:border-rose-100/10"
    >
      <div
        className="absolute w-[300px] h-[100px] bg-gradient-to-r from-transparent via-gray-300/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite] before:absolute before:inset-0
    before:-translate-x-full
    before:animate-[shimmer_2s_infinite]
    before:bg-gradient-to-r
    before:from-transparent before:via-rose-100/10 before:to-transparent"
      ></div>

      <div className="w-[150px] h-[15px] bg-gray-400/30 rounded-lg mt-4 -ml-8"></div>
      <div className="w-[50px] h-[15px] bg-gray-400/30 rounded-lg mt-4 mr-4 ml-4"></div>
      <div className="absolute w-[80px] h-[15px] bg-gray-400/30 rounded-lg top-12 left-4"></div>
      <div className="absolute w-[60px] h-[15px] bg-gray-400/30 rounded-lg bottom-4 right-4"></div>
    </div>
  );
};

export default Skeleton;
