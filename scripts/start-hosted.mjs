// Serve the built app and existing provider middleware with an explicit host list.
import { preview } from 'vite';

const hostname = process.env.RENDER_EXTERNAL_HOSTNAME;
if (hostname) {
  process.env.GEV_ALLOWED_HOSTS = [process.env.GEV_ALLOWED_HOSTS, hostname]
    .filter(Boolean)
    .join(',');
}
const server = await preview({
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 10000,
    strictPort: true,
  },
});
server.printUrls();
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => server.httpServer.close(() => process.exit(0)));
}
