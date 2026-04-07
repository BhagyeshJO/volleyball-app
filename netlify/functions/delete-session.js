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
    const sessionId = Number(body.sessionId);

    if (!sessionId) {
      return json(400, { error: "sessionId is required" });
    }

    const { sessions, sha } = await readSessionsFile();
    const exists = sessions.some((item) => item.id === sessionId);

    if (!exists) {
      return json(404, { error: "Session not found" });
    }

    const updated = sortSessions(sessions.filter((item) => item.id !== sessionId));

    await writeSessionsFile(updated, sha, `Delete session ${sessionId}`);

    return json(200, { sessions: updated });
  } catch (error) {
    return json(500, { error: error.message });
  }
}