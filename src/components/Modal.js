/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui';

import ReactDOM from 'react-dom';

import { H5, P } from '../components/Typography.js';

const Modal = ({ visible, toggle, image, description, externalUrl }) =>
  visible
    ? ReactDOM.createPortal(
        <div className='modal' sx={{}}>
          <div
            className='modal-pop'
            role='dialog'
            aria-modal='true'
            sx={{
              background: '#fff',
              border: '2px solid #aaa',
              borderRadius: '5px',
              zIndex: 999,
              margin: [0, null, '32px'],
              padding: ['1em', null, '1em 2em 2em'],
              position: 'fixed',
              top: 0,
              bottom: 0,
              display: 'grid',
              gridTemplateColumns: '0.9fr 0.1fr',
            }}
          >
            <div
              sx={{
                gridColumn: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <img
                src={image}
                alt=''
                sx={{
                  objectFit: 'contain',
                  width: ['200px', null, '380px'],
                  aspectRatio: '1',
                  mb: '32px',
                  mx: 'auto',
                }}
              />
              <H5>Info:</H5>
              <P>{description}</P>
              <a
                href={externalUrl}
                target='_blank'
                rel='noreferrer'
                sx={{
                  background: 'primary',
                  color: 'text',
                  p: '8px 10px',
                  borderRadius: '4px',
                  maxWidth: '85px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  mt: '32px',
                  '&:hover ': {
                    backgroundColor: '#223F00',
                    color: 'background',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Buy Now
              </a>
            </div>
            <button
              type='button'
              onClick={toggle}
              sx={{
                gridColumn: 2,
                display: 'flex',
                justifySelf: 'right',
                fontSize: '20px',
              }}
            >
              X
            </button>
          </div>
          <div
            className='modal-overlay'
            sx={{
              position: 'fixed',
              top: '0%',
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 99,
              backgroundColor: '#000',
              opacity: 0.75,
            }}
          ></div>
        </div>,
        document.body
      )
    : null;

export default Modal;
