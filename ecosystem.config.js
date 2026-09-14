module.exports = {
  apps: [
    {
      name: 'qonevo-backend',
      cwd: './server',
      script: 'index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3012,
      },
    },
    {
      name: 'qonevo-frontend',
      cwd: './client',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3013',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3013,
      },
    },
  ],
};
