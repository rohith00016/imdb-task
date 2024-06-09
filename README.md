## Technologies Used

- **MongoDB**: NoSQL database used to store user data and chat messages.
- **Express.js**: Backend framework for handling HTTP requests and routing.
- **React.js**: Frontend library for building user interfaces.
- **Node.js**: JavaScript runtime for running the server-side code.

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB Atlas account or local MongoDB server installed.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/rohith00016/imdb-task.git
    ```

2. Navigate to the project directory:

    ```bash
    cd imdb-task
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```plaintext
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    PORT=your_port_number
    ```

    Replace the placeholders with your actual credentials.

5. Start the development server:

    ```bash
    npm run build
    ```
    ```bash
    npm start
    ```

6. Open your browser and navigate to `http://localhost:5000` to view the application.
