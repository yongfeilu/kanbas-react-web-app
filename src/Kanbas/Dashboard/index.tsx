export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (9)</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {/* Course 1 */}
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                href="#/Kanbas/Courses/1234/Home">
                                <img src="/images/reactjs.jpg" className="card-img-top" alt="React JS" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS1234 React JS</h5>
                                    <p className="card-text">Full Stack software developer</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    {/* Course 2 */}
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                href="#/Kanbas/Courses/1235/Home">
                                <img src="/images/dsmath.jpg" className="card-img-top" alt="Discrete Math" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS1235 Discrete Math</h5>
                                    <p className="card-text">Full Stack software developer</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    {/* Course 3 */}
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                href="#/Kanbas/Courses/122/Home">
                                <img src="/images/ML.jpg" className="card-img-top" alt="Machine Learning" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS122 Machine Learning</h5>
                                    <p className="card-text">Full Stack Software Developer Sequence</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    {/* Course 4 */}
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                href="#/Kanbas/Courses/5100/Home">
                                <img src="/images/os.jpg" className="card-img-top" alt="Operating System" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS5100 Operating System</h5>
                                    <p className="card-text">Full Stack software developer</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    {/* Course 5 */}
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                href="#/Kanbas/Courses/5200/Home">
                                <img src="/images/network.jpg" className="card-img-top" alt="Computer Networks" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS5200 Computer Networks</h5>
                                    <p className="card-text">Full Stack software developer</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    {/* Course 6 */}
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                href="#/Kanbas/Courses/5520/Home">
                                <img src="/images/searchingEngine.jpg" className="card-img-top" alt="Search Engine" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS5520 Search Engine</h5>
                                    <p className="card-text">Full Stack software developer</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    {/* Course 7 */}
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                href="#/Kanbas/Courses/6200/Home">
                                <img src="/images/nlp.jpg" className="card-img-top" alt="Natural Language Processing" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS6200 Natural Language Processing</h5>
                                    <p className="card-text">Full Stack software developer</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    {/* Course 8 */}
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                href="#/Kanbas/Courses/5500/Home">
                                <img src="/images/database.jpg" className="card-img-top" alt="Databases" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS5500 Databases</h5>
                                    <p className="card-text">Full Stack software developer</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    {/* Course 9 */}
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark"
                                href="#/Kanbas/Courses/6000/Home">
                                <img src="/images/dp.jpg" className="card-img-top" alt="Deep Learning" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS6000 Deep Learning</h5>
                                    <p className="card-text">Full Stack software developer</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
