import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  type BulletedListItemBlockObjectResponse,
  type NumberedListItemBlockObjectResponse,
  type TextRichTextItemResponse,
  type RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints';

import { CustomBlockObjectResponse } from '../../lib/notion';
import Database from '../Database/Database';
import Text from '../text';
import styles from '../../styles/post.module.css';

export function renderBlock(block: CustomBlockObjectResponse | { type: 'rich_text'; rich_text: RichTextItemResponse[], id: string }) {
  const { type, id } = block;
  switch (type) {
    case 'paragraph':
      return (
        <p>
          <Text title={block[type].rich_text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1>
          <Text title={block[type].rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2>
          <Text title={block[type].rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3>
          <Text title={block[type].rich_text} />
        </h3>
      );
    case 'bulleted_list': {
      return <ul>{block[type].children.map((child: CustomBlockObjectResponse) => renderBlock(child))}</ul>;
    }
    case 'numbered_list': {
      return <ol>{block[type].children.map((child: CustomBlockObjectResponse) => renderBlock(child))}</ol>;
    }
    case 'bulleted_list_item':
      return (
        <li key={block.id}>
          <Text title={block[type].rich_text} />
          {block.has_children && renderNestedList(block)}
        </li>
      );
    case 'numbered_list_item':
      return (
        <li key={block.id}>
          <Text title={block[type].rich_text} />
          {/* eslint-disable-next-line no-use-before-define */}
          {block.has_children && renderNestedList(block)}
        </li>
      );
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={block[type].checked} />{' '}
            <Text title={block[type].rich_text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            <Text title={block[type].rich_text} />
          </summary>
          {/* @ts-expect-error: children exists */}
          {block.children?.map((child: CustomBlockObjectResponse) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return (
        <div className={styles.childPage}>
          <strong>{block[type]?.title}</strong>
          {/* @ts-expect-error: children exists */}
          {block.child_page?.children?.map((child: CustomBlockObjectResponse) => renderBlock(child))}
        </div>
      );
    case 'image': {
      const src = block[type].type === 'external' ? block[type].external.url : block[type].file.url;
      const caption = block[type].caption ? block[type].caption[0]?.plain_text : '';
      return (
        <figure>
          <Image src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    }
    case 'divider':
      return <hr key={id} />;
    case 'quote':
      return <blockquote key={id}>{block[type].rich_text[0].plain_text}</blockquote>;
    case 'code':
      return (
        <pre className={styles.pre}>
          <code className={styles.code_block} key={id}>
            {block[type].rich_text[0].plain_text}
          </code>
        </pre>
      );
    case 'file': {
      const srcFile = block[type].type === 'external' ? block[type].external.url : block[type].file.url;
      const splitSourceArray = srcFile.split('/');
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const captionFile = block[type].caption ? block[type].caption[0]?.plain_text : '';
      return (
        <figure>
          <div className={styles.file}>
            📎{' '}
            <Link href={srcFile} passHref>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {captionFile && <figcaption>{captionFile}</figcaption>}
        </figure>
      );
    }
    case 'bookmark': {
      const href = block[type].url;
      return (
        <a href={href} target="_blank" rel="noreferrer noopener" className={styles.bookmark}>
          {href}
        </a>
      );
    }
    case 'table': {
      return (
        <table className={styles.table}>
          <tbody>
            {/* @ts-expect-error: children exists */}
            {block.children?.map((child, index: number) => {
              const RowElement = block[type].has_column_header && index === 0 ? 'th' : 'td';
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell: TextRichTextItemResponse, i: number) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <RowElement key={`${cell.plain_text}-${i}`}>
                      {/* @ts-expect-error: TODO see what is going on here */}
                      <Text title={cell} />
                    </RowElement>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case 'column_list': {
      return (
        <div className={styles.row}>
          {/* @ts-expect-error: children exists */}
          {block.has_children && block.children.map((childBlock) => renderBlock(childBlock))}
        </div>
      );
    }
    case 'column': {
      // @ts-expect-error: children exists
      return <div>{block.has_children && block.children.map((child) => renderBlock(child))}</div>;
    }
    case 'rich_text': {
      return (
        <div>
          <Text title={block[type]} />
        </div>
      );
    }
    case 'child_database': {
      return (
        <div>
          <Database block={block} value={block[type]} />
        </div>
      );
    }
    default:
      return `❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`;
  }
}

export function renderNestedList(blocks: BulletedListItemBlockObjectResponse | NumberedListItemBlockObjectResponse) {
  const { type } = blocks;

  const isNumberedList = type === 'numbered_list_item';

  if (isNumberedList) {
    // @ts-expect-error: children exists
    return <ol>{blocks.numbered_list_item.children.map((block: CustomBlockObjectResponse) => renderBlock(block))}</ol>;
  }
  // @ts-expect-error: children exists
  return <ul>{blocks.bulleted_list_item.children.map((block: CustomBlockObjectResponse) => renderBlock(block))}</ul>;
}
