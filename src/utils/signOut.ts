
export function signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}