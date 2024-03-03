import React, { useState } from "react";
import FadeIn from "../components/motions/FadeIn";
import DashboardLayout from "../layout/dashboard";

const Templates = () => {

  const [formData, setFormData] = useState({
    location: '',
    startLocation: '',
    startDate: '',
    endDate: '',
    numberOfPeople: '',
    budget: '',
    age: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // Do something with the form data, such as sending it to a server
  };

  return (
    <DashboardLayout>
      <div className="flex h-full w-full flex-col">
        <FadeIn initialX={-45} initialY={0} delay={0.1}>
          <div>
            <h1 className="text-4xl font-bold text-slate-12 text-center mt-20">Plan your next adventure</h1>
          </div>
        </FadeIn>
        <FadeIn initialY={45} delay={0.1} className="mt-4 p-5">
          <form className="md:max-w-md lg:max-w-xl mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Where do you want to go?</label>
              <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="mb-5">
              <label htmlFor="startLocation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Where you start?</label>
              <input type="text" id="startLocation" name="startLocation" value={formData.startLocation} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            
            <div className="mb-5">
              <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start date</label>
              <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="mb-5">
              <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
              <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="mb-5">
              <label htmlFor="budget" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">How much do you plan to spend on this trip?</label>
              <select
                id="budget"
                name="budget"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formData.budget}
                onChange={handleInputChange}
              >
                <option value=""  >None</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="mb-5">
              <label htmlFor="numberOfPeople" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">How many people are going?</label>
              <input type="number" id="numberOfPeople" name="numberOfPeople" value={formData.numberOfPeople} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            
            <div className="mb-5">
              <label htmlFor="budget" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Average age of trip participants?</label>
              <select
                id="age"
                name="age"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formData.age}
                onChange={handleInputChange}
              >
                <option value=""  >None</option>
                <option value="15 to 24 years">15 to 24 years</option>
                <option value="25 to 34 years">25 to 34 years</option>
                <option value="35 to 44 years">35 to 44 years</option>
                <option value="45 to 54 years">45 to 54 years</option>
                <option value="55 to 64 years">55 to 64 years</option>
                <option value="65 to older">65 to older</option>
              </select>
            </div>
            <div className="flex justify-center mb-5">
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
          </form>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
};

export default Templates;