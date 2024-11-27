import { apiConnector } from "../apiConnector";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import FormData from "form-data"; 

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


export const upload = async (file) => {
  try {
    // Create a new FormData instance
    const formData = new FormData();
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      throw new Error('No authentication token found');
    }

    formData.append('resume', file);

    const response = await fetch("http://localhost:3000/api/v1/profile/upload-resume", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`
        // Note: Do NOT manually set Content-Type for FormData
      },
      body: formData,
    });

    console.log('Response status:', response.status);

    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      throw new Error(data.message || "Resume upload failed");
    }

    return data;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};



export const save_to_db = async (file) => {
  try {
    // Create a new FormData instance
    const formData = new FormData();
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      throw new Error('No authentication token found');
    }

    formData.append('resume', file);

    const response = await fetch("http://localhost:3000/api/v1/profile/upload", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`
        // Note: Do NOT manually set Content-Type for FormData
      },
      body: formData,
    });

    console.log('Response status:', response.status);

    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      throw new Error(data.message || "Resume upload failed");
    }

    return data;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};