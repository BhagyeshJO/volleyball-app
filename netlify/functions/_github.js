const GITHUB_API = "https://api.github.com";
const API_VERSION = "2022-11-28";

function getEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function getConfig() {
  return {
    token: getEnv("GITHUB_TOKEN"),
    owner: getEnv("GITHUB_OWNER"),
    repo: getEnv("GITHUB_REPO"),
    path: getEnv("GITHUB_DATA_PATH"),
  };
}

async function githubRequest(url, options = {}) {
  const { token } = getConfig();

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": API_VERSION,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || `GitHub request failed: ${response.status}`);
  }

  return data;
}

export async function readSessionsFile() {
  const { owner, repo, path } = getConfig();
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`;
  const data = await githubRequest(url, { method: "GET" });

  const content = Buffer.from(data.content, "base64").toString("utf8");
  const parsed = JSON.parse(content);

  return {
    sha: data.sha,
    sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
  };
}

export async function writeSessionsFile(sessions, sha, message) {
  const { owner, repo, path } = getConfig();
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`;

  const body = {
    message,
    content: Buffer.from(JSON.stringify({ sessions }, null, 2), "utf8").toString("base64"),
    sha,
  };

  return githubRequest(url, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function deleteSessionsFile(sha, message) {
  const { owner, repo, path } = getConfig();
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`;

  return githubRequest(url, {
    method: "DELETE",
    body: JSON.stringify({
      message,
      sha,
    }),
  });
}

export function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    },
    body: JSON.stringify(body),
  };
}

export function normalizeName(name) {
  return String(name || "").trim().toLowerCase().replace(/\s+/g, " ");
}

export function sortSessions(sessions) {
  return [...sessions].sort((a, b) =>
    `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
  );
}