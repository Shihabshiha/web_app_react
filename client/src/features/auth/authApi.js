import { signup, login } from "../../api";

export function signupUser(name, email, password, phoneNumber) {
  const data = { name, email, password, phoneNumber };
  return signup(data);
}

export function loginUser(email, password) {
  const data = { email, password };
  return login(data);
}
