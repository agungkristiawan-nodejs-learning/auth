import * as Hapi from '@hapi/hapi';
import Router from './router';
import { validateBasic, validateJwt } from './handler/auth';

import { config } from 'dotenv';

config();

const server = Hapi.server({
    port: process.env.PORT
});

const init  = async() => {
    await server.register(require('hapi-auth-jwt2'));
    await server.register(require('@hapi/basic'));
    server.auth.strategy('jwt','jwt',{key: process.env.SECRET_KEY, validate: validateJwt});
    server.auth.strategy('simple','basic', { validate: validateBasic });
    server.auth.default('jwt');
    await server.start();
    Router(server);
}

init();