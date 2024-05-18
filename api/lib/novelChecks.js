require("dotenv").config();
const prismaInstance = require("../prisma");

exports.checkIfAuthor = async (req, res, next) => {
  const novel = await prismaInstance.novel.findUnique({
    where: {
      id: parseInt(req.params.id),
      userId: req.user.id,
    },
  });

  if (!novel) {
    return res.json({
      success: false,
      error: "You aren't the novel author or the novel doesn't exist.",
    });
  }

  next();
};
