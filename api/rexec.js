import micro from "micro-cors";
import {
  verifyEndpointToken,
  verifyUserToken,
  verifySiteToken
} from "@xpertana/xpejwt";

const { EngageCore } = require("@xpertana/engage-core");
const cev = require("@xpertana/engage-lib-cev");

// the "client" in this case is the server. make sense? ;-)
const flows = require("../flc/client");

async function fn(req, res) {
  try {
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    // EXTRACT PARAMS
    const {
      headers: { authorization },
      body: { ctx }
    } = req;

    // AUTHORIZATION START
    // if (!authorization) return res.json({ error: "not authorized" });
    // const token = authorization.substring(6).trim();
    // const result = await verifyEndpointToken(token);
    // res.json(result);
    // AUTHORIZATION END

    //INSTANTIATE SERVER START
    const E = new EngageCore();

    E.CTX.CTX = ctx;
    await E.evaluate();

    res.json({
      version: E.version(),
      ctx: E.CTX.CTX
    });
    // INSTANTIATE SERVER END
  } catch (e) {
    res.json({ error: e.message });
  }
}

const cors = micro();
export default cors(fn);
