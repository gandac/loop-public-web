import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { getDatabase, getBlocks, getPageFromSlug } from '../../../lib/notion';
import Text from '../../../components/text';
import { renderBlock } from '../../../components/notion/renderer';
import styles from '../../../styles/post.module.css';

type LoopLineParamProperties = { id: string; properties?: { Slug?: { formula?: { string: string } } } }

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const database = await getDatabase();
  return database?.map((page: LoopLineParamProperties) => {
    const slug: string | undefined = page.properties?.Slug?.formula?.string;
    return { id: page.id, slug };
  });
}

export const revalidate = 0; // revalidate the data at most every hour

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPageFromSlug(params?.slug);
  const blocks = await getBlocks(page?.id);

  if (!page || !blocks) {
    return <div />;
  }

  return (
    <div>
      <Head>
        <title>{page.properties.Title.type === "title" && page.properties.Title?.title[0].plain_text}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className={styles.container}>
        <h1 className={styles.name}>
          {page.properties.Title.type === "title" && (<Text title={page.properties.Title?.title} />)}
        </h1>
        <section>
          {blocks.map((block) => (
            <Fragment key={block?.id}>{block?.id && renderBlock(block)}</Fragment>
          ))}
          <Link href="/" className={styles.back}>
            ← Go home
          </Link>
        </section>
      </article>
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
