import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Navbar from "./components/headers/Navbar";
import ActorsList from "./components/actors/ActorsList";
import AddActor from "./components/actors/AddActor";
import UpdateActor from "./components/actors/UpdateActor";
import ProducerList from "./components/producer/ProducerList";
import AddProducer from "./components/producer/AddProducer";
import UpdateProducer from "./components/producer/UpdateProducer";
import MovieList from "./components/movies/MovieList";
import AddMovie from "./components/movies/AddMovie";
import UpdateMovie from "./components/movies/UpdateMovie";
import { Toaster } from "react-hot-toast";
import WatchList from "./components/watchlist/WatchList";

function App() {
  
  return (
    <>
     <Toaster position="top-center" />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/actors" element={<ActorsList />} />
          <Route path="/add-actor" element={<AddActor/>} />
          <Route path="/update-actor/:id" element={<UpdateActor />} />
          <Route path="/producers" element={<ProducerList />} />
          <Route path="/add-producer" element={<AddProducer/>} />
          <Route path="/update-producer/:id" element={<UpdateProducer />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/add-movie" element={<AddMovie/>} />
          <Route path="/update-movie/:id" element={<UpdateMovie />} />
          <Route path="/watchlist" element={<WatchList />} />
        </Routes>

      </Router>
    </>
  );
}

export default App;
