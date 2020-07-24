import micro from "micro-cors";
import { createUserToken } from "@xpertana/xpejwt";

async function fn(req, res) {
  try {
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    const {
      headers: { authorization },
      body: { expiration }
      // query: { sitein, name }
    } = req;
    if (!authorization) return res.json({ error: "not authorized" });
    const didToken = authorization.substring(6).trim();
    const result = await createUserToken({ didToken, expiration });
    res.json(result);
  } catch (e) {
    res.json({ error: e.message });
  }
}

const cors = micro();
export default cors(fn);
