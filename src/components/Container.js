/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui';

export const Container = ({ children, ...props }) => (
  <div
    sx={{
      '--gds-container-max-width': '1288px',
      '--gds-container-padding': ['16px', null, '64px'],
      position: 'static',
      mx: 'auto',
      maxWidth:
        'calc(var(--gds-container-max-width) + 2 * var(--gds-container-padding))',
      px: 'var(--gds-container-padding)',
    }}
    {...props}
  >
    {children}
  </div>
);
