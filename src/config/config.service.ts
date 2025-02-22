import { getSafeEnv } from '@app/common/utils';

export const getConfig = () => {
  return {
    node_env: getSafeEnv('NODE_ENV'),
    allowedOrigins: getSafeEnv('ALLOWED_ORIGINS'),
    base_url: getSafeEnv('BASE_URL'),
    port: getSafeEnv('PORT'),

    jwt_secret: getSafeEnv('JWT_SECRET'),
    jwt_expires: getSafeEnv('JWT_EXPIRES'),
  };
};
