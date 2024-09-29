import { Box, Typography, Avatar, styled, Button } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import DonationModal from '../Form/form';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));

function CardDetail() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getCauseDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/donate/causes/${id}/`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCauseDetails();
    const intervalId = setInterval(getCauseDetails, 1000); // 1000ms = 1 second

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [id]);

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box mt="2rem" ml="2rem">
      <div className="card-detail" style={{ width: "100%", padding: "2rem" }}>
        <div className="row">
          <div className="col-lg-5 col-sm-12 shadow" style={{ padding: "2rem" }}>
            <Avatar />
            <Typography variant="h6">{data.owner}</Typography>
            <Typography mt="1rem">{data.description}</Typography>
          </div>
          <div className="col-lg-7 col-sm-12 shadow" style={{ padding: "2rem", width: "50%" }}>
            <Typography mt="1rem" fontWeight="bold" variant='h5'>
              CFA{data.amount_raised} Raised of CFA{data.goal_amount} goal
            </Typography>
            <BorderLinearProgress variant="determinate" className='mt-3' value={data.donation_progress} />
            <Typography variant="h6" className='mt-3'>Donations Count: {data.donation_count}</Typography>
            
            <Button
              color='primary'
              sx={{ width: "100%", marginTop: "1rem" }}
              variant='contained'
              onClick={() => setModalOpen(true)}
            >
              Donate Now
            </Button>
          </div>
        </div>
        <DonationModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          causeId={data.id} // Pass the causeId to the modal
        />
      </div>
    </Box>
  );
}

export default CardDetail;
