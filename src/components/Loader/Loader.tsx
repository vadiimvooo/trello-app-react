import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import s from './Loader.module.scss';


export const Loader = () => {
  return (
    <div className={s.loaderContainer}>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </div>
  );
};
