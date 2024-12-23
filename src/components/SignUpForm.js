import React, { useState } from "react";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "",
    //photo: null,
    about: "",
    skills: [],
  });

  const skillsOptions = ["JavaScript", "React", "Node.js", "CSS", "Tailwind CSS"];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      const skill = value;
      setFormData((prevState) => ({
        ...prevState,
        skills: prevState.skills.includes(skill)
          ? prevState.skills.filter((s) => s !== skill)
          : [...prevState.skills, skill],
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const formDataToObject = (formData) => {
    const obj = {};
    formData.forEach((value, key) => {
      if (obj[key]) {
        // Handle multiple entries with the same key (like arrays)
        obj[key] = Array.isArray(obj[key]) ? [...obj[key], value] : [obj[key], value];
      } else {
        obj[key] = value;
      }
    });
    return obj;
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "photo" && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else if (key === "skills") {
        formData[key].forEach((skill) => formDataToSend.append("skills[]", skill)); // Append each skill individually
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    console.log(formDataToObject(formDataToSend));
  
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formDataToSend,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Form successfully submitted: ", result);
      } else {
        console.error("Error submitting form: ", response.statusText);
      }
    } catch (error) {
      console.error("Network error: ", error);
    }
  };
  

  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">User Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Firstname */}
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Lastname */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            //required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
           // required
          />
        </div>

        {/* About */}
        <div>
          <label className="block text-sm font-medium text-gray-700">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
           // required
          ></textarea>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Skills</label>
          <div className="mt-2 space-y-2">
            {skillsOptions.map((skill, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  name="skills"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label className="ml-2 text-sm text-gray-700">{skill}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
