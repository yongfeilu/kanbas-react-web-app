import React from 'react';

const AssignmentEditor: React.FC = () => {
  return (
    <div id="wd-assignments-editor">
      <section>
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" defaultValue="A1 - ENV + HTML" />
        <br />
        <br />
        <textarea id="wd-description" cols={30} rows={10} defaultValue={`The assignment is available online. Submit a link to the landing page of your project by the deadline specified in the course syllabus. Ensure that the landing page includes an overview of your project, key features, and any relevant documentation. This will help us understand the scope and functionality of your work. Additionally, include instructions on how to navigate your project and access its main components. If you have used any third-party libraries or tools, mention them along with their respective documentation links. Make sure your landing page is clear, concise, and professional, as it reflects your work quality.`} />
      </section>
      <br />
      <section>
        <table>
          <tbody>

            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-points">Points</label>
              </td>
              <td>
                <input id="wd-points" defaultValue={100} />
              </td>
            </tr>

            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-group">Assignment Group</label>
              </td>
              <td>
                <select id="wd-group" defaultValue="ASSIGNMENTS">
                  <option value="ASSIGNMENT 1">ASSIGNMENT 1</option>
                  <option value="ASSIGNMENT 2">ASSIGNMENT 2</option>
                  <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                  <option value="ASSIGNMENT 3">ASSIGNMENT 3</option>
                </select>
              </td>
            </tr>

            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-display-grade-as">Display Grade as</label>
              </td>
              <td>
                <select id="wd-display-grade-as" defaultValue="Percentage">
                  <option value="Point">Point</option>
                  <option value="Percentage">Percentage</option>
                </select>
              </td>
            </tr>

            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-submission-type">Submission Type</label>
              </td>
              <td>
                <select id="wd-submission-type" defaultValue="Online">
                  <option value="In Person">In Person</option>
                  <option value="Online">Online</option>
                </select>
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <label>Online Entry Options</label>
                <br />
                <input type="checkbox" id="wd-text-entry" />
                <label htmlFor="wd-text-entry">Text Entry</label>
                <br />
                <input type="checkbox" id="wd-website-url" />
                <label htmlFor="wd-website-url">Website URL</label>
                <br />
                <input type="checkbox" id="wd-media-recordings" />
                <label htmlFor="wd-media-recordings">Media Recording</label>
                <br />
                <input type="checkbox" id="wd-student-annotation" />
                <label htmlFor="wd-student-annotation">Student Annotation</label>
                <br />
                <input type="checkbox" id="wd-file-upload" />
                <label htmlFor="wd-file-upload">File Uploads</label>
              </td>
            </tr>

            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-assign">Assign</label>
              </td>
              <td>
                <label htmlFor="wd-assign-to">Assign to</label>
                <br />
                <input id="wd-assign-to" defaultValue="Everyone" />
                <br />
                <br />
                <label htmlFor="wd-due-date">Due</label>
                <br />
                <input type="date" id="wd-due-date" defaultValue="2000-05-13" />
                <br />
                <br />
                <label htmlFor="wd-available-from">Available from</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label htmlFor="wd-available-until">Until</label>
                <br />
                <input type="date" id="wd-available-from" defaultValue="2000-01-21" />
                <input type="date" id="wd-available-until" defaultValue="2000-01-21" />
                <br />
                <br />
              </td>
            </tr>

            <tr>
              <td colSpan={2}>
                <hr />
              </td>
            </tr>

            <tr>
              <td></td>
              <td align="right" valign="top">
                <button id="wd-btn-save" onClick={() => alert("Save button clicked!")} type="button">
                  Save
                </button>
                <button id="wd-btn-cancel" onClick={() => alert("Cancel button clicked!")} type="button">
                  Cancel
                </button>
              </td>
            </tr>
            
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AssignmentEditor;
