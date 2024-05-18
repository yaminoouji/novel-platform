const { body, validationResult } = require("express-validator");
const prismaInstance = require("../prisma");

exports.create = [
  body("title").trim().escape().isLength({ min: 6 }),
  body("abbrevation").trim().escape(),
  body("type").trim().escape().isLength({ min: 1 }),
  body("synopsys").trim().escape(),
  body("warning").trim().escape(),
  body("status").trim().escape(),
  body("length").trim().escape(),
  body("tags").isArray(),
  body("genre").trim().escape().isLength({ min: 1 }),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ success: false, error: errors.array() });
    }

    const novelObj = await prismaInstance.novel.create({
      data: {
        title: req.body.title,
        abbrevation: req.body.abbrevation,
        type: req.body.type,
        synopsis: req.body.synopsys || null,
        warning: req.body.warning || null,
        status: "New",
        length: req.body.length || null,
        tags: req.body.tags,
        genre: {
          connect: {
            id: parseInt(req.body.genre),
          },
        },
        views: 0,
        author: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    return res.json({ success: true, novel: novelObj });
  },
];

exports.edit = [
  body("title").trim().escape().isLength({ min: 6 }),
  body("abbrevation").trim().escape(),
  body("type").trim().escape().isLength({ min: 1 }),
  body("synopsys").trim().escape(),
  body("warning").trim().escape(),
  body("status").trim().escape(),
  body("length").trim().escape(),
  body("tags").isArray(),
  body("genre").trim().escape().isLength({ min: 1 }),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ success: false, error: errors.array() });
    }

    const novel = await prismaInstance.novel.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        title: req.body.title,
        abbrevation: req.body.abbrevation,
        type: req.body.type,
        synopsis: req.body.synopsys || null,
        warning: req.body.warning || null,
        status: req.body.status,
        length: req.body.length || null,
        tags: req.body.tags,
        genre: {
          connect: {
            id: parseInt(req.body.genre),
          },
        },
      },
    });

    return res.json({ success: true, novel });
  },
];

exports.getNovel = async (req, res, next) => {
  const novel = await prismaInstance.novel.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    select: {
      title: true,
      status: true,
      synopsis: true,
      type: true,
      tags: true,
      abbrevation: true,
      warning: true,
      length: true,
      views: true,
      cover: true,
      customOrdering: true,
      genre: {
        select: {
          name: true,
        },
      },
      author: {
        select: {
          username: true,
        },
      },
    },
  });

  // Increase views by 1
  const novelUpdate = await prismaInstance.novel.update({
    data: {
      views: novel.views + 1,
    },
    where: {
      id: parseInt(req.params.id),
    },
  });

  return res.json({ success: true, novel });
};

exports.deleteNovel = async (req, res, next) => {
  const novel = await prismaInstance.novel.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  return res.json({ success: true, novel });
};
