import './App.scss';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';
import { sortTasks } from './reducers/tasksSlice';
import { Loader } from './components/Loader';
import { useCallback } from 'react';

function App() {
  const dispatch = useAppDispatch();
  const { sorting, loading: loadingTasks } = useAppSelector(state => state.tasks);
  const { loading: loadingLists } = useAppSelector(state => state.lists);


  const onDragEnd = useCallback((result: any) => {
    const { destination, draggableId } = result;

    if (!destination) {
      return;
    }

    dispatch(sortTasks({
      taskId: Number(draggableId),
      newPosition: Number(destination.index),
      newListId: Number(destination.droppableId)
    }));
  }, [dispatch]);

  return (
    <>
      <div className="App">
        <DragDropContext onDragEnd={onDragEnd}>
          <Header />

          <div className="section">
            <div className="container">
              <Outlet />
            </div>
          </div>
        </DragDropContext>
      </div>
      

      {(sorting || loadingLists || loadingTasks) && <Loader />}
    </>
  );
}

export default App;
