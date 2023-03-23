import { Grid } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { CreateList } from '../../components/CreateList';
import TrelloList from '../../components/TrelloList/TrelloList'
import { getTasksByListId } from '../../helpers/getTasksByListId';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { fetchLists } from '../../reducers/listsSlice';
import { fetchTasks } from '../../reducers/tasksSlice';
import { ListWithTasks } from '../../types/TypeForList';
import s from './TasksPage.module.scss';

const TasksPage = () => {
  const dispatch = useAppDispatch();
  const { lists } = useAppSelector(state => state.lists);
  const { tasks } = useAppSelector(state => state.tasks);
  const { width } = useWindowDimensions();

  let gridSize: number;

  if (width > 1024) {
    gridSize = 4;
  } else if (width > 620 && width <= 1024) {
    gridSize = 6;
  } else if (width <= 620) {
    gridSize = 12;
  }

  const [listsWithTasks, setListsWithTasks] = useState<ListWithTasks[]>([]);

  const getData = useCallback(async () => {
    await dispatch(fetchLists());
    await dispatch(fetchTasks());
  }, [dispatch])

  useEffect(() => {
    getData();
  }, [getData])
  
  useEffect(() => {
    setListsWithTasks(lists.map(list => ({
      ...list,
      tasks: getTasksByListId(tasks, list.id)
    })));
  }, [lists, tasks]);

  return (
    <div className={s.wrapperContainerTasksPage}>
     <div className={s.wrapperContainerAddLists}>
        <CreateList />
      </div>
      <div className={s.wrapperContainerList}>
        <Grid container spacing={2} sx={{ flexGrow: 1, margin: 0, marginTop: '50px' }}>
          {listsWithTasks.map(list => (
            <Grid item xs={gridSize} key={list.id}>
              <TrelloList title={list.title} tasks={list.tasks} id={list.id} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default TasksPage