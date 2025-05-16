import { Request, Response } from 'express';
import * as contentRepository from '../repositories/content.repository';
import { ContentType } from '@prisma/client';

// Obter todos os conteúdos
export const getAllContents = async (req: Request, res: Response) => {
  try {
    const contents = await contentRepository.getAllContents();
    return res.status(200).json(contents);
  } catch (error) {
    return res.status(500).json({ message: 'Error to get all contents', error });
  }
};

// Obter conteúdo por tipo (movie ou series)
export const getContentsByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const allContents = await contentRepository.getAllContents();
    
    if (type === 'movies') {
      const movies = allContents.filter(content => content.type === ContentType.MOVIE);
      return res.status(200).json(movies);
    } else if (type === 'series') {
      const series = allContents.filter(content => content.type === ContentType.SERIES);
      return res.status(200).json(series);
    } else {
      return res.status(400).json({ message: 'Invalid content type' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error to get contents by type', error });
  }
};

// Obter conteúdo por ID
export const getContentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const content = await contentRepository.getContentById(id);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    return res.status(200).json(content);
  } catch (error) {
    return res.status(500).json({ message: 'Error to get content by id', error });
  }
};

// Criar um novo filme
export const createMovie = async (req: Request, res: Response) => {
  try {
    const { title, description, releaseDate, duration, rating, studio, boxOffice, genreIds, actorIds, directorId } = req.body;
    
    const movieData = {
      title,
      description,
      releaseDate: new Date(releaseDate),
      duration,
      rating,
      type: ContentType.MOVIE,
      studio,
      boxOffice,
      numberOfSeasons: 0,
      currentStatus: '',
      directorId,
      genreIds,
      actorIds
    };
    
    const movie = await contentRepository.createContent(movieData);
    return res.status(201).json(movie);
  } catch (error) {
    return res.status(500).json({ message: 'Error to create movie', error });
  }
};

// Criar uma nova série
export const createSeries = async (req: Request, res: Response) => {
  try {
    const { title, description, releaseDate, duration, rating, numberOfSeasons, currentStatus, genreIds, actorIds, directorId } = req.body;
    
    const seriesData = {
      title,
      description,
      releaseDate: new Date(releaseDate),
      duration,
      rating,
      type: ContentType.SERIES,
      numberOfSeasons,
      currentStatus,
      studio: '',
      boxOffice: 0,
      directorId,
      genreIds,
      actorIds
    };
    
    const series = await contentRepository.createContent(seriesData);
    return res.status(201).json(series);
  } catch (error) {
    return res.status(500).json({ message: 'Error to create series', error });
  }
};

// Atualizar conteúdo
export const updateContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contentData = req.body;
    
    const updatedContent = await contentRepository.updateContent(id, contentData);
    
    if (!updatedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    return res.status(200).json(updatedContent);
  } catch (error) {
    return res.status(500).json({ message: 'Error to update content', error });
  }
};

// Deletar conteúdo
export const deleteContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await contentRepository.deleteContent(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Error to delete content', error });
  }
}; 