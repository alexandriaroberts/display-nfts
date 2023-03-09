/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui';

import { H5 } from '../components/Typography.js';

export const Button = ({ onClick, counter, children, ...props }) => {
  return (
    <button
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        color: 'secondaryOrange ',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'text',
        padding: ['18px 20px', '8px 16px'],
        maxWidth: '100%',
        boxShadow: 'none',
        cursor: onClick != null ? 'pointer' : 'default',
        overflowWrap: 'break-word',
        inlineSize: ['100%', null, '165px'],
        '&:hover ': {
          backgroundColor: '#223F00',
        },
        transition: 'all 0.3s ease',
      }}
      onClick={onClick ?? undefined}
      data-testid='chip__container'
      {...props}
    >
      <H5>{children}</H5>
    </button>
  );
};
