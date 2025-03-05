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
    phone: "",
    emergency: "",
    about: "",
    radius: 5,
    hours: 0,
    pay: 0,
    role: "Owner",
  });

  const [user] = useAuthState();
  const isLoggedIn = user ? true : false;
  var firstTime = true;

  useEffect(() => {
    if (isLoggedIn && auth.currentUser) {
      const fetchProfile = async () => {
        const userId = auth.currentUser.email; // Using email as document ID
        const profileRef = doc(db, "profiles", userId);

        try {
          const profileSnap = await getDoc(profileRef);
          if (profileSnap.exists()) {
            firstTime = false;
            setFormData(profileSnap.data());
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
      console.log(firstTime);
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
      if (formData.role == "Sitter") {
        alert("Profile updated successfully! Since you have indicated you are interested in Dog-Sitting, we will get in touch with you shortly to complete an onboarding process wherein you will be provided important information and guidelines.")
      }
      else {
        alert("Profile updated successfully!");
      }
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
          <label>First Name</label>
          <input type="text" name="first" value={formData.first} onChange={handleChange} required />

          <label>Last Name (Optional)</label>
          <input type="text" name="last" value={formData.last} onChange={handleChange} />

          <label>Phone Number:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Emergency Contact (Name, Phone Number):</label>
          <input type="text" name="emergency" value={formData.emergency} onChange={handleChange} required />

          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />

          <label>Match within (radius in miles):</label>
          <input type="number" name="radius" value={formData.radius} onChange={handleChange} required />

          <label>Bio
          <i className="bi bi-info-circle info-icon" title="Enter a bit about yourself and about your dog - their breed, what they are like and what care do they require. Mention anything important about your dog."></i>
          </label>
          <input name="about" value={formData.about} onChange={handleChange} required />

          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Owner">Dog Owner</option>
            <option value="Sitter">Dog Sitter</option>
          </select>

          <label>Desired Duration (average hours):</label>
          <input type="number" name="hours" value={formData.hours} onChange={handleChange} required />
          
          <label>{formData.role=="Owner" ? "Willingness to Pay ($/hr)" : "Desired Salary ($/hr)"}</label>
          <input type="number" name="pay" value={formData.pay} onChange={handleChange} required />

          <label>{formData.role == "Owner" ? "Upload Profile Picture" : "Upload Dog Picture"}</label>
          <input type="file" name="image" accept="image/*" />

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