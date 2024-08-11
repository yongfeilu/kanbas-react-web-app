import { useEffect, useState } from "react";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import * as client from "./client";

export default function  PeopleDetails({ fetchUsers }: { fetchUsers: () => void; }) {
    
    const navigate = useNavigate();
    const { id, uid } = useParams();
    const [user, setUser] = useState<any>({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [editing, setEditing] = useState(false);

    const saveUser = async () => {
        const [firstName, lastName] = name.split(" ");
        const updatedUser = { ...user, firstName, lastName, email, role };
        console.log("saveUser", updatedUser);
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditing(false);
        fetchUsers();
        navigate(`/Kanbas/Courses/${id}/People`);
    };

    const deleteUser = async (uid: string) => {
        await client.deleteUser(uid);
        fetchUsers();
        navigate(`/Kanbas/Courses/${id}/People`);
      };    

    const fetchUser = async () => {
        if (!uid) return;
        const user = await client.findUserById(uid);
        setUser(user);
        setName(`${user.firstName} ${user.lastName}`);
        setEmail(user.email);
        setRole(user.role);
    };

    useEffect(() => {
        if (uid) fetchUser();
    }, [uid]);

    if (!uid) return null;

    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <Link to={`/Kanbas/Courses/${id}/People`} className="btn position-fixed end-0 top-0 wd-close-details">
                <IoCloseSharp className="fs-1" /> </Link>
            <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />

            <div className="text-danger fs-4 wd-name"> 
                {!editing && (
                    <FaPencil onClick={() => setEditing(true)}
                        className="float-end fs-5 mt-2 wd-edit" /> )}
                    {editing && (
                        <FaCheck onClick={() => saveUser()}
                            className="float-end fs-5 mt-2 me-2 wd-save" /> )}
                    {!editing && (
                    <div className="wd-name"
                        onClick={() => setEditing(true)}>
                        {user.firstName} {user.lastName}</div>)}
                    {user && editing && (
                        <input className="form-control w-50 wd-edit-name"
                            defaultValue={`${user.firstName} ${user.lastName}`}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => {
                            if (e.key === "Enter") { saveUser(); }}}
                        />
                    )}
            </div>

            <b>Email:</b>
                {!editing ? (
                    <span className="wd-email"> {user.email} </span>
                ) : (
                    <input
                        type="email"
                        className="form-control w-75 wd-edit-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                saveUser();
                            }
                        }}
                    />
                )}
            <br />

            <b>Roles:</b>
                {!editing ? (
                    <span className="wd-roles"> {user.role} </span>
                ) : (
                    <select
                        className="form-select w-50 wd-edit-role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="STUDENT">Student</option>
                        <option value="TA">Assistant</option>
                        <option value="FACULTY">Faculty</option>
                    </select>
                )}
            <br />


            <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />

            <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />

            <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span> 
            <hr />
            <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
            <button onClick={() => navigate(`/Kanbas/Courses/${id}/People`)}
                className="btn btn-secondary float-start float-end me-2 wd-cancel" > Cancel </button>

        </div> 
    ); 
}