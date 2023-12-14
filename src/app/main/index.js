import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();
  const navigate = useNavigate();

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.category.loadCategory();
    },
    [],
    true
  );
  const select = useSelector((state) => ({
    isAuth: state.auth.isAuth,
  }));
  const callbacks = {
    onLogout: useCallback(async () => {
      await store.actions.auth.logOut();
    }, [store]),
    onRedirect: useCallback(async () => {
      return navigate("/login", { replace: true });
    }, [store]),
  };

  const { t } = useTranslate();

  return (
    <PageLayout>
      <Header
        title={!select.isAuth ? t("login") : t("logout")}
        onRedirect={callbacks.onRedirect}
        isAuth={select.isAuth}
        onLogout={callbacks.onLogout}
      ></Header>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
