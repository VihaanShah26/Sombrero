import { useState, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import './PetProfiles.css';

const PetProfilesOwners = () => {
  // Sample profiles data - replace with your actual data
  const [profiles, setProfiles] = useState([
    {
      "id": 1,
      "name": "Charlie",
      "age": "4 years",
      "type": "Dog",
      "breed": "Labrador Retriever",
      "owner": "Mia",
      "bio": "Friendly and energetic, loves playing fetch in the park.",
      "imageUrl": "https://placedog.net/500/280?id=15"
    },
    {
      "id": 2,
      "name": "Duke",
      "age": "6 years",
      "type": "Dog",
      "breed": "German Shepherd",
      "owner": "Tom",
      "bio": "Loyal and protective, enjoys long walks and playtime.",
      "imageUrl": "https://placedog.net/500/280?id=25"
    },
    {
      "id": 3,
      "name": "Rocky",
      "age": "1 year",
      "type": "Dog",
      "breed": "Golden Retriever Shepherd",
      "owner": "Ethan",
      "bio": "Playful and curious, loves exploring new places.",
      "imageUrl": "https://placedog.net/500/280?id=35"
    },
    {
      "id": 4,
      "name": "Luna",
      "age": "5 years",
      "type": "Dog",
      "breed": "Australian Shepherd",
      "owner": "Sarah",
      "bio": "Intelligent and agile, excels in obedience and agility.",
      "imageUrl": "https://placedog.net/500/280?id=45"
    },
    {
      "id": 5,
      "name": "Bailey",
      "age": "3 years",
      "type": "Dog",
      "breed": "Boxer",
      "owner": "Jason",
      "bio": "Energetic and affectionate, loves companionship.",
      "imageUrl": "https://placedog.net/500/280?id=55"
    },
    {
      "id": 6,
      "name": "Milo",
      "age": "7 years",
      "type": "Dog",
      "breed": "Poodle mix",
      "owner": "Olivia",
      "bio": "Calm and friendly, enjoys relaxing and short walks.",
      "imageUrl": "https://placedog.net/500/280?id=65"
    }
  ]);
  
  const [lastDirection, setLastDirection] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);
  const currentIndexRef = useRef(currentIndex);
  
  const childRefs = Array(profiles.length)
    .fill(0)
    .map(() => useRef());

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  // Handle when a card is swiped
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    
    // Here you could implement logic for matching or saving preferences
    console.log(`You swiped ${direction} on ${nameToDelete}`);
  };

  // Handle when a card leaves the screen
  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`);
  };

  // Handle manual swipe buttons
  const swipe = (dir) => {
    if (currentIndex < 0) return;
    childRefs[currentIndex].current.swipe(dir);
  };

  return (
    <div className="pet-profiles-container">
      <header className="pet-profiles-header">
      </header>

      <div className="card-container">
        {profiles.map((profile, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={profile.id}
            onSwipe={(dir) => swiped(dir, profile.name, index)}
            onCardLeftScreen={() => outOfFrame(profile.name, index)}
            preventSwipe={['up', 'down']}
          >
            <div className="card" style={{ backgroundImage: `url(${profile.imageUrl})` }}>
              <div className="card-content">
                <h2>{profile.name}</h2>
                <p className="pet-info">{profile.type} • {profile.breed} • {profile.age}</p>
                <p className="owner-info">Owner: {profile.owner}</p>
                <p className="bio">{profile.bio}</p>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      {lastDirection && (
        <div className="swipe-info">
          {lastDirection === 'right' ? 'You liked this pet!' : 'Maybe next time!'}
        </div>
      )}

      <div className="buttons">
        <button onClick={() => swipe('left')}>✕</button>
        <button onClick={() => swipe('right')}>✓</button>
      </div>
    </div>
  );
};

export default PetProfilesOwners;