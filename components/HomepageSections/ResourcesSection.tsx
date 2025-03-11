import { Fragment } from 'react';
import { type BlockObjectResponse, type PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { renderBlock } from '../notion/renderer';
import { getBlocks } from '../../lib/notion';

export default async function ResourcesSection({ headline, description, page }: { headline: BlockObjectResponse, description: BlockObjectResponse, page: PageObjectResponse }) {
  const headlineBlock = renderBlock(headline);
  const descriptionBlock = renderBlock(description);
  const servicesBlocks = await getBlocks(page?.id);

  return (
    <section className="py-20">
      <div className="max-w-screen-md mx-auto t">
        <h1
          className="mb-8 text-4xl font-extrabold leading-none tracking-tight 
        md:text-5xl lg:text-6xl bg-gradient-to-r 
        from-green-500 via-yellow-250 to-blue-600 text-transparent bg-clip-text text-center"
        >
          {headlineBlock}
        </h1>

        <div className="grid md:grid-cols-4 gap-2 items-center sm:grid-cols-1">
          <div>
            <div className="text-lg font-normal text-gray-300 lg:text-xl  mb-1 whitespace-pre-wrap mb-2">
              {descriptionBlock}
            </div>
          </div>
          <div className="col-span-3">
            {servicesBlocks.map((block) => {
              if (block?.id) {
                return (
                  <Fragment key={block.id}>{renderBlock(block)}</Fragment>
                )
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
