const DAILY_LIMIT = 20;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
  }

  return res.status(200).json({
    remaining: DAILY_LIMIT,
    limit: DAILY_LIMIT,
  });
}
