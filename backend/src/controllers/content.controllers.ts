import { Request, Response } from 'express';
import { createContent, getAllContents, getContentById, updateContent, deleteContent } from '../repositories/content.repository';

export const createContentController = async (req: Request, res: Response) => {
  try {
    const { 
      title, description, releaseDate, duration, rating, type, 
      studio, boxOffice, numberOfSeasons, currentStatus, directorId,
      genreIds, actorIds
    } = req.body;
    
    const newContent = await createContent({
      title, description, releaseDate, duration, rating, type, 
      studio, boxOffice, numberOfSeasons, currentStatus, directorId,
      genreIds, actorIds
    });
    
    res.status(201).json(newContent);
  } catch (error) {
    res.status(400).json({ message: 'Error creating content', error: (error as Error).message });
  }
};

export const getAllContentsController = async (req: Request, res: Response) => {
  try {
    const contents = await getAllContents();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contents', error: (error as Error).message });
  }
};

export const getContentByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const content = await getContentById(id);
    
    if (content) {
      res.json(content);
    } else {
      res.status(404).json({ message: 'Conteúdo não encontrado' });
    }
  } catch (error) {
      res.status(500).json({ message: 'Error fetching content', error: (error as Error).message });
  }
};

export const updateContentController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const content = await updateContent(id, req.body);
    
    if (!content) {
      return res.status(404).json({ message: 'Conteúdo não encontrado' });
    }
    
    res.json(content);
  } catch (error) {
    res.status(400).json({ message: 'Error updating content', error: (error as Error).message });
  }
};

export const deleteContentController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteContent(id);
    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting content', error: (error as Error).message });
  }
};
