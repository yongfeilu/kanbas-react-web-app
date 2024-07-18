import React from 'react';
import { useParams } from 'react-router-dom';
import { assignments, enrollments, grades, users } from '../../Database';
import { CiSearch } from "react-icons/ci";
import { BiExport, BiImport } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";
import { CiFilter } from "react-icons/ci";

export default function Grades() {
    const { id: courseId } = useParams();

    // Get the IDs of students enrolled in the current course
    const enrolledStudentsIds = enrollments
        .filter(enrollment => enrollment.course === courseId)
        .map(enrollment => enrollment.user);

    // Get details of students enrolled in the current course
    const enrolledStudents = users
        .filter(user => enrolledStudentsIds.includes(user._id) && user.role === 'STUDENT');

    // Get assignments for the current course
    const courseAssignments = assignments.filter(assignment => assignment.course === courseId);

    // Create a map of assignment grades for each student
    const studentGrades = enrolledStudents.map(student => {
        const studentGrades = courseAssignments.map(assignment => {
            const grade = grades.find(grade => grade.student === student._id && grade.assignment === assignment._id);
            return grade ? grade.grade : '-';
        });
        return { student, grades: studentGrades };
    });

    return (
        <div id="wd-grades">
            <div className="d-flex justify-content-end">
                <button className="btn btn-light me-2 text-nowrap">
                    <IoMdSettings />
                </button>
                <button className="btn btn-light me-2 text-nowrap">
                    <BiExport className="me-1" />
                    Export
                    <IoIosArrowDropdown className="ms-1" />
                </button>
                <button className="btn btn-light me-2 text-nowrap">
                    <BiImport className="me-1" />
                    Import
                </button>
            </div>

            <div className="d-flex">
                <div className="mb-2 me-2">
                    <label className="form-label"><span>Student Names</span></label>
                    <div className="d-flex align-items-center position-relative">
                        <CiSearch className="position-absolute" style={{ left: '5px', zIndex: 1 }} />
                        <select className="form-select ps-4" style={{ paddingLeft: '20px' }}>
                            <option value="" disabled selected>Search Students</option>
                            {enrolledStudents.map(student => (
                                <option key={student._id} value={student._id}>{student.firstName} {student.lastName}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-2">
                    <label className="form-label"><span>Assignment Names</span></label>
                    <div className="d-flex align-items-center position-relative">
                        <CiSearch className="position-absolute" style={{ left: '5px', zIndex: 1 }} />
                        <select className="form-select ps-4" style={{ paddingLeft: '20px' }}>
                            <option value="" disabled selected>Search Assignments</option>
                            {courseAssignments.map(assignment => (
                                <option key={assignment._id} value={assignment._id}>{assignment.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="d-flex mb-2">
                <button className="btn btn-light me-2 text-nowrap">
                    <CiFilter className="me-1" />
                    Apply Filters
                </button>
            </div>

            <div className="d-flex table-responsive">
                <table className="table table-striped table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">Student Name</th>
                            {courseAssignments.map(assignment => (
                                <th key={assignment._id} scope="col" style={{ fontWeight: 'normal' }}>
                                    {assignment.title} <br /><span>Out of 100</span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {studentGrades.map(({ student, grades }) => (
                            <tr key={student._id}>
                                <th scope="row" className="text-danger">{student.firstName} {student.lastName}</th>
                                {grades.map((grade, index) => (
                                    <td key={index}>{grade}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
