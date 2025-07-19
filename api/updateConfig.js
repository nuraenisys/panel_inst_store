// File path: /api/updateConfig.js

export default async function handler(req, res) {
  const { GITHUB_TOKEN, REPO_NAME, OWNER_NAME } = process.env;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { key, value } = req.body;
  if (!key || typeof value === 'undefined') {
    return res.status(400).json({ error: 'Missing key or value' });
  }

  const branch = 'main';
  const configPath = 'config.json';

  try {
    const getFile = await fetch(`https://api.github.com/repos/${OWNER_NAME}/${REPO_NAME}/contents/${configPath}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!getFile.ok) {
      const error = await getFile.json();
      return res.status(getFile.status).json({ error });
    }

    const fileData = await getFile.json();
    const content = Buffer.from(fileData.content, 'base64').toString();
    const json = JSON.parse(content);

    // 🔄 Update the config
    json[key] = value;

    const updatedContent = Buffer.from(JSON.stringify(json, null, 2)).toString('base64');

    const update = await fetch(`https://api.github.com/repos/${OWNER_NAME}/${REPO_NAME}/contents/${configPath}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: `Update ${key} to ${value}`,
        content: updatedContent,
        sha: fileData.sha,
        branch: branch
      })
    });

    if (!update.ok) {
      const err = await update.json();
      return res.status(update.status).json({ error: err });
    }

    return res.status(200).json({ message: 'Config updated successfully', key, value });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error', detail: err.message });
  }
}// File path: /api/updateConfig.js

export default async function handler(req, res) {
  const { GITHUB_TOKEN, REPO_NAME, OWNER_NAME } = process.env;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { key, value } = req.body;
  if (!key || typeof value === 'undefined') {
    return res.status(400).json({ error: 'Missing key or value' });
  }

  const branch = 'main';
  const configPath = 'config.json';

  try {
    const getFile = await fetch(`https://api.github.com/repos/${OWNER_NAME}/${REPO_NAME}/contents/${configPath}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!getFile.ok) {
      const error = await getFile.json();
      return res.status(getFile.status).json({ error });
    }

    const fileData = await getFile.json();
    const content = Buffer.from(fileData.content, 'base64').toString();
    const json = JSON.parse(content);

    // 🔄 Update the config
    json[key] = value;

    const updatedContent = Buffer.from(JSON.stringify(json, null, 2)).toString('base64');

    const update = await fetch(`https://api.github.com/repos/${OWNER_NAME}/${REPO_NAME}/contents/${configPath}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: `Update ${key} to ${value}`,
        content: updatedContent,
        sha: fileData.sha,
        branch: branch
      })
    });

    if (!update.ok) {
      const err = await update.json();
      return res.status(update.status).json({ error: err });
    }

    return res.status(200).json({ message: 'Config updated successfully', key, value });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error', detail: err.message });
  }
}
