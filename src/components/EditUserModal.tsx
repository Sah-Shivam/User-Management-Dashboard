
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';


const schema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(20, 'Name cannot exceed 20 characters') 
    .regex(/^[\p{L}\s'-]+$/u, 'Only letters, spaces, hyphens and apostrophes allowed'),
  status: z.enum(['active', 'inactive']),
});

type FormData = z.infer<typeof schema>;

interface EditUserModalProps {
  user: {
    id: number;
    name: string;
    status: 'active' | 'inactive';
    email: string;
    avatar?: string;
    createdAt: string;
  };
  onSave: (updated: { name: string; status: 'active' | 'inactive' }) => void;
}

export default function EditUserModal({ user, onSave }: EditUserModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [status, setStatus] = useState<'active' | 'inactive'>(user.status);
  const [errors, setErrors] = useState<z.ZodFormattedError<FormData> | null>(null);

  // Reset form when user changes or modal opens
  useEffect(() => {
    if (open) {
      setName(user.name);
      setStatus(user.status);
      setErrors(null);
    }
  }, [open, user]);

  const handleSubmit = () => {
    const result = schema.safeParse({ name: name.trim(), status });

    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    onSave({
      name: result.data.name,
      status: result.data.status,
    });
    setOpen(false);
  };

  return (
    <div className="mt-4">
      <Button variant="contained" onClick={() => setOpen(true)}>
        Edit
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <div style={{ minWidth: 300, marginTop: 8 }}>
            {/* Name Field */}
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              error={!!errors?.name}
              helperText={
                errors?.name
                  ? errors.name._errors[0]
                  : `${name.length}/20 characters`
              }
              inputProps={{ maxLength: 60 }} // extra safety
            />

            {/* Status Field */}
            <FormControl fullWidth margin="normal" error={!!errors?.status}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
              {errors?.status && (
                <FormHelperText>{errors.status._errors[0]}</FormHelperText>
              )}
            </FormControl>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
