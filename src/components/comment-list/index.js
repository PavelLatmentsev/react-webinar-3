import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import listToTree from '../../utils/list-to-tree';
function CommentList({ list, renderItem, count }) {

  const cn = bem('Commentlist');
  return (
    <div className={cn()}>

      <div className={cn("header")}> {`Комментарии (${count})`}</div>
      {

        list.map(comment =>
          <div key={comment._id} className={cn("item")}>
            {renderItem(comment)}
          </div>
        )}
    </div>
  )
}

// List.propTypes = {
//   list: PropTypes.arrayOf(PropTypes.shape({
//     _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//   })).isRequired,
//   renderItem: PropTypes.func,
// };

// List.defaultProps = {
//   renderItem: (item) => {
//   },
// }

export default memo(CommentList);
