/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui';

import { Alchemy, Network } from 'alchemy-sdk';
import { useState } from 'react';

import { H1, H4, P } from './components/Typography.js';
import { Container } from './components/Container.js';
import { ProjectCard } from './components/ProjectCard.js';
import { Button } from './components/Button.js';

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

  return (
    <Container>
      <div>
        <div
          sx={{
            my: '164px',
            display: 'grid',
            gridTemplateColumns: ['1fr', null, '1fr 1fr'],
            columnGap: '64px',
          }}
        >
          <div sx={{ gridColumn: 1 }}>
            <H1>Nft's from address</H1>
            <P>
              Plug in an address and this website will return all of its NFTs!
            </P>
            <div sx={{ mt: '64px' }}>
              <H4>Get all the ERC-721 tokens of this address:</H4>
              <div
                sx={{
                  display: 'flex',
                  flexDirection: ['column', null, 'row'],
                  gap: ['16px', null, '32px'],
                  mt: '16px',
                }}
              >
                <input
                  placeholder='Enter wallet Address'
                  onChange={(e) => setUserAddress(e.target.value)}
                  sx={{
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'secondaryOrange',
                    borderRadius: '4px',
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
                    pl: '8px',
                    '&:focus-visible, &:hover, &:active': {
                      color: 'text',
                      borderColor: 'primary',
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
              backgroundSize: '100% 100%',
              display: ['none', 'block'],
              objectFit: 'cover',
            }}
          />
        </div>

        {isLoading && (
          <div
            sx={{
              display: 'flex',
              justifyContent: 'center',
              animation: 'spin  5s infinite',
              transform: 'rotate(30deg)',
              mt: ['64px', '164px'],
              '@keyframes spin': {
                '0%': {
                  transform: 'translateY(0px)',
                },
                '20%': {
                  transform: 'translateY(-5px)',
                },
                '30%': {
                  transform: 'translateY(0px)',
                },
                '40%': {
                  transform: 'translateY(-5px)',
                },
                '70%': {
                  transform: 'translateY(0px)',
                },
                '100%': {
                  transform: 'translateY(-5px)',
                },
              },
            }}
          >
            <img
              src='../reshot-icon-rocket-9NEHTDUPRS.svg'
              alt=''
              sx={{ width: '150px' }}
            />
          </div>
        )}

        {hasQueried ? (
          <div
            sx={{
              display: 'grid',
              gridTemplateColumns: [
                '1fr',
                'repeat(auto-fill, minmax(min(259px, 100%), 1fr))',
                null,
                'repeat(auto-fit, minmax(300px, 1fr))',
              ],

              gap: '64px',
              textAlign: 'center',
              mt: ['64px', null, '104px'],
              mb: '704px',
            }}
          >
            {results.ownedNfts.map((e, i) => {
              return (
                <div key={e.id}>
                  <ProjectCard
                    description={
                      tokenDataObjects[i].contract.openSea.description
                    }
                    externalUrl={
                      tokenDataObjects[i].contract.openSea.externalUrl
                    }
                    image={tokenDataObjects[i].contract.openSea.imageUrl}
                  >
                    <b>Name:</b> {tokenDataObjects[i].title}&nbsp;
                  </ProjectCard>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </Container>
  );
}

export default App;
