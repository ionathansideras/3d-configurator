// Import necessary dependencies
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
// Import the addMessage action from the Redux store
import { addMessage } from "../redux/store";
// Import the chat API
import { createPorsche918ChatApi } from "../apis/chatGptApi";
import chatimg from "../assets/chatimg.svg";
import closeimg from "../assets/close.svg";

// Define the Chat component
export default function Chat() {
    // Use the useSelector hook to access the messages from the Redux store
    const messages = useSelector((state) => state.chat.messages);
    // Use the useDispatch hook to dispatch actions
    const dispatch = useDispatch();
    // Create a ref for the chat container
    const chatContainerRef = useRef(null);
    // Create a state variable for the current message
    const [message, setMessage] = useState("");
    // Create a ref for the chat
    const chatRef = useRef(null);

    // Define a function to open/close the chat
    function handleOpenChat() {
        chatContainerRef.current.classList.toggle("open");
    }

    // Define a function to handle messages
    function handleMessages(e) {
        e.preventDefault();
        if (message.trim() === "") return;

        // Use the chat API to get the AI response
        createPorsche918ChatApi(message).then((response) => {
            // Dispatch an action to add the AI response to the Redux store
            dispatch(addMessage({ type: "ai", content: response }));
        });
        // Dispatch an action to add the user message to the Redux store
        dispatch(addMessage({ type: "user", content: message }));

        // Clear the message input
        setMessage("");
    }

    // Use the useEffect hook to scroll to the bottom of the chat when a new message is added
    useEffect(() => {
        chatRef.current.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    // Render the Chat component
    return (
        <>
            <img
                className="chat-button"
                src={chatimg}
                onClick={handleOpenChat}
            ></img>
            <div className="chat-container" ref={chatContainerRef}>
                <div className="chat-messages" ref={chatRef}>
                    {messages.map((message, index) => {
                        return (
                            <div
                                key={index}
                                className={
                                    message.type === "ai"
                                        ? "message-ai"
                                        : "message-user"
                                }
                            >
                                {message.content}
                            </div>
                        );
                    })}
                </div>
                <form className="chat-controls" onSubmit={handleMessages}>
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="Type here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="chat-send">Send</button>
                    <img
                        src={closeimg}
                        className="chat-close"
                        onClick={handleOpenChat}
                    ></img>
                </form>
            </div>
        </>
    );
}
