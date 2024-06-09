const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import the path module
const authRouter = require('./routes/auth.routes');
const actorsRouter = require('./routes/actors.routes');
const producersRouter = require('./routes/producers.routes');
const moviesRouter = require('./routes/movie.routes');
const watchListRouter = require('./routes/watchlist.routes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Database Connection
require('./db/db.connection')();

// Routes
app.use('/api', authRouter);
app.use('/api/actors', actorsRouter);
app.use('/api/producers', producersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/watchlist',watchListRouter)

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// Define a route to serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
