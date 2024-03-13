import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import type { KeyboardEvent, RefObject } from "react";
import { useState } from "react";
import { FaBackspace, FaCog, FaPlay, FaStar } from "react-icons/fa";

import { useAgentStore } from "../../stores";
import type { Message } from "../../types/message";
import AppTitle from "../AppTitle";
import Button from "../Button";
import ExampleAgents from "../console/ExampleAgents";
import { ToolsDialog } from "../dialog/ToolsDialog";
import Input from "../Input";
import { MdAddToPhotos } from "react-icons/md";

type LandingProps = {
  messages: Message[];
  disableStartAgent: boolean;
  handlePlay: () => void;
  handleKeyPress: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  goalInputRef: RefObject<HTMLInputElement>;
  goalInput: string;
  setGoalInput: (string) => void;
  setShowSignInDialog: (boolean) => void;
  setAgentRun: (newName: string, newGoal: string) => void;
};
const Landing = (props: LandingProps) => {
  const [showToolsDialog, setShowToolsDialog] = useState(false);

  const { t } = useTranslation("indexPage");
  const agent = useAgentStore.use.agent();

  const [formData, setFormData] = useState({
    location: "",
    start_Location: "",
    start_Date: "",
    end_Date: "",
    number_Of_People: "",
    budget: "",
    age: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataString = JSON.stringify(formData);
    console.log("Form data:", formDataString);
    if (props.setAgentRun) {
      props.setAgentRun(formData.location, formDataString);
    }
  };

  return (
    <>
      <ToolsDialog show={showToolsDialog} setOpen={setShowToolsDialog} />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, type: "easeInOut" }}
        className="z-10"
      >
        <AppTitle />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 1, type: "easeInOut" }}
        className="z-10"
      >
        <ExampleAgents setAgentRun={props.setAgentRun} setShowSignIn={props.setShowSignInDialog} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.5, type: "easeInOut" }}
        className="z-10 flex w-full flex-col gap-6"
      >
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
          </form>
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <Button
            ping
            onClick={() => setShowToolsDialog(true)}
            className="h-full bg-gradient-to-t from-slate-9 to-slate-12 hover:shadow-depth-3"
          >
            <FaCog />
          </Button>
          <Button
            onClick={handleSubmit}
            className="my-5 border-0 bg-gradient-to-t from-[#02FCF1] to-[#A02BFE] subpixel-antialiased saturate-[75%] hover:saturate-100"
          >
            <MdAddToPhotos /> 
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default Landing;
