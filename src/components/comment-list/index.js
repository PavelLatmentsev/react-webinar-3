import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
function CommentList({ list, renderItem, count }) {
  const newCommentsList = {
    comments: useMemo(() => (treeToList(listToTree(list), (item, level) => ({
      ...item,
      child: level - 1,
    })).slice(1)), [list])
  };
  const cn = bem('Commentlist');
  return (
    <div className={cn()}>

      <div className={cn("header")}> {`Комментарии (${count})`}</div>
      {

        newCommentsList.comments.map(comment =>
          <div key={comment._id} className={cn("item")} style={{ marginLeft: `${30 * comment.child}px` }}>
            {renderItem(comment)}
          </div>
        )}
    </div>
  )
}

CommentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired
};
export default memo(CommentList);
