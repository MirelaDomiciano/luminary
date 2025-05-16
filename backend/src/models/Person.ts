import { v4 as uuidv4 } from 'uuid';

class Actor {
  actorId: string;
  name: string;
  biography: string;
  birthDate: Date;
  deathDate?: Date;
  
  constructor(name: string, biography: string, birthDate: Date, deathDate?: Date) {
    this.actorId = uuidv4();
    this.name = name;
    this.biography = biography;
    this.birthDate = birthDate;
    this.deathDate = deathDate;
  }
}

class Director {
  directorId: string;
  name: string;
  biography: string;
  birthDate: Date;
  deathDate?: Date;
  
  constructor(name: string, biography: string, birthDate: Date, deathDate?: Date) {
    this.directorId = uuidv4();
    this.name = name;
    this.biography = biography;
    this.birthDate = birthDate;
    this.deathDate = deathDate;
  }
}

export { Actor, Director }; 