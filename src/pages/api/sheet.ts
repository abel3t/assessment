import { google } from 'googleapis';

async function handler(req: any, res: any) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n')
    },
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/spreadsheets'
    ]
  });

  const sheets = google.sheets({
    auth,
    version: 'v4'
  });

  if (req.method === 'POST') {
    const { name, worship, discipleship, fellowship, ministry, evangelism, date } = req.body;

    if (!name || !worship || !discipleship || !fellowship || !ministry || !evangelism || !date) {
      return res.status(400).json({ status: 'Failed!' });
    }

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      valueInputOption: 'USER_ENTERED',
      range: 'Sheet1',
      requestBody: {
        values: [ [ name, worship, discipleship, fellowship, ministry, evangelism, date ] ]
      }
    });

    res.json({ status: 'OK', data: response });
  }
}

export default handler;
