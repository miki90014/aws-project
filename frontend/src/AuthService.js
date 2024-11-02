const API_URL = 'http://backend:5000';

/*export async function signup(username, password, email) {
  console.log(`${API_URL}/signup`)
  console.log(username, password, email)
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email }),
  });
  console.log("Something yes'nt")
  console.log(response)
  return response.json();
}*/

export async function login(username, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}

export async function refreshToken(refreshToken) {
  const response = await fetch(`${API_URL}/refresh_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  return response.json();
}

export async function logout(accessToken) {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken,
    },
  });
  return response.json();
}