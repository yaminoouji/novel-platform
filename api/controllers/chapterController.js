const { body, validationResult } = require("express-validator");
const prismaInstance = require("../prisma");

exports.create = [
  body("title").trim().escape().isLength({ min: 3, max: 30 }),
  body("content").trim().escape().isLength({ min: 1 }),
  body("status").trim().escape().isLength({ min: 1 }),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ success: false, error: errors.array() });
    }

    const novelChapterNumber = await prismaInstance.novel.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      select: {
        _count: {
          select: {
            Chapter: true,
          },
        },
      },
    });

    const chapter = await prismaInstance.chapter.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        date: new Date(),
        chapterNumber: novelChapterNumber._count.Chapter + 1,
        novel: {
          connect: {
            id: parseInt(req.params.id),
          },
        },
      },
    });

    return res.json({ success: true, chapter });
  },
];

exports.getChaptersPublic = async (req, res, next) => {
  const chapters = await prismaInstance.chapter.findMany({
    where: {
      novelId: parseInt(req.params.id),
      status: "Published",
    },
    orderBy: {
      chapterNumber: "asc",
    },
  });

  return res.json({ success: true, chapters });
};

exports.getChapter = async (req, res, next) => {
  const chapter = await prismaInstance.chapter.findUnique({
    where: {
      id: parseInt(req.params.chapterId),
    },
  });

  return res.json({ success: true, chapter });
};

exports.edit = [
  body("title").trim().escape().isLength({ min: 3, max: 30 }),
  body("content").trim().escape().isLength({ min: 1 }),
  body("status").trim().escape().isLength({ min: 1 }),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ success: false, error: errors.array() });
    }

    const chapter = await prismaInstance.chapter.update({
      where: {
        id: parseInt(req.params.chapterId),
      },
      data: {
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
      },
    });

    return res.json({ success: true, chapter });
  },
];

exports.delete = async (req, res, next) => {
  const novel = await prismaInstance.chapter.delete({
    where: {
      id: parseInt(req.params.chapterId),
    },
  });

  return res.json({ success: true, novel });
};
