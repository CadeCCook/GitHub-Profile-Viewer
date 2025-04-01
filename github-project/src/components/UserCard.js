import React from "react";
import { ProfileButton, GitHubButton } from "./CustomButton";

const UserCard = ({ user, variant = "default" }) => {
    if(!user) {
        return <div className="user-list">Loading..</div>
    }

    const detailedStats = [
        { label: "Company:", value: user.company },
        { label: "Location:", value: user.location },
        { label: "Blog:", value: user.blog },
        { label: "Email:", value: user.email }
    ];
    
    return (
       <div className={`user-list user-card-${variant}`}>
            <div className="user-profile">
                <img src={user?.avatar_url || '/default-avatar.png'} alt="User Avatar" />
                <h3>{user.login || "No Name Provided"}</h3>
                
                <div className="user-info">
                    {user.bio && (
                        <div className="has-bio">
                            <p>{user.bio}</p>
                        </div>
                    )}

                    {variant !== "compact" && (
                        <div className="expanded">
                            {variant === "default" && (
                                <>
                                    <p>Public Repos: {user.public_repos}</p>
                                    <p>Followers: {user.followers} | Following: {user.following}</p>
                                </>
                            )}

                            {variant === "detailed" && (
                                <>
                                    <p>Public Repos: {user.public_repos}</p>
                                    <p>Followers: {user.followers} | Following: {user.following}</p>
                                    {detailedStats
                                        .filter(stat => stat.value)
                                        .map((stat, index) => (
                                            <p key={index}>{stat.label} {stat.value}</p>
                                        ))}
                                </>
                            )}
                        </div>
                    )}
                </div>
                
                <div className='user-actions'>
                    {variant !== "detailed" && (
                        <ProfileButton username={user.login} />
                    )}
                    <GitHubButton url={user.html_url} />
                </div>  
            </div>
        </div>
    );
};

export default UserCard;