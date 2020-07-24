import micro from "micro-cors";
import { createShareToken } from "@xpertana/xpejwt";

async function fn(req, res) {
  try {
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    const {
      headers: { authorization },
      body: { site, expiration }
    } = req;
    if (!authorization) return res.json({ error: "not authorized" });
    const userToken = authorization.substring(6).trim();
    const result = await createShareToken({
      site,
      expiration,
      userToken
    });
    res.json(result);
  } catch (e) {
    res.json({ error: e.message });
  }
}

const cors = micro();
export default cors(fn);
