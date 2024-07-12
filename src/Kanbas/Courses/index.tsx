import { Navigate, Route, Routes } from "react-router";

import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import CoursesNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import Grades from "./Grades";

export default function Courses() {
  return (
    <div id="wd-courses">
        <h2 className="text-danger"> 
            <FaAlignJustify className="me-4 fs-4 mb-1" />
          Course 1234
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
                <Route path="Assignments" element={<Assignments />} />
                <Route path="Assignments/:id" element={<AssignmentEditor />} />
                <Route path="Grades" element={<Grades />} />
              </Routes>
          </div>
      </div>
    </div>
);}
