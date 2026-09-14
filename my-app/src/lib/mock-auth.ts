export interface User {
    id: string;
    fullName: string;
    email: string;
    createdAt: string;
}

// In-memory/LocalStorage simulation of a secure backend
// NEVER do this in production.
export const mockAuthService = {
    register: (fullName: string, email: string, password: string): { success: boolean, message?: string } => {
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        if (users[email]) return { success: false, message: 'User already exists' };
        
        // Simple hash simulation
        const userId = btoa(email);
        users[email] = {
            id: userId,
            fullName,
            email,
            passwordHash: btoa(password), // NEVER store passwords like this in real apps
            createdAt: new Date().toISOString()
        };
        localStorage.setItem('users', JSON.stringify(users));
        return { success: true };
    },
    login: (email: string, password: string): { success: boolean, user?: User, message?: string } => {
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const user = users[email];
        if (!user || user.passwordHash !== btoa(password)) {
            return { success: false, message: 'Invalid credentials' };
        }
        return { 
            success: true, 
            user: { id: user.id, fullName: user.fullName, email: user.email, createdAt: user.createdAt } 
        };
    },
    updateProfile: (email: string, fullName: string): { success: boolean, user?: User, message?: string } => {
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const user = users[email];
        if (!user) return { success: false, message: 'User not found' };
        
        user.fullName = fullName;
        users[email] = user;
        localStorage.setItem('users', JSON.stringify(users));
        return { 
            success: true, 
            user: { id: user.id, fullName: user.fullName, email: user.email, createdAt: user.createdAt } 
        };
    },
    changePassword: (email: string, currentPassword: string, newPassword: string): { success: boolean, message?: string } => {
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const user = users[email];
        if (!user || user.passwordHash !== btoa(currentPassword)) {
            return { success: false, message: 'Invalid current password' };
        }
        user.passwordHash = btoa(newPassword);
        users[email] = user;
        localStorage.setItem('users', JSON.stringify(users));
        return { success: true };
    },
    logout: () => {
        // Nothing to do for this simulation
    }
};
