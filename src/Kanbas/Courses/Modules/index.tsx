import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from 'react-icons/bs';
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { setModules, addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import { Link } from "react-router-dom";


export default function Modules() {
    const { id } = useParams();
    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();
    const fetchModules = async () => {
      const fetchedModules = await client.findModulesForCourse(id as string);
      dispatch(setModules(fetchedModules));
    };
    useEffect(() => {
      fetchModules();
    }, []);

    useEffect(() => {
      console.log("Updated modules state:", modules);
    }, [modules]);

    const createModule = async (module: any) => {
      const newModule = await client.createModule(id as string, module);
      dispatch(addModule(newModule));
      fetchModules();
    };

    const removeModule = async (moduleId: string) => {
      await client.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    };

    const saveModule = async (module: any) => {
      const status = await client.updateModule(module);
      dispatch(updateModule(module));
    };  

    return (
      <div id="wd-modules">
        <ModulesControls setModuleName={setModuleName} moduleName={moduleName} 
          addModule={() => {
              console.log("addModule", moduleName, id);
              createModule({ name: moduleName, course: id });
              setModuleName("");
              fetchModules();
            }}
        /><br /><br /><br /><br />
        <ul id="wd-modules" className="list-group rounded-0">
          {modules
            .filter((module: any) => module.course === id)
            .map((module: any) => (
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                <Link to={`/Kanbas/Courses/${id}/modules/${module._id}`} className="text-white text-decoration-none">
                  {!module.editing && module.name}
                </Link>
                { module.editing && (
                  <input className="form-control w-50 d-inline-block" value={module.name}
                    onChange={(e) => saveModule({ ...module, name: e.target.value }) }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveModule({ ...module, editing: false });
                      }
                  }} />
                )}
                <ModuleControlButtons moduleId={module._id}
                  deleteModule={(moduleId) => { 
                    console.log("deleteModule", moduleId);
                    removeModule(moduleId); 
                  }}
                  editModule={(moduleId) => {
                      console.log("editModule", moduleId);
                      dispatch(editModule(moduleId));
                    }
                  }
                />
              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <li className="wd-lesson list-group-item p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      <LessonControlButtons />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

  );}
  