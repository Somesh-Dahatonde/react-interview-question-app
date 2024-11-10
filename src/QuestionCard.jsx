"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Info } from "lucide-react";

export default function QuestionCard({ data, language }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const filteredData = data || [];
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(
      (prevIndex) => (prevIndex + 1) % filteredData.length
    );
    setShowAnswer(false);
  };

  // Display message if no questions are available
  if (filteredData.length === 0) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            No Questions Available
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-center">
            There are no questions available for {language}.
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = filteredData[currentQuestionIndex];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {language} Interview Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-4 text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {filteredData.length}
        </div>
        <div className="text-lg mb-4">
          {`${currentQuestionIndex + 1}) `}
          {currentQuestion?.question}
        </div>
        {showAnswer && (
          <>
            <div className="text-lg mb-4 mt-4">
              <strong>Answer: </strong>
              {currentQuestion.answer}
            </div>
            {currentQuestion.explanation && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <h3 className="font-bold flex items-center">
                  <Info className="mr-2" />
                  Explanation
                </h3>
                <p className="mt-2">{currentQuestion.explanation}</p>
              </div>
            )}
          </>
        )}

        <Button
          onClick={handleShowAnswer}
          className="mt-2 w-full"
          disabled={showAnswer}
        >
          Show Answer
        </Button>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNextQuestion} className="w-full">
          Next Question
        </Button>
      </CardFooter>
    </Card>
  );
}
