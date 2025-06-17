// ARVIPOA Production Deployment Configuration
module.exports = {
  // Server Configuration
  server: {
    host: 'vmi2359040.contaboserver.net',
    username: 'root',
    port: 22,
    deployPath: '/var/www/arvipoa.org',
    backupPath: '/var/backups/arvipoa-laravel-backup',
    nodeVersion: '20.x'
  },

  // Build Configuration
  build: {
    outputDir: 'dist',
    clientDir: 'client/dist',
    serverFiles: [
      'server/',
      'shared/',
      'package.json',
      'package-lock.json',
      'drizzle.config.ts',
      'tsconfig.json'
    ]
  },

  // Database Configuration
  database: {
    migrate: true,
    backup: true,
    env: 'production'
  },

  // Domain Configuration
  domain: {
    primary: 'arvipoa.org',
    www: 'www.arvipoa.org',
    ssl: true,
    nginx: true
  },

  // Auto-deployment Configuration
  autoUpdate: {
    enabled: true,
    webhook: true,
    gitSync: false, // Since we're deploying from Replit
    restartServices: ['arvipoa-app', 'nginx']
  }
};