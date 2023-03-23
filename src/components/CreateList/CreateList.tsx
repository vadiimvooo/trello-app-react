import { Button, Card, CardActions, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import React, { useCallback, useState } from 'react'
import s from './CreateList.module.scss';
import { ModalWindow } from '../ModalWindow';
import { ActionTypeModal } from '../../types/ActionTypeModal';

export const CreateList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div className={s.cardWrapper}>
        <Button size="small" sx={{ minWidth: '100%' }} onClick={handleModalOpen}>
          <Card sx={{ display: 'flex', alignItems: 'center'}} variant="outlined">
            <Typography sx={{ lineHeight: '100%' , marginBottom: 0, paddingLeft: '15px', paddingRight: '5px' }} gutterBottom>
              Create new List
            </Typography>
            <CardActions>
              <AddIcon fill="white" />
            </CardActions>
          </Card>
        </Button>
      </div>

      <ModalWindow closeWindow={handleModalClose} isOpened={isModalOpen} action={ActionTypeModal.Add} buttonName="Create list" />
    </>
  );
};
