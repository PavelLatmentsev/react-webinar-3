import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentAuth from '../comment-auth';
import './style.css';
import Field from '../field';
import Textarea from '../textarea';
import SideLayout from '../side-layout';
import useTranslate from '../../hooks/use-translate';
import { useDispatch } from 'react-redux';
import commentActions from '../../store-redux/comment/actions';

function Comment(props) {
    const [viewInfo, setViewInfo] = useState(false)
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
    const onViewCancel = (id) => {
        setViewInfo(true)
        props.setOpenForm(false)
    };
    const onCloseCancel = () => {
        setViewInfo(false)

    }
    const onChange = (target) => {

        if (target) {
            setFormCommento((prevState) => ({
                ...prevState,
                [target.name]: target.value,
            }));
        }
    };
    console.log(formComment.text)
    const onSubmitCommentForm = (e) => {
        e.preventDefault()
        dispatch(commentActions.create({
            "text": formComment.text,
            "parent": { "_id": `${props.comment._id}`, "_type": "comment" }
        }))
        dispatch(commentActions.load(props.params.id))
        setFormCommento({ text: "" })
    };
    return (
        <div className={cn()}>
            <div className={cn('info')}>
                <span className={cn('name')}> {props.comment?.author?.profile?.name}</span>
                <span className={cn('create')}> {`${new Date(props.comment.dateCreate).toLocaleDateString('ru-RU', optionsYear).split("г.")[0]}  в ${new Date(props.comment.dateCreate).toLocaleDateString('ru-RU', optionsHour).split(",")[1]} `}</span>
            </div>
            <div className={cn('description')}>
                {props.comment.text}
            </div>
            <button className={cn('btn')} onClick={() => onViewCancel()}>Ответить</button>{
                props.comment.cancel &&
                <CommentAuth link="Войдите" title="чтобы иметь возможность ответить." current={true} btn="Отмена" onCloseCancel={props.onCloseCancel} />
            }

            {props.session && viewInfo ? <SideLayout>
                <form onSubmit={onSubmitCommentForm} className={cn('form')}>
                    <Field label={"Новый ответ"} comment={"comment"}>
                        <Textarea name="text" value={formComment.text} onChange={onChange} />
                    </Field>
                    <Field comment={"comment"}>
                        <button type='submit' className={cn('btn')}>{t('comment.send')}</button>
                        <button className={cn('btn')} onClick={onCloseCancel} >{t('comment.cancel')}</button>
                    </Field >

                </form>
            </SideLayout> : null}


            {!props.session && props.comment.cancel ? <CommentAuth link="Войдите" title="чтобы иметь возможность комментировать" current={false} /> : null}

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
