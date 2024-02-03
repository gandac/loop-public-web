import React, { Fragment } from 'react';
import Link from 'next/link';
import { getDatabase, getPageFromPageId, getBlocks } from '../lib/notion';
import { renderBlock } from '../components/notion/renderer';
import {
  Header,
  Footer,
  Hero,
  AboutSection,
  ServicesSection,
  ResourcesSection,
  ProjectsSection,
  ContactSectionHome
} from '../components';
import Text from '../components/text';
import styles from './index.module.css';

export const databaseId = process.env?.NOTION_DATABASE_ID;

async function getPages() {
  const database = await getDatabase();

  return database;
}

export const revalidate = 0; // revalidate the data at most every hour

export default async function Page() {
  const pages = await getPages();

  const homepage = await getPageFromPageId('home');
  const aboutPage = await getPageFromPageId('about');
  const servicesPage = await getPageFromPageId('services');
  const resourcesPage = await getPageFromPageId('resources');
  const projectsPage = await getPageFromPageId('projects');
  const contactPage = await getPageFromPageId('contact');
  const blocks = await getBlocks(homepage?.id);

  if (
    !homepage ||
    !aboutPage ||
    !servicesPage ||
    !resourcesPage ||
    !projectsPage ||
    !contactPage ||
    !blocks ||
    !pages
  ) {
    return <div />;
  }

  return (
    <div className="bg-gray-50">
      <Header allPages={pages} />
      <Hero
        cover={homepage.cover}
        headline={homepage.properties.headline}
        description={homepage.properties.description}
      />
      <main>
        <div className="container max-w-screen-md mx-auto px-4 text-lg ">
          <AboutSection headline={aboutPage?.properties?.headline} description={aboutPage?.properties?.description} />
        </div>
        <div className="bg-indigo-50">
          <div className="container max-w-screen-xl mx-auto px-4 text-lg ">
            <ServicesSection
              headline={servicesPage?.properties.headline}
              description={servicesPage?.properties?.description}
              page={servicesPage}
            />
          </div>
        </div>
        <div className="bg-indigo-950">
          <div className="container max-w-screen-xl mx-auto px-4 text-lg ">
            <ResourcesSection
              headline={resourcesPage?.properties.headline}
              description={resourcesPage?.properties?.description}
              page={resourcesPage}
            />
          </div>
        </div>
        <div className="bg-indigo-50">
          <div className="container max-w-screen-xl mx-auto px-4 text-lg ">
            <ProjectsSection
              headline={projectsPage?.properties.headline}
              description={projectsPage?.properties?.description}
              page={projectsPage}
            />
          </div>
        </div>

        <div className="bg-gray-50">
          <div className="container max-w-screen-md mx-auto px-4 text-lg ">
            <ContactSectionHome
              headline={contactPage?.properties?.headline}
              description={contactPage?.properties?.description}
              pageId={contactPage?.id}
            />
          </div>
        </div>
        <Footer pages={pages} />
      </main>
    </div>
  );
}
