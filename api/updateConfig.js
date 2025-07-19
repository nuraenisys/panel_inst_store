export async function GET() {
  const config = {
    ANTILINK: true,
    ANTIVIRTEX: false,
    ANTISPAMCHAT: true,
    BADWORD: true,
    WELCOME: false
  };

  return new Response(JSON.stringify(config), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
