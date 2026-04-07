import { json, readSessionsFile, sortSessions } from "./_github.js";

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== "GET") {
    return json(405, { error: "Method not allowed" });
  }

  try {
    const { sessions } = await readSessionsFile();
    return json(200, { sessions: sortSessions(sessions) });
  } catch (error) {
    return json(500, { error: error.message });
  }
}