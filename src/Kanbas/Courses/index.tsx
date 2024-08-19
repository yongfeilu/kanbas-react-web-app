import { Navigate, Route, Routes, useParams, useLocation} from "react-router";

import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import CoursesNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import Grades from "./Grades";
import PeopleTable from "./People/Table";
import PeopleDetails from "./People/Details";
import QuizList from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetail";
import QuizEditor from "./Quizzes/QuizEditor";
import QuestionPreview from "./Questions";

export default function Courses({ courses }: { courses: any[]; }) {
  const { id } = useParams();
  const course = courses.find((course) => course.number === id);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
        <h2 className="text-danger"> 
            <FaAlignJustify className="me-4 fs-4 mb-1" />
            {course && course.name} &gt; {pathname.split("/")[4]}
        </h2>
        <hr />
        <div id="wd-courses" className="d-flex">
          <div className="me-3">
            <CoursesNavigation />
          </div>
          <div d-none d-xl-block>
              <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home />} />
                <Route path="Modules" element={<Modules />}  />
                <Route path="Modules/:mid" element={<Modules />}  />
                <Route path="Assignments" element={<Assignments />} />
                <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                <Route path="Grades" element={<Grades />} />
                <Route path="People" element={<PeopleTable />} />
                <Route path="People/:uid" element={<PeopleTable />} />
                <Route path="Quizzes" element={<QuizList />} />
                <Route path="Quizzes/:qzid" element={<QuizDetails />} />
                <Route path="Quizzes/:qzid/Editor" element={<QuizEditor />} />
                {/* QuestionPreview */}
                <Route path="Quizzes/:qzid/Questions" element={<QuestionPreview />} />
              </Routes>
          </div>
      </div>
    </div>
);}
