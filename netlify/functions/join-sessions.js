import {
  json,
  normalizeName,
  readSessionsFile,
  sortSessions,
  writeSessionsFile,
} from "./_github.js";

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
    const name = String(body.name || "").trim();
    const normalized = normalizeName(name);

    if (!sessionId || !name) {
      return json(400, { error: "sessionId and name are required" });
    }

    const { sessions, sha } = await readSessionsFile();
    const session = sessions.find((item) => item.id === sessionId);

    if (!session) {
      return json(404, { error: "Session not found" });
    }

    const existing = session.names.map(normalizeName);
    if (existing.includes(normalized)) {
      return json(400, { error: "This name is already counted in" });
    }

    if (session.names.length >= session.max) {
      return json(400, { error: "No more place left" });
    }

    const updated = sessions.map((item) =>
      item.id === sessionId
        ? { ...item, names: [...item.names, name] }
        : item
    );

    const sorted = sortSessions(updated);

    await writeSessionsFile(sorted, sha, `Join session ${sessionId} with ${name}`);

    return json(200, { sessions: sorted });
  } catch (error) {
    return json(500, { error: error.message });
  }
}