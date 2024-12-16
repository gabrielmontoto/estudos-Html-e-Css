import { question } from "../types/question";

type Props = {
  questions: question[];
  answers: number[];
};

export const Results = ({ questions, answers }: Props) => {
  return (
    <div>
      {questions.map((item, key) => (
        <div key={key} className="mb-3">
          <div className="font-bold">
            {key + 1}. {item.question}
          </div>
          <div>
            (
            <span>
              {item.answer === answers[key] ? "aaacetou!" : "eeerrou!"}) -
              {" a resposta correta é: "}
            </span>
            {item.options[item.answer]}
          </div>
        </div>
      ))}
    </div>
  );
};
