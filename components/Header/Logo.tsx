import React from 'react';
import Image from 'next/image';

import logoSvg from './loop.svg';

export default function Logo() {
  return (
    <a href="/" title="Loop line studio homepage">
      <Image
        src={logoSvg}
        alt="Loop line studios logo"
        width={200}
        height={200}
      />
    </a>
  );
}
