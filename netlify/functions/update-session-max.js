import { json, readSessionsFile, sortSessions, writeSessionsFile } from "./_github.js";

function deriveMinPlayers(maxPlayers) {
  if (maxPlayers >= 18) return 10;
  if (maxPlayers >= 12) return 8;
  return 6;
}

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
    const max = Number(body.max);
    const creatorToken = String(body.creatorToken || "").trim();

    if (!sessionId || !Number.isInteger(max) || !creatorToken) {
      return json(400, { error: "sessionId, max, and creatorToken are required" });
    }

    if (max < 8 || max > 24) {
      return json(400, { error: "max must be between 8 and 24" });
    }

    const { sessions, sha } = await readSessionsFile();
    const existing = sessions.find((session) => session.id === sessionId);

    if (!existing) {
      return json(404, { error: "Session not found" });
    }

    if (existing.creatorToken !== creatorToken) {
      return json(403, { error: "Only the session creator can update max players" });
    }

    if (existing.names.length > max) {
      return json(400, {
        error: "Max players cannot be lower than currently joined players",
      });
    }

    const min = deriveMinPlayers(max);

    const updated = sessions.map((session) =>
      session.id === sessionId
        ? {
            ...session,
            max,
            min,
          }
        : session
    );

    const sorted = sortSessions(updated);

    await writeSessionsFile(
      sorted,
      sha,
      `Update max players for session ${sessionId} to ${max}`
    );

    return json(200, {
      sessions: sorted.map(stripCreatorToken),
    });
  } catch (error) {
    return json(500, { error: error.message });
  }
}

function stripCreatorToken(session) {
  const { creatorToken, ...publicSession } = session;
  return publicSession;
}