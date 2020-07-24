import micro from "micro-cors";
import { createAgentToken } from "@xpertana/xpejwt";

async function fn(req, res) {
  try {
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    const {
      headers: { authorization },
      body: { source, expiration }
      // query: { sitein, name }
    } = req;
    if (!authorization) return res.json({ error: "not authorized" });
    const auth0Token = authorization.substring(6).trim();
    const result = await createAgentToken({
      auth0Token,
      expiration
    });

    res.json(result);
  } catch (e) {
    res.json({ error: e.message });
  }
}

const cors = micro();
export default cors(fn);
