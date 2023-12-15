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
  const isAuth = Boolean(localStorage.getItem("isAuth")); //для  того что бы зайти напрямую прописав /profile в браузере.
  const callbacks = {
    onLogout: useCallback(async () => {
      await store.actions.auth.logOut();
      navigate("/login", { replace: true });
    }, [store]),
    onRedirect: useCallback(async () => {
      navigate("/login", { replace: true });
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
  }, [isAuth]);
  useEffect(() => {
    !isAuth && navigate("/login");
  }, []);
  const { t } = useTranslate();
  return (
    <PageLayout>
      <Header
        title={!select.isAuth ? t("login") : t("logout")}
        isAuth={isAuth}
        onLogout={callbacks.onLogout}
        onRedirect={callbacks.onRedirect}
        user={select.user}
      />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
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
