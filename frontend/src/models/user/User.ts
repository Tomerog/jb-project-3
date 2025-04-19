import SignUp from "./SignUp";

export default interface User extends SignUp {
  id: string;
  isAdmin: boolean;
}
