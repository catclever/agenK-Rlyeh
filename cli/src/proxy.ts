import express from 'express';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import { generatePayload } from './bundler.js';

export async function startProxy(targetUrl: string, port: number, tools: string[]) {
  const app = express();
  
  // Endpoint to serve our bundled React Agent payload
  app.get('/__agent_k__/bundle.js', async (req, res) => {
    try {
      console.log(`[Proxy] Generating dynamic ESBuild payload for tools: ${tools.join(', ')}...`);
      const code = await generatePayload(tools);
      res.setHeader('Content-Type', 'application/javascript');
      res.send(code);
    } catch (e: any) {
      console.error('[Proxy ERROR] Bundler failed:', e.message);
      res.status(500).send(`console.error("[Agent K] Bundler failed: " + ${JSON.stringify(e.message)})`);
    }
  });

  // Proxy all traffic to the target URL natively
  app.use('/', createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    selfHandleResponse: true,
    on: {
      proxyRes: responseInterceptor(async (responseBuffer, proxyRes) => {
        // Intercept HTML pages gracefully to inject our scripts
        const contentType = proxyRes.headers['content-type'];
        if (contentType && contentType.includes('text/html')) {
          const html = responseBuffer.toString('utf8');
          // Add our injection div and payload script just before </body>
          const injection = `
            <div id="agent-k-root" style="position:fixed; top:0; left:0; z-index:99999; pointer-events:none;"></div>
            <script type="module" src="/__agent_k__/bundle.js"></script>
          </body>`;
          // Simple replacement. For production resilience, we could use Cheerio.
          return html.replace('</body>', injection);
        }
        return responseBuffer;
      })
    }
  }));

  app.listen(port, () => {
    console.log(`\\n✅ [READY] Proxy Injector is live at: http://localhost:${port}`);
    console.log(`打开浏览器访问上方的本机 URL，即可在【${targetUrl}】里看到空投的 Component！\\n`);
  });
}
