import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [age, setAge] = useState("");
  const [year, setYear] = useState("");
  const [preferences, setPreferences] = useState({
    studyHabits: "",
    cleanliness: "",
    sleepingSchedule: "",
    personalSpace: "",
    internetUsage: "",
    noiseLevel: "",
    guestPolicy: "",
    dietaryPreferences: "",
    culturalPractices: "",
    longTermGoals: "",
    smokingDrinking: "",
    allergies: "",
  });
  const [topPreferences, setTopPreferences] = useState([]);

  const navigate = useNavigate();

  const handlePreferenceChange = (key, value) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [key]: value,
    }));
  };

  const handleTopPreferencesChange = (value) => {
    if (topPreferences.includes(value)) {
      setTopPreferences(topPreferences.filter((pref) => pref !== value));
    } else if (topPreferences.length < 3) {
      setTopPreferences([...topPreferences, value]);
    } else {
      alert("You can only select up to 3 top preferences.");
    }
  };

  const normalizePreferences = (preferences) => {
    const preferenceMappings = {
      studyHabits: { Quiet: 1, Collaborative: 0.5 },
      cleanliness: { Minimal: 0.3, Moderate: 0.6, Meticulous: 1 },
      sleepingSchedule: { "Early Riser": 1, "Night Owl": 0.5 },
      personalSpace: { 
        "Sharing Belongings": 0.3, 
        "Limited Sharing": 0.6, 
        "Personal Space Only": 1 
      },
      internetUsage: { 
        "Minimal (Basic Browsing)": 0.3, 
        "Moderate (Coding, Research)": 0.6, 
        "Heavy (Gaming, Streaming)": 1 
      },
      noiseLevel: { "High Tolerance": 0.3, "Preference for Quiet": 1 },
      guestPolicy: { "Frequent Visitors": 0.5, "No/Minimal Visitors": 1 },
      smokingDrinking: { "No Preference": 0.3, "Non-Smoker/Non-Drinker": 1, "Occasional": 0.6 },
      dietaryPreferences: { Vegetarian: 0.8, "Non-Vegetarian": 0.5, Vegan: 1 },
    };

    return Object.keys(preferences).reduce((normalized, key) => {
      normalized[key] = preferenceMappings[key]?.[preferences[key]] || 0;
      return normalized;
    }, {});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !department) {
      alert("Please fill all required fields");
      return;
    }

    const normalizedPreferences = normalizePreferences(preferences);

    const formData = {
      name,
      email,
      password,
      department,
      age,
      course,
      year,
      preferences: normalizedPreferences,
      topPreferences,
    };

    axios
      .post("/api/user/signUp", formData)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-50 via-sky-100 to-sky-100 rounded-lgjustify-center bg-white">
      <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-lg relative rounded-[35px] shadow-[10px_4px_4px_0px_rgba(0,0,0,0.25)] mb-10 mt-10">
        <h2 className="text-3xl font-bold text-left text-[#265669] mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Basic Details */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-md font-medium text-[#367896] mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-md font-medium text-[#367896] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="department" className="block text-md font-medium text-[#367896] mb-2">
              Department
            </label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter your department"
              className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-md font-medium text-[#367896] mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="year" className="block text-md font-medium text-[#367896] mb-2">
              Year
            </label>
            <input
              type="text"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter your year"
              className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
            />
          </div>


          {/* Preferences Section */}
          <div className="mb-4">
            <label className="block text-md font-medium text-[#367896] mb-2">Study Habits</label>
            <select
              value={preferences.studyHabits}
              onChange={(e) => handlePreferenceChange("studyHabits", e.target.value)}
              className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
            >
              <option value="">Select</option>
              <option value="Quiet">Quiet</option>
              <option value="Collaborative">Collaborative</option>
            </select>
          </div>
          <div className="mb-4">
              <label className="block text-md font-medium text-[#367896] mb-2">
                Cleanliness Standards
              </label>
              <select
                value={preferences.cleanliness}
                onChange={(e) => handlePreferenceChange("cleanliness", e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              >
                <option value="">Select</option>
                <option value="1">Minimal</option>
                <option value="2">Moderate</option>
                <option value="3">Meticulous</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-[#367896] mb-2">
                Sleeping Schedule
              </label>
              <select
                value={preferences.sleepingSchedule}
                onChange={(e) => handlePreferenceChange("sleepingSchedule", e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              >
                <option value="">Select</option>
                <option value="1">Early Riser</option>
                <option value="2">Night Owl</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-[#367896] mb-2">
                Personal Space Preferences
              </label>
              <select
                value={preferences.personalSpace}
                onChange={(e) => handlePreferenceChange("personalSpace", e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              >
                <option value="">Select</option>
                <option value="1">Sharing Belongings</option>
                <option value="2">Limited Sharing</option>
                <option value="3">Personal Space Only</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-[#367896] mb-2">
                Internet Usage
              </label>
              <select
                value={preferences.internetUsage}
                onChange={(e) => handlePreferenceChange("internetUsage", e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              >
                <option value="">Select</option>
                <option value="1">Minimal (Basic Browsing)</option>
                <option value="2">Moderate (Coding, Research)</option>
                <option value="3">Heavy (Gaming, Streaming)</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-[#367896] mb-2">
                Preferred Noise Levels
              </label>
              <select
                value={preferences.noiseLevel}
                onChange={(e) => handlePreferenceChange("noiseLevel", e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              >
                <option value="">Select</option>
                <option value="1">High Tolerance</option>
                <option value="2">Preference for Quiet</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-[#367896] mb-2">
                Guest Policies
              </label>
              <select
                value={preferences.guestPolicies}
                onChange={(e) => handlePreferenceChange("guestPolicies", e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              >
                <option value="">Select</option>
                <option value="1">Frequent Visitors</option>
                <option value="2">No/Minimal Visitors</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-md font-medium text-[#367896] mb-2">
                Long-Term Goals
              </label>
              <select
                value={preferences.longTermGoals}
                onChange={(e) => handlePreferenceChange("longTermGoals", e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              >
                <option value="">Select</option>
                <option value="1">Academics</option>
                <option value="2">Extracurriculars</option>
                <option value="3">Casual Living</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-[#367896] mb-2">
                Smoking/Drinking Preferences
              </label>
              <select
                value={preferences.smokingDrinking}
                onChange={(e) => handlePreferenceChange("smokingDrinking", e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              >
                <option value="">Select</option>
                <option value="1">No Preference</option>
                <option value="2">Non-Smoker/Non-Drinker</option>
                <option value="3">Occasional</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-[#367896] mb-2">
                Dietary Preferences
              </label>
              <select
                value={preferences.dietaryPreferences}
                onChange={(e) => handlePreferenceChange("dietaryPreferences", e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              >
                <option value="">Select</option>
                <option value="1">Vegetarian</option>
                <option value="2">Non-Vegetarian</option>
                <option value="3">Vegan</option>
              </select>
            </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-[#367896] mb-2">Cultural/Religious Practices</label>
            <input
              type="text"
              value={preferences.culturalPractices}
              onChange={(e) => handlePreferenceChange("culturalPractices", e.target.value)}
              placeholder="Specify any specific practices"
              className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
            />
          </div>
          <div className="mb-4">
            <label className="block text-md font-medium text-[#367896] mb-2">Allergies or Medical Conditions</label>
            <textarea
              value={preferences.allergies}
              onChange={(e) => handlePreferenceChange("allergies", e.target.value)}
              placeholder="Specify any allergies or medical conditions"
              className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-lg bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
            ></textarea>
          </div>
          
          {/* Top Preferences */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#265669] mb-4">Top Preferences</h3>
            <p className="text-sm text-[#367896] mb-4">Select up to 3 preferences:</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Study Habits",
                "Cleanliness",
                "Sleeping Schedule",
                "Personal Space",
                "Internet Usage",
                "Noise Level",
                "Guest Policy",
                "Dietary Preferences",
                "Smoking/Drinking Preferences",
              ].map((preference) => (
                <div key={preference} className="flex items-center">
                  <input
                    type="checkbox"
                    id={preference}
                    checked={topPreferences.includes(preference)}
                    onChange={() => handleTopPreferencesChange(preference)}
                    className="mr-2"
                  />
                  <label htmlFor={preference} className="text-md text-[#367896]">
                    {preference}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-6 py-2 rounded-full bg-[#F4DCA7] border-2 border-[#F4C172] text-[#265669] font-semibold hover:shadow-md transition-all"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#8AB6B9] border-2 border-[#387E9A] text-white font-semibold hover:shadow-md transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { SignUp };








