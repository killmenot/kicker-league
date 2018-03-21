import http from 'http'
import createApp from './app'

const port = normalizePort(process.env.PORT || '4000')
const app = createApp()
app.set('port', port)

const server = http.createServer(app)
server.listen(port, () => {
  console.info('Express server listening on port ' + server.address().port)
})
server.on('error', onError)
server.on('listening', onListening)

// process.on('SIGINT', () => {
//   process.exit()
// })

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.info('Listening on ' + bind);
}
