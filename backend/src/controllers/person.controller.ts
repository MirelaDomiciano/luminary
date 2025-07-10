import { Request, Response } from 'express';
import * as personRepository from '../repositories/person.repository';
import { PersonRole } from '@prisma/client';

export const getAllActors = async (req: Request, res: Response) => {
  try {
    const actors = await personRepository.getAllActors();
    return res.status(200).json(actors);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching actors', error });
  }
};

export const getAllDirectors = async (req: Request, res: Response) => {
  try {
    const directors = await personRepository.getAllDirectors();
    return res.status(200).json(directors);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching directors', error });
  }
};

export const getAllPersons = async (req: Request, res: Response) => {
  try {
    const persons = await personRepository.getAllPersons();
    return res.status(200).json(persons);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching persons', error });
  }
};

export const getPersonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const person = await personRepository.getPersonById(id);
    
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    
    return res.status(200).json(person);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching person', error });
  }
};

export const createPerson = async (req: Request, res: Response) => {
  try {
    const { name, biography, birthDate, deathDate, awards, role } = req.body;
    
    if (!name || !biography || !birthDate || !role) {
      return res.status(400).json({ message: 'Name, biography, birthDate, and role are required' });
    }
    
    if (!Object.values(PersonRole).includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be ACTOR or DIRECTOR' });
    }
    
    const person = await personRepository.createPerson({
      name,
      biography,
      birthDate: new Date(birthDate),
      deathDate: deathDate ? new Date(deathDate) : undefined,
      awards: awards || [],
      role,
    });
    
    return res.status(201).json(person);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating person', error });
  }
};

export const updatePerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, biography, birthDate, deathDate, awards, role } = req.body;
    
    const updateData: any = {};
    if (name) updateData.name = name;
    if (biography) updateData.biography = biography;
    if (birthDate) updateData.birthDate = new Date(birthDate);
    if (deathDate) updateData.deathDate = new Date(deathDate);
    if (awards) updateData.awards = awards;
    if (role) {
      if (!Object.values(PersonRole).includes(role)) {
        return res.status(400).json({ message: 'Invalid role. Must be ACTOR or DIRECTOR' });
      }
      updateData.role = role;
    }
    
    const person = await personRepository.updatePerson(id, updateData);
    return res.status(200).json(person);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating person', error });
  }
};

export const deletePerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await personRepository.deletePerson(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting person', error });
  }
}; 