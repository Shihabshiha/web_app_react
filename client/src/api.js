import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export function signup(data) {
  return axios.post(`${API_BASE_URL}/signup`, data);
}

export function login(data) {
  return axios.post(`${API_BASE_URL}/login`, data);
}

export function uploadProfileImage(formData, accessToken) {
  return axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function getProfileImage(data){
  return axios.post(`${API_BASE_URL}/profileImage`, data);
}

export function adminLogin(data){
  return axios.post(`${API_BASE_URL}/admin/login`, data)
}

export function getUsers(){
  return axios.get(`${API_BASE_URL}/admin/users-list`)
}

export function deleteTheUser(userId){
  return axios.delete(`${API_BASE_URL}/admin/deleteUser/${userId}`)
}
