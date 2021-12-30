import axios from "axios";
class AuthClass {
  constructor() {} //eslint-disable-line

  signIn({ email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/auth/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            localStorage.setItem("token", data.token);
            resolve(data);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  signInGoogle() {
    window.open(
      "http://localhost:3000/api/auth/google",
      "_blank",
      " width=500.height=600"
    );
  }

  signUp({ firstName, lastName, email, password }) {
    const displayName = firstName + lastName;
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/auth/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            displayName,
            firstName,
            lastName,
            email,
            password,
          }),
        });
        await response.json().then((data) => {
          if (response.status === 201) {
            localStorage.setItem("token", data.token);
            resolve(data);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  onUserDelete() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/user/me", {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            localStorage.removeItem("token");
            resolve(data);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  onUserUpdate(data) {
    return new Promise(async (resolve, reject) => {
      try {
        axios
          .patch("/api/user/me", data, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((data) => {
            resolve(data);
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  signOut() {
    return new Promise(async (resolve, reject) => {
      try {
        axios
          .post("/api/auth/logout", "", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((data) => {
            localStorage.removeItem("token");
            resolve();
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });

    //     const response = await fetch("api/auth/logout", {
    //       method: "POST",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     });
    //     await response.json().then((data) => {
    //       if (response.status === 200) {
    //         localStorage.removeItem("token");
    //         resolve(data);
    //       } else {
    //         reject(data);
    //       }
    //     });
    //   } catch (error) {
    //     reject(error);
    //   }
    // });
  }

  isLoggedIn() {
    return new Promise(async (resolve, reject) => {
      if (localStorage.getItem("token")) {
        try {
          const response = await fetch("api/user/me", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          await response.json().then((data) => {
            if (response.status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          });
        } catch (error) {
          reject(error);
        }
      } else {
        reject();
      }
    });
  }
}

export default AuthClass;
