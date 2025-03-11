import Link from 'next/link';
import { type BlockObjectResponse, type PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { renderBlock } from '../notion/renderer';

export default function AboutSection({
  headline,
  description,
  valuesPage
}: {
  headline: BlockObjectResponse;
  description: BlockObjectResponse;
  valuesPage: PageObjectResponse | undefined;
}) {
  const headlineBlock = renderBlock(headline);
  const descriptionBlock = renderBlock(description);
  //TODO - see why we have incompatibility
  const valuesDescription = valuesPage?.properties?.description as unknown as BlockObjectResponse;
  const headlineDesc = renderBlock(valuesDescription);

  return (
    <section className="py-20">
      <h2 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        {headlineBlock}
      </h2>
      <div className="text-lg font-normal text-gray-500 lg:text-xl mb-1 whitespace-pre-wrap mb-2">
        {descriptionBlock}
        <Link href="/about" className="my-2 text-lg text-indigo-700 hover:underline">
          Read more about the team
        </Link>
      </div>

      <br />

      <div className="text-lg font-normal text-gray-500 lg:text-xl mb-1 whitespace-pre-wrap mb-2">{headlineDesc}</div>
    </section>
  );
}
