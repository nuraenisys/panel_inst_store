let config = {
  ANTILINK: true,
  ANTIVIRTEX: true,
  BADWORD: true,
  ANTISPAMCHAT: true,
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(config);
  } else if (req.method === 'POST') {
    try {
      config = { ...config, ...req.body };
      res.status(200).json({ message: 'Config diperbarui', config });
    } catch (err) {
      res.status(500).json({ error: 'Gagal update config' });
    }
  } else {
    res.status(405).json({ error: 'Metode tidak didukung' });
  }
}
