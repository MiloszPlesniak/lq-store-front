import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = token;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

axios.defaults.baseURL = "http://localhost:3100/api/users/";
// usunołem w pojedyńczych zapytaniach początek "users/" jak by nie działay sprzewdzić czy to to

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credential, thunkAPI) => {
    try {
      const resRegister = await axios.post(
        "http://localhost:3100/api/users/register",
        credential
      ); // zapytanie o rejerstracje
      if (resRegister.status === 201) {
        const loginData = {
          email: credential.email,
          password: credential.password,
        }; //jeśli rejestracja jest okay zapytanie o logowanie
        const resLogin = await axios.post(
          "http://localhost:3100/api/users/login",
          loginData
        );
        setAuthHeader(resLogin.data.token); //ustawienie tokenu w axios
        return resLogin.data;
      }

      return resRegister.data;
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 409) {
        return thunkAPI.rejectWithValue("Email is already in use");
      }
      if (error.response.status === 400) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credential, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:3100/api/users/login",
        credential
      );

      setAuthHeader(res.data.token);

      return res.data;
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        return thunkAPI.rejectWithValue("Incorrect email or password");
      }
      if (error.response.status === 401) {
        return thunkAPI.rejectWithValue("Incorrect email or password");
      }
      if (error.response.status === 404) {
        return thunkAPI.rejectWithValue("User with such email not found");
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const logOut = createAsyncThunk(
  "auth/logOut",
  async (userId, thunkAPI) => {
    try {
      const url = "http://localhost:3100/api/users/logOut/" + userId;
      const res = await axios.delete(url);
      clearAuthHeader();
      return res;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (userId, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user, no token");
    }
    try {
      setAuthHeader(persistedToken);
      const url = "http://localhost:3100/api/users/current/" + userId;
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getUsersList = createAsyncThunk("auth/usersList", async (_,thunkAPI) => {
  try {
    const res=await axios.get("http://localhost:3100/api/users");
    return res.data;    
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
