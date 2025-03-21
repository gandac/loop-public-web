'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type PartialPageObjectResponse, type PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { getTextContent } from '../text';
import styles from './LogoGallery.module.css';

function LogoImage({ card, namespace, index, spin }: { card: PageObjectResponse | PartialPageObjectResponse, namespace: string, index: number, spin: number }) {

  const title = 'properties' in card && card.properties.title.type === "rich_text" && getTextContent({ title: card.created_by && card.properties.title.rich_text });
  const files = 'properties' in card && card.properties.Image.type === "files" && card.properties.Image.files;
  const URL = 'properties' in card && card.properties?.URL?.type === "url" && card.properties?.URL?.[card.properties?.URL?.type];

  return (
    title && URL && <Link
      href={URL}
      target="_blank"
      title={title}
      className={`${styles[namespace]} ${styles[`${namespace}${index + 1}`]}`}
    >
      <div className={`bg-gray-200 inline-block rounded-full relative ${styles[`${namespace}Image`]}`}>
        <div
          className="inline-block w-9/12 h-4/6 m-auto absolute m-auto left-0 right-0 top-0 bottom-0 group"
          style={{
            transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(${-spin}deg) skew(0deg, 0deg`,
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          {files && files.length && (
            <>
              {files[0].type === 'file' && <Image
                className=" "
                src={files[0].file.url}
                fill
                alt={title}
                style={{ objectFit: 'contain' }}
              />}

              <span
                className="pointer-events-none absolute -top-10 left-0 w-max opacity-0 transition-opacity
              group-hover:opacity-100 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm"
              >
                {title}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function LogoGallery({ database }: { database: (PageObjectResponse | PartialPageObjectResponse)[] }) {
  const [outerSpin, setOuterSpin] = useState(0);
  const [innerSpin, setInnerSpin] = useState(0);

  useEffect(() => {
    const myInterval = setInterval(() => {
      setOuterSpin((prev) => {
        if (prev > 360) {
          return 0;
        }
        return Math.round((prev + 0.1) * 100) / 100;
      });
      setInnerSpin((prev) => {
        if (prev < -360) {
          return 0;
        }
        return Math.round((prev - 0.15) * 100) / 100;
      });
    }, 15);

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  const innerCircleImages = database
    .filter((_, index) => index < 8)
    .map((card, index) =>
      LogoImage({
        card,
        namespace: 'innerCircle',
        index,
        // key: index,
        spin: innerSpin
      })
    );

  const outerCircleImages = database
    .filter((_, index) => index >= 8 && index < 24)
    .map((card, index) =>
      LogoImage({
        card,
        namespace: 'outerCircle',
        index,
        // key: index,
        spin: outerSpin
      })
    );

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
        <div
          className={styles.innerCircleSpin}
          style={{
            transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(${innerSpin}deg) skew(0deg, 0deg)`,
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          {innerCircleImages}
        </div>
      </div>

      <div className={styles.outerCircleWrapper}>
        <div
          className={styles.outerCircleSpin}
          style={{
            transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(${outerSpin}deg) skew(0deg, 0deg)`,
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          {outerCircleImages}
        </div>
      </div>
    </div>
  );
}
