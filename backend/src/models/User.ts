import { v4 as uuidv4 } from 'uuid';
import { ViewingHistory } from './ViewingHistory';
import { Rating } from './Rating';
import { Recommendation } from './Recommendation';
import { Genre } from './Genre';
import { Actor, Director } from './Person';
import { Content } from './Content';

class UserPreference {
  preferenceId: string;
  genres: Genre[] = [];
  actors: Actor[] = [];
  directors: Director[] = [];
  
  constructor() {
    this.preferenceId = uuidv4();
  }
}

class User {
  userId: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  isActive: boolean;
  viewingHistory: ViewingHistory[] = [];
  ratings: Rating[] = [];
  recommendations: Recommendation[] = [];
  preference: UserPreference;
  
  constructor(
    username: string,
    email: string,
    password: string,
  ) {
    this.userId = uuidv4();
    this.username = username;
    this.email = email;
    this.password = password; 
    this.createdAt = new Date();
    this.isActive = true;
    this.preference = new UserPreference();
  }
}

class UserManager {
  users: User[] = [];
  
  constructor() {}
}

class AuthenticationService {
  users: User[] = [];
  
  constructor() {}
}

export { UserPreference, User, UserManager, AuthenticationService }; 