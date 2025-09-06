const { spawn } = require('child_process');
const path = require('path');

// Start the micro frontend
const mfProcess = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'music-library-mf'),
  stdio: 'inherit',
  shell: true
});

// Start the main app after a short delay to ensure the micro frontend is ready
setTimeout(() => {
  const appProcess = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'main-app'),
    stdio: 'inherit',
    shell: true
  });

  appProcess.on('error', (error) => {
    console.error('Error starting main app:', error);
  });
}, 3000);

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down all processes...');
  process.exit();
});

mfProcess.on('error', (error) => {
  console.error('Error starting micro frontend:', error);
});
