import { jwtDecode } from "jwt-decode";
import { useContext, useMemo } from "react";
import User from "../models/user/User";
import { AuthContext } from "../components/auth/auth/Auth";

export default function useUsername() {
  const { jwt } = useContext(AuthContext)!;
  // const { name } = jwtDecode<User>(jwt)

  const name = useMemo(() => {
    const { firstName, lastName } = jwtDecode<User>(jwt);
    return firstName + " " + lastName;
  }, [jwt]);

  return name;
}
