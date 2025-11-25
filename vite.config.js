import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    cors: true,
    port: 3000,
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // Log requests for debugging
        if (req.url && (req.url.includes('/manifest.json') || req.url.includes('/pf-signin') || req.url.includes('/auth/postback/tunnel'))) {
          // eslint-disable-next-line no-console
          console.log('[vite proxy middleware] incoming request:', req.method, req.url);
        }

        // Server-side proxy for manifest.json: fetch remote and follow redirects,
        // then return final response to browser to avoid CORS/redirect issues.
        if (req.method === 'GET' && req.url && req.url.startsWith('/manifest.json')) {
          const remote = 'https://stunning-happiness-jj6j6vv967g257j6-3000.app.github.dev/manifest.json';
          try {
            const resp = await fetch(remote, { redirect: 'follow' });
            // copy status and headers (but ensure we set CORS)
            res.statusCode = resp.status;
            resp.headers.forEach((v, k) => {
              // avoid exposing hop-by-hop headers
              if (!['connection', 'keep-alive', 'transfer-encoding'].includes(k.toLowerCase())) {
                res.setHeader(k, v);
              }
            });
            res.setHeader('Access-Control-Allow-Origin', '*');
            const buffer = Buffer.from(await resp.arrayBuffer());
            return res.end(buffer);
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error('[vite manifest proxy] fetch error:', err);
            res.statusCode = 502;
            return res.end('manifest proxy error');
          }
        }

        next();
      });
    },
    proxy: {
      // Proxy manifest requests to the remote host to avoid CORS in the browser
      '/manifest.json': {
        target: 'https://stunning-happiness-jj6j6vv967g257j6-3000.app.github.dev',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/manifest.json/, '/manifest.json')
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
