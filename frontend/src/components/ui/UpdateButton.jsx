import React from 'react';

const UpdateButton = ({handleEdit}) => {
  return (
    <label className onClick={handleEdit}>
      <input type="checkbox" defaultChecked className="peer hidden" />
      <div className="group flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-gray-950 fill-none p-2 px-3 font-extrabold text-gray-950 transition-all active:scale-90 peer-checked:fill-gray-950 peer-checked:hover:text-white">
        <div className="z-10 transition group-hover:translate-x-4">Update</div>
        <svg className="size-6 transition group-hover:-translate-x-6 scale-[0%] group-hover:-translate-y-3 group-hover:scale-[970%] duration-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
        </svg>
      </div>
    </label>
  );
}

export default UpdateButton;
