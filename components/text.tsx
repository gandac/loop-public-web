import { string, bool } from 'prop-types';
import styles from '../styles/post.module.css';
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

export function getTextContent({ title }: { title: Array<RichTextItemResponse> }) {
  if (!title) {
    return null;
  }
  return title.reduce((result, value, index) => `${result}${index !== 0 ? ' ' : ''}${value.plain_text}`, '');
}

/*
 * @typedef {object} Props
 * @property {string} title - Text title.
 * @property {boolean?} isRichText - whether is RichText element.
 *
 */

/* @type {React.FC<Props>} */
function Text({ title }: { title: Array<RichTextItemResponse> }) {
  if (!title) {
    return null;
  }
  return title.map((value, index) => {
    if (value.type === "text") {
      const {
        annotations: {
          bold, code, color, italic, strikethrough, underline
        },
        text
      } = value;
      return (
        <span
          className={[
            bold ? styles.bold : '',
            code ? styles.code : '',
            italic ? styles.italic : '',
            strikethrough ? styles.strikethrough : '',
            underline ? styles.underline : ''
          ].join(' ')}
          style={color !== 'default' ? { color } : {}}
          key={`${text.content}${index}`}
        >
          {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
        </span>
      );
    }
  });

}

Text.propTypes = {
  title: string.isRequired,
  isRichText: bool
};

Text.defaultProps = {
  isRichText: false
};

export default Text;
