import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PaddingLayout({ children, padding }) {
  const cn = bem('PaddingLayout');
  return (
    <div className={cn({ padding })}>
      {React.Children.map(children, (child) => (
        <div key={child.key} className={cn('item')}>{child}</div>
      ))}
    </div>
  );
}

PaddingLayout.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.oneOf(['small', 'medium', "large"]),
}

PaddingLayout.defaultProps = {};

export default memo(PaddingLayout);
