 // @ts-ignore
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { instance } from "../helpers/instance";
import { Task } from "../types/TypeForTask";

interface InitialState {
  tasks: Task[],
  loading: boolean,
  error: string,
  sorting: boolean,
}

const initialValue: InitialState = {
  tasks: [],
  loading: false,
  error: '',
  sorting: false
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState : initialValue,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchTasks.rejected, (state) => {
      state.error = 'Something went wrong';
      state.loading = false;
    })
    builder.addCase(fetchTasks.fulfilled, (state, actions: PayloadAction<Task[]>) => {
      state.loading = false;
      state.tasks = actions.payload;
    })
    builder.addCase(addTask.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(addTask.rejected, (state) => {
      state.error = 'Something went wrong';
      state.loading = false;
    })
    builder.addCase(addTask.fulfilled, (state, actions: PayloadAction<Task>) => {
      state.loading = false;
      state.tasks = [...state.tasks, actions.payload];
    })
    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(deleteTask.rejected, (state) => {
      state.error = 'Something went wrong';
      state.loading = false;
    })
    builder.addCase(deleteTask.fulfilled, (state, actions: PayloadAction<number>) => {
      state.loading = false;
      state.tasks = state.tasks.filter(el => el.id !== actions.payload);
    })
    builder.addCase(updateTask.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(updateTask.rejected, (state) => {
      state.error = 'Something went wrong';
      state.loading = false;
    })
    builder.addCase(updateTask.fulfilled, (state, actions: PayloadAction<Task>) => {
      state.loading = false;
      state.tasks = state.tasks.map(el => {
        if (el.id === actions.payload.id) {
          return actions.payload
        }
        
        return el;
      });
    })
    builder.addCase(sortTasks.fulfilled, (state, actions: PayloadAction<Task[]>) => {
      state.sorting = false;
      state.tasks = actions.payload;
    })
    builder.addCase(sortTasks.rejected, (state) => {
      state.sorting = false;
      state.error = 'Something went wrong';
    })
    builder.addCase(sortTasks.pending, (state) => {
      state.sorting = true;
    });
  },
});


export const fetchTasks = createAsyncThunk(
  'todos/fetchTasks',
  async () => {
    const response = await instance.get('/tasks');

    return response.data;
  }
);

export const addTask = createAsyncThunk(
  'todos/addTask',
  async ({title, listId}: {title: string, listId: number}) => {
    const response = await instance.post('/tasks', {
      title,
      listId
    });

    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'todos/deleteTask',
  async (id: number) => {
    await instance.delete(`/tasks/${id}`, {
      data: {
        id,
      }
    });

    return id;
  }
);

export const updateTask = createAsyncThunk(
  'todos/updateTask',
  async ({ id, title, listId }: {id: number, title: string, listId: number}) => {
    const response = await instance.patch(`/tasks/${id}`, {
      title,
      listId,
    });

    return response.data;
  }
);

export const sortTasks = createAsyncThunk(
  'todos/sortTask',
  async ({ taskId, newPosition, newListId }: {taskId: number, newPosition: number, newListId: number}) => {

    await instance.put('/tasks/order', {
      taskId,
      newPosition,
      newListId,
    });

    const responseNewTasks = await instance.get('/tasks');

    return responseNewTasks.data;
  }
);

export default tasksSlice.reducer;