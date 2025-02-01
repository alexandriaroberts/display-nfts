/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui';

import { Alchemy, Network } from 'alchemy-sdk';
import { useState } from 'react';

import { H1, H4, P } from './components/Typography.js';
import { Container } from './components/Container.js';
import { ProjectCard } from './components/ProjectCard.js';
import { Button } from './components/Button.js';
import { Gallery } from './components/Gallery.js'; // Import the new Gallery component

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getNFTsForOwner() {
    setIsLoading(true);
    const config = {
      apiKey: process.env.API_KEY,
      network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(config);
    const data = await alchemy.nft.getNftsForOwner(userAddress);
    setResults(data);

    const tokenDataPromises = [];

    for (let i = 0; i < data.ownedNfts.length; i++) {
      const tokenData = alchemy.nft.getNftMetadata(
        data.ownedNfts[i].contract.address,
        data.ownedNfts[i].tokenId
      );
      tokenDataPromises.push(tokenData);
    }

    setTokenDataObjects(await Promise.all(tokenDataPromises));
    setIsLoading(false);
    setHasQueried(true);
  }

  // Format NFT data for the Gallery component
  const nfts = results.ownedNfts?.map((e, i) => ({
    image:
      tokenDataObjects[i]?.media[0]?.gateway ||
      'https://via.placeholder.com/300',
    name: tokenDataObjects[i]?.title || 'Untitled',
    description:
      tokenDataObjects[i]?.description || 'No description available.',
    chain: 'Ethereum', // Hardcoded for now, we'll update this later for multi-chain support
    externalUrl: tokenDataObjects[i]?.contract.openSea?.externalUrl || '#',
  }));

  return (
    <Container>
      <div>
        {/* Enhanced Hero Area */}
        <div
          sx={{
            my: ['64px', null, '164px'],
            display: 'grid',
            gridTemplateColumns: ['1fr', null, '1fr 1fr'],
            columnGap: ['32px', '64px'],
            alignItems: 'center',
          }}
        >
          <div sx={{ gridColumn: 1 }}>
            <H1>Discover Your NFTs</H1>
            <P>
              Enter your wallet address to explore all your NFTs across multiple
              chains.
            </P>
            <div sx={{ mt: '64px' }}>
              <H4>Enter your wallet address:</H4>
              <div
                sx={{
                  display: 'flex',
                  flexDirection: ['column', null, 'row'],
                  gap: ['16px', null, '32px'],
                  mt: '16px',
                }}
              >
                <input
                  placeholder='0x...'
                  onChange={(e) => setUserAddress(e.target.value)}
                  sx={{
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'secondaryOrange',
                    borderRadius: '8px',
                    width: '100%',
                    maxWidth: '604px',
                    height: '52px',
                    outline: 'none',
                    fontFamily: 'Noto Serif',
                    fontSize: ['16px', null, '20px'],
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: ['28px', null, '37px'],
                    letterSpacing: '2px',
                    pl: '16px',
                    '&:focus-visible, &:hover, &:active': {
                      borderColor: 'primary',
                      boxShadow: '0 0 0 2px rgba(255, 165, 0, 0.3)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                />
                <Button onClick={getNFTsForOwner}>Fetch NFTs</Button>
              </div>
            </div>
          </div>
          <div
            sx={{
              gridColumn: 2,
              height: '100%',
              backgroundImage: `url('../punk.avif')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '16px',
              display: ['none', 'block'],
              minHeight: '400px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            }}
          />
        </div>

        {/* Loading Animation */}
        {isLoading && (
          <div
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: ['64px', '164px'],
            }}
          >
            <img
              src='../reshot-icon-rocket-9NEHTDUPRS.svg'
              alt='Loading...'
              sx={{ width: '150px', animation: 'spin 2s infinite linear' }}
            />
          </div>
        )}

        {/* Display NFTs */}
        {hasQueried && (
          <div
            sx={{ mt: ['64px', null, '104px'], mb: ['64px', null, '164px'] }}
          >
            <H4 sx={{ textAlign: 'center', mb: '32px' }}>
              Your NFT Collection
            </H4>
            <Gallery nfts={nfts} />
          </div>
        )}
      </div>
    </Container>
  );
}

export default App;
