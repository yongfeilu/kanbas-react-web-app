import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import "./index.css";

export default function CoursesNavigation() {
   const { id } = useParams(); // Retrieve the current course's ID
   const location = useLocation(); // Retrieve the current pathname
   const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

   return (
      <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
         {links.map((link) => (
            <a key={link}
               id={`wd-course-${link.toLowerCase()}-link`}
               href={`#/Kanbas/Courses/${id}/${link}`}
               className={`list-group-item ${location.pathname.includes(link) ? 'active' : 'text-danger'} border-0`}>
               {link}
            </a>
         ))}
      </div>
   );
}
