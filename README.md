# Realtime Chat Application

This is a realtime chat application built using ChatEngine, Firebase, and React. The application allows users to communicate with each other in real-time.

## Features

- Real-time messaging: Users can send and receive messages instantly.
- User authentication: Users can sign up and log in to access the chat application.
- Online status indicator: Users can see if other users are online or offline.
- Message history: Chat history is saved and can be accessed when users log in.
- Multiple chat rooms: Users can join different chat rooms and interact with different groups of people.

## Technologies Used

- ChatEngine: A chat API and infrastructure that provides real-time chat capabilities.
- Firebase: A Backend-as-a-Service (BaaS) platform that provides authentication and database services.
- React: A JavaScript library for building user interfaces.

## Setup Instructions

Follow these steps to set up the application on your local machine:

1. Clone the repository:

   ```
   git clone https://github.com/Sachin03072002/Blomber.git
   ```

2. Install dependencies:

   ```
   cd Blomber
   npm install
   ```

3. Create a Firebase project:

   - Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Enable the Firebase Authentication service and choose the authentication method you prefer (e.g., email/password, Google, etc.).
   - Enable the Firebase Realtime Database service.

4. Set up the Firebase configuration:

   - In the Firebase Console, go to your project settings.
   - Under the "General" tab, scroll down to the "Your apps" section.
   - Click on the "Web" app icon (</>).
   - Register the app and copy the configuration details.
   - Open the `src/firebase.js` file in your project and replace the placeholders with your Firebase configuration details.

5. Run the application:

   ```
   npm start
   ```

6. Open your web browser and visit `http://localhost:3000` to access the chat application.

## Deployment

To deploy the application to a hosting platform, follow these steps:

1. Build the application:

   ```
   npm run build
   ```

2. Deploy the contents of the `build` directory to your preferred hosting platform (e.g., Firebase Hosting, Netlify, Vercel, etc.).

3. Set up the Firebase project for deployment:

   - In the Firebase Console, go to your project settings.
   - Under the "General" tab, scroll down to the "Your apps" section.
   - Click on the "Web" app icon (</>).
   - Register the app (if not done already).
   - Follow the hosting platform's instructions for integrating Firebase into your deployment.

4. Once deployed, access the chat application through the provided deployment URL.

## Contributing

Contributions to the project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
