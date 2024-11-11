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

// interface Question {
//   question: string;
//   answer: string;
//   explanation?: string;
// }

// interface QuestionCardProps {
//   data: Question | undefined;
//   language: string;
//   onNextQuestion: () => void;
//   onPreviousQuestion: () => void;
//   currentQuestionNumber: number;
//   totalQuestions: number;
// }

export default function QuestionCard({
  data,
  language,
  onNextQuestion,
  onPreviousQuestion,
  currentQuestionNumber,
  totalQuestions,
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  if (!data) {
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

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {language} Interview Question
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-4 text-sm text-gray-500">
          Question {currentQuestionNumber} of {totalQuestions}
        </div>
        <div className="text-lg mb-4">{data.question}</div>
        {showAnswer && (
          <>
            <div className="text-lg mb-4 mt-4">
              <strong>Answer: </strong>
              {data.answer}
            </div>
            {data.explanation && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <h3 className="font-bold flex items-center">
                  <Info className="mr-2" />
                  Explanation
                </h3>
                <p className="mt-2">{data.explanation}</p>
              </div>
            )}
          </>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Write your answer here</h3>
          <textarea
            className="h-40 border p-4 w-full mt-2 rounded"
            placeholder="Type your answer here..."
          ></textarea>
        </div>
        <Button onClick={handleShowAnswer} className="mt-2 w-full">
          {showAnswer ? "Hide Answere" : "Show Answere"}
        </Button>
      </CardContent>

      <CardFooter>
        <div className="flex gap-2 w-full">
          <Button onClick={onPreviousQuestion} className="w-full">
            Previous Question
          </Button>
          <Button onClick={onNextQuestion} className="w-full ">
            Next Question
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
