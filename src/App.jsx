"use client";

import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import { ChevronDown, Menu, X } from "lucide-react";
import "./App.css";
import data from "../output.js";

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState("HTML");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [openSections, setOpenSections] = useState({ 0: true });
  const [showSlideBar, setShowSlideBar] = useState(false); // Initially hidden on mobile

  useEffect(() => {
    // Reset question index when language changes
    setCurrentQuestionIndex(0);
  }, [currentLanguage]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(
      (prevIndex) => (prevIndex + 1) % (data[currentLanguage]?.length || 1)
    );
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(
      (prevIndex) =>
        (prevIndex - 1 + (data[currentLanguage]?.length || 1)) %
        (data[currentLanguage]?.length || 1)
    );
  };

  const currentQuestion = data[currentLanguage]?.[currentQuestionIndex];

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-800">
      {/* Sidebar */}
      <aside
        className={`fixed z-20 inset-y-0 left-0 transform ${
          showSlideBar ? "translate-x-0" : "-translate-x-full"
        } w-64 md:relative md:translate-x-0 md:w-1/3 lg:w-1/4 bg-gray-100 overflow-auto transition-transform duration-300 ease-in-out`}
      >
        <div className="sticky top-0 bg-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Languages</h2>
          <button
            onClick={() => setShowSlideBar(false)}
            aria-label="Close sidebar"
            className="p-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 md:hidden"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        {Object.entries(data).map(([language, questions], index) => (
          <div key={language} className="border-b border-gray-200">
            <h3>
              <button
                type="button"
                className="flex items-center justify-between w-full p-4 font-medium text-left text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onClick={() => toggleSection(index)}
                aria-expanded={openSections[index]}
              >
                <span>{language}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openSections[index] ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            {openSections[index] && (
              <div className="p-4">
                {questions.map((question, questionIndex) => (
                  <button
                    key={questionIndex}
                    onClick={() => {
                      setCurrentLanguage(language);
                      setCurrentQuestionIndex(questionIndex);
                      setShowSlideBar(false); // Close sidebar on selection (for mobile)
                    }}
                    className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded"
                  >
                    {question.question}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </aside>
      {showSlideBar && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setShowSlideBar(false)}
        ></div>
      )}

      {/* Main content */}
      <main className="flex flex-col w-full p-6  h-screen justify-between md:justify-center md:items-center">
        <div className="md:hidden flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {currentLanguage} - Selected Language
          </h2>
          <button
            onClick={() => setShowSlideBar(true)}
            aria-label="Open sidebar"
            className="p-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="sm:flex-1 sm:mt-9">
          <QuestionCard
            data={currentQuestion}
            language={currentLanguage}
            onNextQuestion={handleNextQuestion}
            onPreviousQuestion={handlePreviousQuestion}
            currentQuestionNumber={currentQuestionIndex + 1}
            totalQuestions={data[currentLanguage]?.length || 0}
          />
        </div>
      </main>
    </div>
  );
}
