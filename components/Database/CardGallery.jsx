import React from 'react';
import Text from '../text';

export default async function CardGallery({ title, database }) {
  const cards = database.map((card) => (
    <div className=" max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="text-4xl">{card.icon?.emoji || null}</div>
      <a href="#">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          <Text title={card.properties?.Name?.title} />
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        <Text title={card.properties?.Summary?.rich_text} />
      </p>
    </div>
  ));

  return <section className="py-20 grid lg:grid-cols-3 gap-5 grid-cols-1 sm:grid-cols-2">{cards}</section>;
}
