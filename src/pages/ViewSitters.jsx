import { useState } from "react";
import "./ViewSitters.css";

const ViewSitters = () => {
  const [sortOption, setSortOption] = useState("default");

  // Hardcoded dog sitter profiles
  const sitters = [
    {
        id: 1,
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        name: "John Doe",
        phone: "(123) 456-7890",
        address: "123 Maple Street, Springfield",
        distance: 2,
        bio: "Lifelong dog lover with a passion for caring for all breeds.",
        experience: 5,
        salary: 20,
      },
      {
        id: 2,
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        name: "Jane Smith",
        phone: "(987) 654-3210",
        address: "456 Oak Avenue, Shelbyville",
        distance: 5,
        bio: "Experienced in handling dogs with special needs.",
        experience: 3,
        salary: 18,
      },
      {
        id: 3,
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        name: "Michael Brown",
        phone: "(111) 222-3333",
        address: "789 Pine Road, Capital City",
        distance: 3,
        bio: "Former vet assistant with a love for large breeds.",
        experience: 6,
        salary: 25,
      },
      {
        id: 4,
        image: "https://randomuser.me/api/portraits/women/4.jpg",
        name: "Emily Johnson",
        phone: "(555) 666-7777",
        address: "321 Birch Lane, Smalltown",
        distance: 4,
        bio: "Great with anxious or shy dogs, experience with rescues.",
        experience: 4,
        salary: 22,
      },
      {
        id: 5,
        image: "https://randomuser.me/api/portraits/men/5.jpg",
        name: "David Wilson",
        phone: "(999) 888-7777",
        address: "101 Elm Street, Hill Valley",
        distance: 6,
        bio: "Former dog trainer, specialized in obedience training.",
        experience: 8,
        salary: 30,
      },
      {
        id: 6,
        image: "https://randomuser.me/api/portraits/women/6.jpg",
        name: "Sarah Martinez",
        phone: "(444) 333-2222",
        address: "555 Cedar Road, Riverdale",
        distance: 2,
        bio: "Enjoys long walks with dogs, available for overnight stays.",
        experience: 5,
        salary: 19,
      },
      {
        id: 7,
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        name: "Chris Evans",
        phone: "(777) 888-9999",
        address: "777 Oak Drive, Star City",
        distance: 7,
        bio: "Active dog walker, loves running with energetic dogs.",
        experience: 3,
        salary: 17,
      },
      {
        id: 8,
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        name: "Jessica Lee",
        phone: "(222) 111-0000",
        address: "999 Willow Street, Gotham",
        distance: 5,
        bio: "Pet-sitter for over 10 years, experience with seniors.",
        experience: 10,
        salary: 28,
      },
      {
        id: 9,
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        name: "Robert Johnson",
        phone: "(333) 222-1111",
        address: "222 Redwood Ave, Metropolis",
        distance: 4,
        bio: "Certified dog handler, worked in shelters and kennels.",
        experience: 7,
        salary: 24,
      },
      {
        id: 10,
        image: "https://randomuser.me/api/portraits/women/10.jpg",
        name: "Sophia Davis",
        phone: "(666) 555-4444",
        address: "888 Poplar Lane, Springfield",
        distance: 3,
        bio: "Available full-time, great with puppies and small breeds.",
        experience: 2,
        salary: 15,
      },
  ];

  // Function to sort sitters based on selected criteria
  const sortedSitters = () => {
    let sorted = [...sitters];
    if (sortOption === "distance") {
      sorted.sort((a, b) => a.distance - b.distance);
    } else if (sortOption === "hourlyRate") {
      sorted.sort((a, b) => a.salary - b.salary);
    } else if (sortOption === "experience") {
      sorted.sort((a, b) => b.experience - a.experience);
    }
    return sorted;
  };

  return (
    <div className="sitters-container">
      <div className="sitters-header">
        <h2>Available Dog Sitters</h2>
        <select
          className="sort-dropdown"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sort By: Default</option>
          <option value="distance">Distance (Closest First)</option>
          <option value="hourlyRate">Hourly Rate (Low to High)</option>
          <option value="experience">Experience (High to Low)</option>
        </select>
      </div>

      <div className="sitters-scroll">
        {sortedSitters().map((sitter) => (
          <div key={sitter.id} className="sitter-card">
            <img src={sitter.image} alt={sitter.name} className="sitter-image" />
            <div className="sitter-details">
              <h3>{sitter.name}</h3>
              <p><strong>Phone:</strong> {sitter.phone}</p>
              <p><strong>Address:</strong> {sitter.address}</p>
              <p><strong>Distance:</strong> {sitter.distance} miles</p>
              <p><strong>Bio:</strong> {sitter.bio}</p>
              <p><strong>Experience:</strong> {sitter.experience} years</p>
              <p><strong>Desired Salary:</strong> ${sitter.salary}/hr</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSitters;