import { json, readSessionsFile, sortSessions, writeSessionsFile } from "./_github.js";
import crypto from "node:crypto";

function deriveMinPlayers(maxPlayers) {
  if (maxPlayers >= 18) return 10;
  if (maxPlayers >= 12) return 8;
  return 6;
}

function createCreatorToken() {
  return crypto.randomBytes(24).toString("hex");
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
    const date = String(body.date || "").trim();
    const time = String(body.time || "").trim();
    const location = String(body.location || "").trim();
    const max = Number(body.max);

    if (!date || !time || !location) {
      return json(400, { error: "date, time, and location are required" });
    }

    if (!Number.isInteger(max) || max < 8 || max > 24) {
      return json(400, { error: "max must be an integer between 8 and 24" });
    }

    const min = deriveMinPlayers(max);
    const creatorToken = createCreatorToken();

    const { sessions, sha } = await readSessionsFile();

    const newSession = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      date,
      time,
      location,
      max,
      min,
      names: [],
      creatorToken,
    };

    const updated = sortSessions([...sessions, newSession]);

    await writeSessionsFile(
      updated,
      sha,
      `Create session ${date} ${time} ${location} max ${max}`
    );

    return json(200, {
      sessions: updated.map(stripCreatorToken),
      created: {
        ...stripCreatorToken(newSession),
        creatorToken,
      },
    });
  } catch (error) {
    return json(500, { error: error.message });
  }
}

function stripCreatorToken(session) {
  const { creatorToken, ...publicSession } = session;
  return publicSession;
}