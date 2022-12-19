import { classNames } from "../utils/utility";

export default function QuestionButtons({
  questions,
  current,
  setCurrent,
  whichCorrectAnswer,
  submitted,
}) {
  return (
    <div className="mt-2 grid grid-cols-[repeat(6,_1fr)] gap-0.5">
      {questions.map((question, number) => (
        <button
          key={`button-${number}`}
          className={classNames(
            "border-2 rounded-lg text-center w-8 h-8 hover:bg-gray-100 text-gray-700",
            submitted
              ? question[whichCorrectAnswer] ===
                question.givenAnswers.sort().join("")
                ? "bg-green-100 text-green-800 border-green-500"
                : "bg-red-100 text-red-800 border-red-500"
              : "",
            number == current ? "bg-gray-100" : ""
          )}
          onClick={() => setCurrent(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
}
