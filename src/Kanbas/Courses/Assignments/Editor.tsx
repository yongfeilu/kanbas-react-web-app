import React from 'react';

const AssignmentEditor: React.FC = () => {
  return (
    <div id="wd-assignments-editor">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" defaultValue="A1"/>
      </div>
      <div className="mb-3">
        <textarea className="form-control" id="wd-description" cols={30} rows={10} defaultValue={`The assignment is available online.\n Submit a link to the landing page of your project by the deadline specified in the course syllabus. Ensure that the landing page includes an overview of your project, key features, and any relevant documentation. This will help us understand the scope and functionality of your work. Additionally, include instructions on how to navigate your project and access its main components. If you have used any third-party libraries or tools, mention them along with their respective documentation links. Make sure your landing page is clear, concise, and professional, as it reflects your work quality.`} ></textarea>
      </div>

      <div className="row align-items-start">
        <div className="col-auto pe-0">
          <label htmlFor="wd-points" className="form-label">Points</label>
        </div>
        <div className="col">
          <input type="number" defaultValue={100} className="form-control" id="wd-points" />
        </div>
      </div>
      <br />

      <div className="row align-items-start">
        <div className="col-auto pe-0">
          <label htmlFor="wd-group" className="form-label">Assignment Group</label>
        </div>
        <div className="col">
              <select className="form-select" id="wd-group" defaultValue="ASSIGNMENTS">
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
          <select className="form-select" id="wd-display-grade-as" defaultValue="Percentage">
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
          <select className="form-select" id="wd-submission-type" defaultValue="Online">
            <option value="In Person">In Person</option>
            <option value="Online">Online</option>
          </select>
            <div className="mt-3">
              <label className="form-label">Online Entry Options</label>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="wd-text-entry" />
                <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
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
        <input type="text" id="wd-assign-to" className="form-control" defaultValue="Everyone" />
        <div className="mt-3">
          <label htmlFor="wd-due-date" className="form-label">Due</label>
          <input type="date" id="wd-due-date" className="form-control" defaultValue="2024-05-13" />
        </div>
        <div className="mt-3 d-flex justify-content-start">
          <div>
            <label htmlFor="wd-available-from" className="form-label">Available from</label>
            <input type="date" id="wd-available-from" className="form-control" defaultValue="2024-05-06" />
          </div>
          <div className="ms-5"> {/* Margin to space out the 'Until' input */}
            <label htmlFor="wd-available-until" className="form-label">Until</label>
            <input type="date" id="wd-available-until" className="form-control" defaultValue="2024-05-13" />
          </div>
        </div>
      </div>
    </div>

      <br />
      <hr/>

      <div className="row">
        <div className="col text-end"> {/* Ensures right alignment of buttons */}
          
          <button id="wd-btn-cancel" className="btn btn-secondary me-2" onClick={() => alert("Cancel button clicked!")} type="button">
            Cancel
          </button>
          <button id="wd-btn-save" className="btn btn-danger" onClick={() => alert("Save button clicked!")} type="button">
            Save
          </button>
        </div>
      </div>


    </div>
  );
};

export default AssignmentEditor;
