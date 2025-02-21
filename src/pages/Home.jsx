import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const navigate = useNavigate();

  const handleCreateProfile = () => {
    navigate('/create-profile');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Welcome to PetConnect</h1>
        <p className="home-subtitle">Connecting pet owners with trusted pet sitters  within the Northwestern community.</p>
      </header>
    </div>
  );
};

export default Home;