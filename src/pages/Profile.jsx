import { useState, useEffect } from "react";
import { db, auth } from "../components/firebase";  // Import Firestore and Auth
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuthState } from "../components/firebase";
import "./Profile.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    address: "",
    about: "",
    hours: 0,
    pay: 0,
    role: "Owner",
  });

  const [user] = useAuthState();
  const isLoggedIn = user ? true : false;

  useEffect(() => {
    if (isLoggedIn && auth.currentUser) {
      const fetchProfile = async () => {
        const userId = auth.currentUser.email; // Using email as document ID
        const profileRef = doc(db, "profiles", userId);

        try {
          const profileSnap = await getDoc(profileRef);
          if (profileSnap.exists()) {
            setFormData(profileSnap.data());
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("You must be signed in to save your profile.");
      return;
    }

    try {
      const userId = auth.currentUser.email; // Using email as document ID
      await setDoc(doc(db, "profiles", userId), formData, { merge: true });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Try again.");
    }
  };

  return (
    <div className="profile-container">
      {isLoggedIn ? (
        <div>
        <h2>Update Your Profile</h2>
        <form className="profile-form" onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input type="text" name="first" value={formData.first} onChange={handleChange} required />

          <label>Last Name:</label>
          <input type="text" name="last" value={formData.last} onChange={handleChange} required />

          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />

          <label>Bio:</label>
          <input name="about" value={formData.about} onChange={handleChange} required />

          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Owner">Dog Owner</option>
            <option value="Sitter">Dog Sitter</option>
          </select>

          <label>Duration (average hours):</label>
          <input type="number" name="hours" value={formData.hours} onChange={handleChange} required />

          <label>Pay (avergae $/hr):</label>
          <input type="number" name="pay" value={formData.pay} onChange={handleChange} required />

          <button type="submit" className="save-btn">Save</button>
        </form>
        </div>
      ) : (
        <p className="not-signed-in">Please sign in first</p>
      )}
    </div>
  );
};

export default Profile;