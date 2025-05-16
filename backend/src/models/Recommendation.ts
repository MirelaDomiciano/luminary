import { v4 as uuidv4 } from 'uuid';
import { User } from './User';
import { Content } from './Content';

class Recommendation {
  recommendationId: string;
  score: number;
  reason: string;
  createdAt: Date;
  user: User;
  content: Content;
  
  constructor(user: User, content: Content, score: number, reason: string) {
    this.recommendationId = uuidv4();
    this.user = user;
    this.content = content;
    this.score = score;
    this.reason = reason;
    this.createdAt = new Date();
  }
}

class ProcessedPreferences {
  genreWeights: Map<string, number>; 
  actorAffinities: Map<string, number>; 
  directorAffinities: Map<string, number>; 
  contentTypePreferences: Map<string, number>; 
  lastUpdated: Date;

  constructor() {
    this.genreWeights = new Map<string, number>();
    this.actorAffinities = new Map<string, number>();
    this.directorAffinities = new Map<string, number>();
    this.contentTypePreferences = new Map<string, number>();
    this.lastUpdated = new Date();
  }
}

class RecommendationCriteria {
  criteriaId: string;
  genreWeights: Map<string, number>; 
  recencyWeight: number;          
  popularityWeight: number;       
  similarityThreshold: number;    
  
  constructor() {
    this.criteriaId = uuidv4();
    this.genreWeights = new Map<string, number>();
    this.recencyWeight = 0.5;     
    this.popularityWeight = 0.5; 
    this.similarityThreshold = 0.3; 
  }
}

class RecommendationEngine {
  recommendations: Recommendation[] = [];
  processPreference: ProcessedPreferences;
  recommendationCriteria: RecommendationCriteria;
  users: User[] = [];
  contents: Content[] = [];
  
  constructor(recommendationCriteria: RecommendationCriteria) {
    this.recommendationCriteria = recommendationCriteria;
    this.processPreference = new ProcessedPreferences();
  }
}

export { Recommendation, ProcessedPreferences, RecommendationCriteria, RecommendationEngine }; 