import { Button, FormControl, FormHelperText, Modal, TextField, Typography as Typ } from '@mui/material';
import { Box as Boxx} from '@mui/system';
import cn from 'classnames';
import SendIcon from '@mui/icons-material/Send';
import React, { useCallback, useState } from 'react'
import s from './ModalWindow.module.scss';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { addList, updateList } from '../../reducers/listsSlice';
import { ActionTypeModal } from '../../types/ActionTypeModal';
import { addTask } from '../../reducers/tasksSlice';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';

type Props = {
  closeWindow: () => void;
  isOpened: boolean;
  action: ActionTypeModal;
  id?: number;
  buttonName: string;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const ModalWindow: React.FC<Props> = ({ 
  closeWindow, 
  isOpened, 
  action, 
  id, 
  buttonName 
}) => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);
  const dispath = useAppDispatch();

  const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(event.target.value);

    const titleErrorCondition = event.target.value === '';

    if (titleErrorCondition) {
      setIsEmptyTitle(true);
    } else {
      setIsEmptyTitle(false);
    }
  }, []);

  const handleClick = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    switch(action) {
      case ActionTypeModal.Add:
        dispath(addList(currentTitle));
        break;
      
      case ActionTypeModal.Edit: {
        if (id) {
          dispath(updateList({id, title: currentTitle}));
        }

        break;
      }

      case ActionTypeModal.AddTask: {
        if (id) {
          dispath(addTask({ title: currentTitle, listId: id }))
        }
        break;
      }

      default: 
        break;
    }

    
    closeWindow();
    setCurrentTitle('');
  }, [action, closeWindow, currentTitle, dispath, id]);

  const addEmoji = useCallback((emoji: string) => () => setCurrentTitle(prev => `${prev}${emoji}`), []);
  return (
    <Modal
      open={isOpened}
      onClose={closeWindow}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Boxx sx={{ ...style, width: 400, display: 'flex', flexDirection: 'column' }}>
        {!(action === ActionTypeModal.AddTask) 
          ? (
          <Typ fontSize={20} sx={{ marginBottom: '30px', textAlign: 'center'}}>
            Pass your list name
          </Typ>
          ) : (
          <Typ fontSize={20} sx={{ marginBottom: '30px', textAlign: 'center'}}>
            Pass your task
          </Typ>
          )
        }

        <div className={s.modalWindowInputContainer}>
          {action !== ActionTypeModal.AddTask && (
            <FormControl error={isEmptyTitle} sx={{ width: '100%' }}>
              <TextField
                id="outlined-error-helper-text"
                label="Enter your list name"
                variant="standard"
                value={currentTitle}
                onChange={handleTitleChange}
                autoComplete="off"
                data-cy="titleInput"
                error={isEmptyTitle}
              />
              <FormHelperText className={cn(
                  s.titleError,
                { [s.titleErrorActive]: isEmptyTitle },
              )}
              >
                Please write a title
              </FormHelperText>
            </FormControl>
          )}

          {action === ActionTypeModal.AddTask && (
            <Textarea
              placeholder="Type in here…"
              value={currentTitle}
              onChange={(event) => setCurrentTitle(event.target.value)}
              minRows={4}
              maxRows={4}
              startDecorator={
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
                    👍
                  </IconButton>
                  <IconButton variant="outlined" color="neutral" onClick={addEmoji('🏖')}>
                    🏖
                  </IconButton>
                  <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
                    😍
                  </IconButton>
                </Box>
              }
              endDecorator={
                <Typography level="body3" sx={{ ml: 'auto' }}>
                  {currentTitle.length} character(s)
                </Typography>
              }
              sx={{ minWidth: 300 }}
            />
          )}
        </div>

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
          data-cy="submitButton"
          onClick={handleClick}
          className="App__Button"
        >
          {buttonName}
        </Button>
      </Boxx>
    </Modal>
  );
};
