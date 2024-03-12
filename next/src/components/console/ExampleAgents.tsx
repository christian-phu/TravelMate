import { useSession } from "next-auth/react";
import React from "react";

import { ExampleAgentButton } from "./ExampleAgentButton";
import { useSID } from "../../hooks/useSID";
import FadeIn from "../motions/FadeIn";
import { useState } from "react";

type ExampleAgentsProps = {
  setAgentRun?: (name: string, goal: string) => void;
  setShowSignIn: (show: boolean) => void;
};

const ExampleAgents = ({ setAgentRun, setShowSignIn }: ExampleAgentsProps) => {
  const { data: session } = useSession();
  const sid = useSID(session);

  const [formData, setFormData] = useState({
    location: "",
    start_Location: "",
    start_Date: "",
    end_Date: "",
    number_Of_People: "",
    budget: "",
    age: "",
  });

  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataString = JSON.stringify(formData).replace(/"/g, '').replace(/_/g, '').replace(/{/g, '').replace(/}/g, '');
    console.log("Form data:", formDataString);
    if (setAgentRun) {
      setAgentRun(formData.location, formDataString);
    }
  };

  return (
    <>
      <FadeIn delay={0.9} duration={0.5}>
        <div className="my-2 grid grid-cols-1 items-stretch gap-2 sm:my-4 sm:grid-cols-3">
          <ExampleAgentButton name="TravelGPT 🌴" setAgentRun={setAgentRun}>
            Plan a detailed trip to Hawaii
          </ExampleAgentButton>

          <ExampleAgentButton name="CalculusGPT 📚" setAgentRun={setAgentRun}>
            Create a study plan for an intro to Calculus exam
          </ExampleAgentButton>

          <ExampleAgentButton name="HustleGPT 🚀" setAgentRun={setAgentRun}>
            Create a comprehensive report for how to scale a startup to 1000 customers
          </ExampleAgentButton>
        </div>
      </FadeIn>
      <div>
        <form className="mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Where do you want to go?
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="start_Location"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Where you start?
            </label>
            <input
              type="text"
              id="start_Location"
              name="start_Location"
              value={formData.start_Location}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="start_Date"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Start date
            </label>
            <input
              type="date"
              id="start_Date"
              name="start_Date"
              value={formData.start_Date}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="end_Date"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              End Date
            </label>
            <input
              type="date"
              id="end_Date"
              name="end_Date"
              value={formData.end_Date}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="number_Of_People"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              How many people are going?
            </label>
            <input
              type="number"
              min={1}
              id="number_Of_People"
              name="number_Of_People"
              value={formData.number_Of_People}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="age"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              * Average age of trip participants? (Optional)
            </label>
            <select
              id="age"
              name="age"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={formData.age}
              onChange={handleInputChange}
            >
              <option value="">None</option>
              <option value="under 30 years">under 30 years</option>
              <option value="30 to 40 years">30 to 40 years</option>
              <option value="40 to 50 years">40 to 50 years</option>
              <option value="50 to 60 years">50 to 60 years</option>
              <option value="65 to older">65 to older</option>
            </select>
          </div>

          <div className="mb-5">
            <label
              htmlFor="budget"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              * How much do you plan to spend on this trip? (Optional)
            </label>
            <select
              id="budget"
              name="budget"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={formData.budget}
              onChange={handleInputChange}
            >
              <option value="">None</option>
              <option value="Less than 500 USD">Less than 500 USD</option>
              <option value="Between 500 and 1000 USD">Between 500 and 1000 USD</option>
              <option value="Between 1000 and 2000 USD">Between 1000 and 2000 USD</option>
              <option value="Between 2000 and 5000 USD">Between 2000 and 5000 USD</option>
              <option value="Between 5000 and 10000 USD">Between 5000 and 10000 USD</option>
              <option value="More than 10000 USD">More than 10000 USD</option>
            </select>
          </div>
          <div className="mb-5 flex justify-center">
            <button
              // type="submit"
              onClick={handleSubmit}
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ExampleAgents;
