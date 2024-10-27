import React from 'react';
import Avatar from './Avatar';

interface Card {
  id: string;
  authorName: string;
  title: string;
  content: string;
}

const FullBlog = ({ authorName, title, content }: Card) => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-3xl mx-auto space-y-10">
        <article className="space-y-8">
          <header className="space-y-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-black sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-gray-600">
              <div className="flex items-center space-x-3">
                {/* <img
                  src="https://source.unsplash.com/75x75/?portrait"
                  alt=""
                  className="w-10 h-10 rounded-full border border-gray-300"
                /> */}
                <Avatar name={authorName} />
                <p className="text-sm text-black">
                  {authorName} <span className="mx-2">•</span> July 19th, 2024
                </p>
              </div>
              <p className="text-sm mt-2 sm:mt-0 text-gray-500">
                4 min read <span className="mx-2">•</span> 1,570 views
              </p>
            </div>
          </header>
          
          <section className="leading-relaxed text-black text-lg sm:text-base">
            <p>{content}</p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default FullBlog;
