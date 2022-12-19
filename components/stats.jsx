import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { classNames } from "../utils/utility";

export default function Stats({ questions, time, timerDate, submitted }) {
  const stats = scoreCalc();
  function scoreCalc() {
    if (!submitted) return [];
    const correctCommunity = questions.reduce(
      (count, question) =>
        question.correct_community_answer ===
        question.givenAnswers.sort().join("")
          ? count + 1
          : count,
      0
    );
    const correctET = questions.reduce(
      (count, question) =>
        question.correct_et_answer === question.givenAnswers.sort().join("")
          ? count + 1
          : count,
      0
    );
    return [
      {
        name: "Community Answers",
        stat: Math.ceil((correctCommunity * 100) / questions.length),
        previousStat: 94,
        change: Math.ceil((correctCommunity * 100) / questions.length) - 94,
      },
      {
        name: "ExamTopics Answers",
        stat: Math.ceil((correctET * 100) / questions.length),
        previousStat: 70,
        change: Math.ceil((correctET * 100) / questions.length) - 70,
      },
      {
        name: "Time",
        stat: time,
        previousStat: 600000,
        change: 0,
      },
    ];
  }
  return (
    <dl className="mt-5 grid grid-cols-1 rounded-lg bg-gray-50 overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
      {stats.map((item) => (
        <div key={item.name} className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">{item.name}</dt>
          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div className="flex items-baseline text-2xl font-semibold text-sky-600">
              {item.name === "Time"
                ? `${timerDate[0]}:${timerDate[1]}:${timerDate[2]}`
                : `${item.stat}%`}
              {item.name !== "Time" ? (
                <span className="ml-2 text-sm font-medium text-gray-500">
                  from{" "}
                  {item.name === "Time" ? `00:10:27` : `${item.previousStat}%`}
                </span>
              ) : (
                ""
              )}
            </div>
            {item.name !== "Time" ? (
              <div
                className={classNames(
                  item.stat >= item.previousStat
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800",
                  "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
                )}
              >
                {item.stat >= item.previousStat ? (
                  <ArrowUpIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowDownIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )}
                {item.change}%
              </div>
            ) : (
              ""
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
