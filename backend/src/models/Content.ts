import { v4 as uuidv4 } from 'uuid';
import { Genre } from './Genre';
import { Actor, Director } from './Person';

abstract class Content {
  contentId: string;
  title: string;
  description: string;
  releaseDate: Date;
  duration: number;
  rating: number;
  genres: Genre[] = [];
  actors: Actor[] = [];
  directors: Director[] = [];
  
  constructor(title: string, description: string, releaseDate: Date, duration: number, rating: number) {
    this.contentId = uuidv4();
    this.title = title;
    this.description = description;
    this.releaseDate = releaseDate;
    this.duration = duration;
    this.rating = rating;
  }
}

class Movie extends Content {
  studio: string;
  boxOffice: number;
  
  constructor(title: string, description: string, releaseDate: Date, duration: number, rating: number, studio: string, boxOffice: number) {
    super(title, description, releaseDate, duration, rating);
    this.studio = studio;
    this.boxOffice = boxOffice;
  }
}

class Series extends Content {
  numberOfSeasons: number;
  currentStatus: string;
  episodes: Episode[] = [];
  
  constructor(title: string, description: string, releaseDate: Date, duration: number, rating: number, numberOfSeasons: number, currentStatus: string) {
    super(title, description, releaseDate, duration, rating);
    this.numberOfSeasons = numberOfSeasons;
    this.currentStatus = currentStatus;
  }
}

class Episode {
  episodeId: string;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  description: string;
  releaseDate: Date;
  duration: number;
  
  constructor(title: string, description: string, releaseDate: Date, duration: number, seasonNumber: number, episodeNumber: number) {
    this.episodeId = uuidv4();
    this.title = title;
    this.description = description;
    this.releaseDate = releaseDate;
    this.duration = duration;
    this.seasonNumber = seasonNumber;
    this.episodeNumber = episodeNumber;
  }
}

export { Content, Movie, Series, Episode }; 