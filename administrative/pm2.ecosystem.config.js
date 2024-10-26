// run 
// pm2 start ecosystem.config.js
// pm2 save
// pm2 startup - to restart on reboot


module.exports = {
    apps: [
      {
        name: 'actions-runner',
        script: '/var/www/currency/administrative/actions-runner/run.sh',
        interpreter: 'bash',
        watch: false,
      },
      {
        name: 'back',
        script: 'npm',
        args: 'run start:prod',
        cwd: '/var/www/currency/front',
        watch: false,
      },
      {
        name: 'front',
        script: 'npm',
        args: 'run start',
        cwd: '/var/www/currency/front',
        watch: false,
      },
      {
        name: 'pm2-server-monitor',
        script: 'pm2-server-monit',
        watch: false,
      },
    ],
  };
  