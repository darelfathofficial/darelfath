import { google, sheets_v4 } from "googleapis";
import NodeCache from "node-cache";

const scopes: string[] = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const auth = new google.auth.JWT({
  email: process.env.CLIENT_EMAIL,
  key: (process.env.PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
  scopes: scopes,
});
const cache = new NodeCache({ stdTTL: 1800, checkperiod: 1860 });

export const get = async (data: sheets_v4.Params$Resource$Spreadsheets$Values$Get): Promise<any[][] | null | undefined> => {
  const params = { spreadsheetId: process.env.SPREADSHEET_ID, ...data };
  const cacheKey = `${params.spreadsheetId ?? ""}_${params.range ?? ""}`;

  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get(params);

  cache.set(cacheKey, response.data.values, 1800);

  return response.data.values;
};
