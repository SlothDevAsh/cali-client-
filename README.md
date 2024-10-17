# Dish Dash

## Project Overview

This mobile application, **Dish Dash**, is built using Expo and is designed to provide a seamless user experience for job management. The app communicates with a backend that handles job processing and real-time updates using Express, RabbitMQ, and Socket.IO.

### Basic Structure

- **Expo**: A framework and platform for universal React applications, allowing for quick development and easy deployment on both iOS and Android platforms.

- **Socket.IO**: This library is used to enable real-time, bidirectional communication between the frontend and backend. It allows the app to inform users immediately when there is a job status update, ensuring a responsive and interactive user experience.

## Setup Instructions

### Prerequisites

1. **Node.js**: Ensure you have Node.js installed on your machine.

2. **Expo CLI**: You need to install Expo CLI globally if you haven't already:
   ```bash
   npm install -g expo-cli
   ```

### Setup Frontend

To set up the frontend application, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone git@github.com:SlothDevAsh/calo-client.git
   ```

2. **Install Dependencies**
   Navigate to the cloned directory and install dependencies using the command:

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**
   In the same folder, create a `.env` file and add the below necessary environment variables. Replace `localhost` with your actual IP address if needed:

   ```bash
   EXPO_PUBLIC_API_URL=http://localhost:4000/
   EXPO_PUBLIC_SOCKET_URL=http://localhost:4000/
   ```

4. **Run the App**
   Make sure that the backend server is already running on your machine.
   ```bash
   yarn run android
   ```
   This command will start the Expo development server, allowing you to view the app on your device or simulator.

## Time Report

| Section              | Time Spent |
| -------------------- | ---------- |
| Basic Structure      | 20 minutes |
| Implementing UI      | 30 minutes |
| Implementing API'S   | 30 minutes |
| Setting Up Socket.IO | 10 minutes |
| Testing              | 45 minutes |

## Demo Link

Here is the demo link: [Watch Demo](https://www.youtube.com/shorts/zFykaLDcoIg)

**Note:** Please be aware that the delays for job processing shown in the demo video are shorter than the actual delays associated with real job submissions in the application. The demo video has been kept concise for clarity and to focus on the key functionalities.
