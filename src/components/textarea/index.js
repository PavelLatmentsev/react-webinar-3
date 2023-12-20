import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function TextArea(props) {


  // Обработчик изменений в поле
  const onChange = ({ target }) => {
    props.onChange({ name: target.name, value: target.value });
  };

  const cn = bem('Textarea');
  return (
    <textarea
      className={cn()}
      value={props.value}
      placeholder={props.placeholder}
      onChange={onChange}
      name={props.name}
    />
  )
}

TextArea.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

TextArea.defaultProps = {
  onChange: () => {
  },
  type: 'text',
  theme: ''
}

export default memo(TextArea);
