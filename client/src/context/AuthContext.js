import { createContext, useContext, useEffect, useReducer } from "react";

function getUser() {
  const user = localStorage.getItem("user");

  if (user !== undefined || user !== null) return JSON.parse(user);

  return null;
}

function setUser(user) {
  if (!user) return;

  localStorage.setItem("user", JSON.stringify(user));
}

const INITIAL_STATE = {
  user: getUser(),
  loading: false,
  error: null,
  dispatch: () => {},
  logout: () => {},
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,

        
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    setUser(state.user);
  }, [state.user]);

  function logout() {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
