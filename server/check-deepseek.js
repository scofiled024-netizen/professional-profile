import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { isTlsInsecure, postJson } from "./deepseekHttp.js";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(rootDir, ".env") });

const apiKey = process.env.DEEPSEEK_API_KEY?.trim();

if (!apiKey || apiKey === "your_key_here") {
  console.error("FAIL: DEEPSEEK_API_KEY is missing in .env");
  process.exit(1);
}

console.log("Testing DeepSeek API key (direct HTTPS)...");
if (isTlsInsecure()) {
  console.warn("WARNING: DEEPSEEK_TLS_INSECURE is enabled — TLS certificate verification is off.");
}

try {
  const response = await postJson(
    "https://api.deepseek.com/chat/completions",
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: "Reply with JSON: {\"ok\":true}" }],
      response_format: { type: "json_object" },
      max_tokens: 20,
    }),
  );

  console.log("HTTP status:", response.status);

  if (response.status < 200 || response.status >= 300) {
    console.error("Response:", response.body.slice(0, 500));
    if (response.status === 401) console.error("\n→ API key is invalid.");
    if (response.status === 402) console.error("\n→ Account balance is insufficient. Top up at https://platform.deepseek.com/");
    process.exit(1);
  }

  console.log("OK: DeepSeek API is working.");
  console.log("Sample:", response.body.slice(0, 200));
} catch (err) {
  console.error("FAIL: Network error reaching api.deepseek.com");
  console.error(err instanceof Error ? err.message : err);
  if (String(err).includes("self-signed certificate")) {
    console.error("\n→ Add DEEPSEEK_TLS_INSECURE=1 to your .env file, then retry.");
  }
  process.exit(1);
}
