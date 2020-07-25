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
      body: { run, encnode, ctx }
    } = req;

    // AUTHORIZATION START
    // if (!authorization) return res.json({ error: "not authorized" });
    // const token = authorization.substring(6).trim();
    // const result = await verifyEndpointToken(token);
    // res.json(result);
    // AUTHORIZATION END

    //INSTANTIATE SERVER START
    const E = new EngageCore({ flows, ctx });

    // ENCRYPTED NODE PROCESSING IF WE HAVE ONE
    if (encnode) {
      const { value, error } = cev.reveal({ cev: encnode });
      if (error) res.json({ error });
      console.log(`mounted encrypted node ${value.i} into flow dir`);
      // console.log(value);
      E.N[value.i] = value;
    }

    // SEE IF WE HAVE THE SPECIFIED FLOW
    if (!E.N[run]) return res.json({ error: `flow ${run} not found` });

    //E.CTX.CTX = ctx;
    await E.opEval.go([7, { "40": 1, flow: run }]);
    await E.evaluate();

    res.json({
      // flows: E.N,
      version: E.version(),
      ctx: E.CTX.CTX,
      output: E.getOutput()
    });
    // INSTANTIATE SERVER END
  } catch (e) {
    res.json({ error: e.message });
  }
}

const cors = micro();
export default cors(fn);
