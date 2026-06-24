const PLACEHOLDER_KEYS = new Set([
  "",
  "your_key_here",
  "your_deepseek_api_key_here",
  "your_real_key_here",
]);

export function getDeepSeekApiKey() {
  return process.env.DEEPSEEK_API_KEY?.trim() ?? "";
}

export function isDeepSeekConfigured() {
  const key = getDeepSeekApiKey();
  return key.length > 0 && !PLACEHOLDER_KEYS.has(key);
}
