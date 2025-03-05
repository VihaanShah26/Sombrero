import { useState, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import './PetProfiles.css';

const PetProfilesOwners = () => {
  // Sample profiles data - replace with your actual data
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: 'Charlie',
      age: '3 years',
      type: 'Dog',
      breed: 'Golden Retriever',
      owner: 'Alex Johnson',
      bio: 'Friendly and energetic, loves playing fetch in the park.',
      imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'Luna',
      age: '2 years',
      type: 'Cat',
      breed: 'Maine Coon',
      owner: 'Sam Taylor',
      bio: 'Independent but affectionate. Enjoys window watching and chasing toys.',
      imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      name: 'Max',
      age: '4 years',
      type: 'Dog',
      breed: 'Border Collie',
      owner: 'Jamie Wilson',
      bio: 'Very intelligent and active. Needs lots of mental stimulation and exercise.',
      imageUrl: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 4,
      name: 'Bella',
      age: '1 year',
      type: 'Cat',
      breed: 'Siamese',
      owner: 'Taylor Reed',
      bio: 'Playful and vocal. Loves attention and interactive toys.',
      imageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 5,
      name: 'Rocky',
      age: '5 years',
      type: 'Dog',
      breed: 'Labrador',
      owner: 'Jordan Smith',
      bio: 'Calm and well-trained. Great with kids and other animals.',
      imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
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
        <h1>PetConnect</h1>
        <p>Find pets to sit in the Northwestern community</p>
      </header>

      <div className="card-container">
        {profiles.map((profile, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={profile.id}
            onSwipe={(dir) => swiped(dir, profile.name, index)}
            onCardLeftScreen={() => outOfFrame(profile.name, index)}
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

      {lastDirection && currentIndex >= -1 && (
        <div className="swipe-info">
          You swiped {lastDirection}
        </div>
      )}

      <div className="buttons">
        <button onClick={() => swipe('left')}>Swipe Left</button>
        <button onClick={() => swipe('right')}>Swipe Right</button>
      </div>
    </div>
  );
};

export default PetProfilesOwners;