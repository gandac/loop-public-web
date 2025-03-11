import Image from 'next/image';
import Link from 'next/link';
import { type PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

/* eslint-disable max-len */
import Text from '../text';

import styles from './Footer.module.css';

export default function Footer({ pages }: { pages: PageObjectResponse[] }) {
  return (
    <div className={`relative mt-16 bg-indigo-950 text-indigo-50 ${styles.loopFooter}`}>
      <svg
        className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-indigo-950"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>
      <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <Link href="/services" aria-label="Go home" title="Company" className="inline-flex items-center">
              <Image src="/logo/logo-single.svg" width={64} height={64} alt="looplinestudios" />
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 ">Loop Line Studios</span>
            </Link>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm text-indigo-50">Where imagination turns to innovation.</p>
              <p className="mt-4 text-sm text-indigo-50">Your full service software development solutions company.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-semibold tracking-wide text-teal-accent-400">Category</p>
              <ul className="mt-2 space-y-2">
                {pages
                  .filter((args) => 'properties' in args)
                  .filter(
                    ({ properties }) => {
                      if (properties.pageId?.type === "rich_text") {
                        return !['home', 'resources'].includes(properties.pageId?.rich_text?.[0]?.plain_text)
                      }
                    }
                  )
                  .filter(({ properties }) => { return properties.Status.type === 'status' && properties.Status?.status?.name === 'Live' })
                  .map((post) => {
                    const slug = post.properties?.Slug.type === "rich_text" && post.properties?.Slug?.rich_text[0].type === "text" && post.properties?.Slug?.rich_text[0]?.text.content;
                    if (post.properties?.Title.type === "title" && slug) {
                      return (
                        <li key={post.id} className={styles.post}>
                          <Link href={`/${slug}`}>
                            <Text title={post.properties?.Title?.title} />
                          </Link>
                        </li>
                      )
                    }
                  })}
              </ul>
            </div>
            <div>
              <p className="font-semibold tracking-wide text-teal-accent-400">Digital</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/services"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                  >
                    Game Design
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                  >
                    eCommerce
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                  >
                    Quality Assurance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                  >
                    3D Rendering
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                  >
                    API Software
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold tracking-wide text-teal-accent-400">Graphic & Media</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/services"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                  >
                    Media
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                  >
                    Brochure
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                  >
                    Covers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                  >
                    Educational
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                  >
                    Events
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold tracking-wide text-teal-accent-400">Business oriented</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/services"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                  >
                    Business analysis
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                  >
                    Product Growth
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                  >
                    Talent Acquisition
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-deep-purple-accent-200 sm:flex-row">
          <p className="text-sm text-gray-100">© Copyright 2024 Loop Line Studios SRL. All rights reserved.</p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <Link
              href="https://www.linkedin.com/company/loop-line-studios/about/"
              target="_blank"
              className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
              </svg>
            </Link>
            <Link
              href="https://www.linkedin.com/company/loop-line-studios/about/"
              target="_blank"
              className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
            >
              <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M20.3292112,2 C21.2519624,2 22,2.74752185 22,3.67078882 L22,20.3292112 C22,21.2519624 21.2524781,22 20.3292112,22 L3.67078882,22 C2.74803764,22 2,21.2524781 2,20.3292112 L2,3.67078882 C2,2.74803764 2.74752185,2 3.67078882,2 L20.3292112,2 Z M15.51875,9.5 C14.0993287,9.5 13.128125,10.127356 12.6956992,10.8562567 L12.625,10.9858333 L12.625,9.625 L9.91666667,9.625 L9.91666667,19.2083333 L12.8333333,19.2083333 L12.8333333,14.56625 C12.8333333,13.0104167 13.40625,12.0208333 14.7833333,12.0208333 C15.7330797,12.0208333 16.1315784,12.8606664 16.1644352,14.3580086 L16.1666667,14.56625 L16.1666667,19.2083333 L19.0833333,19.2083333 L19.0833333,13.9154167 C19.0833333,11.0575 18.3995833,9.5 15.51875,9.5 Z M7.83333333,9.5 L4.91666667,9.5 L4.91666667,19.0833333 L7.83333333,19.0833333 L7.83333333,9.5 Z M6.375,4.5 C5.33958333,4.5 4.5,5.33958333 4.5,6.375 C4.5,7.41041667 5.33958333,8.25 6.375,8.25 C7.41041667,8.25 8.25,7.41041667 8.25,6.375 C8.25,5.33958333 7.41041667,4.5 6.375,4.5 Z"
                />
              </svg>
            </Link>
            <Link
              href="https://www.linkedin.com/company/loop-line-studios/about/"
              target="_blank"
              className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
