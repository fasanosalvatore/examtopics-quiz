import { collection, query, getDocs } from "firebase/firestore";
import Link from "next/link";
import { db } from "../utils/firebaseConfig";

async function getExams() {
  const examsQuery = query(collection(db, "exams"));
  const examsData = (await getDocs(examsQuery)).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return examsData;
}

export default async function Home() {
  const exams = await getExams();
  return (
    <div>
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
        Quizzes
      </h2>
      <div
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {exams.map((exam) => (
          <div>
            <Link href={`/quiz/${exam.id}`}>
              <div
                key={exam.name}
                className="col-span-1 flex shadow-sm rounded-md"
              >
                <div
                  className={
                    "bg-sky-600 flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                  }
                >
                  {exam.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                  <div className="flex-1 px-4 py-2 text-sm truncate">
                    <a
                      href="boh"
                      className="text-gray-900 font-medium hover:text-gray-600"
                    >
                      {exam.name}
                    </a>
                    <p className="text-gray-500">10 Attempts</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
