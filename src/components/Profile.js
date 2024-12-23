import React, { useState, useEffect, useRef } from "react";
import { Camera, Pencil, Trash2, ChevronDown, Check, X } from "lucide-react";

const skillsOptions = [
  "JavaScript",
  "React",
  "Node.js",
  "CSS",
  "Tailwind CSS",
  "Python",
  "SQL",
  "TypeScript",
  "Docker",
  "GraphQL",
];

const ProfileUpdatePage = () => {
  const user = {
    firstName: "Kumar",
    lastName: "Sanu",
    photo:
      "https://res.cloudinary.com/dd8iearvd/image/upload/v1734342105/users/images/tqdb5hgg7tkm87fplmf6.jpg",
    age: 23,
    gender: "Male",
    skills: ["JavaScript"],
    emailId: "priya@gmail.com",
    about: "I am a developer",
  };
  const [profile, setProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    emailId: user?.emailId || "",
    age: user?.age || "",
    gender: user?.gender || "",
    about: user?.about || "",
    skills: user?.skills || [],
    photo: user?.photo || null,
  });

  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSkillDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        photo: URL.createObjectURL(file),
      }));
    }
  };

  const handleSkillChange = (skill) => {
    setProfile((prev) => {
      const currentSkills = prev.skills;
      const isSkillAlreadySelected = currentSkills.includes(skill);

      const newSkills = isSkillAlreadySelected
        ? currentSkills.filter((s) => s !== skill)
        : [...currentSkills, skill];

      return {
        ...prev,
        skills: newSkills,
      };
    });
  };

  const removePhoto = () => {
    setProfile((prev) => ({
      ...prev,
      photo: null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", profile);
    alert("Profile Updated!");
  };

  // Render selected skills display
  const renderSelectedSkills = () => {
    const displaySkills = profile.skills.slice(0, 3);
    const remainingSkillsCount = profile.skills.length - 3;

    return (
      <div className="flex items-center flex-wrap gap-1">
        {displaySkills.map((skill) => (
          <span
            key={skill}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center mr-1 mb-1"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleSkillChange(skill)}
              className="ml-1 text-blue-500 hover:text-blue-700"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        {remainingSkillsCount > 0 && (
          <span className="text-gray-600 text-xs ml-1">+ {remainingSkillsCount} more</span>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>

        {/* Photo Upload Section */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            {profile.photo ? (
              <>
                <img
                  src={profile.photo}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                <Camera size={32} className="text-gray-500" />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
            id="photoUpload"
          />
          <label
            htmlFor="photoUpload"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center cursor-pointer"
          >
            Upload Photo
          </label>
        </div>

        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter first name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter last name"
              required
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            name="emailId"
            value={profile.emailId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
            required
          />
        </div>

        {/* Additional Details */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter age"
              min="18"
              max="100"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Gender</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold mb-2">About</label>
          <textarea
            name="about"
            value={profile.about}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            placeholder="Tell us about yourself"
            required
          />
        </div>

        {/* Skills Dropdown */}
        <div className="mt-4 relative" ref={dropdownRef}>
          <label className="block text-gray-700 font-semibold mb-2">Skills</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSkillDropdownOpen(!isSkillDropdownOpen)}
              className="w-full px-3 py-2 border rounded-lg flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex-grow">
                {profile.skills.length > 0 ? renderSelectedSkills() : "Select Skills"}
              </div>
              <ChevronDown size={20} />
            </button>

            {isSkillDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {skillsOptions.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={profile.skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                      className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2"
                    />
                    <span className="flex-grow">{skill}</span>
                    {profile.skills.includes(skill) && (
                      <Check size={16} className="text-blue-600" />
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
          >
            <Pencil size={20} className="mr-2" />
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdatePage;
