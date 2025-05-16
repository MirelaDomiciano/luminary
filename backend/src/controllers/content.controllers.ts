import { Request, Response } from 'express';
import { createContent, getAllContents, getContentById, updateContent, deleteContent } from '../repositories/content.repository';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const createContentController = async (req: Request, res: Response) => {
  try {
    const { 
      title, description, releaseDate, duration, rating, type, 
      studio, boxOffice, numberOfSeasons, currentStatus, directorId,
      genreIds, actorIds
    } = req.body;
    
    // Check if a content with the same title already exists
    const existingContent = await prisma.content.findUnique({
      where: { title }
    });
    
    if (existingContent) {
      return res.status(409).json({ message: 'Content with this title already exists' });
    }
    
    const newContent = await createContent({
      title, description, releaseDate, duration, rating, type, 
      studio, boxOffice, numberOfSeasons, currentStatus, directorId,
      genreIds, actorIds
    });
    
    res.status(201).json(newContent);
  } catch (error: any) {
    console.error('Error creating content:', error);
    
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
    
    res.status(400).json({ 
      message: 'Error creating content', 
      error: error
    });
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
    const updateData = req.body;
    
    // If updating title, check if it's already used by another content
    if (updateData.title) {
      const existingContent = await prisma.content.findFirst({
        where: { 
          title: updateData.title,
          id: { not: id }
        }
      });
      
      if (existingContent) {
        return res.status(409).json({ message: 'Content with this title already exists' });
      }
    }
    
    const content = await updateContent(id, updateData);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.json(content);
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
    
    res.status(400).json({ 
      message: 'Error updating content', 
      error: error
    });
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
