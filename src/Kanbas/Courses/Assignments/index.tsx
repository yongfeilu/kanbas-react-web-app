import { BsGripVertical, BsPlus } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";

export default function Assignments() {
    return (
      <div id="wd-assignments">
        <div id="wd-assignments-controls" className="d-flex align-items-center mb-3">
            <div className="input-group me-2 flex-grow-1">
                <span className="input-group-text"><CiSearch/></span>
                <input 
                    id="wd-search-assignment" 
                    type="text" 
                    className="form-control" 
                    aria-label="Sizing example input" 
                    placeholder="Search for Assignments" 
                />
            </div>
            <button id="wd-add-assignment-group" className="btn btn-outline-secondary me-2">+Group</button>
            <button id="wd-add-assignment" className="btn btn-danger">+Assignment</button>
        </div>

        <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div id="wd-assignments-title" className="wd-title p-3 ps-2">
              <BsGripVertical className="me-2 fs-3"/>
                <b className="dropdown-toggle">ASSIGNMENTS</b>
                <div className="float-end">
                    <button id="wd-add-assignment-group" className="btn btn-outline-secondary me-2" style={{ borderRadius:"50px" }}>40% of Total</button>
                    <BsPlus className="fs-4"/>
                    <IoEllipsisVertical className="fs-4" />
                </div>
            </div>

            <ul className="wd-lessons list-group rounded-0">
                <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <BsGripVertical className="me-2 fs-3" />
                        <MdOutlineAssignment className="me-2 fs-3" style={{ color: 'green' }}/>
                        <div style={{ flex: 1 }}>
                            
                        <a href="#/Kanbas/Courses/1234/Assignments/123" style={{ textDecoration: 'none', color: 'inherit' }}><h4>A1</h4></a>
                            <p>
                                <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00 am | <b>Due</b> May 13 at 11:59 pm | 100pts
                            </p>
                        </div>
                        <LessonControlButtons />
                    </div>
                </li>
                <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <BsGripVertical className="me-2 fs-3" />
                        <MdOutlineAssignment className="me-2 fs-3" style={{ color: 'green' }}/>
                        <div style={{ flex: 1 }}>
                            
                            <a href="#/Kanbas/Courses/1234/Assignments/123" style={{ textDecoration: 'none', color: 'inherit' }}><h4>A2</h4></a>
                            <p>
                                <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00 am | <b>Due</b> May 20 at 11:59 pm | 100pts
                            </p>
                        </div>
                        <LessonControlButtons />
                    </div>
                </li>
                <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <BsGripVertical className="me-2 fs-3" />
                        <MdOutlineAssignment className="me-2 fs-3" style={{ color: 'green' }}/>
                        <div style={{ flex: 1 }}>
                            
                        <a href="#/Kanbas/Courses/1234/Assignments/123" style={{ textDecoration: 'none', color: 'inherit' }}><h4>A3</h4></a>
                            <p className="me-2">
                                <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00 am | <b>Due</b> May 27 at 11:59 pm | 100pts
                            </p>
                        </div>
                        <LessonControlButtons />
                    </div>
                </li>
            </ul>
          </li>
        </ul>
    </div>
);}
