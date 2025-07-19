export default function handler(req, res) {
  const config = {
    ANTILINK: true,
    ANTIVIRTEX: false,
    ANTISPAMCHAT: true,
    BADWORD: true,
    WELCOME: false
  };

  res.status(200).json(config);
}
