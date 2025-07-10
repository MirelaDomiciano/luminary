import { PrismaClient } from "@prisma/client";
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  // Hash the password with argon2
  const hashedPassword = await argon2.hash("z");

  // Create or update a User
  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {
      username: "test",
      password: hashedPassword
    },
    create: {
      username: "test",
      email: "test@test.com",
      password: hashedPassword
    },
  });

  console.log(`Created/updated user with id: ${user.id}`);

  // Create Genres
  const genres = await Promise.all([
    prisma.genre.upsert({
      where: { name: "Action" },
      update: {},
      create: {
        name: "Action",
        description: "Action films typically feature high-energy sequences, including fights, chases, and explosions."
      }
    }),
    prisma.genre.upsert({
      where: { name: "Drama" },
      update: {},
      create: {
        name: "Drama",
        description: "Drama films are serious presentations or stories with settings or life situations that portray realistic characters."
      }
    }),
    prisma.genre.upsert({
      where: { name: "Sci-Fi" },
      update: {},
      create: {
        name: "Sci-Fi",
        description: "Science fiction films depict imaginary but science-based phenomena that are not fully accepted by mainstream science."
      }
    }),
    prisma.genre.upsert({
      where: { name: "Thriller" },
      update: {},
      create: {
        name: "Thriller",
        description: "Thriller films are characterized by suspense, excitement, and high anticipation."
      }
    }),
    prisma.genre.upsert({
      where: { name: "Comedy" },
      update: {},
      create: {
        name: "Comedy",
        description: "Comedy films are designed to elicit laughter from the audience."
      }
    }),
    prisma.genre.upsert({
      where: { name: "Horror" },
      update: {},
      create: {
        name: "Horror",
        description: "Horror films are designed to frighten and create suspense."
      }
    }),
    prisma.genre.upsert({
      where: { name: "Romance" },
      update: {},
      create: {
        name: "Romance",
        description: "Romance films focus on love stories and romantic relationships."
      }
    }),
    prisma.genre.upsert({
      where: { name: "Adventure" },
      update: {},
      create: {
        name: "Adventure",
        description: "Adventure films feature exciting journeys and quests."
      }
    })
  ]);

  console.log(`Created/updated ${genres.length} genres`);

  // Create Directors
  const directors = await Promise.all([
    prisma.person.upsert({
      where: { name: "Christopher Nolan" },
      update: {},
      create: {
        name: "Christopher Nolan",
        biography: "British-American film director, producer, and screenwriter known for his distinctive filmmaking style.",
        birthDate: new Date("1970-07-30"),
        awards: ["Academy Award", "Golden Globe", "BAFTA"],
        role: "DIRECTOR"
      }
    }),
    prisma.person.upsert({
      where: { name: "Quentin Tarantino" },
      update: {},
      create: {
        name: "Quentin Tarantino",
        biography: "American film director, writer, and producer known for his nonlinear storylines and pop culture references.",
        birthDate: new Date("1963-03-27"),
        awards: ["Academy Award", "Golden Globe", "Palme d'Or"],
        role: "DIRECTOR"
      }
    }),
    prisma.person.upsert({
      where: { name: "Martin Scorsese" },
      update: {},
      create: {
        name: "Martin Scorsese",
        biography: "American film director, producer, and screenwriter, widely regarded as one of the most significant directors in cinema history.",
        birthDate: new Date("1942-11-17"),
        awards: ["Academy Award", "Golden Globe", "BAFTA", "Directors Guild Award"],
        role: "DIRECTOR"
      }
    }),
    prisma.person.upsert({
      where: { name: "Steven Spielberg" },
      update: {},
      create: {
        name: "Steven Spielberg",
        biography: "American film director, producer, and screenwriter, one of the founding pioneers of the New Hollywood era.",
        birthDate: new Date("1946-12-18"),
        awards: ["Academy Award", "Golden Globe", "BAFTA", "Directors Guild Award"],
        role: "DIRECTOR"
      }
    }),
    prisma.person.upsert({
      where: { name: "Denis Villeneuve" },
      update: {},
      create: {
        name: "Denis Villeneuve",
        biography: "Canadian film director and screenwriter known for his thoughtful science fiction and thriller films.",
        birthDate: new Date("1967-10-03"),
        awards: ["BAFTA", "Critics' Choice Award"],
        role: "DIRECTOR"
      }
    }),
    prisma.person.upsert({
      where: { name: "Greta Gerwig" },
      update: {},
      create: {
        name: "Greta Gerwig",
        biography: "American actress, playwright, screenwriter, and film director known for her work in mumblecore films.",
        birthDate: new Date("1983-08-04"),
        awards: ["Golden Globe", "Critics' Choice Award"],
        role: "DIRECTOR"
      }
    })
  ]);

  console.log(`Created/updated ${directors.length} directors`);

  // Create Actors
  const actors = await Promise.all([
    prisma.person.upsert({
      where: { name: "Leonardo DiCaprio" },
      update: {},
      create: {
        name: "Leonardo DiCaprio",
        biography: "American actor and film producer known for his work in biographical and period films.",
        birthDate: new Date("1974-11-11"),
        awards: ["Academy Award", "BAFTA", "Golden Globe"],
        role: "ACTOR"
      }
    }),
    prisma.person.upsert({
      where: { name: "Margot Robbie" },
      update: {},
      create: {
        name: "Margot Robbie",
        biography: "Australian actress and producer known for her work in both blockbuster and independent films.",
        birthDate: new Date("1990-07-02"),
        awards: ["BAFTA", "Critics' Choice Award"],
        role: "ACTOR"
      }
    }),
    prisma.person.upsert({
      where: { name: "Ryan Gosling" },
      update: {},
      create: {
        name: "Ryan Gosling",
        biography: "Canadian actor known for his versatile performances in both dramatic and comedic roles.",
        birthDate: new Date("1980-11-12"),
        awards: ["Golden Globe", "Screen Actors Guild Award"],
        role: "ACTOR"
      }
    }),
    prisma.person.upsert({
      where: { name: "Scarlett Johansson" },
      update: {},
      create: {
        name: "Scarlett Johansson",
        biography: "American actress known for her work in both dramatic and action films.",
        birthDate: new Date("1984-11-22"),
        awards: ["BAFTA", "Tony Award"],
        role: "ACTOR"
      }
    }),
    prisma.person.upsert({
      where: { name: "Robert Downey Jr." },
      update: {},
      create: {
        name: "Robert Downey Jr.",
        biography: "American actor known for his role as Iron Man in the Marvel Cinematic Universe.",
        birthDate: new Date("1965-04-04"),
        awards: ["Golden Globe", "Screen Actors Guild Award"],
        role: "ACTOR"
      }
    }),
    prisma.person.upsert({
      where: { name: "Emma Stone" },
      update: {},
      create: {
        name: "Emma Stone",
        biography: "American actress known for her comedic and dramatic roles.",
        birthDate: new Date("1988-11-06"),
        awards: ["Academy Award", "Golden Globe", "BAFTA"],
        role: "ACTOR"
      }
    }),
    prisma.person.upsert({
      where: { name: "Timothée Chalamet" },
      update: {},
      create: {
        name: "Timothée Chalamet",
        biography: "American-French actor known for his work in independent films and period dramas.",
        birthDate: new Date("1995-12-27"),
        awards: ["Critics' Choice Award", "Screen Actors Guild Award"],
        role: "ACTOR"
      }
    }),
    prisma.person.upsert({
      where: { name: "Zendaya" },
      update: {},
      create: {
        name: "Zendaya",
        biography: "American actress and singer known for her work in both television and film.",
        birthDate: new Date("1996-09-01"),
        awards: ["Emmy Award", "Critics' Choice Award"],
        role: "ACTOR"
      }
    }),
    prisma.person.upsert({
      where: { name: "Oscar Isaac" },
      update: {},
      create: {
        name: "Oscar Isaac",
        biography: "American actor known for his versatile performances in both independent and blockbuster films.",
        birthDate: new Date("1979-03-09"),
        awards: ["Golden Globe", "Screen Actors Guild Award"],
        role: "ACTOR"
      }
    }),
    prisma.person.upsert({
      where: { name: "Saoirse Ronan" },
      update: {},
      create: {
        name: "Saoirse Ronan",
        biography: "Irish-American actress known for her work in period dramas and coming-of-age films.",
        birthDate: new Date("1994-04-12"),
        awards: ["Golden Globe", "BAFTA"],
        role: "ACTOR"
      }
    })
  ]);

  console.log(`Created/updated ${actors.length} actors`);

  // Create Movies
  const movies = await Promise.all([
    prisma.content.upsert({
      where: { title: "Inception" },
      update: {},
      create: {
        title: "Inception",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        releaseDate: new Date("2010-07-16"),
        duration: 148,
        rating: 8.8,
        type: "MOVIE",
        studio: "Warner Bros.",
        boxOffice: 836800000,
        imageUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        directorId: directors[0].id, // Christopher Nolan
        genres: {
          connect: [{ id: genres[2].id }, { id: genres[3].id }] // Sci-Fi, Thriller
        },
        actors: {
          connect: [{ id: actors[0].id }, { id: actors[3].id }] // Leonardo DiCaprio, Scarlett Johansson
        }
      }
    }),
    prisma.content.upsert({
      where: { title: "Pulp Fiction" },
      update: {},
      create: {
        title: "Pulp Fiction",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        releaseDate: new Date("1994-10-14"),
        duration: 154,
        rating: 8.9,
        type: "MOVIE",
        studio: "Miramax",
        boxOffice: 214200000,
        imageUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        directorId: directors[1].id, // Quentin Tarantino
        genres: {
          connect: [{ id: genres[0].id }, { id: genres[1].id }] // Action, Drama
        },
        actors: {
          connect: [{ id: actors[1].id }, { id: actors[2].id }] // Margot Robbie, Ryan Gosling
        }
      }
    }),
    prisma.content.upsert({
      where: { title: "The Wolf of Wall Street" },
      update: {},
      create: {
        title: "The Wolf of Wall Street",
        description: "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
        releaseDate: new Date("2013-12-25"),
        duration: 180,
        rating: 8.2,
        type: "MOVIE",
        studio: "Paramount Pictures",
        boxOffice: 392000000,
        imageUrl: "https://image.tmdb.org/t/p/w500/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg",
        directorId: directors[2].id, // Martin Scorsese
        genres: {
          connect: [{ id: genres[1].id }, { id: genres[4].id }] // Drama, Comedy
        },
        actors: {
          connect: [{ id: actors[0].id }, { id: actors[1].id }] // Leonardo DiCaprio, Margot Robbie
        }
      }
    }),
    prisma.content.upsert({
      where: { title: "Dune" },
      update: {},
      create: {
        title: "Dune",
        description: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
        releaseDate: new Date("2021-10-22"),
        duration: 155,
        rating: 8.0,
        type: "MOVIE",
        studio: "Warner Bros.",
        boxOffice: 401800000,
        imageUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        directorId: directors[4].id, // Denis Villeneuve
        genres: {
          connect: [{ id: genres[2].id }, { id: genres[7].id }] // Sci-Fi, Adventure
        },
        actors: {
          connect: [{ id: actors[6].id }, { id: actors[7].id }, { id: actors[8].id }] // Timothée Chalamet, Zendaya, Oscar Isaac
        }
      }
    }),
    prisma.content.upsert({
      where: { title: "Barbie" },
      update: {},
      create: {
        title: "Barbie",
        description: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
        releaseDate: new Date("2023-07-21"),
        duration: 114,
        rating: 7.0,
        type: "MOVIE",
        studio: "Warner Bros.",
        boxOffice: 1446000000,
        imageUrl: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
        directorId: directors[5].id, // Greta Gerwig
        genres: {
          connect: [{ id: genres[4].id }, { id: genres[6].id }] // Comedy, Romance
        },
        actors: {
          connect: [{ id: actors[1].id }, { id: actors[2].id }] // Margot Robbie, Ryan Gosling
        }
      }
    }),
    prisma.content.upsert({
      where: { title: "Iron Man" },
      update: {},
      create: {
        title: "Iron Man",
        description: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
        releaseDate: new Date("2008-05-02"),
        duration: 126,
        rating: 7.9,
        type: "MOVIE",
        studio: "Marvel Studios",
        boxOffice: 585800000,
        imageUrl: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
        directorId: directors[3].id, // Steven Spielberg
        genres: {
          connect: [{ id: genres[0].id }, { id: genres[2].id }] // Action, Sci-Fi
        },
        actors: {
          connect: [{ id: actors[4].id }, { id: actors[3].id }] // Robert Downey Jr., Scarlett Johansson
        }
      }
    })
  ]);

  console.log(`Created/updated ${movies.length} movies`);

  // Create Series
  const series = await Promise.all([
    prisma.content.upsert({
      where: { title: "Stranger Things" },
      update: {},
      create: {
        title: "Stranger Things",
        description: "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.",
        releaseDate: new Date("2016-07-15"),
        duration: 50,
        rating: 8.7,
        type: "SERIES",
        studio: "Netflix",
        numberOfSeasons: 4,
        currentStatus: "Completed",
        imageUrl: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
        directorId: directors[0].id, // Christopher Nolan
        genres: {
          connect: [{ id: genres[2].id }, { id: genres[5].id }] // Sci-Fi, Horror
        },
        actors: {
          connect: [{ id: actors[7].id }, { id: actors[6].id }] // Zendaya, Timothée Chalamet
        }
      }
    }),
    prisma.content.upsert({
      where: { title: "The Crown" },
      update: {},
      create: {
        title: "The Crown",
        description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
        releaseDate: new Date("2016-11-04"),
        duration: 58,
        rating: 8.6,
        type: "SERIES",
        studio: "Netflix",
        numberOfSeasons: 6,
        currentStatus: "Completed",
        imageUrl: "https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg",
        directorId: directors[2].id, // Martin Scorsese
        genres: {
          connect: [{ id: genres[1].id }] // Drama
        },
        actors: {
          connect: [{ id: actors[5].id }, { id: actors[9].id }] // Emma Stone, Saoirse Ronan
        }
      }
    }),
    prisma.content.upsert({
      where: { title: "Breaking Bad" },
      update: {},
      create: {
        title: "Breaking Bad",
        description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
        releaseDate: new Date("2008-01-20"),
        duration: 47,
        rating: 9.5,
        type: "SERIES",
        studio: "AMC",
        numberOfSeasons: 5,
        currentStatus: "Completed",
        imageUrl: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
        directorId: directors[1].id, // Quentin Tarantino
        genres: {
          connect: [{ id: genres[1].id }, { id: genres[3].id }] // Drama, Thriller
        },
        actors: {
          connect: [{ id: actors[8].id }, { id: actors[4].id }] // Oscar Isaac, Robert Downey Jr.
        }
      }
    }),
    prisma.content.upsert({
      where: { title: "The Mandalorian" },
      update: {},
      create: {
        title: "The Mandalorian",
        description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
        releaseDate: new Date("2019-11-12"),
        duration: 40,
        rating: 8.7,
        type: "SERIES",
        studio: "Disney+",
        numberOfSeasons: 3,
        currentStatus: "Ongoing",
        imageUrl: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
        directorId: directors[4].id, // Denis Villeneuve
        genres: {
          connect: [{ id: genres[2].id }, { id: genres[7].id }] // Sci-Fi, Adventure
        },
        actors: {
          connect: [{ id: actors[8].id }, { id: actors[7].id }] // Oscar Isaac, Zendaya
        }
      }
    })
  ]);

  console.log(`Created/updated ${series.length} series`);

  // Create some episodes for the series
  const episodes = await Promise.all([
    prisma.episode.upsert({
      where: { 
        contentId_seasonNumber_episodeNumber: {
          contentId: series[0].id,
          seasonNumber: 1,
          episodeNumber: 1
        }
      },
      update: {},
      create: {
        title: "Chapter One: The Vanishing of Will Byers",
        description: "On his way home from a friend's house, young Will sees something terrifying.",
        seasonNumber: 1,
        episodeNumber: 1,
        duration: 47,
        releaseDate: new Date("2016-07-15"),
        contentId: series[0].id
      }
    }),
    prisma.episode.upsert({
      where: { 
        contentId_seasonNumber_episodeNumber: {
          contentId: series[0].id,
          seasonNumber: 1,
          episodeNumber: 2
        }
      },
      update: {},
      create: {
        title: "Chapter Two: The Weirdo on Maple Street",
        description: "Lucas, Mike and Dustin try to talk to the girl they found in the woods.",
        seasonNumber: 1,
        episodeNumber: 2,
        duration: 55,
        releaseDate: new Date("2016-07-15"),
        contentId: series[0].id
      }
    })
  ]);

  console.log(`Created/updated ${episodes.length} episodes`);

  // Create some ratings
  const ratings = await Promise.all([
    prisma.rating.upsert({
      where: {
        userId_contentId: {
          userId: user.id,
          contentId: movies[0].id
        }
      },
      update: {},
      create: {
        score: 9.5,
        comment: "Amazing movie, one of my favorites! The concept is mind-blowing.",
        userId: user.id,
        contentId: movies[0].id
      }
    }),
    prisma.rating.upsert({
      where: {
        userId_contentId: {
          userId: user.id,
          contentId: movies[3].id
        }
      },
      update: {},
      create: {
        score: 8.5,
        comment: "Visually stunning and great storytelling. Can't wait for the sequel!",
        userId: user.id,
        contentId: movies[3].id
      }
    }),
    prisma.rating.upsert({
      where: {
        userId_contentId: {
          userId: user.id,
          contentId: series[2].id
        }
      },
      update: {},
      create: {
        score: 10.0,
        comment: "Best TV series ever made. Perfect writing and acting.",
        userId: user.id,
        contentId: series[2].id
      }
    })
  ]);

  console.log(`Created/updated ${ratings.length} ratings`);

  // Create recommendations
  const recommendations = await Promise.all([
    prisma.recommendation.upsert({
      where: {
        userId_contentId: {
          userId: user.id,
          contentId: movies[1].id
        }
      },
      update: {},
      create: {
        score: 0.95,
        reason: "Based on your love for complex narratives and great directors",
        userId: user.id,
        contentId: movies[1].id
      }
    }),
    prisma.recommendation.upsert({
      where: {
        userId_contentId: {
          userId: user.id,
          contentId: series[0].id
        }
      },
      update: {},
      create: {
        score: 0.88,
        reason: "Perfect for sci-fi and horror fans",
        userId: user.id,
        contentId: series[0].id
      }
    })
  ]);

  console.log(`Created/updated ${recommendations.length} recommendations`);

  // Create view history
  const viewHistories = await Promise.all([
    prisma.viewHistory.upsert({
      where: {
        userId_contentId: {
          userId: user.id,
          contentId: movies[0].id
        }
      },
      update: {},
      create: {
        completionPercentage: 100,
        userId: user.id,
        contentId: movies[0].id
      }
    }),
    prisma.viewHistory.upsert({
      where: {
        userId_contentId: {
          userId: user.id,
          contentId: movies[3].id
        }
      },
      update: {},
      create: {
        completionPercentage: 85,
        userId: user.id,
        contentId: movies[3].id
      }
    }),
    prisma.viewHistory.upsert({
      where: {
        userId_contentId: {
          userId: user.id,
          contentId: series[2].id
        }
      },
      update: {},
      create: {
        completionPercentage: 100,
        userId: user.id,
        contentId: series[2].id
      }
    })
  ]);

  console.log(`Created/updated ${viewHistories.length} view histories`);

  // Create user preferences
  const userPreferences = await prisma.userPreferences.upsert({
    where: {
      userId: user.id
    },
    update: {},
    create: {
      userId: user.id,
      genres: {
        connect: [
          { id: genres[2].id }, // Sci-Fi
          { id: genres[1].id }, // Drama
          { id: genres[3].id }  // Thriller
        ]
      },
      actors: {
        connect: [
          { id: actors[0].id }, // Leonardo DiCaprio
          { id: actors[1].id }, // Margot Robbie
          { id: actors[6].id }  // Timothée Chalamet
        ]
      },
      directors: {
        connect: [
          { id: directors[0].id }, // Christopher Nolan
          { id: directors[4].id }, // Denis Villeneuve
          { id: directors[2].id }  // Martin Scorsese
        ]
      }
    }
  });

  console.log(`Created/updated user preferences with id: ${userPreferences.id}`);

  console.log("\n🎬 Seed completed successfully!");
  console.log(`📊 Summary:`);
  console.log(`   - ${genres.length} genres`);
  console.log(`   - ${directors.length} directors`);
  console.log(`   - ${actors.length} actors`);
  console.log(`   - ${movies.length} movies`);
  console.log(`   - ${series.length} series`);
  console.log(`   - ${episodes.length} episodes`);
  console.log(`   - ${ratings.length} ratings`);
  console.log(`   - ${recommendations.length} recommendations`);
  console.log(`   - ${viewHistories.length} view histories`);
  console.log(`   - 1 user with preferences`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });