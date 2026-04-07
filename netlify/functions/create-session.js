import { json, readSessionsFile, sortSessions, writeSessionsFile } from "./_github.js";

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const date = String(body.date || "").trim();
    const time = String(body.time || "").trim();
    const location = String(body.location || "").trim();

    if (!date || !time || !location) {
      return json(400, { error: "date, time, and location are required" });
    }

    const { sessions, sha } = await readSessionsFile();

    const newSession = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      date,
      time,
      location,
      max: 18,
      min: 10,
      names: [],
    };

    const updated = sortSessions([...sessions, newSession]);

    await writeSessionsFile(updated, sha, `Create session ${date} ${time} ${location}`);

    return json(200, { sessions: updated, created: newSession });
  } catch (error) {
    return json(500, { error: error.message });
  }
}