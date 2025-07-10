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

interface MovieFormProps {
  editContent?: Content;
}

export default function MovieForm({ editContent }: MovieFormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  
  // Options for dropdowns
  const [genres, setGenres] = useState<Option[]>([]);
  const [actors, setActors] = useState<Option[]>([]);
  const [directors, setDirectors] = useState<Option[]>([]);
  
  const [formData, setFormData] = useState<MovieFormData>({
    title: editContent?.title || '',
    description: editContent?.description || '',
    releaseDate: editContent?.releaseDate ? editContent.releaseDate.split('T')[0] : '',
    duration: editContent?.duration?.toString() || '',
    rating: editContent?.rating?.toString() || '',
    studio: editContent?.studio || '',
    boxOffice: editContent?.boxOffice?.toString() || '',
    imageUrl: editContent?.imageUrl || '',
    directorId: editContent?.directorId || '',
    genreIds: editContent?.genres?.map(g => g.id) || [],
    actorIds: editContent?.actors?.map(a => a.id) || [],
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
      
      console.log('Movie data to be sent:', movieData);
      
      let response;
      if (editContent) {
        // Update existing movie
        response = await contentService.updateContent(editContent.id, movieData);
        console.log('Movie updated successfully:', response);
      } else {
        // Create new movie
        response = await contentService.createMovie(movieData);
        console.log('Movie created successfully:', response);
      }
      
      setSuccess(true);
      setTimeout(() => {
        if (editContent) {
          navigate(`/content/${editContent.id}`);
        } else {
          navigate('/movies');
        }
      }, 2000);
      
    } catch (err: any) {
      console.error('Error creating movie:', err);
      setError(err.response?.data?.message || 'Error creating movie. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {editContent 
            ? 'Movie updated successfully! Redirecting to details page...'
            : 'Movie created successfully! Redirecting to movies page...'
          }
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <FormField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                error={!!errors.title}
                helperText={errors.title}
                required
              />
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <FormField
                label="Studio"
                name="studio"
                value={formData.studio}
                onChange={handleInputChange}
                error={!!errors.studio}
                helperText={errors.studio}
                required
              />
            </Box>
          </Box>
          
          <FormField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
            multiline
            rows={4}
            required
          />
          
          <FormField
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            error={!!errors.imageUrl}
            helperText={errors.imageUrl}
            placeholder="https://example.com/image.jpg"
            required
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <FormField
                label="Release Date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleInputChange}
                error={!!errors.releaseDate}
                helperText={errors.releaseDate}
                type="date"
                required
              />
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <FormField
                label="Duration (minutes)"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                error={!!errors.duration}
                helperText={errors.duration}
                type="number"
                required
              />
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <FormField
                label="Rating (0-10)"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                error={!!errors.rating}
                helperText={errors.rating}
                type="number"
                required
              />
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <FormField
                label="Box Office ($)"
                name="boxOffice"
                value={formData.boxOffice}
                onChange={handleInputChange}
                error={!!errors.boxOffice}
                helperText={errors.boxOffice}
                type="number"
                required
              />
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <FormSelect
                label="Director"
                name="directorId"
                value={formData.directorId}
                onChange={handleSelectChange}
                options={directors}
                error={!!errors.directorId}
                helperText={errors.directorId}
                required
              />
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <FormMultiSelect
                label="Genres"
                name="genreIds"
                value={formData.genreIds}
                onChange={handleMultiSelectChange}
                options={genres}
                error={!!errors.genreIds}
                helperText={errors.genreIds}
                required
              />
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <FormMultiSelect
                label="Actors"
                name="actorIds"
                value={formData.actorIds}
                onChange={handleMultiSelectChange}
                options={actors}
                error={!!errors.actorIds}
                helperText={errors.actorIds}
                required
              />
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              px: 4,
              py: 1.5,
              backgroundColor: 'rgba(184, 134, 11, 0.80)',
              color: '#FFF',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '16px',
              '&:hover': {
                backgroundColor: 'rgba(184, 134, 11, 1)',
              },
              '&:disabled': {
                backgroundColor: 'rgba(184, 134, 11, 0.50)',
              },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#FFF' }} /> : (editContent ? 'Update Movie' : 'Create Movie')}
          </Button>
          
          <Button
            type="button"
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              px: 4,
              py: 1.5,
              borderColor: '#666',
              color: '#E8E8E8',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '16px',
              '&:hover': {
                borderColor: '#FFD700',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
} 