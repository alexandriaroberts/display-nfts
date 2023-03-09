/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui';

// import ReactDOM from 'react-dom';
import { P } from '../components/Typography.js';
import useModal from '../components/useModal.js';
import Modal from '../components/Modal.js';

export const ProjectCard = ({
  href,
  image,
  description,
  externalUrl,
  children,
  ...props
}) => {
  const { toggle, visible } = useModal();
  return (
    <div>
      <div onClick={toggle}>
        <a
          href={href}
          target='_blank'
          rel='noreferrer'
          sx={{ textDecoration: 'none', color: 'text', cursor: 'pointer' }}
        >
          <div
            sx={{
              mb: ['8px'],
              aspectRatio: '1',
              overflow: 'hidden',
              pointerEvents: 'none',
              boxShadow: 'rgb(0 0 0 / 8%) 0px 4px 15px',
            }}
            {...props}
          >
            <img
              src={image}
              alt=''
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                aspectRatio: 1,
                borderRadius: '4px',
                'a:hover &': {
                  transform: `scale(1.02)`,
                },
                transition: 'all 0.3s ease',
              }}
            />
          </div>
          <P
            sx={{
              mt: '16px',
              opacity: 0.8,
              'a:hover &': {
                opacity: 1,
              },
              transition: 'all 0.3s ease',
            }}
          >
            {children}
          </P>
        </a>
      </div>
      <Modal
        visible={visible}
        toggle={toggle}
        description={description}
        externalUrl={externalUrl}
        image={image}
      />
    </div>
  );
};
