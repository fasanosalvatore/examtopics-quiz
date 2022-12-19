"use client";

import { useState } from "react";

import Question from "./question";

import Stats from "./stats";
import MyTimer from "./timer";
import QuestionButtons from "./questionButtons";
import CorrectAnswerSelector from "./correctAnswerSelector";
import Navigation from "./navigation";

const correctAnswersMethods = [
  { id: "correct_community_answer", title: "Community" },
  { id: "correct_et_answer", title: "ExamTopics" },
];

export default function Quiz({ receivedQuestions }) {
  const [questions, setQuestions] = useState(receivedQuestions);
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [whichCorrectAnswer, setWhichCorrectAnswer] = useState(
    correctAnswersMethods[0].id
  );
  const [time, setTime] = useState(0);
  const timerDate = new Date(time).toISOString().slice(11, 19).split(":");
  // const prevTimerDate = new Date(stats[2].previousStat)
  //   .toISOString()
  //   .slice(11, 19)
  //   .split(':');

  function updateQuestionAnswer(index, checked, answer) {
    const newQuestions = [...questions];
    const modifiedQuestion = { ...newQuestions[index] };
    if (checked) {
      modifiedQuestion.givenAnswers = [
        ...modifiedQuestion.givenAnswers,
        answer,
      ];
    } else {
      modifiedQuestion.givenAnswers = modifiedQuestion.givenAnswers.filter(
        (check) => check !== answer
      );
    }
    newQuestions[index] = modifiedQuestion;
    setQuestions(newQuestions);
  }
  return (
    <div className="max-w-6xl">
      <div className="mb-4">
        <Stats
          questions={questions}
          submitted={submitted}
          time={time}
          timerDate={timerDate}
        />
      </div>
      <div className="flex items-start sm:flex-row flex-col">
        <div>
          <div className="mr-4 bg-gray-50 p-2 sm:rounded-lg shadow">
            <MyTimer
              submitted={submitted}
              timerDate={timerDate}
              setTime={setTime}
            />
            {/* <p className="text-2xl font-mono">{`${timerDate[0]}:${timerDate[1]}:${timerDate[2]}`}</p> */}
            <QuestionButtons
              questions={questions}
              current={current}
              setCurrent={setCurrent}
              whichCorrectAnswer={whichCorrectAnswer}
              submitted={submitted}
            />
          </div>
          <div className="mt-4">
            <CorrectAnswerSelector
              correctAnswersMethods={correctAnswersMethods}
              whichCorrectAnswer={whichCorrectAnswer}
              setWhichCorrectAnswer={setWhichCorrectAnswer}
            />
          </div>
        </div>
        <div>
          <div className="bg-gray-50 overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <Question
                key={current}
                question={questions[current]}
                index={current}
                updateQuestionAnswer={updateQuestionAnswer}
                submitted={submitted}
                whichCorrectAnswer={whichCorrectAnswer}
              />
            </div>
          </div>
          <Navigation
            current={current}
            setCurrent={setCurrent}
            submitted={submitted}
            setSubmitted={setSubmitted}
            questions={questions}
            setQuestions={setQuestions}
            setTime={setTime}
          />
        </div>
      </div>
    </div>
  );
}
