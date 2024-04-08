// Import the required MSAL classes from the MSAL browser package
import { PublicClientApplication } from "@azure/msal-browser";

// MSAL configuration settings
const msalConfig = {
    auth: {
        clientId: "6c1cae77-c63a-4940-8a12-0b527484dc4d", // Replace with your Azure AD application client ID
        authority:
            "https://login.microsoftonline.com/989519ec-1ecf-42d7-beb9-171aa5b6c4ee", // Replace with your Azure AD tenant ID
        redirectUri: "http://localhost:5173/", // Replace with your application's redirect URI
    },
};

// Initialize MSAL application object
const myMSALObj = new PublicClientApplication(msalConfig);

// Define the login request, specifying the scopes your application needs
const loginRequest = {
    scopes: ["User.Read", "OnlineMeetings.ReadWrite"], // Add additional scopes as needed
};

// Function to sign in the user and acquire an access token
function signIn() {
    myMSALObj
        .loginPopup(loginRequest)
        .then((loginResponse) => {
            console.log("loginResponse", loginResponse);
            // Acquire token silently if the user is already signed in
            acquireToken();
        })
        .catch((error) => {
            console.error(error);
        });
}

// Function to acquire an access token silently, falling back to popup if needed
function acquireToken() {
    myMSALObj
        .acquireTokenSilent(loginRequest)
        .then((tokenResponse) => {
            console.log("access token", tokenResponse.accessToken);
            // Here you can use the access token to call Microsoft Graph API
        })
        .catch((error) => {
            console.error(error);
            // If silent token acquisition fails, use popup method
            myMSALObj
                .acquireTokenPopup(loginRequest)
                .then((tokenResponse) => {
                    console.log("access token", tokenResponse.accessToken);
                    // Access token acquired
                })
                .catch((error) => {
                    console.error(error);
                });
        });
}

// Function to create a Teams meeting using Microsoft Graph API
const createMeeting = async (accessToken) => {
    const response = await fetch(
        "https://graph.microsoft.com/v1.0/me/onlineMeetings",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                startDateTime: new Date(Date.now()).toISOString(), // Set start time
                endDateTime: new Date(Date.now() + 7200000).toISOString(), // Set end time (2 hours from start time)
                subject: "Team Meeting", // Set the meeting subject
                // Add more settings as needed
            }),
        }
    );

    if (!response.ok) {
        throw new Error(`Could not create meeting: ${response.statusText}`);
    }

    return response.json(); // Returns the created meeting details
};
