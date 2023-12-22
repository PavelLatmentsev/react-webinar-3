
import { memo, useCallback, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import commentActions from '../../store-redux/comment/actions';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import Comment from '../../components/comment';
import CommentList from "../../components/comment-list"
import Field from '../../components/field';
import Textarea from '../../components/textarea';
import useSelector from '../../hooks/use-selector';
import CommentAuth from '../../components/comment-auth';
import PaddingLayout from '../../components/padding-layout';
import { useParams } from 'react-router-dom';


function Comments() {
    const params = useParams();
    const dispatch = useDispatch();
    const select = useSelectorRedux(state => ({
        comment: state.comment.data,
        comwait: state.comment.waiting
    }));
    const [openForm, setOpenForm] = useState("");
    const [dataComment, setDataComment] = useState({ comment: "" });
    const onViewCancel = (id) => {
        setOpenForm(id)
    };
    const onCloseCancel = () => {
        setOpenForm("")
    }

    const selectFromStore = useSelector((state) => ({
        session: state.session.exists,
        user: state.session.user
    }))
    const { t } = useTranslate();
    const heandleChange = (target) => {

        if (target) {
            setDataComment((prevState) => ({
                ...prevState,
                [target.name]: target.value,
            }));
        }
    };
    const onSubmit = (e) => {
        e.preventDefault()
        if (dataComment.comment) {
            dispatch(commentActions.create({
                "text": dataComment.comment,
                "parent": { "_id": `${params.id}`, "_type": "article" }
            }))
            dispatch(commentActions.load(params.id))
            setDataComment({ comment: "" })
        } else {
            return
        }
    };
    const renders = {
        comment: useCallback(comment => (
            <Comment
                comment={comment}
                user={selectFromStore.user}
                value={dataComment.childcomment}
                openForm={openForm}
                onViewCancel={onViewCancel}
                onCloseCancel={onCloseCancel}
                params={params}
            />
        ), [openForm]),
    };
    return (
        <>
            <Spinner active={select.comwait}>
                {select.comment.items && <CommentList list={select.comment.items} renderItem={renders.comment} count={select.comment.count} />}
            </Spinner>
            {selectFromStore.session && !openForm ? <PaddingLayout padding="largeSide">

                <form onSubmit={onSubmit}>
                    <Field label={"Новый комментарий"} comment={"comment"}>
                        <Textarea name='comment' value={dataComment.comment} onChange={heandleChange} placeholder="Текст" />
                    </Field>
                    <Field comment={"comment"}>
                        <button type='submit'>{t('comment.send')}</button>
                    </Field >
                </form>
            </PaddingLayout>
                : !openForm ? <PaddingLayout padding="largeSide"> <CommentAuth link="Войдите" title="чтобы иметь возможность комментировать" current={false} /> </PaddingLayout> : null}

        </>
    );
}

export default memo(Comments);