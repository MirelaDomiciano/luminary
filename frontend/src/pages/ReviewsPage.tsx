import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Avatar,
  IconButton,
  Rating,
  Fab,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';

// Mock data para os reviews
const mockReviews = [
  {
    id: 1,
    title: 'Top Gun: Maverick',
    year: 2022,
    rating: 5.0,
    review: "An absolute timeless masterpiece that sets the stage for one of the greatest fantasy sagas ever told. The seamless adaptation of Tolkien's intricate world, from the Shire's pastoral beauty to the ominous depths of Moria, is truly commendable. The cast delivers exceptional performances, especially Ian McKellen as Gandalf and Sean Astin as the loyal Samwise, bringing a genuine emotional weight to their characters."
  },
  {
    id: 2,
    title: 'Inception',
    year: 2010,
    rating: 2.5,
    review: "Christopher Nolan's Inception is a mind-bending masterpiece that brilliantly blends action, emotion, and philosophical depth. With a complex narrative structure and visually stunning sequences, the film challenges viewers to question the nature of reality. Leonardo DiCaprio delivers a compelling performance, supported by a strong ensemble cast. The soundtrack by Hans Zimmer adds intensity and emotion, making the overall experience unforgettable."
  },
  {
    id: 3,
    title: 'Breaking Bad',
    year: '2008-2013',
    rating: 5.0,
    review: "Breaking Bad is an exceptional series that redefined television storytelling. Bryan Cranston's portrayal of Walter White is nothing short of legendary, showing a dramatic transformation from a mild-mannered teacher to a feared drug kingpin. The writing is sharp, the pacing is intense, and the character development is masterfully executed. Every episode builds tension and depth, making it one of the most critically acclaimed shows of all time."
  },
  {
    id: 4,
    title: 'The Social Network',
    year: 2010,
    rating: 5.0,
    review: "An absolute timeless masterpiece that sets the stage for one of the greatest fantasy sagas ever told. The seamless adaptation of Tolkien's intricate world, from the Shire's pastoral beauty to the ominous depths of Moria, is truly commendable. The cast delivers exceptional performances, especially Ian McKellen as Gandalf and Sean Astin as the loyal Samwise, bringing a genuine emotional weight to their characters."
  },
];

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReviews = mockReviews.filter(review =>
    review.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout disableContainer>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3,
          borderBottom: '1px solid #333',
        }}
      >
        {/* Search Bar */}
        <TextField
          placeholder="Search for your reviews..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: '400px',
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#2A2A2A',
              borderRadius: '25px',
              '& fieldset': { borderColor: '#444' },
              '&:hover fieldset': { borderColor: '#666' },
              '&.Mui-focused fieldset': { borderColor: '#FFD700' },
            },
            '& .MuiInputBase-input': {
              color: '#E8E8E8',
              '&::placeholder': {
                color: '#888',
                opacity: 1,
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#888' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* User Avatar */}
        <Avatar
          sx={{
            width: 50,
            height: 50,
            bgcolor: '#FFD700',
          }}
        >
          U
        </Avatar>
      </Box>

      <Box sx={{ px: 4, py: 4, pt: 7 }}>
        <Typography
          variant="h4"
          sx={{
            color: '#FFF',
            fontFamily: '"Bebas Neue", sans-serif',
            mb: 4,
            fontSize: '32px',
          }}
        >
          My Reviews
        </Typography>

        {/* Reviews Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: 3,
          }}
        >
          {filteredReviews.map((review) => (
            <Card
              key={review.id}
              sx={{
                backgroundColor: '#2A2A2A',
                borderRadius: 2,
                border: '1px solid #333',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                {/* Header with title and actions */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#FFF',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 'bold',
                        mb: 0.5,
                      }}
                    >
                      {review.title} - {review.year}
                    </Typography>
                    <Rating
                      value={review.rating}
                      readOnly
                      precision={0.5}
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: '#FFD700',
                        },
                        '& .MuiRating-iconEmpty': {
                          color: '#666',
                        },
                        mb: 1,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#FFD700',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 'bold',
                      }}
                    >
                      {review.rating.toFixed(1)}
                    </Typography>
                  </Box>

                  {/* Action Buttons */}
                  <Box>
                    <IconButton
                      size="small"
                      sx={{
                        color: '#888',
                        '&:hover': { color: '#FFD700' },
                        mr: 1,
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        color: '#888',
                        '&:hover': { color: '#FF4444' },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                {/* Review Text */}
                <Typography
                  variant="body2"
                  sx={{
                    color: '#E8E8E8',
                    fontFamily: 'Poppins, sans-serif',
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {review.review}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: '#888',
                fontFamily: 'Poppins, sans-serif',
                mb: 2,
              }}
            >
              {searchTerm ? 'No reviews found for your search.' : 'You haven\'t written any reviews yet.'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              {searchTerm ? 'Try searching for a different title.' : 'Start reviewing your favorite movies and series!'}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          backgroundColor: '#FFD700',
          '&:hover': {
            backgroundColor: '#E6C200',
          },
        }}
      >
        <AddIcon />
      </Fab>
    </Layout>
  );
} 