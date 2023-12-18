import StoreModule from "../module";

class Auth extends StoreModule {
  initState() {
    return {
      user: {},
      isAuth: false,
      waiting: false,
      error: "",
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
              isAuth: true,
              waiting: false,
            },
            "Авторизация"
          );
          localStorage.setItem("x-token", json.result.token);
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
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch(`api/v1/users/sign`, {
        method: "DELETE",
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

  async clearError() {
    this.setState({
      ...this.getState(),
      error: "",
    });
  }

  async repairSession() {
    const token = localStorage.getItem("x-token");
    if (token) {
      this.setState({
        ...this.getState(),
        waiting: true,
      });
      try {
        const response = await fetch(`api/v1/users/self?fields=*`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Token": token,
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
          isAuth: false,
          waiting: false,
        });
      }
    }


  }
}

export default Auth;
