import React, { useState } from 'react';
import { Box, Button, Typography, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { 
  RateReview,
  Edit,
  Delete
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { contentService, type Content } from '../services';

interface ContentActionsProps {
  content: Content;
}

export default function ContentActions({ content }: ContentActionsProps) {
  const navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleReview = () => {
    setSnackbarMessage('Review feature coming soon!');
    setSnackbarSeverity('success');
    setShowSnackbar(true);
  };

  const handleEdit = () => {
    // Navegar para a página de edição de conteúdo
    navigate(`/edit-content/${content.id}`, { state: { editContent: content } });
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await contentService.deleteContent(content.id);
      setShowDeleteDialog(false);
      setSnackbarMessage('Content deleted successfully!');
      setSnackbarSeverity('success');
      setShowSnackbar(true);
      
      // Redirecionar para a página apropriada após deletar
      setTimeout(() => {
        if (content.type === 'MOVIE') {
          navigate('/movies');
        } else {
          navigate('/series');
        }
      }, 2000);
    } catch (error) {
      console.error('Error deleting content:', error);
      setSnackbarMessage('Failed to delete content. Please try again.');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
      setShowDeleteDialog(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#2A2A2A',
        borderRadius: 2,
        p: 3,
        color: 'white',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: '"Bebas Neue", sans-serif',
          mb: 3,
          color: '#FFD700',
        }}
      >
        Actions
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Write Review */}
        <Button
          variant="contained"
          startIcon={<RateReview />}
          onClick={handleReview}
          sx={{
            backgroundColor: '#B8860BCC',
            color: 'white',
            py: 1.5,
            fontWeight: 'bold',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: '#B8860B',
            },
          }}
        >
          Write Review
        </Button>

        {/* Edit Content */}
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={handleEdit}
          sx={{
            borderColor: '#B8860BCC',
            color: 'white',
            py: 1.5,
            fontWeight: 'bold',
            '&:hover': {
              borderColor: '#B8860B',
              backgroundColor: 'rgba(184, 134, 11, 0.1)',
            },
          }}
        >
          Edit Content
        </Button>

        {/* Delete Content */}
        <Button
          variant="outlined"
          startIcon={<Delete />}
          onClick={handleDeleteClick}
          sx={{
            borderColor: '#e57373',
            color: '#e57373',
            py: 1.5,
            fontWeight: 'bold',
            '&:hover': {
              borderColor: '#d32f2f',
              backgroundColor: 'rgba(229, 115, 115, 0.1)',
            },
          }}
        >
          Delete Content
        </Button>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        PaperProps={{
          sx: {
            backgroundColor: '#2A2A2A',
            color: 'white',
          },
        }}
      >
        <DialogTitle id="delete-dialog-title" sx={{ color: 'white' }}>
          Delete Content
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description" sx={{ color: '#E8E8E8' }}>
            Are you sure you want to delete "{content.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleDeleteCancel}
            sx={{
              color: '#E8E8E8',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
            sx={{
              backgroundColor: '#e57373',
              color: 'white',
              '&:hover': {
                backgroundColor: '#d32f2f',
              },
              '&:disabled': {
                backgroundColor: 'rgba(229, 115, 115, 0.5)',
              },
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
} 