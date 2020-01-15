const router = require("express").Router();
const Response = require("../helpers");

router.get("/", (req, res) => Response(res, { success: "Welcome!" }, 200));

router.use("/user", require("./user"));

module.exports = router;
