import React from "react";

function About() {
    return (
        <div className="main-body">
            <div className="page-header">
                <h1>About</h1>
            </div>

            <div className="about-section">
                <h2 className="about-title">What is OverWatch?</h2>
                <p className="about-text">
                    OverWatch is a roof inspection platform built for State Farm agents. 
                    Drone images of customer properties are analyzed by an AI model to detect 
                    roof damage — giving you fast, accurate reports without a physical inspection.
                </p>
            </div>

            <div className="about-section">
                <h2 className="about-title">How to use it</h2>
                <div className="about-steps">
                    <div className="about-step">
                        <div className="about-step-num">1</div>
                        <p>Go to <strong>Customers</strong> and search by name or email</p>
                    </div>
                    <div className="about-step">
                        <div className="about-step-num">2</div>
                        <p>Click a customer row to expand their properties</p>
                    </div>
                    <div className="about-step">
                        <div className="about-step-num">3</div>
                        <p>Select a property card to open the full damage report</p>
                    </div>
                    <div className="about-step">
                        <div className="about-step-num">4</div>
                        <p>Use the <strong>eye icon</strong> to toggle between original and AI-analyzed images</p>
                    </div>
                </div>
            </div>

            <div className="about-section">
                <h2 className="about-title">Understanding the report</h2>
                <div className="about-cards">
                    <div className="about-card">
                        <h3>Severity</h3>
                        <p>Rated 0–5:</p>
                        <ul className="about-severity-list">
                            <li><strong>0</strong> - No damage detected</li>
                            <li><strong>1</strong> - Mild damage, monitor over time</li>
                            <li><strong>2–3</strong> - Moderate damage, repairs recommended</li>
                            <li><strong>4–5</strong> - Severe damage, immediate attention required</li>
                        </ul>
                    </div>
                    <div className="about-card">
                        <h3>Damage type</h3>
                        <p>The AI classifies damage as wind, hail, or both based on the drone images.</p>
                    </div>
                    <div className="about-card">
                        <h3>Cost estimate</h3>
                        <p>Auto-generated based on damage area and current asphalt shingle costs. Use as a reference.</p>
                    </div>
                </div>
            </div>

            <div className="about-section">
                <h2 className="about-title">Support</h2>
                <p className="about-text">
                    For technical issues or questions about a specific report, contact your 
                    State Farm supervisor or reach out to the OverWatch development team.
                </p>
            </div>
        </div>
    );
}

export default About;