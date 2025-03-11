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
import { BlockObjectResponse, ParagraphBlockObjectResponse, type TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';


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
  const valuesPage = await getPageFromPageId('values');
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
    !pages ||
    !pages.every(el => 'properties' in el)
  ) {
    return <div />;
  }


  return (
    <div className="bg-gray-50">
      <Header allPages={pages} />
      <main className="mt-20 lg:mt-0">
        <Hero
          cover={homepage.cover}
          headline={homepage.properties.headline as unknown as ParagraphBlockObjectResponse}
          description={homepage.properties.description as { rich_text: Array<TextRichTextItemResponse> }}
        />
        <div className="container max-w-screen-md mx-auto px-4 text-lg ">
          <AboutSection
            headline={aboutPage?.properties?.headline as unknown as BlockObjectResponse}
            description={aboutPage?.properties?.description as unknown as BlockObjectResponse}
            valuesPage={valuesPage}
          />
        </div>
        <div className="bg-indigo-50">
          <div className="container max-w-screen-xl mx-auto px-4 text-lg ">
            <ServicesSection
              headline={servicesPage?.properties.headline as unknown as BlockObjectResponse}
              description={servicesPage?.properties?.description as unknown as BlockObjectResponse}
              page={servicesPage}
            />
          </div>
        </div>
        <div className="bg-indigo-950 overflow-hidden">
          <div className="container max-w-screen-xl mx-auto px-4 text-lg ">
            <ResourcesSection
              headline={resourcesPage?.properties.headline as unknown as BlockObjectResponse}
              description={resourcesPage?.properties?.description as unknown as BlockObjectResponse}
              page={resourcesPage}
            />
          </div>
        </div>
        <div className="bg-indigo-50">
          <div className="container max-w-screen-xl mx-auto px-4 text-lg ">
            <ProjectsSection
              headline={projectsPage?.properties.headline as unknown as BlockObjectResponse}
              description={projectsPage?.properties?.description as unknown as BlockObjectResponse}
              page={projectsPage}
            />
          </div>
        </div>

        <div className="bg-gray-50">
          <div className="container max-w-screen-md mx-auto px-4 text-lg ">
            {contactPage?.properties?.headline?.type === "rich_text" && contactPage?.properties.description?.id && <ContactSectionHome
              headline={contactPage?.properties?.headline as unknown as BlockObjectResponse}
              description={contactPage?.properties?.description as unknown as BlockObjectResponse}
              pageId={contactPage?.id}
            />}
          </div>
        </div>
        <Footer pages={pages} />
      </main>
    </div>
  );
}
