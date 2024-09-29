import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  styled
} from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {toast} from "react-toastify"

interface DonationModalProps {
  open: boolean;
  handleClose: () => void;
  causeId: number;
}

interface DonationFormValues {
  amount: number;
  donorName: string;
  anonymous: boolean;
}

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
}));

const DonationModal: React.FC<DonationModalProps> = ({ open, handleClose, causeId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<DonationFormValues>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: DonationFormValues) => {
    setLoading(true);
    try {
      await axios.post(`http://127.0.0.1:8000/api/donate/donations/create/`, {
        cause: causeId,
        amount: data.amount,
        donor_name: data.donorName,
        anonymous: data.anonymous
      });
      toast.success("Donated successfully")
      handleClose(); // Close modal on success
    } catch (err) {
      setError('Failed to make donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="donation-modal-title"
      aria-describedby="donation-modal-description"
    >
      <StyledBox>
        <Typography id="donation-modal-title" variant="h6" component="h2" gutterBottom>
          Donate to the Cause
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Donation Amount"
              type="number"
              variant="outlined"
              margin="normal"
              {...register('amount', { required: 'Amount is required', min: { value: 1, message: 'Amount must be at least $1' } })}
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
            <TextField
              fullWidth
              label="Donor Name (Optional)"
              variant="outlined"
              margin="normal"
              {...register('donorName')}
            />
            <Box display="flex" alignItems="center" mb={2}>
              <input
                type="checkbox"
                id="anonymous"
                {...register('anonymous')}
              />
              <label htmlFor="anonymous" style={{ marginLeft: 8 }}>Donate Anonymously</label>
            </Box>
            {error && (
              <Typography color="error" mb={2}>
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Donate
            </Button>
          </form>
        )}
      </StyledBox>
    </Modal>
  );
};

export default DonationModal;
