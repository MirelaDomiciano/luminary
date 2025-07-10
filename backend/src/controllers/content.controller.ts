import { Request, Response } from 'express';
import * as contentRepository from '../repositories/content.repository';
import { ContentType, PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

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
    
    // Check if a content with the same title already exists
    const existingContent = await prisma.content.findUnique({
      where: { title }
    });
    
    if (existingContent) {
      return res.status(409).json({ message: 'Content with this title already exists' });
    }
    
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
  } catch (error: any) {
    console.error('Error creating movie:', error);
    
    // Check for unique constraint errors - both for Prisma class instances and plain objects
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      const target = error.meta?.target as string[];
      if (target && Array.isArray(target) && target.includes('title')) {
        return res.status(409).json({ message: 'Content with this title already exists' });
      }
    } 
    // Handle case where error is a plain object but has Prisma error properties
    else if (error.code === 'P2002' && error.meta?.target) {
      const target = error.meta.target;
      if (Array.isArray(target) && target.includes('title')) {
        return res.status(409).json({ message: 'Content with this title already exists' });
      }
    }
    
    return res.status(500).json({ 
      message: 'Error to create movie', 
      error: error
    });
  }
};

// Criar uma nova série
export const createSeries = async (req: Request, res: Response) => {
  try {
    const { title, description, releaseDate, duration, rating, studio, numberOfSeasons, currentStatus, genreIds, actorIds, directorId } = req.body;
    
    // Check if a content with the same title already exists
    const existingContent = await prisma.content.findUnique({
      where: { title }
    });
    
    if (existingContent) {
      return res.status(409).json({ message: 'Content with this title already exists' });
    }
    
    const seriesData = {
      title,
      description,
      releaseDate: new Date(releaseDate),
      duration,
      rating,
      type: ContentType.SERIES,
      studio,
      boxOffice: null,
      numberOfSeasons,
      currentStatus,
      directorId,
      genreIds,
      actorIds
    };
    
    const series = await contentRepository.createContent(seriesData);
    return res.status(201).json(series);
  } catch (error: any) {
    console.error('Error creating series:', error);
    
    // Check for unique constraint errors - both for Prisma class instances and plain objects
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      const target = error.meta?.target as string[];
      if (target && Array.isArray(target) && target.includes('title')) {
        return res.status(409).json({ message: 'Content with this title already exists' });
      }
    } 
    // Handle case where error is a plain object but has Prisma error properties
    else if (error.code === 'P2002' && error.meta?.target) {
      const target = error.meta.target;
      if (Array.isArray(target) && target.includes('title')) {
        return res.status(409).json({ message: 'Content with this title already exists' });
      }
    }
    
    return res.status(500).json({ 
      message: 'Error to create series', 
      error: error
    });
  }
};

// Atualizar conteúdo
export const updateContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contentData = req.body;
    
    // If updating title, check if it's already used by another content
    if (contentData.title) {
      const existingContent = await prisma.content.findFirst({
        where: { 
          title: contentData.title,
          id: { not: id }
        }
      });
      
      if (existingContent) {
        return res.status(409).json({ message: 'Content with this title already exists' });
      }
    }
    
    const updatedContent = await contentRepository.updateContent(id, contentData);
    
    if (!updatedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    return res.status(200).json(updatedContent);
  } catch (error: any) {
    console.error('Error updating content:', error);
    
    // Check for unique constraint errors - both for Prisma class instances and plain objects
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      const target = error.meta?.target as string[];
      if (target && Array.isArray(target) && target.includes('title')) {
        return res.status(409).json({ message: 'Content with this title already exists' });
      }
    } 
    // Handle case where error is a plain object but has Prisma error properties
    else if (error.code === 'P2002' && error.meta?.target) {
      const target = error.meta.target;
      if (Array.isArray(target) && target.includes('title')) {
        return res.status(409).json({ message: 'Content with this title already exists' });
      }
    }
    
    return res.status(500).json({ 
      message: 'Error to update content', 
      error: error
    });
  }
};

// Deletar conteúdo
export const deleteContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await contentRepository.deleteContent(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting content', error });
  }
};

 