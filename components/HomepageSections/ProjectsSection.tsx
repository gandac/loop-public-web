import { Fragment } from 'react';
import { renderBlock } from '../notion/renderer';
import { getBlocks } from '../../lib/notion';
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export default async function ProjectsSection({ headline, description, page }: { headline: BlockObjectResponse, description: BlockObjectResponse, page: PageObjectResponse }) {
  const headlineBlock = renderBlock(headline);
  const descriptionBlock = renderBlock(description);
  const servicesBlocks = await getBlocks(page?.id);

  return (
    <section className="py-20">
      <div className="max-w-screen-md mx-auto ">
        <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          {headlineBlock}
        </h1>

        <div className="text-lg font-normal text-gray-500 lg:text-xl mb-1 whitespace-pre-wrap mb-2">
          {descriptionBlock}
        </div>
      </div>
      {servicesBlocks.map((block) => {
        if (block?.id) {
          return (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          )
        }
      })}
    </section>
  );
}
