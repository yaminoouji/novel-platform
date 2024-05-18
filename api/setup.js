require("dotenv").config();
const prismaInstance = require("./prisma");
const genresJson = require("./setupData/genres.json");

async function getGenres() {
  const genres = await prismaInstance.genre.findMany();

  return genres;
}

async function setupGenres() {
  const genres = await getGenres();

  if (genres.length === 0) {
    const genres = await prismaInstance.genre.createMany({
      data: genresJson,
    });

    console.log(genres);

    console.log("Genres have been set up.");
  }
}

async function setup() {
  setupGenres();
}

setup();
