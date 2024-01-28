import React from 'react';
import Image from 'next/image';
import Text, { getTextContent } from '../text';
import styles from './LogoGallery.module.css';

export default async function LogoGallery({ title, database }) {
  const innerCircleImages = database
    .filter((_, index) => index < 8)
    .map((card, index) => {
      const title = getTextContent({ title: card.properties?.title?.rich_text });

      return (
        <a href="#" title={title} className={`${styles.innerCircle} ${styles[`innerCircle${index + 1}`]}`}>
          <div className={`bg-gray-200 inline-block rounded-full relative ${styles.innerCircleImage}`}>
            <div className="inline-block w-9/12 h-4/6 m-auto absolute m-auto left-0 right-0 top-0 bottom-0">
              {card.properties.Image.files.length && (
                <Image
                  className=" "
                  src={card.properties.Image.files?.[0]?.[card.properties.Image.files?.[0]?.type].url}
                  fill
                  alt={title}
                  style={{ objectFit: 'contain' }}
                />
              )}
            </div>
          </div>
        </a>
      );
    });

  const outerCircleImages = database
    .filter((_, index) => index >= 8)
    .map((card, index) => {
      const title = getTextContent({ title: card.properties?.title?.rich_text });

      return (
        <a href="#" title={title} className={`${styles.outerCircle} ${styles[`outerCircle${index + 1}`]}`}>
          <div className={`bg-gray-200 inline-block rounded-full relative ${styles.outerCircleImage}`}>
            <div className="inline-block w-9/12 h-4/6 m-auto absolute m-auto left-0 right-0 top-0 bottom-0">
              {card.properties.Image.files.length && (
                <Image
                  className=" "
                  src={card.properties.Image.files?.[0]?.[card.properties.Image.files?.[0]?.type].url}
                  fill
                  alt={title}
                  style={{ objectFit: 'contain' }}
                />
              )}
            </div>
          </div>
        </a>
      );
    });

  return (
    <div className={styles.logosWrapper}>
      <div className={`bg-gray-200 inline-block rounded-full relative ${styles.centerCircle}`}>
        <Image
          className="inline-block m-auto absolute m-auto left-0 right-0 top-0 bottom-0"
          src="/logo/logo-single.svg"
          alt="LoopLineStudios"
          width={120}
          height={120}
        />
      </div>

      <div className={styles.innerCircleWrapper}>
        <div className={styles.innerCircleSpin}>{innerCircleImages}</div>
      </div>

      <div className={styles.outerCircleWrapper}>
        <div className={styles.outerCircleSpin}>{outerCircleImages}</div>
      </div>
    </div>
  );
}
