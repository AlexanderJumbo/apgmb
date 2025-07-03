import { BASE_URL } from '../../config'

export const login = async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}auth/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
    });

    if (!res.ok) throw new Error('Credenciales inválidas');

    const data = await res.json();
    return data;
};