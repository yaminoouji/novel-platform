const express = require("express");
const passport = require("passport");
const router = express.Router();
require("../passport");

const novelController = require("../controllers/novelController");
const chapterController = require("../controllers/chapterController");
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

router.post(
  "/:id/chapter",
  passport.authenticate("jwt", { session: false }),
  novelChecks.checkIfAuthor,
  chapterController.create
);

router.get(
  "/:id/chapter",
  passport.authenticate("jwt", { session: false }),
  chapterController.getChaptersPublic
);

router.get(
  "/:id/chapter/:chapterId",
  passport.authenticate("jwt", { session: false }),
  chapterController.getChapter
);

router.delete(
  "/:id/chapter/:chapterId",
  passport.authenticate("jwt", { session: false }),
  novelChecks.checkIfAuthor,
  chapterController.delete
);

router.put(
  "/:id/chapter/:chapterId",
  passport.authenticate("jwt", { session: false }),
  novelChecks.checkIfAuthor,
  chapterController.edit
);

module.exports = router;
