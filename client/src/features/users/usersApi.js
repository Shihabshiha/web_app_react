import { getUsers , deleteTheUser} from "../../api";

export function getUsersList(){
  return getUsers();
}

export function deleteUser(userId){
  return deleteTheUser(userId);
}
