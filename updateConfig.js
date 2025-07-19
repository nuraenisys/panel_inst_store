
export async function GET() {
  const config = {
    ANTILINK: true,
    ANTIVIRTEX: false,
    ANTISPAMCHAT: true,
    BADWORD: true,
    WELCOME: false
  };
  return Response.json(config);
}
