import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function About() {
    return (
        <div className="about-page">
            <div className="about-container">
                <div className="about-content">
                    <h2>About GitHub Profile Viewer</h2>
                    <p>
                        Welcome to the GitHub Profile Viewer! Our application is designed to provide users with a seamless 
                        and intuitive way to explore GitHub profiles. Whether you're a developer, recruiter, or simply 
                        curious about someone's contributions to the open-source community, the GitHub Profile Viewer 
                        makes it easy to access and analyze key information about any GitHub user.
                    </p>
                    <h3>What is GitHub Profile Viewer?</h3>
                    <p>
                        GitHub Profile Viewer is a web-based tool that allows users to search for and view detailed 
                        information about GitHub profiles. By entering a GitHub username, you can quickly access 
                        information such as:
                    </p>
                    <ul>
                        <li>Public repositories and their details</li>
                        <li>Contribution history and activity</li>
                        <li>Followers and following statistics</li>
                        <li>Languages used in repositories</li>
                        <li>Profile bio and other public information</li>
                    </ul>
                    <h3>Why Use GitHub Profile Viewer?</h3>
                    <p>
                        GitHub Profile Viewer is perfect for:
                    </p>
                    <ul>
                        <li><strong>Developers:</strong> Quickly analyze your own or others' GitHub profiles to track progress and contributions.</li>
                        <li><strong>Recruiters:</strong> Evaluate potential candidates by reviewing their open-source contributions and activity.</li>
                        <li><strong>Open-Source Enthusiasts:</strong> Discover and explore the work of developers in the open-source community.</li>
                    </ul>
                    <h3>Features</h3>
                    <p>
                        Our application is packed with features to make your experience as smooth as possible:
                    </p>
                    <ul>
                        <li>Clean and user-friendly interface</li>
                        <li>Dark mode for comfortable viewing</li>
                        <li>Interactive graphs to visualize contributions</li>
                        <li>Quick access to repository details</li>
                        <li>Mobile-friendly design</li>
                    </ul>
                    <h3>Our Mission</h3>
                    <p>
                        At GitHub Profile Viewer, our mission is to empower developers and recruiters by providing 
                        a simple yet powerful tool to explore and analyze GitHub profiles. We believe in the power 
                        of open-source and aim to make it easier for everyone to connect with the global developer 
                        community.
                    </p>
                    <h3>Get Started</h3>
                    <p>
                        Ready to explore GitHub profiles? Simply enter a username in the search bar and start discovering 
                        the amazing work of developers around the world!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
