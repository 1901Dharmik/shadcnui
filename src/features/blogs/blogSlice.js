import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import blogService from './blogService';
import { toast } from 'react-toastify';

// export const getBlogs = createAsyncThunk('blog/get-blogs', async (thunkAPI) => {
//   try {
//     return await blogService.getBlogs();
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

export const getBlogs = createAsyncThunk(
  'blog/get-blogs',
  async (params = {}, thunkAPI) => {
    try {
      return await blogService.getBlogs(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlogs = createAsyncThunk(
  'blog/create-blogs',
  async (blogData, thunkAPI) => {
    try {
      return await blogService.createBlog(blogData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABlog = createAsyncThunk(
  'blog/get-blog',
  async (id, thunkAPI) => {
    try {
      return await blogService.getBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateABlog = createAsyncThunk(
  'blog/update-blog',
  async (blog, thunkAPI) => {
    try {
      return await blogService.updateBlog(blog);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const updateBlogStatus = createAsyncThunk(
//   "blogs/update-status",
//   async ({ id, status }, thunkAPI) => {
//     try {
//       await blogService.updateBlog(id, status);
//       return { id, status };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const deleteABlog = createAsyncThunk(
  'blog/delete-blog',
  async (id, thunkAPI) => {
    try {
      return await blogService.deleteBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  status: 'idle',
  message: '',
  totalBlogs: 0,
  currentPage: 1,
  totalPages: 0,
  counts: { all: 0, published: 0, draft: 0 },
};

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      // .addCase(getBlogs.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = false;
      //   state.isSuccess = true;
      //   state.blogs = action.payload.blogs;
      // })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = action.payload.blogs;
        state.totalBlogs = action.payload.totalBlogs;
        state.currentPage = action.payload.page;
        state.totalPages = Math.ceil(action.payload.totalBlogs / action.payload.limit);
        state.counts = action.payload.counts;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.status = 'succeeded';
        state.createdBlog = action.payload;
      })
      .addCase(createBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogName = action.payload.title;
        state.blogDescription = action.payload.description;
        state.blogCategory = action.payload.category;
        state.blogImages = action.payload.images;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlog = action.payload;
      })
      .addCase(updateABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlog = action.payload;
      })
      .addCase(deleteABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // .addCase(updateBlogStatus.fulfilled, (state, action) => {
      //   const { id, status } = action.payload;
      //   state.blogs = state.blogs.map(blog => 
      //     blog._id === id ? { ...blog, status } : blog
      //   );
      //   toast.success("Blog status updated successfully");
      // })
      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
