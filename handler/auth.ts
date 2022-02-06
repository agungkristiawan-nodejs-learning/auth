import { Request, ResponseToolkit } from 'hapi';

const users = new Map<string, any>([
    ['admin', { password: '12345', role: 'admin', email: 'admin@onlineshop.com' }],
    ['agung', { password: 'pass174333', role: 'customer', email: 'agungkristiawan@onlineshop.com' }],
]);


export const validateJwt = async ({username, email}: any, req: Request,  h: ResponseToolkit) => {
    console.log(`received user data of ${username} with email = ${email}`);
    return {isValid: true};
}

export const validateBasic = async (
    req: Request,
    username: string,
    password: string,
    h: ResponseToolkit) => {

    console.log(`authenticate ${username}/${password}`);
    const user = users.get(username);
    if (user?.password === password) {
        return {
            isValid: true, credentials:
            {
                username,
                role: user.role,
                email: user.email
            }
        };
    } else {
        return { credentials: null, isValid: false };
    }
}