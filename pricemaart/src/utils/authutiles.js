import { useContext } from "react";
import { MyContext } from "../App";

const useValidateAuth = () => {
  const context = useContext(MyContext);

  const validate = () => {
    const tokenData = JSON.parse(localStorage.getItem("authToken"));
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!tokenData || !tokenData.token || !userData || !userData.userId) {
      context.setOpen({
        open: true,
        message: "You are not logged in. Please log in first.",
        severity: "warning",
      });
      return false;
    }

    const now = new Date().getTime();
    if (tokenData.expiresAt < now) {
      context.setOpen({
        open: true,
        message: "Session expired. Please log in again.",
        severity: "error",
      });
      return false;
    }

    return true;
  };

  return validate;
};

export default useValidateAuth;
