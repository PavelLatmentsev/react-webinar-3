import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentAuth from '../comment-auth';
import './style.css';
import Field from '../field';
import Textarea from '../textarea';
import useTranslate from '../../hooks/use-translate';
import { useDispatch } from 'react-redux';
import commentActions from '../../store-redux/comment/actions';
import PaddingLayout from '../padding-layout';

function Comment(props) {
    const [formComment, setFormCommento] = useState({ text: "" })
    const dispatch = useDispatch();
    const cn = bem('Comment');
    const optionsYear = {
        year: 'numeric', month: 'long', day: 'numeric',
    }
    const optionsHour = {
        hour: 'numeric', minute: 'numeric'
    }
    const { t } = useTranslate();

    const onChange = (target) => {

        if (target) {
            setFormCommento((prevState) => ({
                ...prevState,
                [target.name]: target.value,
            }));
        }
    };

    const onSubmitCommentForm = (e) => {
        e.preventDefault()
        if (formComment.text) {
            dispatch(commentActions.create({
                "text": formComment.text,
                "parent": { "_id": `${props.comment._id}`, "_type": "comment" }
            }))
            dispatch(commentActions.load(props.params.id))
            setFormCommento({ text: "" })
            props.onCloseCancel();
        } else { return }
    };
    return (
        <div className={cn()} >
            <div className={cn('info')} >
                <span className={cn('name')}> {props.comment?.author?.profile?.name}</span>
                <span className={cn('create')}> {`${new Date(props.comment.dateCreate).toLocaleDateString('ru-RU', optionsYear).split("г.")[0]}  в ${new Date(props.comment.dateCreate).toLocaleDateString('ru-RU', optionsHour).split(",")[1]} `}</span>
            </div>
            <div className={cn('description')}>
                {props.comment.text}
            </div>
            <button className={cn('btn')} onClick={() => props.onViewCancel(props.comment._id)}>Ответить</button>{
                props.comment.cancel &&
                <CommentAuth link="Войдите" title="чтобы иметь возможность ответить." current={true} btn="Отмена" onCloseCancel={props.onCloseCancel} />
            }

            {Object.keys(props.user).length !== 0 && (props.openForm === props.comment._id) ?
                <PaddingLayout padding="side">
                    <form onSubmit={onSubmitCommentForm} className={cn('form')}>
                        <Field label={"Новый ответ"} comment={"comment"}>
                            <Textarea name="text" value={formComment.text} onChange={onChange} placeholder={`Мой ответ для ${props.comment?.author?.profile?.name}`} />
                        </Field>
                        <Field comment={"comment"}>
                            <button type='submit' className={cn('btn')}>{t('comment.send')}</button>
                            <button className={cn('btn')} onClick={props.onCloseCancel} >{t('comment.cancel')}</button>
                        </Field >

                    </form>
                </PaddingLayout>
                : null}


            {Object.keys(props.user).length === 0 && props.openForm === props.comment._id ? <CommentAuth link="Войдите" title="чтобы иметь возможность комментировать" current={false} /> : null}

        </div>
    );
}

Comment.propTypes = {
    comment: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        dateCreate: PropTypes.string,
        text: PropTypes.string,
        name: PropTypes.string
    }),
};

Comment.defaultProps = {
    onAdd: () => {
    },
}

export default memo(Comment);
