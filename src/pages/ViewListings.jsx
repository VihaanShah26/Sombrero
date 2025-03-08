import { useState } from "react";
import "./ViewListings.css";

const ViewListings = () => {
  const [sortOption, setSortOption] = useState("default");

  // Hardcoded dog-sitting listings
  const listings = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1560807707-8cc77767d783", // Golden Retriever
      name: "Buddy",
      owner: "Alice",
      bio: "Friendly Golden Retriever, loves to play fetch!",
      distance: 2,
      date: "2025-03-10",
      duration: 4,
      pay: 15,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1560807707-8cc77767d783", // Labrador Retriever
      name: "Charlie",
      owner: "Bob",
      bio: "Energetic Labrador, needs a long walk every day.",
      distance: 5,
      date: "2025-03-12",
      duration: 2,
      pay: 12,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006", // Cavalier King Charles Spaniel
      name: "Daisy",
      owner: "Emma",
      bio: "Calm and affectionate, loves belly rubs.",
      distance: 1,
      date: "2025-03-15",
      duration: 6,
      pay: 20,
    },
    {
      id: 4,
      image: "https://placedog.net/500/280?id=15", // Dog with medical condition
      name: "Max",
      owner: "John",
      bio: "Needs extra care due to medical condition.",
      distance: 3,
      date: "2025-03-18",
      duration: 8,
      pay: 25,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1558944351-3f2f7d1a3a22", // Shy dog
      name: "Luna",
      owner: "Sophia",
      bio: "Shy but sweet, enjoys quiet environments.",
      distance: 7,
      date: "2025-03-20",
      duration: 3,
      pay: 10,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1560807707-8cc77767d783", // Energetic dog
      name: "Rocky",
      owner: "David",
      bio: "Active dog, needs plenty of exercise!",
      distance: 4,
      date: "2025-03-22",
      duration: 5,
      pay: 18,
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006", // Dog good with kids
      name: "Bella",
      owner: "Olivia",
      bio: "Loves cuddles, great with kids.",
      distance: 6,
      date: "2025-03-25",
      duration: 7,
      pay: 22,
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1583511655621-31fba1a4b7a3", // Well-trained dog
      name: "Cooper",
      owner: "Liam",
      bio: "Very well-trained, listens to commands.",
      distance: 2,
      date: "2025-03-28",
      duration: 3,
      pay: 16,
    },
  ];

  // Function to sort listings based on selected criteria
  const sortedListings = () => {
    let sorted = [...listings];
    if (sortOption === "distance") {
      sorted.sort((a, b) => a.distance - b.distance);
    } else if (sortOption === "durationHighToLow") {
      sorted.sort((a, b) => b.duration - a.duration);
    } else if (sortOption === "durationLowToHigh") {
      sorted.sort((a, b) => a.duration - b.duration);
    }
    return sorted;
  };

  return (
    <div className="listings-container">
      <div className="listings-header">
        <h2>Available Dog-Sitting Listings</h2>
        <select
          className="sort-dropdown"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sort By: Default</option>
          <option value="distance">Distance (Closest First)</option>
          <option value="durationHighToLow">Duration (High to Low)</option>
          <option value="durationLowToHigh">Duration (Low to High)</option>
        </select>
      </div>

      <div className="listings-scroll">
        {sortedListings().map((listing) => (
          <div key={listing.id} className="listing-card">
            <img src={listing.image} alt={listing.name} className="dog-image" />
            <div className="listing-details">
              <h3>{listing.name}</h3>
              <p><strong>Owner:</strong> {listing.owner}</p>
              <p><strong>Bio:</strong> {listing.bio}</p>
              <p><strong>Distance:</strong> {listing.distance} miles</p>
              <p><strong>Date Needed:</strong> {listing.date}</p>
              <p><strong>Duration:</strong> {listing.duration} hours</p>
              <p><strong>Pay:</strong> ${listing.pay}/hr</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewListings;