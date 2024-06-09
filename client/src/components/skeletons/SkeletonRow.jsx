import React from 'react';

const SkeletonRow = () => {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12 bg-gray-200 animate-pulse" />
          </div>
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      </td>
      <td>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
      </td>
      <td>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
      </td>
      <td>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
      </td>
      <td>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-8"></div>
      </td>
    </tr>
  );
};

export default SkeletonRow;
