import axios from 'axios';
const BACKEND_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

const API_KEY = 'AIzaSyBYHNhJXbrM57OfkH888CUUH3vf0Tlf7jM';

// export async function createUser(email, password) {
//   const response = await axios.post(BACKEND_URL + API_KEY, {
//     email: email,
//     password: password,
//     returnSecureToken: true,
//   });
// }

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  console.log(JSON.stringify(response.data, 0, 2));

  const token = response.data.idToken;
  return token;
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}
