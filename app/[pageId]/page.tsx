import { Fragment } from 'react';
// import { type PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import Link from 'next/link';
import { Header, Footer, Cover } from '../../components';

import { getDatabase, getBlocks, getPageFromSlug } from '../../lib/notion';
import { renderBlock } from '../../components/notion/renderer';
import styles from '../../styles/post.module.css';

// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams() {
// const database = await getDatabase();
// if (database.every(page => isFullPage(page))) {
//   const mapper = database?.map((page) => {
//     return { id: page.id };
//   });


//   return mapper;
// }
// }

export const revalidate = 0; // revalidate the data at most every hour
export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { pageId: string } }) {
  const page = await getPageFromSlug(params.pageId);
  const allPages = await getDatabase();
  const blocks = await getBlocks(page?.id);
  const headlineBlock = page?.properties?.headline?.type === "rich_text" && renderBlock(page?.properties?.headline);
  const isWide = page?.properties.widePage.type === "checkbox" && page?.properties.widePage[page?.properties.widePage.type];

  if (!page || !blocks || !allPages || !allPages.every(el => 'created_time' in el)) {
    return <div />;
  }

  return (
    <div>
      <Header allPages={allPages} />
      <main>
        {page.properties.Title?.type === "title" && <Cover cover={page.cover} headline={page.properties.Title.title} />}

        <div
          className={`container mx-auto px-4 text-lg mt-20 ${styles.container} page-${params?.pageId} ${isWide ? '' : ' max-w-screen-md'
            }`}
        >
          <section>
            <h2 className="mb-8 mt-10 text-4xl font-extrabold
            leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
            >
              {headlineBlock}
            </h2>
            {blocks.map((block) => (
              <Fragment key={block?.id}>{block?.id && renderBlock(block)}</Fragment>
            ))}
            <Link href="/" className={styles.back}>
              ← Go home
            </Link>
          </section>
        </div>
      </main>
      <Footer pages={allPages} />
    </div>
  );
}

// export const getStaticPaths = async () => {
//   const database = await getDatabase(databaseId);
//   return {
//     paths: database.map((page) => {
//       const slug = page.properties.Slug?.formula?.string;
//       return ({ params: { id: page.id, slug } });
//     }),
//     fallback: true,
//   };
// };

// export const getStaticProps = async (context) => {
//   const { slug } = context.params;
//   const page = await getPage(id);
//   const blocks = await getBlocks(id);

//   return {
//     props: {
//       page,
//       blocks,
//     },
//     revalidate: 1,
//   };
// };
