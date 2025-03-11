import { type PartialPageObjectResponse, type PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import Text from '../text';

export default async function CardGallery({ title, database }: { title: string; database: (PageObjectResponse | PartialPageObjectResponse)[] }) {
  const cards = database.map((card) => (
    <div key={title} className=" max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
      <div className="text-4xl">{'icon' in card && card.icon?.type === "emoji" ? card.icon.emoji : null}</div>
      <a href="#title">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
          {'properties' in card && card.properties.Name?.type === "title" && <Text title={card.properties.Name.title} />}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-500 ">
        {'properties' in card && card.properties.Summary?.type === "rich_text" && <Text title={card.properties.Summary?.rich_text} />}
      </p>
    </div>
  ));

  return <section className="py-20 grid lg:grid-cols-3 gap-5 grid-cols-1 sm:grid-cols-2">{cards}</section>;
}
