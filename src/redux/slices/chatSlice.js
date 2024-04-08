// Import the createSlice and nanoid functions from Redux Toolkit
// createSlice automatically generates action creators and action types
// nanoid generates unique IDs
import { createSlice } from "@reduxjs/toolkit";

// Create a slice of the Redux store for cars
// A "slice" is a portion of the Redux store where a particular feature keeps its state
const chat = createSlice({
    // The name of the slice. This will be used as a prefix for the generated action types
    name: "chat",
    // The initial state for this slice of the Redux store
    initialState: {
        messages: [
            {
                type: "ai",
                content: "Hello! How can I help you today?",
            },
        ],
    },
    // The reducers for this slice of the Redux store
    // Reducers are functions that determine how the state should be updated in response to an action
    reducers: {
        addMessage: (state, action) => {
            // Add the new message to the messages array
            state.messages.push(action.payload);
            if (action.payload.type === "user") {
                // Simulate the AI response
                state.messages.push({
                    type: "ai",
                    content: "Thinking...",
                });
            } else {
                // find the last ai message with the "Thinking..." content and remove it
                const index = state.messages.findIndex(
                    (message) =>
                        message.type === "ai" &&
                        message.content === "Thinking..."
                );
                state.messages.splice(index, 1);
            }
        },
    },
});

// Export the generated action creators for the cars slice
// These can be used to dispatch actions that the reducers will respond to
export const { addMessage } = chat.actions;
export const chatReducer = chat.reducer;
