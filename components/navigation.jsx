import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Navigation({
  current,
  setCurrent,
  submitted,
  setSubmitted,
  questions,
  setQuestions,
  setTime,
}) {
  return (
    <nav className="px-4 flex items-center justify-between sm:px-0 pb-4">
      {current == 0 ? (
        ""
      ) : (
        <div className="-mt-px w-0 flex-1 flex">
          <button
            className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            onClick={() => setCurrent(current - 1)}
          >
            <ArrowLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Previous
          </button>
        </div>
      )}
      {current + 1 == questions.length ? (
        !submitted ? (
          <button
            type="submit"
            className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            onClick={() => setSubmitted(true)}
          >
            Submit
          </button>
        ) : (
          <button
            type="submit"
            className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            onClick={() => {
              setSubmitted(false);
              let newQuestions = [...questions];
              newQuestions = newQuestions.map((question) => ({
                ...question,
                givenAnswers: [],
              }));
              setQuestions(newQuestions);
              setCurrent(0);
              setTime(0);
            }}
          >
            Reset
          </button>
        )
      ) : (
        <div className="-mt-px w-0 flex-1 flex justify-end">
          <button
            className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            onClick={() => setCurrent(current + 1)}
          >
            Next
            <ArrowRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </nav>
  );
}
