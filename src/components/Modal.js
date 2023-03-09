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
              border: ' 2px solid #aaa',
              borderRadius: '5px',
              zIndex: 999,
              maxWidth: 'auto',
              height: '100%',
              //   margin: '32px',
              padding: '1em 2em 2em',
              position: 'fixed',
              inset: 0,
              display: 'flex',
              gap: '16px',
            }}
          >
            <div sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <img
                src={image}
                alt=''
                sx={{ objectFit: 'contain', aspectRatio: '2 / 1', mb: '32px' }}
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
                  maxWidth: '100px',
                  textDecoration: 'none',
                  mt: '32px',
                }}
              >
                Buy Now
              </a>
            </div>
            <button
              type='button'
              onClick={toggle}
              sx={{ display: 'flex', fontSize: '20px' }}
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
