import "./App.css";
import QuestionCard from "./QuestionCard";
import data from "../output";
import { useState } from "react";

function App() {
  const [currentLanguage, setCurrentLanguage] = useState("HTML");

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          height: "100vh",
        }}
      >
        <div className="flex flex-col">
          <div className="language-buttons flex m-6">
            {Object.keys(data).map((language) => (
              <button
                key={language}
                onClick={() => setCurrentLanguage(language)}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2"
              >
                {language}
              </button>
            ))}
          </div>
          <QuestionCard data={data[currentLanguage]} />
        </div>
        <div>
          <h1>Write your answer here</h1>
          <textarea className="h-96 border p-6" cols={60}></textarea>
        </div>
      </div>
    </>
  );
}

export default App;
