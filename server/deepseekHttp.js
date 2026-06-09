import dotenv from "dotenv";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(rootDir, ".env") });

function tlsInsecure() {
  const value = process.env.DEEPSEEK_TLS_INSECURE;
  return value === "1" || value === "true";
}

let agent;

function getAgent() {
  if (!agent) {
    agent = new https.Agent({
      rejectUnauthorized: !tlsInsecure(),
    });
  }
  return agent;
}

export function isTlsInsecure() {
  return tlsInsecure();
}

export function postJson(url, headers, body) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const payload = Buffer.from(body);

    const req = https.request(
      {
        hostname: parsed.hostname,
        port: parsed.port || 443,
        path: parsed.pathname,
        method: "POST",
        agent: getAgent(),
        headers: {
          ...headers,
          "Content-Length": payload.length,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve({ status: res.statusCode ?? 502, body: data });
        });
      },
    );

    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}
