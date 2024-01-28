import React from 'react';
import { renderBlock } from '../notion/renderer';

export default function AboutSection({ headline, description }) {
  const headlineBlock = renderBlock(headline);
  const descriptionBlock = renderBlock(description);

  return (
    <section className="py-20">
      <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {headlineBlock}
      </h1>
      <div className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-1 whitespace-pre-wrap mb-2">
        {descriptionBlock}
      </div>

      <p className="text-left">
        <button className="my-2 text-lg text-indigo-700 hover:underline">Read more</button>
      </p>
    </section>
  );
}
