import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const nextServer = axios.create({
baseURL: BASE_URL,  
withCredentials: true,
});



// lib/api/api.ts

// import axios from 'axios';

// export const nextServer = axios.create({
// baseURL: 'http://localhost:3000/api',
// withCredentials: true, // дозволяє axios працювати з cookie
// });
