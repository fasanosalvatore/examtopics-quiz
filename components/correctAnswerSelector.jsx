export default function CorrectAnswerSelector({
  correctAnswersMethods,
  whichCorrectAnswer,
  setWhichCorrectAnswer,
}) {
  return (
    <fieldset>
      <div className="space-y-4">
        {correctAnswersMethods.map((correctAnswersMethod) => (
          <div key={correctAnswersMethod.id} className="flex items-center">
            <input
              onChange={() => setWhichCorrectAnswer(correctAnswersMethod.id)}
              id={correctAnswersMethod.id}
              name="notification-method"
              type="radio"
              defaultChecked={correctAnswersMethod.id === whichCorrectAnswer}
              className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300"
            />
            <label
              htmlFor={correctAnswersMethod.id}
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              {correctAnswersMethod.title}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
