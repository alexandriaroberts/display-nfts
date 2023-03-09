/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui';

import { Alchemy, Network } from 'alchemy-sdk';
import { useState } from 'react';

import { H1, H4, P } from './components/Typography.js';
import { Container } from './components/Container.js';
import { ProjectCard } from './components/ProjectCard.js';
import { Button } from './components/Button.js';
// import useModal from './components/useModal.js';
// import Modal from './components/Modal.js';

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  // const { toggle, visible } = useModal();

  async function getNFTsForOwner() {
    const config = {
      apiKey: 'Kj-T8wthkP6qDeOpZrIxL7lxRQ-t0Qzz',
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
    setHasQueried(true);
  }
  console.log(results);
  return (
    <Container>
      <div sx={{ mt: '164px' }}>
        <div>
          <H1>Nft's from address</H1>
          <P>
            Plug in an address and this website will return all of its NFTs!
          </P>
        </div>
      </div>
      <div sx={{ mt: '64px' }}>
        <H4>Get all the ERC-21 tokens of this address:</H4>
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
            {/* <button onClick={toggle}>Show Modal</button> */}

            {results.ownedNfts.map((e, i) => {
              return (
                <div key={e.id}>
                  <ProjectCard image={tokenDataObjects[i].rawMetadata.image}>
                    <b>Name:</b> {tokenDataObjects[i].title}&nbsp;
                  </ProjectCard>

                  {/* <Modal
                    visible={visible}
                    toggle={toggle}
                    name={tokenDataObjects[i].title}
                  ></Modal> */}
                </div>
              );
            })}
          </div>
        ) : (
          <P sx={{ mt: '8px' }}>
            Please make a query! The query may take a few seconds...
          </P>
        )}
      </div>
    </Container>
  );
}

export default App;
