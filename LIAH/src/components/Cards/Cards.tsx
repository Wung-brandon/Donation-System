import { Avatar, Box, styled, Typography } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

function Cards() {
  const [data, setData] = useState<any[]>([]);

  const getAllData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/donate/causes/');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllData();
    const intervalId = setInterval(getAllData, 1000); // 1000ms = 1 second

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box mt="2rem" ml="2rem">
      <div className="card" style={{ width: "100%", padding: "2rem" }}>
        {data.map((d) => (
          <Link to={`/card/${d.id}`} key={d.id} style={{ textDecoration: 'none' }}>
            <div className="card-body" style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "1rem" }}>
              <Avatar />
              <h5 className="card-title">{d.owner}</h5>
              <p className="card-text">{d.title}</p>
              <BorderLinearProgress variant="determinate" value={d.donation_progress} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>CFA {d.amount_raised} Raised</Typography>
                <Typography>{d.total_donors} Donations</Typography>
              </Box>
            </div>
          </Link>
        ))}
      </div>
    </Box>
  );
}

export default Cards;
