'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import { getTextContent } from '../text';
import styles from './ProjectsGallery.module.css';

import 'swiper/css';
import 'swiper/css/pagination';

export default function ProjectsGallery({ database }) {
  const images = database.map((el) => {
    const title = getTextContent({ title: el.properties?.title?.rich_text });
    const URL = el.properties?.URL[el.properties.URL.type];
    const image = el.properties.Image.files?.[0]?.[el.properties.Image.files?.[0]?.type].url;
    const imageHTML = <Image src={image} width={859} height={1205} alt="" loading="eager" title={title} />;

    return (
      <SwiperSlide key={el.id}>
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
