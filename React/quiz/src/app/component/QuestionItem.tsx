import { useState } from "react";
import { question } from "../types/question";

type Props = {
  question: question;
  currentQuestionNumber: number;
  onAnswer: (answer: number) => void;
};
export function QuestionItem({
  question,
  currentQuestionNumber,
  onAnswer,
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  function checkQuestion(key: number) {
    if (selectedAnswer === null) {
      setSelectedAnswer(key);

      setTimeout(() => {
        onAnswer(key);
        setSelectedAnswer(null);
      }, 2000);
    }
  }

  return (
    <div>
      <div className="text-3xl font-bold mb-4">
        {currentQuestionNumber}. {question.question}
      </div>

      <div>
        {question.options.map((item, key) => (
          <div
            key={key}
            onClick={() => checkQuestion(key)}
            className={`border px-3 py-2 border-blue-400 rounded-md text-lg mb-4   bg-blue-100 
                ${
                  selectedAnswer !== null
                    ? "cursor-auto"
                    : "cursor-pointer hover:opacity-60"
                }
                ${
                  selectedAnswer !== null &&
                  selectedAnswer === question.answer &&
                  selectedAnswer === key &&
                  "cursor-pointer bg-green-100 border-green-300"
                }
                ${
                  selectedAnswer !== null &&
                  selectedAnswer !== question.answer &&
                  selectedAnswer === key &&
                  "cursor-pointer bg-red-100 border-red-300"
                }
                `}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
