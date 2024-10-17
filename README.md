# EchoNet

EchoNet is a feature-rich social media platform that allows users to connect, share, and communicate in real-time. It includes key features such as post creation, privacy settings, trash bin management, friend suggestions, real-time chat, notifications, and email alerts. Built with modern technologies, EchoNet ensures a seamless and responsive user experience.

## Features

### 1. **Posts and Privacy**

- Create, edit, and delete posts.
- Control the privacy of posts (Public, or Private).
- Move deleted posts to a trash bin, which automatically clears posts after 24 hours.

### 2. **Friendship Management**

- Send and receive friend requests.
- Accept or reject friend requests.
- View suggested friends.

### 3. **Real-time Chat**

- Chat with friends in real-time using GraphQL subscriptions.
- Receive instant notifications for new messages.

### 4. **Email Notifications**

- Receive email alerts when:
  - You receive a new message.
  - You receive a friend request.
  - Your friend request is accepted.

### 5. **Notifications**

- Get in-app notifications for new friend requests, and chat messages.

## Technologies Used

- **Hasura**: For instant GraphQL APIs on top of PostgreSQL.
- **GraphQL**: For managing and querying data efficiently.
- **TanStack Query**: For managing server-side state and caching.
- **Next.js**: Framework for building server-side rendered React applications.
- **NextAuth.js**: Authentication solution for handling user sessions.
- **Axios**: For making HTTP requests.
- **Next.js Server Actions & Route Handlers**: For handling server-side logic and API routes.
- **Nodemailer**: For sending email notifications.

## Getting Started

### Prerequisites

Make sure you have the following tools installed:

- Node.js (v18.x or higher)
- npm or yarn
- Next.js environment setup

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dev-faisal-ahmed/EchoNet
   cd EchoNet
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables. Create a `.env` file in the root directory and add the following:

   ```
   HASURA_ADMIN_SECRET=""
   NEXT_PUBLIC_HASURA_API_URL=""
   HASURA_METADATA_URL=""
   NEXT_PUBLIC_HASURA_WS_URL=""
   NEXT_PUBLIC_IMAGE_BB_API_KEY=""
   NEXTAUTH_SECRET =""
   NEXT_PUBLIC_API_SECRET=""
   NEXTAUTH_URL=""
   GMAIL_ID=""
   GMAIL_PASS=""
   SALT=""
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to view your app.

### Deployment

You can deploy this app on platforms like Vercel, which offers seamless integration with Next.js apps.

1. Push the code to your GitHub repository.
2. Connect the repository to Vercel or your preferred hosting service.
3. Set up environment variables on your hosting platform.

## Contribution

Feel free to contribute to this project by submitting issues or pull requests. All contributions are welcome!

## License

This project is licensed under the MIT License.
