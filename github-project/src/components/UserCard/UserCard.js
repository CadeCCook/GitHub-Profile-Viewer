import React from "react";
import { ProfileButton, GitHubButton } from "../CustomButton";
import styles from "./UserCard.module.css";
import classNames from "classnames";

const UserCard = ({ user, variant = "default" }) => {
    if (!user || typeof user !== 'object') {
        return <div className={styles.userList}>Invalid user data</div>;
    }

    const detailedStats = [
        { label: "Company:", value: user.company },
        { label: "Location:", value: user.location },
        { label: "Blog:", value: user.blog },
        { label: "Email:", value: user.email }
    ];

    return (
        <div className={classNames(styles.userCard, styles[`userCard-${variant}`])}>
            <div className={styles.userProfile}>
                <img src={user?.avatar_url || '/default-avatar.png'} alt="User Avatar" />
                <h3>{user.login || "No Name Provided"}</h3>

                <div className={styles.userInfo}>
                    {user.bio && (
                        <div className={styles.hasBio}>
                            <p>{user.bio}</p>
                        </div>
                    )}

                    {variant !== "compact" && (
                        <div className={styles.expanded}>
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
                                            <p key={index}>
                                                {stat.label} {typeof stat.value === "object" ? JSON.stringify(stat.value) : stat.value}
                                            </p>
                                        ))}
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.userActions}>
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