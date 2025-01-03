import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Verifique a URL base configurada
console.log('Axios Base URL:', process.env.NEXT_PUBLIC_API_BASE_URL);

export default axiosInstance;
