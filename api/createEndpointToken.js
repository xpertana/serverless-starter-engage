import micro from "micro-cors";
import { createEndpointToken } from "@xpertana/xpejwt";

async function fn(req, res) {
  try {
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    const {
      headers: { authorization }
      // body: { source },
      // query: { sitein, name }
    } = req;
    //if (!authorization || authorization.substring(0, 6) !== "Bearer")
    //  return res.json({ error: "not authorized" });
    // const token = authorization.substring(6).trim();
    const result = await createEndpointToken();
    res.json(result);
  } catch (e) {
    res.json({ error: e.message });
  }
}

const cors = micro();
export default cors(fn);
