import React from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';

interface Card {
  id:string,
    authorName: string;
    title: string;
    content: string;
    date: string;
}

const BlogCard = ({ authorName, title, content, date ,id }: Card) => {
  return (
    <Link to={`/blog/${id}`}> 
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
      <div className="p-6">
        
        {/* Title of the Blog Card */}
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
          {title}
        </h1>

        <div className="flex items-center space-x-3 mb-3">
         <Avatar name={authorName}/>
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700 dark:text-gray-400">{authorName}</span> · {date}
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            {content.length > 100 ? content.slice(0, 100) + "..." : content}
          </p>
        </div>

        <div className="mt-4">
          <button className="text-indigo-500 hover:text-indigo-700 font-semibold">
            Read more
          </button>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default BlogCard;
