import { v4 as uuidv4 } from 'uuid';

// Using interface instead of direct import to avoid circular dependency
interface IContent {
  contentId: string;
}

class Genre {
  genreId: string;
  name: string;
  description: string;
  contents: IContent[] = [];
  
  constructor(name: string, description: string) {
    this.genreId = uuidv4();
    this.name = name;
    this.description = description;
  }
}

export { Genre }; 