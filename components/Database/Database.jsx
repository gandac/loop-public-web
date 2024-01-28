import React from 'react';
import { getChildDatabase, getBlocks } from '../../lib/notion';
import CardGallery from './CardGallery';
import LogoGallery from './LogoGallery';
import ProjectsGallery from './ProjectsGallery';

export default async function Database({ block, value }) {
  const inPageDatabase = await getChildDatabase(block?.id);

  switch (value.title) {
    case 'Resources':
      return <LogoGallery title={value.title} database={inPageDatabase} />;
    case 'Projects':
      return <ProjectsGallery title={value.title} database={inPageDatabase} />;
    default:
      return <CardGallery title={value.title} database={inPageDatabase} />;
  }
}
