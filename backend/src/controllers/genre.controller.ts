import { Request, Response } from 'express';
import * as genreRepository from '../repositories/genre.repository';

export const getAllGenres = async (req: Request, res: Response) => {
  try {
    const genres = await genreRepository.getAllGenres();
    return res.status(200).json(genres);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching genres', error });
  }
};

export const getGenreById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const genre = await genreRepository.getGenreById(id);
    
    if (!genre) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    
    return res.status(200).json(genre);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching genre', error });
  }
};

export const createGenre = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }
    
    const genre = await genreRepository.createGenre({ name, description });
    return res.status(201).json(genre);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating genre', error });
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    const genre = await genreRepository.updateGenre(id, { name, description });
    return res.status(200).json(genre);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating genre', error });
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await genreRepository.deleteGenre(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting genre', error });
  }
}; 