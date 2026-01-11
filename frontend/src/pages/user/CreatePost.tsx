import { useState, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink } from 'react-router-dom';
import { z } from 'zod';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/reduxHooks';
import { fetchPostRequest, createPostRequest, updatePostRequest } from '../../features/posts/post.slice';

type FormErrors = {
  title?: string;
  content?: string;
};

/* ================== VALIDATION SCHEMA ================== */
const postSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters'),
  content: z
    .string()
    .min(20, 'Content must be at least 20 characters'),
});

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    open: false,
    message: '',
    type: 'success',
  });

  const { selectedPost } = useAppSelector((s) => s.posts);


  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchPostRequest(id));
    }
  }, [dispatch, isEditMode, id]);

  useEffect(() => {
    if (isEditMode && selectedPost) {
      setTitle(selectedPost?.data.title);
      setContent(selectedPost?.data.content);
    }
  }, [isEditMode, selectedPost?.data]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const result = postSchema.safeParse({ title, content });

      if (!result.success) {
        const fieldErrors: FormErrors = {};
        result.error.issues.forEach((issue) => {
          fieldErrors[issue.path[0] as keyof FormErrors] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setErrors({});

      if (isEditMode && id) {
        dispatch(updatePostRequest({ id, title, content }));

        setToast({
          open: true,
          message: 'Post updated successfully!',
          type: 'success',
        });
      } else {
        dispatch(createPostRequest({ title, content }));

        setToast({
          open: true,
          message: 'Post created successfully!',
          type: 'success',
        });

        setTitle('');
        setContent('');
      }
    },
    [dispatch, title, content, isEditMode, id]
  );


  return (
    <>
      {/* ===== HEADER ===== */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
          <Button
            component={RouterLink}
            to="/user"
            startIcon={<ArrowBackIcon />}
            sx={{ mr: 2 }}
          >
            Back
          </Button>

          <Typography variant="h6" fontWeight={800}>
            Create New Post
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ===== CONTENT ===== */}
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Card
          variant="outlined"
          sx={{
            borderRadius: 4,
            boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Write your post
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              Share your ideas with the community
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Post Title"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
              />

              <TextField
                fullWidth
                label="Post Content"
                margin="normal"
                multiline
                minRows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                error={!!errors.content}
                helperText={errors.content}
              />

              <Box mt={4} display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{
                    px: 4,
                    py: 1.2,
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                >
                  {isEditMode ? 'Update Post' : 'Publish Post'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>

      {/* ===== TOAST ===== */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={toast.type}
          onClose={() => setToast({ ...toast, open: false })}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreatePost;
