import { isLoggedIn } from "../main";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = () => {
    try {
      sessionStorage.removeItem("login");
      isLoggedIn(null);

      alert("ログアウトしました");
      navigate("./main");
      return "complete logout";
    } catch (error) {
      //   return alert(`error: ${error.message}`);
    }
  };
  return logout;
};
