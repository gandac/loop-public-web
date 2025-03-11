import Image from 'next/image';
import Link from 'next/link';
import { type PageObjectResponse, type TextRichTextItemResponse, type ParagraphBlockObjectResponse, type RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

import { renderBlock } from '../notion/renderer';

export default function Hero({ cover, headline, description }: {
  cover: PageObjectResponse['cover'], headline: ParagraphBlockObjectResponse, description?: {
    rich_text: Array<TextRichTextItemResponse>;
  }
}) {
  let coverUrl = null;
  const headlineBlock = renderBlock(headline);
  const descriptionText = description?.rich_text?.[0]?.text?.content;

  if (!cover) return null;

  switch (cover.type) {
    case 'external':
      coverUrl = cover.external.url;
      break;
    case 'file':
      coverUrl = cover.file.url;
      break;
    default:
      coverUrl = null;
  }

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: !coverUrl ? 'indigo' : 'none',
        top: 0,
        width: '100%'
      }}
    >
      {coverUrl && (
        <Image
          src={coverUrl}
          alt="Loop line studios"
          fill
          sizes="500px"
          style={{
            objectFit: 'cover'
          }}
        />
      )}
      <section className="text-gray-100 relative text-white" style={{ textShadow: '0px 0px 7px rgba(0,0,0,0.7)' }}>
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-4xl font-bold leadi sm:text-5xl">{headlineBlock}</h1>
          <p className="px-8 mt-8 mb-12 text-lg">{descriptionText}</p>
          <div className="flex flex-wrap justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 m-2 text-lg font-semibold rounded bg-indigo-700 hover:bg-indigo-900 text-gray-50"
            >
              Get a quote
            </Link>
            <button type="button" className="px-8 py-3 m-2 text-lg border rounded text-gray-50 border-indigo-700 hover:bg-indigo-900">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
