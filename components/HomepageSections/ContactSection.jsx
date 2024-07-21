import { Fragment } from 'react';

import { renderBlock } from '../notion/renderer';
import { getBlocks } from '../../lib/notion';
import { SubscribeToNewsletter } from '../SubscribeToNewsletter/SubscribeToNewsletter';

export default async function ContactSectionHome({ headline, description, pageId }) {
  const headlineBlock = renderBlock(headline);
  const descriptionBlock = renderBlock(description);

  const contactBlocks = await getBlocks(pageId);

  return (
    <section className="py-20">
      <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
        {headlineBlock}
      </h1>
      <div className="text-lg font-normal text-gray-500 lg:text-xl  mb-1 whitespace-pre-wrap mb-2">
        {descriptionBlock}
      </div>

      {contactBlocks.map((block) => (
        <Fragment key={block.id}>{renderBlock(block)}</Fragment>
      ))}

      <SubscribeToNewsletter />
    </section>
  );
}
