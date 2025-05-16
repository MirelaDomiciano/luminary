import { v4 as uuidv4 } from 'uuid';
import { Content } from './Content';

class ViewingHistory {
  viewingHistoryId: string;
  viewDate: Date;
  completionPercentage: number;
  content: Content;  
  
  constructor(content: Content, viewDate: Date, completionPercentage: number) {
    this.viewingHistoryId = uuidv4();
    this.viewDate = viewDate;
    this.completionPercentage = completionPercentage;
    this.content = content;
  }
}

export { ViewingHistory }; 