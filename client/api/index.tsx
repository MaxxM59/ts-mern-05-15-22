import axios from 'axios';

// get datas
const base = process.env.NEXT_PUBLIC_API_ENDPOINT;
const userBase = `${base}/api/users`;
const authBase = `${base}/api/auth`;

// register
export function registerUser(payload: {
    username: string;
    password: string;
    email: string;
    confirmPassword: string;
}) {
    return axios.post(userBase, payload).then((res) => res.data);
}
// login

export function loginUser(payload: { email: string; password: string }) {
    return axios
        .post(authBase, payload, { withCredentials: true })
        .then((res) => res.data);
}

export function getMe() {
    return axios
        .get(userBase, { withCredentials: true })
        .then((res) => res.data)
        .catch(() => {
            return null;
        });
}
