import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchProfile = async () => {
        try {
            const account = await client.profile();
            setProfile(account);
        } catch (err: any) {
            navigate("/Kanbas/Account/Signin");
        }
    };
    
    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kanbas/Account/Signin");
    };

    useEffect(() => { fetchProfile(); }, []);

    return (
        <div className="wd-profile-screen container mt-5 p-4 shadow rounded">
        <h1 className="text-center mb-4">Profile</h1>
        {profile && (
            <div className="d-flex flex-column gap-3">
                <input className="form-control wd-username" value={profile.username}
                        onChange={(e) => setProfile({ ...profile, username:  e.target.value })}/>
                <input className="form-control wd-password" value={profile.password}
                        onChange={(e) => setProfile({ ...profile, password:  e.target.value })}/>
                <input className="wd-firstname form-control" value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}/>
                <input className="wd-lastname form-control" value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName:  e.target.value })}/>
                <input className="wd-dob form-control" value={profile.dob}
                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date"/>
                <input className="wd-email form-control" value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}/>
                <select className="wd-role form-select" onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
                    <option value="USER">User</option>            <option value="ADMIN">Admin</option>
                    <option value="FACULTY">Faculty</option>      <option value="STUDENT">Student</option>
                </select>
                <button onClick={signout} className="wd-signout-btn btn btn-danger w-100 mt-3">
                    Sign out
                </button>
            </div>
        )}
        </div>
    );
}
