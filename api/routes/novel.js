const express = require("express");
const passport = require("passport");
const router = express.Router();
require("../passport");

const novelController = require("../controllers/novelController");
const novelChecks = require("../lib/novelChecks");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  novelController.create
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  novelController.getNovel
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  novelChecks.checkIfAuthor,
  novelController.edit
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  novelChecks.checkIfAuthor,
  novelController.deleteNovel
);

module.exports = router;
