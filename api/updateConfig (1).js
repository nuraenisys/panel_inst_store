
import fs from 'fs';
import path from 'path';

const configPath = path.resolve('./config.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      res.status(200).json(config);
    } catch (error) {
      res.status(500).json({ error: 'Gagal membaca config.json' });
    }
  } else if (req.method === 'POST') {
    try {
      const newConfig = req.body;
      fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
      res.status(200).json({ message: 'Config berhasil diperbarui' });
    } catch (error) {
      res.status(500).json({ error: 'Gagal menyimpan config' });
    }
  } else {
    res.status(405).json({ error: 'Metode tidak diizinkan' });
  }
}
