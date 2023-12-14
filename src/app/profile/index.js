import { memo, useCallback, useEffect, useState } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Header from "../../components/header";
import Navigation from "../../containers/navigation";
import UserProfile from "../../components/user-profile";
import Spinner from "../../components/spinner";
import { useNavigate } from "react-router-dom";
function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  const callbacks = {
    onLogout: useCallback(async () => {
      await store.actions.auth.logOut();
    }, [store]),
    onRedirect: useCallback(async () => {
      return navigate("/login", { replace: true });
    }, [store]),
  };

  const select = useSelector((state) => ({
    user: state.auth.user,
    isAuth: state.auth.isAuth,
    token: state.auth.token,
    waiting: state.auth.waiting,
  }));

  useEffect(() => {
    !select.isAuth && store.actions.auth.getAuthUser();
    !select.isAuth && navigate("/login");
  }, [select.isAuth]);

  const { t } = useTranslate();
  return (
    <PageLayout>
      <Spinner active={select.waiting}>
        <Header
          title={!select.isAuth ? t("login") : t("logout")}
          isAuth={select.isAuth}
          onLogout={callbacks.onLogout}
          onRedirect={callbacks.onRedirect}
          user={select.user}
        />
        <Head title={t("title")}>
          <LocaleSelect />
        </Head>
        <Navigation />

        <UserProfile
          user={select.user}
          title={t("profile")}
          titlePhone={t("phone")}
          titleName={t("profileName")}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
