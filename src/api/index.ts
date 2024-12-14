import type { User } from "@/types/User";

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

// Get
export async function getUsers() {
  const response = await fetch(`${API_URL}/get-users`);
  return response.json();
}

