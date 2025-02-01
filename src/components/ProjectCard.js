/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { P, H5 } from '../components/Typography.js';
import useModal from '../components/useModal.js';
import Modal from '../components/Modal.js';

export const ProjectCard = ({
  href,
  image,
  name,
  description,
  externalUrl,
  chain, // New prop to indicate the chain
  children,
  ...props
}) => {
  const { toggle, visible } = useModal();

  return (
    <div sx={{ position: 'relative', cursor: 'pointer' }}>
      <div onClick={toggle}>
        <a
          href={href}
          target='_blank'
          rel='noreferrer'
          sx={{ textDecoration: 'none', color: 'text' }}
        >
          <div
            sx={{
              mb: '8px',
              aspectRatio: '1',
              overflow: 'hidden',
              borderRadius: '8px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
              },
            }}
            {...props}
          >
            <img
              src={image}
              alt={name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          </div>
          <H5 sx={{ mt: '12px', mb: '4px', fontWeight: 600 }}>{name}</H5>
          <P sx={{ opacity: 0.8, fontSize: '14px' }}>{description}</P>
          {chain && (
            <div
              sx={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              {chain}
            </div>
          )}
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
