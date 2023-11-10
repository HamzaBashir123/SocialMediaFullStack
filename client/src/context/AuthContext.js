import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer.js";

const INITIAL_STATE = {
  user: {
    _id: "6540cae1dc8dd450046beaec",
    profilePicture: "person/4.jpeg",
    coverPicture: "post/5.jpeg",
    followers: [],
    followings: [],
    isAdmin: false,
    username: "jane",
    email: "jane@gmail.com",
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  // console.log(state.user);

  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(state.user));
    } catch (error) {
      console.error("Error saving user data to localStorage:", error);
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
