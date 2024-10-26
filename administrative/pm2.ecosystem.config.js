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
        name: 'backend',
        script: '/var/www/currency/back/build/main.js',
        watch: false,
      },
      {
        name: 'frontend',
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
  