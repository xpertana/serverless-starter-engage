import micro from "micro-cors";
import { createSiteToken } from "@xpertana/xpejwt";

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
    const agentToken = authorization.substring(6).trim();
    const result = await createSiteToken({ agentToken, site, expiration });
    res.json(result);
  } catch (e) {
    res.json({ error: e.message });
  }
}

const cors = micro();
export default cors(fn);
