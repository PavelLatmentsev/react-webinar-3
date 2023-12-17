import { memo, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";
/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Article() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();
  const navigate = useNavigate();
  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const select = useSelector((state) => ({
    article: state.article.data,
    waiting: state.article.waiting,
    isAuth: state.auth.isAuth,
    token: state.auth.token,
    user: state.profile.user,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    onRedirect: useCallback(async () => {
      return navigate("/login", { replace: true });
    }, [store]),
    onLogout: useCallback(async () => {
      await store.actions.auth.logOut();
    }, [store]),
  };

  return (
    <PageLayout>
      <Header
        title={!select.isAuth ? t("login") : t("logout")}
        isAuth={select.isAuth}
        onRedirect={callbacks.onRedirect}
        onLogout={callbacks.onLogout}
        user={select.user}
      />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
