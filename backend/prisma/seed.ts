import { PrismaClient } from "@prisma/client";
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  // Hash the password with argon2
  const hashedPassword = await argon2.hash("testUser#456");

  // Create a User
  const user = await prisma.user.create({
    data: {
      username: "test",
      email: "test@test.com",
      password: hashedPassword
    },
  });

  console.log(`Created user with id: ${user.id}`);

  // Create a Person with DIRECTOR role
  const director = await prisma.person.create({
    data: {
      name: "Christopher Nolan",
      biography: "British-American film director, producer, and screenwriter.",
      birthDate: new Date("1970-07-30"),
      awards: ["Academy Award", "Golden Globe"],
      role: "DIRECTOR"
    }
  });

  console.log(`Created director with id: ${director.id}`);

  // Create a Person with ACTOR role
  const actor = await prisma.person.create({
    data: {
      name: "Leonardo DiCaprio",
      biography: "American actor and film producer.",
      birthDate: new Date("1974-11-11"),
      awards: ["Academy Award", "BAFTA"],
      role: "ACTOR"
    }
  });

  console.log(`Created actor with id: ${actor.id}`);

  // Create a Genre
  const genre = await prisma.genre.create({
    data: {
      name: "Sci-Fi",
      description: "Science fiction films depict imaginary but science-based phenomena that are not fully accepted by mainstream science."
    }
  });

  console.log(`Created genre with id: ${genre.id}`);

  // Create a Content (movie)
  const movie = await prisma.content.create({
    data: {
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
      releaseDate: new Date("2010-07-16"),
      duration: 148,
      rating: 8.8,
      type: "MOVIE",
      studio: "Warner Bros.",
      boxOffice: 836800000,
      directorId: director.id,
      genres: {
        connect: { id: genre.id }
      },
      actors: {
        connect: { id: actor.id }
      }
    }
  });

  console.log(`Created movie with id: ${movie.id}`);

  // Create a Content (series)
  const series = await prisma.content.create({
    data: {
      title: "Stranger Things",
      description: "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces.",
      releaseDate: new Date("2016-07-15"),
      duration: 50,
      rating: 8.7,
      type: "SERIES",
      studio: "Netflix",
      numberOfSeasons: 4,
      currentStatus: "Ongoing",
      directorId: director.id,
      genres: {
        connect: { id: genre.id }
      }
    }
  });

  console.log(`Created series with id: ${series.id}`);

  // Create an Episode
  const episode = await prisma.episode.create({
    data: {
      title: "Chapter One: The Vanishing of Will Byers",
      description: "On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.",
      seasonNumber: 1,
      episodeNumber: 1,
      duration: 47,
      releaseDate: new Date("2016-07-15"),
      contentId: series.id
    }
  });

  console.log(`Created episode with id: ${episode.id}`);

  // Create a Rating
  const rating = await prisma.rating.create({
    data: {
      score: 9.5,
      comment: "Amazing movie, one of my favorites!",
      userId: user.id,
      contentId: movie.id
    }
  });

  console.log(`Created rating with id: ${rating.id}`);

  // Create a Recommendation
  const recommendation = await prisma.recommendation.create({
    data: {
      score: 0.95,
      reason: "Based on your sci-fi preferences",
      userId: user.id,
      contentId: series.id
    }
  });

  console.log(`Created recommendation with id: ${recommendation.id}`);

  // Create a ViewHistory
  const viewHistory = await prisma.viewHistory.create({
    data: {
      completionPercentage: 100,
      userId: user.id,
      contentId: movie.id
    }
  });

  console.log(`Created view history with id: ${viewHistory.id}`);

  // Create a UserPreferences
  const userPreferences = await prisma.userPreferences.create({
    data: {
      userId: user.id,
      genres: {
        connect: { id: genre.id }
      },
      actors: {
        connect: { id: actor.id }
      },
      directors: {
        connect: { id: director.id }
      }
    }
  });

  console.log(`Created user preferences with id: ${userPreferences.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });