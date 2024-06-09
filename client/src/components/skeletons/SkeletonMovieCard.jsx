import React from 'react';

const SkeletonMovieCard = () => (
  <div className="card card-side bg-base-100 shadow-xl animate-pulse ">
    <figure className="w-full max-w-[200px]">
      <div className="w-full h-60 bg-gray-300"></div>
    </figure>
    <div className="card-body">
      <div className="card-title flex items-center justify-between">
        <div className="h-6 bg-gray-300 w-2/3"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-300 w-8"></div>
          <div className="h-6 bg-gray-300 w-8"></div>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className="h-6 bg-gray-300 w-1/3"></div>
        <div className="h-6 bg-gray-300 w-1/3"></div>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className="h-6 bg-gray-300 w-1/2"></div>
        <div className="h-6 bg-gray-300 w-1/3"></div>
      </div>
      <div className="h-6 bg-gray-300 w-5/6"></div>
      <div className="h-6 bg-gray-300 w-2/3"></div>
      <div className="card-actions justify-end mt-2">
        <div className="h-10 bg-gray-300 w-24"></div>
      </div>
    </div>
  </div>
);

export default SkeletonMovieCard;
