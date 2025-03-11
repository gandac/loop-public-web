'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { type PageObjectResponse, type FilesPropertyItemObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { getTextContent } from '../text';
import styles from './ProjectsGallery.module.css';

import 'swiper/css';
import 'swiper/css/pagination';

const getImage = (Image: Partial<FilesPropertyItemObjectResponse>) => {

  const image = Image?.files?.[0].type === "file" ? Image?.files[0].file.url : Image?.files?.[0].type === "external" ? Image.files[0].external.url : undefined;

  return image;
}

export default function ProjectsGallery({ database }: { database: (PageObjectResponse | PartialPageObjectResponse)[] }) {
  const images = database.map((el) => {
    const title = 'properties' in el && el.properties.title?.type === "rich_text" && getTextContent({ title: el.properties.title.rich_text });
    const URL = 'properties' in el && el.properties.URL?.type === "url" && el.properties.URL[el.properties.URL.type];
    // const image = el.properties.Image.files?.[0]?.[el.properties.Image.files?.[0]?.type].url;
    const image = 'properties' in el && el.properties.Image.type === "files" && getImage(el.properties.Image)
    // const image = el.properties.Image.type === "files" && el.properties.Image.files[0].type && el.properties.Image.files[0][el.properties.Image.files[0].type].url;
    const imageHTML = image && <Image src={image} width={859} height={1205} alt="" loading="eager" title={title || undefined} />;

    return (
      URL && <SwiperSlide key={el.id}>
        {URL.length > 1 ? (
          <Link href={URL} target="_blank">
            {imageHTML}
          </Link>
        ) : (
          imageHTML
        )}
      </SwiperSlide>
    );
  });

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      //   onSlideChange={() => console.log('slide change')}
      //   onSwiper={(swiper) => console.log(swiper)}
      modules={[Pagination, Autoplay]}
      breakpoints={{
        750: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50
        }
      }}
      centeredSlides
      loop
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      pagination={{
        clickable: true
      }}
      className={styles.projectsSwipe}
    >
      {images}
    </Swiper>
  );
}
