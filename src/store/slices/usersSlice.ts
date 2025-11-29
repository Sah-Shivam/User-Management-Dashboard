
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  status: 'active' | 'inactive';
  createdAt: string;
};

export type SortField = 'name' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

interface UsersState {
  users: User[];                   
  selectedUser: User | null;
  filters: {
    name: string;
    status: 'all' | 'active' | 'inactive';
  };
  sorting: {
    field: SortField;
    order: SortOrder;
  };
  pagination: {
    page: number;
    limit: number;
    total: number; 
  };
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  filters: { name: '', status: 'all' },
  sorting: { field: 'createdAt', order: 'desc' },
  pagination: { page: 1, limit: 10, total: 0 },
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.pagination.total = action.payload.length;
    },

    
    setPaginatedUsers(
      state,
      action: PayloadAction<{ users: User[]; total: number; page: number }>
    ) {
      state.users = action.payload.users;
      state.pagination.total = action.payload.total;
      state.pagination.page = action.payload.page;
      state.loading = false;
    },

    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload;
    },

    updateUser(state, action: PayloadAction<User>) {
      const updatedUser = action.payload;
      state.users = state.users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      );
      if (state.selectedUser?.id === updatedUser.id) {
        state.selectedUser = updatedUser;
      }
    },

    setFilters(
      state,
      action: PayloadAction<{ name?: string; status?: 'all' | 'active' | 'inactive' }>
    ) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to page 1 on filter
    },

    setSorting(state, action: PayloadAction<{ field: SortField; order: SortOrder }>) {
      state.sorting = action.payload;
    },

    setPage(state, action: PayloadAction<number>) {
      state.pagination.page = action.payload;
    },

    setLimit(state, action: PayloadAction<number>) {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },

  },
});

export const {
  setUsers,
  setPaginatedUsers,
  setSelectedUser,
  updateUser,
  setFilters,
  setSorting,
  setPage,
  setLimit,
  setLoading,
  setError,
} = usersSlice.actions;

export default usersSlice.reducer;