import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import { useDispatch } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentActions from '../../store-redux/comment/actions';
import { useSelector as useSelectorRedux } from 'react-redux';
import Comment from '../../components/comment';
import CommentList from "../../components/comment-list"
import Field from '../../components/field';
import SideLayout from '../../components/side-layout';
import Textarea from '../../components/textarea';
import useSelector from '../../hooks/use-selector';
import CommentAuth from '../../components/comment-auth';


function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  const params = useParams();

  useInit(async () => {
    dispatch(articleActions.load(params.id));
    dispatch(commentActions.load(params.id))
    await store.actions.session.remind();
  }, [params.id]);
  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comment: state.comment.data,
    comwait: state.comment.waiting
  }));
  const [openForm, setOpenForm] = useState(true);
  const [dataComment, setDataComment] = useState({ comment: "" });
  console.log(select.comment)
  const selectFromStore = useSelector((state) => ({
    session: state.session.exists
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
    dispatch(commentActions.create({
      "text": dataComment.comment,
      "parent": { "_id": `${params.id}`, "_type": "article" }
    }))
    dispatch(commentActions.load(params.id))
    setDataComment({ comment: "" })
  };
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }
  const renders = {
    comment: useCallback(comment => (
      <Comment
        comment={comment}
        session={selectFromStore.session}
        value={dataComment.childcomment}
        openForm={openForm}
        setOpenForm={setOpenForm}
        params={params}
      />
    ), []),
  };
  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
      <Spinner active={select.comwait}>
        {select.comment.items && <CommentList list={select.comment.items} renderItem={renders.comment} count={select.comment.count} />}
      </Spinner>
      {selectFromStore.session ? <SideLayout padding='large'>
        <form onSubmit={onSubmit}>
          <Field label={"Новый комментарий"} comment={"comment"}>
            <Textarea name='comment' value={dataComment.comment} onChange={heandleChange} />
          </Field>
          <Field comment={"comment"}>
            <button type='submit'>{t('comment.send')}</button>
          </Field >
        </form>
      </SideLayout> : <CommentAuth link="Войдите" title="чтобы иметь возможность комментировать" current={false} />}
    </PageLayout>
  );
}

export default memo(Article);
