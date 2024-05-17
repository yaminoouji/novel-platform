const { PrismaClient } = require("@prisma/client");
const prismaInstance = new PrismaClient();

module.exports = prismaInstance;
