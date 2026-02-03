import axios from 'axios';

// Function to logout the user
export async function logout() {
    const refresh = localStorage.getItem('refreshToken');
    try {
        await axios.delete('/auth/logout', { data: { token: refresh } });
    } catch (err) {
        console.warn('Logout request failed', err);
    } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default logout;
