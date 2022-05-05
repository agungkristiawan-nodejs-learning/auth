import {Request, ResponseToolkit } from 'hapi';
// import { genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const users  = new  Map<string,any> ([
    ['admin',{password : '12345', role: 'admin', email: 'admin@onlineshop.com'}], 
    ['agung',{password : 'pass174333', role: 'customer', email: 'agungkristiawan@onlineshop.com'}], 
]);

const AuthHandler = {
    login : ({auth: {credentials}}: Request) => {
        return {user: credentials, 
            accessToken : sign(
                {...credentials },
                process.env.SECRET_KEY as string, 
                { expiresIn: '1m'}
            )
        }
    }
}

export default AuthHandler;