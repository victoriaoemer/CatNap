import type { User, UserData } from "@/types/User";

const API_URL = 'http://localhost:4000';

// Create
export async function createUser(data: User) {
  const response = await fetch(`${API_URL}/create-user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Get all users
export async function getUsers() {
  const response = await fetch(`${API_URL}/get-users`);
  return response.json();
}

// Create user data
export async function createUserData(data: UserData) {
  const response = await fetch(`${API_URL}/create-data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Get one user data
export async function getUserData(username: string) {
  const response = await fetch(`${API_URL}/get-data/${username}`);
  return response.json();
}

