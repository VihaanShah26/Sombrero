import { useState } from "react";
import "./Profile.css"; // Import the CSS file for styling
import { useAuthState } from "../components/firebase";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    aboutMe: "",
    role: "Dog Owner",
  });

  const [user] = useAuthState();
  const isLoggedIn = user ? true : false;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved successfully!");
    console.log("Saved Profile Data:", formData);
  };

  return (
    <div className="profile-container">
      {isLoggedIn ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          <h2>Create Your Profile</h2>

          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />

          <label>About Me:</label>
          <textarea name="aboutMe" value={formData.aboutMe} onChange={handleChange} rows="4" required />

          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Dog Owner">Dog Owner</option>
            <option value="Dog Sitter">Dog Sitter</option>
          </select>

          <button type="submit" className="save-btn">Save</button>
        </form>
      ) : (
        <p className="not-signed-in">Please sign in first</p>
      )}
    </div>
  );
};

export default Profile;