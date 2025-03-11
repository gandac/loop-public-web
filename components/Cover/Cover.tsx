import Image from 'next/image';
import { RichTextItemResponse, type PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import Text from '../text';

export default function Cover({ cover, headline }: { cover: PageObjectResponse['cover'], headline: Array<RichTextItemResponse> }) {
  let coverUrl = null;

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
        backgroundColor: !coverUrl ? 'indigo-200' : 'none',
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
      <section className="text-indigo-900 relative" style={{ textShadow: '0px 0px 7px rgba(255,255,255,0.7)' }}>
        <div className="container mx-auto flex flex-col items-center px-4
        py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl"
        >
          <h1 className="text-4xl font-bold leadi sm:text-5xl">
            <Text title={headline} />
          </h1>
        </div>
      </section>
    </div>
  );
}
