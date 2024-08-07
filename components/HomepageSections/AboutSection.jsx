import Link from 'next/link';
import { renderBlock } from '../notion/renderer';

export default function AboutSection({ headline, description, valuesPage }) {
  const headlineBlock = renderBlock(headline);
  const descriptionBlock = renderBlock(description);
  const headlineDesc = renderBlock(valuesPage?.properties?.description);

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
