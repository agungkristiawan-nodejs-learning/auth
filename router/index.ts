import { Server, Request } from 'hapi';
import { sign } from 'jsonwebtoken';

const Router = (server: Server) => {
    server.route(
        [
            {
                method: 'GET',
                path: '/ping',
                handler: (req: Request) => {
                    return { message: 'pong!' };
                },
                options: {
                    auth: { strategy: 'jwt' }
                }
            },

            {
                method: 'POST',
                path: '/login',
                async handler({ payload, auth: { credentials } }: Request) {
                    console.log(credentials);
                    return {
                        user: credentials,
                        accessToken: sign(
                            { ...credentials },
                            process.env.SECRET_KEY,
                            { expiresIn: process.env.TOKEN_LIFESPAN }
                        )
                    };
                },
                options: {
                    auth: { strategy: 'simple' }
                }
            }
        ]
    )
}

export default Router;
