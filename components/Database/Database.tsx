import { type ChildDatabaseBlockObjectResponse, BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { getChildDatabase } from '../../lib/notion';
import CardGallery from './CardGallery';
import LogoGallery from './LogoGallery';
import ProjectsGallery from './ProjectsGallery';

export default async function Database({ block, value }: { block: BlockObjectResponse; value: ChildDatabaseBlockObjectResponse['child_database']; }) {
  const inPageDatabase = await getChildDatabase(block?.id);

  switch (inPageDatabase && value.title) {
    case 'Resources':
      return <LogoGallery database={inPageDatabase} />;
    case 'Projects':
      return <ProjectsGallery database={inPageDatabase} />;
    default:
      return <CardGallery title={value.title} database={inPageDatabase} />;
  }
}
