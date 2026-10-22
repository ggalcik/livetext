import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const relay = spawn(process.execPath, [fileURLToPath(new URL('../relay/server.cjs', import.meta.url))], {
  stdio: 'inherit',
})
let server
let stopping = false

async function stop(code = 0) {
  if (stopping) return
  stopping = true
  relay.kill()
  await server?.close()
  process.exit(code)
}

process.on('SIGINT', () => void stop())
process.on('SIGTERM', () => void stop())
relay.on('error', (error) => {
  console.error(error)
  void stop(1)
})
relay.on('exit', (code) => {
  if (!stopping) void stop(code ?? 1)
})

try {
  server = await createServer()
  await server.listen()
  server.printUrls()
} catch (error) {
  console.error(error)
  await stop(1)
}
