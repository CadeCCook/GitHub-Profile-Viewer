import React from "react";
import { ProfileButton, GitHubButton } from "./CustomButton";

const UserCard = ({ user, compact = false }) => {
    return (
       <div className={`user-list ${compact ? 'compact' : ''}`}>
            <div key={user.id} className="user-profile">
                <img src={user.avatar_url} alt="User Avatar" width="100" />
                <h2>{user.login || "No Name Provided"}</h2>
                {user.bio && <p>{user.bio}</p>}

                {!compact && (
                    <>
                        <p>Public Repos: {user.public_repos}</p>
                        <p>Followers: {user.followers} | Following: {user.following}</p>
                    </>
                )}

                <div className='user-actions'>
                    <ProfileButton username={user.login} />
                    <GitHubButton url={user.html_url} />
                </div>  
            </div>
        </div>
    );
};

export default UserCard;