import { useState, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import './PetSitters.css';

const PetSitters = () => {
  // Pet sitters data with cartoon avatars
  const [sitters, setSitters] = useState([
    {
      id: 1,
      name: "Emma",
      distance: "< 1 mi",
      bio: "Northwestern sophomore studying biology, loves animals",
      experience: "4 years",
      rate: "$12/hr",
      imageUrl: "https://img.freepik.com/free-vector/cute-girl-character_1450-155.jpg"
    },
    {
      id: 2,
      name: "Jake",
      distance: "8 mi",
      bio: "Longtime pet-sitter in the Chicago area, happy to travel",
      experience: "6 years",
      rate: "$12/hr",
      imageUrl: "https://img.freepik.com/free-vector/young-man-face-cartoon-character-avatar_18591-55055.jpg"
    },
    {
      id: 3,
      name: "Ryan",
      distance: "< 1 mi",
      bio: "Senior at Northwestern, grew up with dogs and cats",
      experience: "5 years",
      rate: "$13/hr",
      imageUrl: "https://img.freepik.com/free-vector/young-man-face-close-up_1450-125.jpg"
    },
    {
      id: 4,
      name: "Laura",
      distance: "< 1 mi",
      bio: "Local resident, full-time freelancer with flexible hours",
      experience: "5 years",
      rate: "$15/hr",
      imageUrl: "https://img.freepik.com/free-vector/beautiful-young-woman-avatar-character-icon-vector-illustration-design_24877-18520.jpg"
    },
    {
      id: 5,
      name: "Daniel",
      distance: "< 1 mi",
      bio: "Longtime Evanston resident, available for last-minute bookings",
      experience: "8 years",
      rate: "$16/hr",
      imageUrl: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
    },
    {
      id: 6,
      name: "Sophie",
      distance: "10 mi",
      bio: "Works remotely, happy to travel for pet-sitting",
      experience: "8 years",
      rate: "$13/hr",
      imageUrl: "https://img.freepik.com/free-vector/girl-face-avatar_1450-553.jpg"
    },
  ]);
  
  const [lastDirection, setLastDirection] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(sitters.length - 1);
  
  const childRefs = Array(sitters.length)
    .fill(0)
    .map(() => useRef());

  // Handle when a card is swiped
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    setCurrentIndex(index - 1);
  };

  // Handle when a card leaves the screen
  const outOfFrame = (name) => {
    console.log(`${name} left the screen!`);
  };

  // Handle manual swipe buttons
  const swipe = (dir) => {
    if (currentIndex < 0) return;
    childRefs[currentIndex].current.swipe(dir);
  };

  return (
    <div className="pet-sitters-container">
      <header className="pet-sitters-header">
        <h1>Pet Sitters</h1>
        <p>Find trusted pet sitters in the Northwestern community</p>
      </header>

      <div className="card-container">
        {sitters.map((sitter, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={sitter.id}
            onSwipe={(dir) => swiped(dir, sitter.name, index)}
            onCardLeftScreen={() => outOfFrame(sitter.name)}
            preventSwipe={['up', 'down']}
          >
            <div className="card">
              <div className="card-avatar" style={{ backgroundImage: `url(${sitter.imageUrl})` }}>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h2>{sitter.name}</h2>
                  <span className="distance">{sitter.distance}</span>
                </div>
                <div className="card-details">
                  <p className="bio">{sitter.bio}</p>
                  <div className="stats">
                    <div className="stat">
                      <span className="stat-label">Experience:</span>
                      <span className="stat-value">{sitter.experience}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Rate:</span>
                      <span className="stat-value">{sitter.rate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      {lastDirection && (
        <div className="swipe-info">
          You swiped {lastDirection}
        </div>
      )}

      <div className="buttons">
        <button className="decline-button" onClick={() => swipe('left')}>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <button className="accept-button" onClick={() => swipe('right')}>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PetSitters;