import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import type { KeyboardEvent, RefObject } from "react";
import { useState } from "react";
import { FaBackspace, FaCog, FaPlay } from "react-icons/fa";

import { useAgentStore } from "../../stores";
import type { Message } from "../../types/message";
import AppTitle from "../AppTitle";
import Button from "../Button";
import ExampleAgents from "../console/ExampleAgents";
import { ToolsDialog } from "../dialog/ToolsDialog";
import Input from "../Input";
import { MdAddToPhotos } from "react-icons/md";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

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

const validationSchema = Yup.object().shape({
  location: Yup.string()
    .required("Location is required")
    .min(5, "Location must be at least 5 characters")
    .max(100, "Location must be less than 100 characters"),
  start_Location: Yup.string()
    .required("Start Location is required")
    .min(5, "Start Location must be at least 5 characters")
    .max(100, "Start Location must be less than 100 characters"),
  start_Date: Yup.date()
    .required("Start Date is required")
    .min(new Date(), "Start Date cannot be in the past"),
  end_Date: Yup.date()
    .required("End Date is required")
    .test(
      "is-greater-or-equal",
      "End date must be later than or equal to start date",
      function (value) {
        const startDate = this.resolve(Yup.ref("start_Date"));
        if (!startDate || !value) {
          return true;
        }
        const start = new Date(String(startDate));
        const end = new Date(value);
        // Set hours to 0 to compare only year, month and day
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        return end >= start;
      }
    ),
  number_Of_People: Yup.number()
    .required("Number of People is required")
    .min(1, "Number of People must be at least 1")
    .max(999, "Number of People must be less than or equal to 999")
    .integer("Number of People must be an integer"),
  budget: Yup.string()
    .required("Budget is required")
    .oneOf(["Cheap", "Mid", "High"], "Invalid budget"),
  travel_Style: Yup.string()
    .required("Travel Style is required")
    .oneOf(
      [
        "Relaxation",
        "Cultural of Historical",
        "Romantic for Couples",
        "Family-Friendly",
        "Adventure and Outdoor",
      ],
      "Invalid travel style"
    ),
});

const Landing = (props: LandingProps) => {
  const [showToolsDialog, setShowToolsDialog] = useState(false);

  const { t } = useTranslation("indexPage");
  const agent = useAgentStore.use.agent();

  const initialValues = {
    location: "",
    start_Location: "",
    start_Date: "",
    end_Date: "",
    number_Of_People: "",
    budget: "",
    travel_Style: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    props.setAgentRun(values.location, JSON.stringify(values));
    console.log("values", values);
    setSubmitting(false);
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
        <div className="m-5">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mx-auto">
                <div className="mb-5">
                  <label
                    htmlFor="location"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Where do you want to go?
                  </label>
                  <Field
                    type="text"
                    id="location"
                    name="location"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  />
                  <ErrorMessage name="location" component="div" className="text-sm text-red-500" />
                </div>
                <div className="mb-5 flex space-x-4">
                  <div className="flex-1">
                    <label
                      htmlFor="travel_Style"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Travel style:
                    </label>
                    <Field
                      as="select"
                      id="travel_Style"
                      name="travel_Style"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option value="">Select style...</option>
                      <option value="Relaxation">Relaxation</option>
                      <option value="Cultural of Historical">Cultural of Historical</option>
                      <option value="Romantic for Couples">Romantic for Couples</option>
                      <option value="Family-Friendly">Family-Friendly</option>
                      <option value="Adventure and Outdoor">Adventure and Outdoor</option>
                    </Field>
                    <ErrorMessage
                      name="travel_Style"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="budget"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Budget level:
                    </label>
                    <Field
                      as="select"
                      id="budget"
                      name="budget"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option value="">Select budget...</option>
                      <option value="Cheap">Cheap</option>
                      <option value="Mid">Mid</option>
                      <option value="High">High</option>
                    </Field>
                    <ErrorMessage name="budget" component="div" className="text-sm text-red-500" />
                  </div>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="start_Location"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Where you start?
                  </label>
                  <Field
                    type="text"
                    id="start_Location"
                    name="start_Location"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="start_Location"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    When does your trip start?
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <Field
                        type="date"
                        id="start_Date"
                        name="start_Date"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="start_Date"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                    <div className="self-center">to</div>
                    <div className="flex-1">
                      <Field
                        type="date"
                        id="end_Date"
                        name="end_Date"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="end_Date"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="number_Of_People"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    How many people are going?
                  </label>
                  <Field
                    type="number"
                    min={1}
                    id="number_Of_People"
                    name="number_Of_People"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="number_Of_People"
                    component="div"
                    className="text-sm text-red-500"
                  />
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
                    type="submit"
                    disabled={isSubmitting}
                    className="my-5 border-0 bg-gradient-to-t from-[#02FCF1] to-[#A02BFE] subpixel-antialiased saturate-[75%] hover:saturate-100"
                  >
                    <FaPlay />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </>
  );
};

export default Landing;
