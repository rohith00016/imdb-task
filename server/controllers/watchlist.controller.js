const User = require('../models/user.model');

// Add movie to user's watchlist
exports.addToWatchlist = async (req, res) => {
   const { userId, movieId } = req.params;
 
   try {
     const user = await User.findById(userId).populate('watchlist'); // Populate the watchlist field with movie documents

     if (!user) {
       return res.status(404).json({ error: 'User not found' });
     }
 
     // Check if movie already exists in watchlist
     if (user.watchlist.some(movie => movie._id.toString() === movieId)) {
       return res.status(400).json({ error: 'Movie already exists in watchlist' });
     }
 
     // Add movie to watchlist
     user.watchlist.push(movieId);
     await user.save();
 
     // Populate the added movie document
     const addedMovie = await User.findById(userId).populate({
       path: 'watchlist',
       match: { _id: movieId }
     }).exec();
 
     res.status(201).json({ message: 'Movie added to watchlist successfully', movie: addedMovie.watchlist[0] });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Internal server error' });
   }
 };


// Remove movie from user's watchlist
exports.removeFromWatchlist = async (req, res) => {
   const { userId, movieId  } = req.params;
 
   try {
     const user = await User.findByIdAndUpdate(userId, { $pull: { watchlist: movieId } }, { new: true });
 
     if (!user) {
       return res.status(404).json({ error: 'User not found' });
     }
 
     res.status(200).json({ message: 'Movie removed from watchlist successfully' });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Internal server error' });
   }
 };
 

// Get user's watchlist
exports.getWatchlist = async (req, res) => {

  try {
    const user = await User.findById(req.params.id).populate('watchlist');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ watchlist: user.watchlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
