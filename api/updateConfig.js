let config = {
  ANTIVIRTEX: true,
  ANTISPAMCHAT: true,
  ANTILINK: true,
  ANTILINKV2: false,
  ANTILINKWA: false,
  ANTILINKWAV2: false,
  ANTILINKCH: false,
  ANTILINKCHV2: false,
  ANTIDELETE: true,
  ANTIEDIT: true,
  ANTIGAME: true,
  ANTIFOTO: true,
  ANTIVIDEO: true,
  ANTIAUDIO: true,
  ANTIDOCUMENT: true,
  ANTIKONTAK: true,
  ANTISTICKER: true,
  ANTIPOLLING: true,
  ANTIVIRTEX: true,
  AUTOAI: false,
  AUTOSIMI: false,
  AUTORUSUH: false,
  BADWORD: true,
  BADWORDV2: true,
  BADWORDV3: true,
  LEFT: true,
  WELCOME: true,
  ONLYADMIN: true,
  ANTIBOT: false,
  ANTITAGSW: true,
  ANTITAGSW2: true,
  ANTITAGMETA: true,
  ANTITAGMETA2: true,
  ANTIFORWARD: true,
  ANTIFORWARD2: true,
  ANTIHIDETAG: true,
  ANTIHIDETAG2: true
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
