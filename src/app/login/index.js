import { memo, useCallback, useEffect, useState } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Header from "../../components/header";
import LoginForm from "../../components/login-form";
import Navigation from "../../containers/navigation";
import { useNavigate } from "react-router-dom";
import useInit from "../../hooks/use-init";
function Login() {
  const store = useStore();
  const [login, setLogin] = useState({ login: "", password: "" });
  useInit(() => {
    store.actions.auth.clearError();
  }, []);
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    isAuth: state.auth.isAuth,
    error: state.auth.error,
  }));
  const heandleChange = (target) => {
    if (target) {
      setLogin((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  useEffect(() => {
    select.isAuth && navigate("/profile");
  }, [select.isAuth]);

  const callbacks = {
    onLogin: useCallback(
      async (data) => {
        await store.actions.auth.login(data);
      },
      [store]
    ),
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
        isAuth={select.isAuth}
        onRedirect={callbacks.onRedirect}
      />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm
        title={t("login")}
        onChange={heandleChange}
        value={login}
        onSubmit={callbacks.onLogin}
        btnTitle={t("enter")}
        error={select.error}
      />
    </PageLayout>
  );
}

export default memo(Login);
