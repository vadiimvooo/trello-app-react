import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { instance } from "../helpers/instance";
import { List } from "../types/TypeForList";

interface InitialState {
  lists: List[],
  error: string,
  loading: boolean,
}

const initialValue: InitialState = {
  lists: [],
  loading: false,
  error: '',
}


const listsSlice = createSlice({
  name: 'lists',
  initialState: initialValue,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchLists.fulfilled, (state, action: PayloadAction<List[]>) => {
      state.loading = false;
      state.lists = action.payload
    });
    builder.addCase(fetchLists.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLists.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong'
    });
    builder.addCase(addList.fulfilled, (state, action: PayloadAction<List>) => {
      state.loading = false;
      state.lists = [...state.lists, action.payload]
    });
    builder.addCase(addList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addList.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong'
    });
    builder.addCase(deleteList.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(deleteList.rejected, (state, action) => {
      state.error = 'Something went wrong';
      state.loading = false;
    })
    builder.addCase(deleteList.fulfilled, (state, actions: PayloadAction<number>) => {
      state.loading = false;
      state.lists = state.lists.filter(el => el.id !== actions.payload);
    })
    builder.addCase(updateList.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(updateList.rejected, (state) => {
      state.error = 'Something went wrong';
      state.loading = false;
    })
    builder.addCase(updateList.fulfilled, (state, actions: PayloadAction<List>) => {
      state.loading = false;
      state.lists = state.lists.map(el => {
        if (el.id === actions.payload.id) {
          return actions.payload
        }
        
        return el;
      });
    })
  },
})

export const fetchLists = createAsyncThunk(
  'todos/fetchLists',
  async () => {
    const response = await instance.get('/lists');

    return response.data;
  }
);

export const addList = createAsyncThunk(
  'todos/addList',
  async (title: string) => {
    const response = await instance.post('/lists', {
      title
    });

    return response.data;
  }
);

export const deleteList = createAsyncThunk(
  'todos/deleteList',
  async (id: number) => {
    await instance.delete(`/lists/${id}`, {
      data: {
        id,
      }
    });

    return id;
  }
);

export const updateList = createAsyncThunk(
  'todos/updateList',
  async ({ id, title }: {id: number, title: string}) => {
    const response = await instance.patch(`/lists/${id}`, {
      title,
    });

    return response.data;
  }
);

// export const {} = tasksSlice.actions;

export default listsSlice.reducer;