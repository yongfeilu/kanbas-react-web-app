import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setCurrentUser } from "../Account/reducer";


export default function Dashboard({ courses, course, setCourse, addNewCourse, deleteCourse, updateCourse, enrollUserinCourse, quitCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: (userId: string) => void; deleteCourse: (course: any) => void;
    updateCourse: () => void;  enrollUserinCourse: (user: any) => Promise<any>;
    quitCourse: (user: any, courseId: string) => Promise<any>;
}) {
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const userRole = currentUser?.role;
    const dispatch = useDispatch(); // Get dispatch function

    // Filter courses based on the role
    let filteredCourses = [];
    if (userRole === "FACULTY") {
        filteredCourses = courses.filter((c) => c.author === currentUser._id);
    } else if (userRole === "STUDENT") {
        filteredCourses = courses.filter((c) => Array.isArray(currentUser.enrolledCourses) && currentUser.enrolledCourses.includes(c._id));
    }
    console.log("Dashboard", courses);
    console.log("Dashboard", filteredCourses);

    const unenrolledCourses = courses.filter((c) => 
        Array.isArray(currentUser.enrolledCourses) && 
        !currentUser.enrolledCourses.includes(c._id)
    );

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

            {userRole === "FACULTY" && (
                <div>
                    <h5>New Course
                        <button className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={() => {
                                if (course.name && course.number && course.description) {
                                    addNewCourse(currentUser._id);
                                } else {
                                    alert("Please fill in all required fields before adding the course.");
                                }
                            }} > 
                            Add 
                        </button>
                        <button className="btn btn-warning float-end me-2" onClick={() => {
                            if (course._id && course.name && course.number && course.description) {
                                updateCourse();
                            } else {
                                alert("Please select a course and fill in all required fields before updating the course.");
                            }
                        }}  id="wd-update-course-click">
                            Update
                        </button>
                    </h5><br />
                    <div className="mb-2">
                        <label htmlFor="courseNumber">Course Number</label>
                        <input value={course.number || "" } id="courseNumber" className="form-control" 
                            onChange={(e) => setCourse({ ...course, number: e.target.value}) } />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="courseName">Course Name</label>
                        <input value={course.name || "" } id="courseName" className="form-control" 
                            onChange={(e) => {
                                setCourse({ ...course, name: e.target.value});
                            } 
                        } />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea value={course.description || ""} id="courseDescription" className="form-control"
                            onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
                    </div>
                    <hr />
                </div>
            )}

            {userRole === "STUDENT" &&  (
                <div>
                    <h5>Enroll in a Course</h5>
                    <select className="form-select mb-2" onChange={(e) => setCourse({ ...course, _id: e.target.value })}>
                        <option value="">Select a course to enroll</option>
                        {unenrolledCourses.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.number} - {c.name}
                            </option>
                        ))}
                    </select>
                    {/* TODO: onclick -> enroll in course */}
                    <button className="btn btn-primary" onClick={ async() => 
                        {
                            enrollUserinCourse(currentUser);
                            const updatedUser = await enrollUserinCourse(currentUser);  // Get updated user
                            if (updatedUser) {
                                setCurrentUser(updatedUser);  // Update currentUser state
                                dispatch(setCurrentUser(updatedUser));
                            }
                        }
                    }>
                        Enroll
                    </button>
                    <hr />
                </div>
            )}
            

            <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
            <div className="row row-cols-1 row-cols-md-5 g-4">
                {filteredCourses.map((course) => (
                    <div className="wd-dashboard-course col" style={{ width: "300px" }} key={course._id}>
                        <Link to={`/Kanbas/Courses/${course.number}/Home`} className="text-decoration-none">
                            <div className="card rounded-3 overflow-hidden">
                                <img src={`/images/${course.image}`} height="160" alt={course.name} />
                                <div className="card-body">
                                    <span className="wd-dashboard-course-link"
                                    style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                        {course.name}
                                    </span>
                                    <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                                        {course.description}
                                    </p>
                                    <Link to={`/Kanbas/Courses/${course.number}/Home`} className="btn btn-primary">Go</Link>
                                    <button 
                                        onClick={async (event) => {
                                            event.preventDefault();
                                            
                                            if (course._id) {
                                                if (userRole === "FACULTY") {
                                                    console.log("clicking delete course", course, course._id);
                                                    deleteCourse(course._id);  // Faculty can delete the course
                                                } else if (userRole === "STUDENT") {
                                                    console.log("clicking quit course", course, course._id);
                                                    // quitCourse(currentUser，course._id); // Student can unenroll from the course
                                                    const updatedUser = await quitCourse(currentUser, course._id);  // Get updated user
                                                    if (updatedUser) {
                                                        setCurrentUser(updatedUser);  // Update currentUser state
                                                        dispatch(setCurrentUser(updatedUser));
                                                    }
                                                } else {
                                                    console.error("Unauthorized action.");
                                                }
                                            } else {
                                                console.error("Course ID is undefined. Cannot proceed with the action.");
                                            }
                                        }} 
                                        className="btn btn-danger float-end" id="wd-delete-course-click">
                                        {userRole === "FACULTY" ? "Delete" : "Quit"}
                                    </button>

                                    {userRole === "FACULTY" && (
                                        <button 
                                            id="wd-edit-course-click"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setCourse(course);  // Set the specific course for editing
                                            }}
                                            className="btn btn-warning me-2 float-end">
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}
