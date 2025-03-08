import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Profile from './pages/Profile';
import NavigationBar from "./components/Navbar";
import Calendar from './pages/Calendar';
import Messages from './pages/Messages';
import PetProfilesOwners from './pages/PetProfilesOwners';
import PetProfilesSitter from './pages/PetProfilesSitter';
import ViewListings from './pages/ViewListings';
import ViewSitters from './pages/ViewSitters';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/view-listings" element={<ViewListings />} />
        <Route path="/view-sitters" element={<ViewSitters />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/community/pet-owner/" element={<PetProfilesOwners />} />
        <Route path="/community/pet-sitter/" element={<PetProfilesSitter />} />
      </Routes>
    </Router>
  );
};

export default App;