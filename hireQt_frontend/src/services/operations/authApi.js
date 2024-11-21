import { apiConnector } from "../apiConnector";
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const signup = async (firstname, lastname, email, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        username: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return data.message;
  } catch (error) {
    console.log("Signup error...", error.message);
    return null;
  }
};

export const signin = async (email, password) => {
  try {

    const response = await fetch("http://localhost:3000/api/v1/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Sign-in failed");
    }

    localStorage.setItem("token", JSON.stringify(data.token));
    return data.token;
  } catch (error) {
    console.log("Login error...", error.message);
    return null;
  }
};
