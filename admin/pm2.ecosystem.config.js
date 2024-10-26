// run:
// pm2 start ecosystem.config.js
// pm2 save
// pm2 startup - to restart on reboot

module.exports = {
  apps: [
    {
      name: 'actions',
      script: '/var/www/currency/admin/actions-runner/run.sh',
      interpreter: 'bash',
      watch: false,
    },
    {
      name: 'back',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/currency/back',
      watch: false,
    },
    {
      name: 'front',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/currency/front',
      watch: false,
    },
  ],
};
