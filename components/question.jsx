import { classNames } from "../utils/utility";

export default function Question({
  question,
  index,
  updateQuestionAnswer,
  submitted,
  whichCorrectAnswer,
}) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: question.question }}></div>
      {question.question_img ? <img src={question.question_img} /> : ""}
      <fieldset className="space-y-2">
        {question.answers.map((answer) => (
          <div
            className={classNames(
              "mt-4 relative flex items-start py-2 border rounded",
              !submitted
                ? "border-transparent"
                : question.givenAnswers.includes(answer.id)
                ? question[whichCorrectAnswer].includes(answer.id)
                  ? "bg-green-100 text-green-800 border-green-500"
                  : "bg-red-100 text-red-800 border-red-500"
                : ""
            )}
            key={answer.id}
          >
            <div className="ml-2 flex items-center h-5">
              <input
                type="checkbox"
                disabled={submitted}
                className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                id={`${index}-${answer.id}`}
                value={answer.id}
                checked={question.givenAnswers.includes(answer.id)}
                onChange={(e) =>
                  updateQuestionAnswer(index, e.target.checked, e.target.value)
                }
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor={`${index}-${answer.id}`} className="">
                {answer.text}
              </label>

              {submitted &&
              question.correct_community_answer.includes(answer.id) ? (
                <span className="text-sm p-1 border ml-2 rounded">
                  Community
                </span>
              ) : (
                ""
              )}

              {submitted && question.correct_et_answer.includes(answer.id) ? (
                <span className="text-sm p-1 border ml-2 rounded">
                  ExamTopics
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </fieldset>
    </div>
  );
}
