import StoreModule from "../module";

class Profile extends StoreModule {
  initState() {
    return {
      user: {},
      waiting: false,
      error: "",
    };
  }

  async loadUser() {
    const token = localStorage.getItem("x-token");

    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/self?fields=*`, {
        method: "GET",
        headers: {
          "X-Token": token,
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
      });
    }
  }
}

export default Profile;
