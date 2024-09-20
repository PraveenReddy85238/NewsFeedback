# NewsFeed App


The  is a React Native application that fetches and displays the latest news data. Users can swipe to initiate the fetching process and navigate through articles using "Previous" and "Next" buttons. The app leverages the `useSWR` hook for efficient data fetching and caching, ensuring a smooth and responsive user experience.


- **Swipe to Fetch News:** Users can perform a swipe gesture to load the latest news articles.
- **Article Navigation:** Easily navigate through articles using "Previous" and "Next" buttons.
- **Image Handling:** Displays article images with fallback placeholders for unavailable images.
- **Error Handling:** Gracefully handles data fetching errors and informs the user.
- **Responsive Design:** Optimized for various screen sizes with flexible styling.

## Technologies Used
React native (0.75.3) For building the mobile application.
useSWR For efficient data fetching, caching, and revalidation.
Swipe Control Custom component for handling swipe gestures.

## Setup Instructions

1. I installed Node.js library (v18.20.4) thus supporting all third party packages. Here is the follow up link for same (https://nodejs.org/) 
2. I have download Android Studio to run adb devices and installed required packages,  and I have  added the ANDROID_HOME in environmental variables and path variables


## architecture 
App -> NewsFeed.jsx -> SwipeControl

## major Componenet
SwipeControl  (componet the swipeControl Functionality has been done)
NewsFeed.jsx (major Componenet where fetching of data using (https://api.gdeltproject.org/api/v2/doc/doc?query=latestnews&format=json) And displayig  data has been done)



