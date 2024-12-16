"use client";
import Image from "next/image";
import { questions } from "./data/questions";
import { useState } from "react";
import { QuestionItem } from "./component/QuestionItem";
import { Results } from "./component/results";

export default function Home() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [results, setShowResults] = useState(false);
  const tittleText = "Quiz aleatório";

  const [currentQuestion, setCurrentQuestion] = useState(0);
  function loadNextQuestion() {
    if (questions[currentQuestion + 1]) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  }

  function handleAnswer(answer: number): void {
    setAnswers([...answers, answer]);
    loadNextQuestion();
  }

  function handleRestartButton(): void {
    setAnswers([]);
    setCurrentQuestion(0);
    setShowResults(false);
  }

  return (
    <div className="bg-blue-600 w-screen h-screen flex items-center justify-center text-black">
      <div className="w-full max-w-xl bg-white rounded-md shadow shadow-black flex  justify-center  flex-col items-center ">
        <div className="text-2xl  w-full p-5 shadow border-b border-b-gray-400">
          {tittleText}
        </div>
        <div className=" p-5 w-full">
          {!results && (
            <QuestionItem
              question={questions[currentQuestion]}
              currentQuestionNumber={currentQuestion + 1}
              onAnswer={handleAnswer}
            ></QuestionItem>
          )}
          {results && (
            <Results questions={questions} answers={answers}></Results>
          )}
        </div>
        <div className="w-full border-t border-t-gray-400 text-center p-5">
          {!results &&
            `${currentQuestion + 1} de ${questions.length} pergunta${
              questions.length === 1 ? "" : "s"
            }`}
          {results && (
            <button
              onClick={handleRestartButton}
              className="px-3 py-2 rounded-md bg-blue-800 text-white"
            >
              Reiniciar Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
