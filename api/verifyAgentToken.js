import micro from "micro-cors";
import { verifyAgentToken } from "@xpertana/xpejwt";

async function fn(req, res) {
  try {
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    const {
      headers: { authorization }
    } = req;
    if (!authorization) return res.json({ error: "not authorized" });
    const token = authorization.substring(6).trim();
    const result = await verifyAgentToken(token);
    res.json(result);
  } catch (e) {
    res.json({ error: e.message });
  }
}

const cors = micro();
export default cors(fn);
