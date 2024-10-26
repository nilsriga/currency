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
    deploy: {
      production: {
        user: 'node',
        host: '134.209.252.76',
        ref: 'origin/master',
        repo: 'git@github.com:repo.git',
        path: '/var/www/currency/administrative',
        'post-deploy': 'pm2 link 3rpqhbfaw3s7g95 pdf8z9ta5aehqxq && pm2 reload ecosystem.config.js --env production',
      },
    },
  };
  