/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui';

import ReactDOM from 'react-dom';

const Modal = ({ visible, toggle, name, description, address, externalUrl }) =>
  visible
    ? ReactDOM.createPortal(
        <div className='modal'>
          <div
            className='modal-pop'
            role='dialog'
            aria-modal='true'
            sx={{
              background: '#fff',
              border: ' 2px solid #aaa',
              borderRadius: '5px',
              zIndex: 999,
              maxWidth: '420px',
              margin: 'auto',
              padding: '1em 2em 2em',
              position: 'relative',
            }}
          >
            <h3>{name}</h3>
            {/* <p>
              Et sit saepe velit tenetur et consequatur in. Nihil doloribus
              nulla nulla rem. Soluta illo et asperiores numquam earum nesciunt.
              Vero odio voluptatem sunt sunt laboriosam.
            </p> */}
            <button type='button' onClick={toggle}>
              Close
            </button>
          </div>
          <div
            className='modal-overlay'
            sx={{
              position: ' fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: ' 100%',
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
