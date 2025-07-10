import React, { useState, useEffect } from 'react';
import { Box, Button, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormField from './FormField';
import FormSelect from './FormSelect';
import FormMultiSelect from './FormMultiSelect';
import { contentService, genreService, personService, type Content } from '../services';

// Helper function to validate URLs
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

interface MovieFormData {
  title: string;
  description: string;
  releaseDate: string;
  duration: string;
  rating: string;
  studio: string;
  boxOffice: string;
  imageUrl: string;
  directorId: string;
  genreIds: string[];
  actorIds: string[];
}

interface Option {
  id: string;
  name: string;
}

interface EditMovieFormProps {
  content: Content;
}

export default function EditMovieForm({ content }: EditMovieFormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  
  // Options for dropdowns
  const [genres, setGenres] = useState<Option[]>([]);
  const [actors, setActors] = useState<Option[]>([]);
  const [directors, setDirectors] = useState<Option[]>([]);
  
  const [formData, setFormData] = useState<MovieFormData>({
    title: content.title || '',
    description: content.description || '',
    releaseDate: content.releaseDate ? content.releaseDate.split('T')[0] : '',
    duration: content.duration?.toString() || '',
    rating: content.rating?.toString() || '',
    studio: content.studio || '',
    boxOffice: content.boxOffice?.toString() || '',
    imageUrl: content.imageUrl || '',
    directorId: content.directorId || '',
    genreIds: content.genres?.map(g => g.id) || [],
    actorIds: content.actors?.map(a => a.id) || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load genres
        const genresData = await genreService.getAllGenres();
        setGenres(genresData.map(genre => ({ id: genre.id, name: genre.name })));

        // Load actors
        const actorsData = await personService.getAllActors();
        setActors(actorsData.map(actor => ({ id: actor.id, name: actor.name })));

        // Load directors
        const directorsData = await personService.getAllDirectors();
        setDirectors(directorsData.map(director => ({ id: director.id, name: director.name })));
      } catch (error) {
        console.error('Error loading form data:', error);
        setError('Failed to load form data. Please try again.');
      }
    };

    loadData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user selects
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleMultiSelectChange = (name: string, value: string[]) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user selects
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.releaseDate) {
      newErrors.releaseDate = 'Release date is required';
    }
    
    if (!formData.duration || parseFloat(formData.duration) <= 0) {
      newErrors.duration = 'Duration must be a positive number';
    }
    
    if (!formData.rating || parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 10) {
      newErrors.rating = 'Rating must be between 0 and 10';
    }
    
    if (!formData.studio.trim()) {
      newErrors.studio = 'Studio is required';
    }
    
    if (!formData.boxOffice || parseFloat(formData.boxOffice) < 0) {
      newErrors.boxOffice = 'Box office must be a positive number';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }
    
    if (!formData.directorId) {
      newErrors.directorId = 'Director is required';
    }
    
    if (formData.genreIds.length === 0) {
      newErrors.genreIds = 'At least one genre is required';
    }
    
    if (formData.actorIds.length === 0) {
      newErrors.actorIds = 'At least one actor is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Prepare data for API
      const movieData = {
        title: formData.title,
        description: formData.description,
        releaseDate: formData.releaseDate,
        duration: parseFloat(formData.duration),
        rating: parseFloat(formData.rating),
        studio: formData.studio,
        boxOffice: parseFloat(formData.boxOffice),
        imageUrl: formData.imageUrl,
        directorId: formData.directorId,
        genreIds: formData.genreIds,
        actorIds: formData.actorIds,
      };
      
      console.log('Movie data to be updated:', movieData);
      
      // Call API to update movie
      const response = await contentService.updateContent(content.id, movieData);
      console.log('Movie updated successfully:', response);
      
      setSuccess(true);
      setTimeout(() => {
        navigate(`/content/${content.id}`);
      }, 2000);
      
    } catch (err: any) {
      console.error('Error updating movie:', err);
      setError(err.response?.data?.message || 'Error updating movie. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: '#2A2A2A',
        borderRadius: 2,
        p: 4,
        color: 'white',
      }}
    >
      {/* Success Message */}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Movie updated successfully! Redirecting to details page...
        </Alert>
      )}

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Form Fields */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          error={errors.title}
          required
        />

        <FormField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          error={errors.description}
          multiline
          rows={4}
          required
        />

        <FormField
          label="Image URL"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleInputChange}
          error={errors.imageUrl}
          placeholder="https://example.com/image.jpg"
          required
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormField
            label="Release Date"
            name="releaseDate"
            type="date"
            value={formData.releaseDate}
            onChange={handleInputChange}
            error={errors.releaseDate}
            required
          />

          <FormField
            label="Duration (minutes)"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleInputChange}
            error={errors.duration}
            required
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormField
            label="Rating (0-10)"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleInputChange}
            error={errors.rating}
            inputProps={{ min: 0, max: 10, step: 0.1 }}
            required
          />

          <FormField
            label="Studio"
            name="studio"
            value={formData.studio}
            onChange={handleInputChange}
            error={errors.studio}
            required
          />
        </Box>

        <FormField
          label="Box Office ($)"
          name="boxOffice"
          type="number"
          value={formData.boxOffice}
          onChange={handleInputChange}
          error={errors.boxOffice}
          required
        />

        <FormSelect
          label="Director"
          name="directorId"
          value={formData.directorId}
          onChange={handleSelectChange}
          options={directors}
          error={errors.directorId}
          required
        />

        <FormMultiSelect
          label="Genres"
          name="genreIds"
          value={formData.genreIds}
          onChange={handleMultiSelectChange}
          options={genres}
          error={errors.genreIds}
          required
        />

        <FormMultiSelect
          label="Actors"
          name="actorIds"
          value={formData.actorIds}
          onChange={handleMultiSelectChange}
          options={actors}
          error={errors.actorIds}
          required
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: '#B8860BCC',
            color: 'white',
            py: 1.5,
            fontWeight: 'bold',
            fontSize: '1rem',
            mt: 2,
            '&:hover': {
              backgroundColor: '#B8860B',
            },
            '&:disabled': {
              backgroundColor: '#666',
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: 'white' }} />
          ) : (
            'Update Movie'
          )}
        </Button>
      </Box>
    </Box>
  );
} 