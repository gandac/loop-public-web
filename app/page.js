import React from 'react';
import { getDatabase, getPageFromPageId, getBlocks } from '../lib/notion';
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

export const databaseId = process.env?.NOTION_DATABASE_ID;

async function getPages() {
  const database = await getDatabase();

  return database;
}

export const revalidate = 0; // revalidate the data at most every hour
export const dynamic = 'force-dynamic';

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
      <main className="mt-20 lg:mt-0">
        <Hero
          cover={homepage.cover}
          headline={homepage.properties.headline}
          description={homepage.properties.description}
        />
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
        <div className="bg-indigo-950 overflow-hidden">
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
