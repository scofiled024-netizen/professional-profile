import type { Connect, IncomingMessage, ServerResponse } from "node:http";
import type { Plugin, PreviewServer, ViteDevServer } from "vite";
import { loadEnv } from "vite";
import { isDeepSeekConfigured } from "./lib/deepseekEnv.js";

type ApiHandler = (
  req: IncomingMessage & { body?: unknown; query?: Record<string, string> },
  res: ServerResponse,
) => Promise<void> | void;

function applyLocalEnv(mode: string, envDir: string) {
  const env = loadEnv(mode, envDir, "");
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw.trim() ? JSON.parse(raw) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  json: (payload: unknown) => VercelResponse;
};

function wrapResponse(res: ServerResponse): VercelResponse {
  const wrapped = res as VercelResponse;
  wrapped.status = (code: number) => {
    res.statusCode = code;
    return wrapped;
  };
  wrapped.json = (payload: unknown) => {
    if (!res.headersSent) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(payload));
    }
    return wrapped;
  };
  return wrapped;
}

function attachApiMiddleware(
  middlewares: Connect.Server,
  mode: string,
  envDir: string,
) {
  applyLocalEnv(mode, envDir);

  middlewares.use(async (req, res, next) => {
    const url = req.url?.split("?")[0] ?? "";
    const isMatchPost = req.method === "POST" && url === "/api/jd-match";
    const isRemainingGet = req.method === "GET" && url === "/api/jd-match-remaining";

    if (!isMatchPost && !isRemainingGet) {
      next();
      return;
    }

    try {
      if (isMatchPost && !isDeepSeekConfigured()) {
        wrapResponse(res).status(503).json({ error: "MISSING_API_KEY" });
        return;
      }

      const handlerModule = isMatchPost
        ? await import("./api/jd-match.js")
        : await import("./api/jd-match-remaining.js");
      const handler = handlerModule.default as ApiHandler;

      if (isMatchPost) {
        (req as IncomingMessage & { body?: unknown }).body = await readJsonBody(req);
      }

      await handler(req as IncomingMessage & { body?: unknown }, wrapResponse(res));
    } catch (err) {
      console.error("[api-dev]", err);
      if (!res.headersSent) {
        wrapResponse(res).status(500).json({ error: "API_ERROR" });
      }
    }
  });
}

function wireApi(server: ViteDevServer | PreviewServer) {
  attachApiMiddleware(server.middlewares, server.config.mode, server.config.envDir);
}

export function apiDevPlugin(): Plugin {
  return {
    name: "api-dev",
    configureServer(server) {
      wireApi(server);
    },
    configurePreviewServer(server) {
      wireApi(server);
    },
  };
}
