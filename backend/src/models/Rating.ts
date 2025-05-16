import { v4 as uuidv4 } from 'uuid';
import { Content } from './Content';

class Rating {
  ratingId: string;
  content: Content;
  score: number;
  comment: string;
  creationAt: Date;
  
  constructor(content: Content, score: number, comment: string) {
    this.ratingId = uuidv4();
    this.content = content;
    this.score = score;
    this.comment = comment;
    this.creationAt = new Date();
  }
}

export { Rating }; 