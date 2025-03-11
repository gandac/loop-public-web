import { Client, isFullPage, isFullBlock } from '@notionhq/client';
import { type BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { cache } from 'react';

export const revalidate = 0; // revalidate the data at most every hour
export const dynamic = 'force-dynamic';

const databaseId = process.env.NOTION_DATABASE_ID || '';

export interface BulletedListBlockObjectResponse {
  id: string;
  type: 'bulleted_list';
  bulleted_list: { children: BlockObjectResponse[] };
}

// interface NumberListBlockObjectResponse extends Omit<NumberedListItemBlockObjectResponse, 'type'> {
//   type: 'numbered_list';
//   numbered_list: { children: BlockObjectResponse[] };
// }
export interface NumberListBlockObjectResponse {
  id: string;
  type: 'numbered_list';
  numbered_list: { children: BlockObjectResponse[] };
}

export type CustomBlockObjectResponse =
  | BlockObjectResponse
  | BulletedListBlockObjectResponse
  | NumberListBlockObjectResponse;

/**
 * Returns a random integer between the specified values, inclusive.
 * The value is no lower than `min`, and is less than or equal to `max`.
 *
 * @param {number} minimum - The smallest integer value that can be returned, inclusive.
 * @param {number} maximum - The largest integer value that can be returned, inclusive.
 * @returns {number} - A random integer between `min` and `max`, inclusive.
 */
function getRandomInt(minimum: number, maximum: number): number {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const notion = new Client({
  auth: process.env.NOTION_TOKEN
});

export const getChildDatabase = cache(async (database_id: string) => {
  const response = await notion.databases.query({
    database_id,
    sorts: [
      {
        property: 'order',
        direction: 'ascending'
      }
    ]
  });

  return response.results;
});

export const getDatabase = cache(async () => {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'order',
        direction: 'ascending'
      }
    ]
  });
  // if(isFullDatabase(response)){

  // }
  return response.results;
});

export const getPage = cache(async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
});

export const getPageFromPageId = cache(async (pageId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'pageId',
      formula: {
        string: {
          equals: pageId
        }
      }
    }
  });
  if (isFullPage(response.results[0])) {
    return response.results[0];
  }
});

export const getPageFromSlug = cache(async (slug: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Slug',
      formula: {
        string: {
          equals: slug
        }
      }
    }
  });

  if (isFullPage(response.results[0])) {
    return response.results[0];
  }
});

export const getBlocks = cache(
  async (blockID: string | undefined): Promise<(CustomBlockObjectResponse | undefined)[]> => {
    const blockId = blockID?.replaceAll('-', '') || '';

    const { results } = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100
    });

    // Fetches all child blocks recursively
    // be mindful of rate limits if you have large amounts of nested blocks
    // See https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
    const childBlocks = results.map(async (block) => {
      if (isFullBlock(block)) {
        if (block.has_children) {
          const children = await getBlocks(block.id);

          return { ...block, children };
        }
        return block;
      }
    });

    return Promise.all(childBlocks).then((blocks) =>
      blocks.reduce((acc: (CustomBlockObjectResponse | undefined)[], curr) => {
        const lastElement = acc[acc.length - 1];

        if (curr?.type === 'bulleted_list_item') {
          if (lastElement?.type === 'bulleted_list') {
            console.log(lastElement);
            lastElement[lastElement.type]?.children?.push(curr);
          } else {
            acc.push({
              id: getRandomInt(10 ** 99, 10 ** 100).toString(),
              type: 'bulleted_list',
              bulleted_list: { children: [curr] }
            });
          }
        } else if (curr?.type === 'numbered_list_item') {
          if (lastElement?.type === 'numbered_list') {
            lastElement[lastElement.type]?.children?.push(curr);
          } else {
            acc.push({
              id: getRandomInt(10 ** 99, 10 ** 100).toString(),
              type: 'numbered_list',
              numbered_list: { children: [curr] }
            });
          }
        } else {
          acc.push(curr);
        }
        return acc;
      }, [])
    );
  }
);

// export const getCoverImage = cache(async (coverImg) => {
//   return null
// })
