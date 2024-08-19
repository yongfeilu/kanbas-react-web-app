import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import * as client from "./Courses/client";
import { useState, useEffect } from "react";
import store from "./store";
import { Provider } from "react-redux";

import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";

export default function Kanbas() {

    const [courses, setCourses] = useState<any[]>([]);
    const fetchCourses = async () => {
      const courses = await client.fetchAllCourses();
      setCourses(courses);
    };
    useEffect(() => {
      fetchCourses();
    }, []);  

    const [course, setCourse] = useState<any>({});

    useEffect(() => {
      console.log("Course state updated:", course);
    }, [course]);

    // const [currentUser, setCurrentUser] = useState<any>({}); 

    const addNewCourse = async (authorId: string) => {
      // Check if the course number is unique
      const isNumberUnique = !courses.some(existingCourse => existingCourse.number === course.number);
  
      if (!isNumberUnique) {
          alert("Course number must be unique. Please choose a different number.");
          return;
      }
  
      // Add a default image URL if the course doesn't have an image field
      const courseWithDefaultImage = {
          ...course,
          author: authorId,
          image: course.image || "network.jpg" // Replace with your actual default image URL
      };

      console.log("addNewCourse", courseWithDefaultImage);
      await client.createCourse(courseWithDefaultImage);
        
      // Refresh the course list and reset the form
      fetchCourses();
      setCourse({});
  };
  

    const deleteCourse = async (courseId: string) => {
        await client.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
    };

    const updateCourse = async () => {
        console.log("updateCourse from Kanbas", course);
        await client.updateCourse(course);
        setCourses(
          courses.map((c) => {
            if (c._id === course._id) {
              return course;
            } else {
              return c;
            }
          })
        );
        setCourse({});
    };

    const enrollUserinCourse = async (user: any) => {
        if (!course._id) {
            alert("Please select a course to enroll in.");
            return;
        }

        console.log("enrollUserinCourse from Kanbas",course._id, course);

        const updatedUser = {
            ...user,
            enrolledCourses: [...user.enrolledCourses, course._id],
        };
    
        try {
            const updatedData = await client.updateUser(updatedUser);
            console.log("User enrolled in course successfully:", updatedData);
            // Optionally, update the state if needed
            return updatedUser; // Return the updated user data
        } catch (error) {
            console.error("Failed to enroll user in course:", error);
            return null;
        }
    };

    const quitCourse = async (user: any, courseId: string) => {
      if (!courseId) {
          alert("Please select a course to enroll in.");
          return;
      }

      const updatedUser = {
          ...user,
          enrolledCourses: user.enrolledCourses.filter((id: string) => id !== courseId),
      };
  
      try {
          const updatedData = await client.updateUser(updatedUser);
          console.log("User quited course successfully:", updatedUser);
          // Optionally, update the state if needed
          return updatedUser; // Return the updated user data
      } catch (error) {
          console.error("Failed to enroll user in course:", error);
          return null;
      }
  };

    return (
      <Provider store={store}> 
          <div id="wd-kanbas">
              <KanbasNavigation />
              <div className="wd-main-content-offset p-3">
                  <Routes>
                      <Route path="/" element={<Navigate to="Dashboard" />} />
                      <Route path="/Account/*" element={<Account />} />
                      <Route path="Dashboard" element={
                        <ProtectedRoute>
                          <Dashboard
                              courses={courses}
                              course={course}
                              setCourse={setCourse}
                              addNewCourse={addNewCourse}
                              deleteCourse={deleteCourse}
                              updateCourse={updateCourse}
                              enrollUserinCourse={enrollUserinCourse}
                              quitCourse={quitCourse}
                          />
                        </ProtectedRoute>
                      } />
                      <Route path="Courses/:id/*" element={
                        <ProtectedRoute><Courses courses={courses}/></ProtectedRoute>
                      } />
                      <Route path="Calendar" element={<h1>Calendar</h1>} />
                      <Route path="Inbox" element={<h1>Inbox</h1>} />
                  </Routes>
              </div>
          </div>
      </Provider>
  );
}  
