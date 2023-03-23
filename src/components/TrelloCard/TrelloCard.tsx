import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import styles from './TrelloCard.module.scss';
import moment from 'moment';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { deleteTask } from '../../reducers/tasksSlice';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  title: string,
  date: Date,
  id: number,
  index: number,
}

const TrelloCard: React.FC<Props> = ({title, date, id, index}) => {
  const normalizedDate = moment(date).fromNow()
  const dispatch = useAppDispatch();

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div 
          className={styles.trelloCard} 
          ref={provided.innerRef} 
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card sx={{ 
              padding: '10px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ width: '100%' }} gutterBottom style={{wordBreak: 'break-all'}} className={styles.trelloCardTitle}>
              {title}
            </Typography>

            <div className={styles.trelloCardBottomBlock}>
              <div className={styles.trelloCardRemoveButton}>
                <Chip
                  size="sm"
                  variant="outlined"
                  color="danger"
                  endDecorator={<ChipDelete onDelete={() => dispatch(deleteTask(id))}/>}
                  onClick={() => {
                    dispatch(deleteTask(id));
                  }}
                >
                  Remove
                </Chip>
              </div>

              <Typography 
                fontSize={12} 
                sx={{ 
                  minWidth: 'content-size', 
                  paddingLeft: '10px', 
                  alignSelf: 'flex-end'
                }} 
                gutterBottom
                className={styles.trelloCardDate}
              >
                {normalizedDate}
              </Typography>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloCard;