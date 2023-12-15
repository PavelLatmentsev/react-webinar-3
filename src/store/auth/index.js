import StoreModule from "../module";

class Auth extends StoreModule {
  initState() {
    return {
      user: {},
      isAuth: false,
      waiting: false,
      error: "",
      token: "",
    };
  }
  async login(data) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch(`api/v1/users/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error.data.issues[0].message);
      } else {
        {
          this.setState(
            {
              ...this.getState(),
              user: json.result.user,
              token: json.result.token,
              isAuth: true,
              waiting: false,
            },
            "Авторизация"
          );
          localStorage.setItem("x-token", this.getState().token);
          localStorage.setItem("isAuth", this.getState().isAuth);
        }
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
        isAuth: false,
        waiting: false,
      });
    }
  }

  async logOut() {
    localStorage.removeItem("x-token");
    localStorage.removeItem("isAuth");
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch(`api/v1/users/sign`, {
        method: "DELETE",
        headers: {
          "X-Token": this.getState().token,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error.data.issues[0].message);
      } else {
        {
          this.setState(
            {
              ...this.initState(),
            },
            "Авторизация"
          );
        }
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
        isAuth: false,
        waiting: false,
      });
    }
  }

  async getAuthUser() {
    this.setState({
      ...this.getState(),
      token: localStorage.getItem("x-token"),
      waiting: true,
    });
    try {
      const response = await fetch(`/api/v1/users/self?fields=*`, {
        method: "GET",
        headers: {
          "X-Token": localStorage.getItem("x-token"),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error.data.issues[0].message);
      } else {
        {
          this.setState(
            {
              ...this.getState(),
              user: json.result,
              token: json.result.token,
              isAuth: true,
              waiting: false,
            },
            "Авторизация"
          );
        }
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
        waiting: false,
        isAuth: false,
      });
    }
  }
}

export default Auth;
