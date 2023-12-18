import { memo, useCallback } from "react";
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
import useInit from "../../hooks/use-init";
function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  useInit(() => {
    store.actions.profile.loadUser();
  }, []);

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
    user: state.profile.user,
    isAuth: state.auth.isAuth,
    waiting: state.profile.waiting,
  }));

  const { t } = useTranslate();
  return (

    <PageLayout>
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
