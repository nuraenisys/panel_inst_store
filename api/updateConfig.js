import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { key, value } = req.body;

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const OWNER = process.env.OWNER_NAME;
  const REPO = process.env.REPO_NAME;
  const FILE_PATH = "config.json"; // file config di repo bot kamu

  if (!GITHUB_TOKEN || !OWNER || !REPO) {
    return res.status(500).json({ error: "Environment variables not set" });
  }

  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  try {
    // Get file content
    const { data: fileData } = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
    });

    const content = Buffer.from(fileData.content, "base64").toString("utf8");
    const config = JSON.parse(content);

    // Ubah config
    config[key] = value;

    const updatedContent = Buffer.from(JSON.stringify(config, null, 2)).toString("base64");

    // Commit ke GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
      message: `Update ${key} to ${value}`,
      content: updatedContent,
      sha: fileData.sha,
    });

    res.status(200).json({ message: "Config updated successfully", key, value });

  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ error: "Update failed", details: error.message });
  }
}
