import _ from "lodash";
import redisFetch from "../../helpers/redisFetch";

export default function(app, nano) {
  app.get("/peer_count", async (req, res) => {
    try {
      const peerCount = await redisFetch("peerCount", 60, async () => {
        return _.keys((await nano.rpc("peers")).peers).length;
      });

      res.json({ peerCount: peerCount });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });

  app.get("/peers", async (req, res) => {
    try {
      const peers = await redisFetch("peers", 60, async () => {
        return await nano.rpc("peers");
      });

      res.json(peers);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });
}
