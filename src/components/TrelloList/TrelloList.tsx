import { useState } from 'react';
import { Task } from '../../types/TypeForTask';
import TrelloCard from '../TrelloCard/TrelloCard';
import s from './TrelloList.module.scss';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { deleteList } from '../../reducers/listsSlice';
import { ModalWindow } from '../ModalWindow';
import { ActionTypeModal } from '../../types/ActionTypeModal';
import { Droppable } from 'react-beautiful-dnd';
import { SortType } from '../../types/SortType';
import { ActionButton } from '../ActionButton';

type Props = {
  id: number
  title: string,
  tasks: Task[],
}

const TrelloList: React.FC<Props> = ({ id, title, tasks }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAddTask, setOpenAddTask] = useState(false);
  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState<SortType>(SortType.None);

  let sortedTasks: Task[];

  switch(sortBy) {
    case SortType.ASC:
      sortedTasks = [...tasks].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      break;

    case SortType.Desc:
      sortedTasks = [...tasks].sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
      break;

    default:
      sortedTasks = [...tasks];
      break;
  }

  const handleCloseEdit = () => {
    setOpenEdit(false);
  }

  const handleCloseAddtask = () => {
    setOpenAddTask(false);
  }

  return (
    <>
    <Droppable droppableId={id.toString()}>
      {(provided) => (
        <div className={s.TrelloListContainer} {...provided.droppableProps} ref={provided.innerRef}>
        <div className={s.trelloListTitleBlock}>
          <h4 className={s.trelloListTitle} style={{wordBreak: 'break-all'}}>{title}</h4>
 
          <div className={s.trelloListButtonContainer}>
            {sortedTasks.length !== 0 && (
              <ActionButton
                color="warning" 
                Decorator={SortByAlphaIcon} 
                sortBy={sortBy} 
                onClickSort={[() => setSortBy(SortType.Desc), () => setSortBy(SortType.ASC)]}
              />
            )}

            <ActionButton
              color="success" 
              Decorator={AddIcon} 
              onClick={() => setOpenAddTask(true)}
            />

            <ActionButton
              color="info" 
              Decorator={EditIcon} 
              onClick={() => setOpenEdit(true)}
            />

          
 
             {sortedTasks.length === 0 && (
                <ActionButton
                  color="danger" 
                  Decorator={DeleteForever} 
                  onClick={() => setOpenDelete(true)}
                />
             )}
           </div>
         </div>
 
         <div className={s.trelloTasksBlock}>
           {sortedTasks.map((task, index) => (
             <TrelloCard key={task.id} title={task.title} date={task.updatedAt} id={task.id} index={index} />
           ))}
         </div>
         {provided.placeholder}
       </div>
      )}
    </Droppable>

    <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        aria-labelledby="alert-dialog-modal-title"
        aria-describedby="alert-dialog-modal-description"
      >
        <Typography
          id="alert-dialog-modal-title"
          component="h2"
          startDecorator={<WarningRoundedIcon />}
        >
          Confirmation
        </Typography>
        <Divider />
        <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
          Are you sure you want to discard all of your notes?
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
          <Button variant="plain" color="neutral" onClick={() => setOpenDelete(false)}>
            Cancel
          </Button>
          <Button variant="solid" color="danger" onClick={() => {
            setOpenDelete(false)
            dispatch(deleteList(id));
          }}>
            Discard notes
          </Button>
        </Box>
      </ModalDialog>
    </Modal>

    <ModalWindow 
      closeWindow={handleCloseEdit} 
      isOpened={openEdit} 
      action={ActionTypeModal.Edit} 
      buttonName="Edit" 
      id={id} 
    />

    <ModalWindow 
      closeWindow={handleCloseAddtask} 
      isOpened={openAddTask} 
      action={ActionTypeModal.AddTask} 
      buttonName="Add task" 
      id={id} 
    />
  </>
  );
};

export default TrelloList;