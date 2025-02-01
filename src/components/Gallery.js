/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { ProjectCard } from './ProjectCard.js';

export const Gallery = ({ nfts }) => {
  return (
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: ['1fr', 'repeat(auto-fill, minmax(250px, 1fr))'],
        gap: '24px',
        padding: '16px',
      }}
    >
      {nfts.map((nft, index) => (
        <ProjectCard
          key={index}
          image={nft.image}
          name={nft.name}
          description={nft.description}
          chain={nft.chain}
          href={nft.externalUrl}
        />
      ))}
    </div>
  );
};
