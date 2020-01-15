const router = require("express").Router();
const Response = require("../helpers");

router.get("/", (req, res) => Response(res, { success: "Welcome!" }, 200));

module.exports = router;
