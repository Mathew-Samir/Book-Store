import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for fetching books
export const getBooks = createAsyncThunk('book/getBooks', async (_, thunkAPI) => {
    //const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch('http://localhost:9000/books');
        const data = await res.json();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message); // Return error message to handle in rejected case
    }
});

export const insertBook = createAsyncThunk('book/insertBook', async (bookData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch('http://localhost:9000/books', {
            method: 'POST',
            body: JSON.stringify(bookData),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        });
        const data = await res.json(); // Now using 'res' instead of 'rest'
        return data;
    } catch (error) { // Catching the error properly now
        return rejectWithValue(error.message);
    }
});
export const deleteBook = createAsyncThunk('book/deleteBook', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`http://localhost:9000/books/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            throw new Error('Failed to delete book');
        }
        return id; // Return the deleted book ID
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


// Redux slice for books
const bookSlice = createSlice({
    name: "book",
    initialState: { books: null, isLoading: false, error: null },
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.books = action.payload; 
                state.isLoading = false;
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; 
                state.isLoading = false;
            })

            // insert book
            .addCase(insertBook.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(insertBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books.push(action.payload);
            })
            .addCase(insertBook.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        
        // delete book
        .addCase(deleteBook.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.books = state.books.filter((el) => el.id !== action.payload);
                state.isLoading = false;
                
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});


export default bookSlice.reducer;
