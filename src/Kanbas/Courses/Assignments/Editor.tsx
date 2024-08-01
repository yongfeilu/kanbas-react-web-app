import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addAssignment, updateAssignment } from './reducer';
import * as client from "./clients";


export default function AssignmentEditor() {

  const { id: courseId, aid: assignmentId } = useParams(); // Get both course ID and assignment ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments); // Get assignments from the state
  const assignment = assignments.find((assgn : any) => assgn._id === assignmentId); // Find the specific assignment

  console.log("AssignmentEditor", courseId, assignmentId, assignments);
  console.log(assignment);

  const [assignmentName, setAssignmentName] = useState(assignment ? assignment.title : '');
  const [description, setDescription] = useState(assignment ? assignment.description ? assignment.description : `The assignment is available online.\n Submit a link to the landing page of your project by the deadline specified in the course syllabus. Ensure that the landing page includes an overview of your project, key features, and any relevant documentation. This will help us understand the scope and functionality of your work. Additionally, include instructions on how to navigate your project and access its main components. If you have used any third-party libraries or tools, mention them along with their respective documentation links. Make sure your landing page is clear, concise, and professional, as it reflects your work quality.` : "");
  const [points, setPoints] = useState(assignment ? assignment.points ? assignment.points : 100 : 0);
  const [assignmentGroup, setAssignmentGroup] = useState(assignment ? assignment.group : 'ASSIGNMENTS');
  const [gradeDisplay, setGradeDisplay] = useState(assignment ? assignment.gradeDisplay : 'Percentage');
  const [submissionType, setSubmissionType] = useState(assignment ? assignment.submissionType : 'Online');
  const [assignTo, setAssignTo] = useState('Everyone');
  const [dueDate, setDueDate] = useState(assignment ? assignment.dueDate ? assignment.dueDate : '2024-05-13' : '');
  const [availableFrom, setAvailableFrom] = useState(assignment ? assignment.availableFrom ? assignment.availableFrom : '2024-05-06' : '');
  const [availableUntil, setAvailableUntil] = useState(assignment ? assignment.availableUntil ? assignment.availableUntil : '2024-05-13': '');

  const createAssignment = async (assignment: any) => {
    const newAssignment = await client.createAssignment(courseId as string, assignment);
    dispatch(addAssignment(newAssignment));
  };

  const saveAssignment = async (assignment: any) => {
    const status = await client.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  }; 

  const handleSave = () => {

    if (assignment) {
      // Update existing assignment
      const updatedAssignment = {
        ...assignment,
        title: assignmentName,
        description,
        points,
        group: assignmentGroup,
        gradeDisplay,
        submissionType,
        dueDate,
        availableFrom,
        availableUntil,
      };
      saveAssignment(updatedAssignment);
    } else {
      // Add new assignment
      const newAssignment = {
        _id: new Date().toISOString(), // Generating a unique ID for simplicity
        course: courseId,
        title: assignmentName,
        description,
        points,
        group: assignmentGroup,
        gradeDisplay,
        submissionType,
        dueDate,
        availableFrom,
        availableUntil,
      };
      createAssignment(newAssignment);
    }
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);

  };

  return (
    <div id="wd-assignments-editor">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" value={assignmentName}
          onChange={(e) => setAssignmentName(e.target.value)} />
      </div>
      <div className="mb-3">
        <textarea className="form-control" id="wd-description" cols={30} rows={10} value={description}
          onChange={(e) => setDescription(e.target.value)}  ></textarea>
      </div>

      <div className="row align-items-start">
        <div className="col-auto pe-0">
          <label htmlFor="wd-points" className="form-label">Points</label>
        </div>
        <div className="col">
          <input type="number" className="form-control" id="wd-points" value={points}
            onChange={(e) => setPoints(e.target.value)} />
        </div>
      </div>
      <br />

      <div className="row align-items-start">
        <div className="col-auto pe-0">
          <label htmlFor="wd-group" className="form-label">Assignment Group</label>
        </div>
        <div className="col">
              <select className="form-select" id="wd-group" value={assignmentGroup}
                onChange={(e) => setAssignmentGroup(e.target.value)}>
                  <option value="ASSIGNMENT 1">ASSIGNMENT 1</option>
                  <option value="ASSIGNMENT 2">ASSIGNMENT 2</option>
                  <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                  <option value="ASSIGNMENT 3">ASSIGNMENT 3</option>
              </select>
          </div>
      </div>
      
      <br />

      <div className="row align-items-start">  {/* Using Bootstrap classes for alignment */}
        <div className="col-auto pe-0">  {/* 'pe-0' to ensure no padding on the right */}
          <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
        </div>
        <div className="col">
          <select className="form-select" id="wd-display-grade-as" value={gradeDisplay}
            onChange={(e) => setGradeDisplay(e.target.value)} >
            <option value="Point">Point</option>
            <option value="Percentage">Percentage</option>
          </select>
        </div>
      </div>

      <br />

      <div className="row align-items-start">
   
        <div className="col-auto pe-0">
          <label htmlFor="wd-submission-type" className="form-label me-2">Submission Type</label>
        </div>
        
        <div className="col" style={{
            border: '1px solid lightgrey',    // Solid border with a specific color
            padding: '10px',             // Padding around the content within the div
            borderRadius: '10px'         // Rounded corners for the border
        }}>
          <select className="form-select" id="wd-submission-type" value={submissionType}
            onChange={(e) => setSubmissionType(e.target.value)}>
            <option value="In Person">In Person</option>
            <option value="Online">Online</option>
          </select>
            <div className="mt-3">
              <label className="form-label">Online Entry Options</label>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="wd-text-entry" />
                <label className="form-check-label" htmlFor="wd-text-entry" >Text Entry</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="wd-website-url" defaultChecked />
                <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="wd-media-recordings" />
                <label className="form-check-label" htmlFor="wd-media-recordings">Media Recording</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="wd-student-annotation" />
                <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="wd-file-upload" />
                <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
              </div>
          </div>
        </div>
      </div>
     
     <br></br>

    <div className="row">
      <div className="col-auto text-end pe-2 align-self-start"> {/* Align label to the right */}
        <label htmlFor="wd-assign" className="form-label">Assign</label>
      </div>
      <div className="col" style={{
          border: '1px solid lightgrey',    // Solid border with a specific color
          padding: '10px',             // Padding around the content within the div
          borderRadius: '10px'         // Rounded corners for the border
      }}>
        <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
        <input type="text" id="wd-assign-to" className="form-control" value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)} />
        <div className="mt-3">
          <label htmlFor="wd-due-date" className="form-label">Due</label>
          <input type="date" id="wd-due-date" className="form-control" value={dueDate}
              onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div className="mt-3 d-flex justify-content-start">
          <div>
            <label htmlFor="wd-available-from" className="form-label">Available from</label>
            <input type="date" id="wd-available-from" className="form-control" value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)} />
          </div>
          <div className="ms-5"> {/* Margin to space out the 'Until' input */}
            <label htmlFor="wd-available-until" className="form-label">Until</label>
            <input type="date" id="wd-available-until" className="form-control" value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)} />
          </div>
        </div>
      </div>
    </div>

      <br />
      <hr/>

      <div className="row">
        <div className="col text-end">
          <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn btn-secondary me-2">
            Cancel
          </Link>
          <button onClick={handleSave} className="btn btn-danger">
            Save
          </button>
        </div>
      </div>


    </div>
  );
};
