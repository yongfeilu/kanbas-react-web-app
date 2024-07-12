import { BsGripVertical, BsPlus } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import { BiExport, BiImport } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";
import { CiFilter } from "react-icons/ci";

export default function Grades() {
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
                    <select className="form-select ps-4"  style={{ paddingLeft: '20px' }}>
                        <option value="" disabled selected>Search Students</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </div>
            </div>

            <div className="mb-2">
                <label className="form-label"><span>Assignment Names</span></label>
                <div className="d-flex align-items-center position-relative">
                    <CiSearch className="position-absolute" style={{ left: '5px', zIndex: 1 }} />
                    <select className="form-select ps-4"  style={{ paddingLeft: '20px' }}>
                        <option value="" disabled selected>Search Assignments</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
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
                        <th scope="col" style={{ fontWeight: 'normal' }}>A1 SETUP <br /><span>Out of 100</span></th>
                        <th scope="col" style={{ fontWeight: 'normal' }}>A2 HTML <br /><span>Out of 100</span></th>
                        <th scope="col" style={{ fontWeight: 'normal' }}>A3 CSS <br /><span>Out of 100</span></th>
                        <th scope="col" style={{ fontWeight: 'normal' }}>A4 BOOTSTRAP <br /><span>Out of 100</span></th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <th scope="row" className="text-danger">Jane Adams</th>
                        <td>100%</td>
                        <td>96.67%</td>
                        <td>92.18%</td>
                        <td>66.22%</td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-danger">Christina Allen</th>
                        <td>100%</td>
                        <td>96.67%</td>
                        <td>92.18%</td>
                        <td>66.22%</td>
                    </tr>

                    <tr>
                        <th scope="row" className="text-danger">Samreen Ansari</th>
                        <td>100%</td>
                        <td>96.67%</td>
                        <td>92.18%</td>
                        <td>66.22%</td>
                    </tr>
                </tbody>
            </table>
        </div>

       
    </div>
  );
}
