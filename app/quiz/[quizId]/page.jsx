import {
  collection,
  doc,
  query,
  where,
  getDoc,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";
import Quiz from "../../../components/quiz";

async function getQuiz(quizId) {
  const quizDataQuery = doc(db, "exams", quizId);
  const quizData = (await getDoc(quizDataQuery)).data();
  const questionsQuery = query(
    collection(db, "questions"),
    where("exam_id", "==", quizId),
    limit(4)
  );
  quizData.questions = (await getDocs(questionsQuery)).docs.map((doc) => ({
    ...doc.data(),
    givenAnswers: [],
  }));
  // quizData.questions = quizData.questions.map(question => ({
  //   ...question,
  //   givenAnswers: [],
  // }));
  return quizData;
}

export default async function QuizPage({ params: { quizId } }) {
  const quiz = await getQuiz(quizId);
  const questions = shuffleArray(quiz.questions)
    .splice(0, 50)
    .map((question) => ({
      ...question,
      answers: shuffleArray(question.answers),
    }));
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  // const [current, setCurrent] = useState(0);
  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {quiz.name}
          </h2>
        </div>
        {/* <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit
          </button>
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Publish
          </button>
        </div> */}
      </div>
      <Quiz receivedQuestions={questions} />
    </>
  );
}
