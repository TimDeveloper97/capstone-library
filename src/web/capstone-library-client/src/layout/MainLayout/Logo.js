import React from "react";

export default function Logo({ user }) {
  return user ? (
    user.roles[0] === "ROLE_USER" && (
      <div className="logo-box">
        <a href="/" className="logo">
          <img src="/images/logoC.png" alt="logo" />
        </a>
      </div>
    )
  ) : (
    <div className="logo-box">
      <a href="/" className="logo">
        <img src="/images/logoC.png" alt="logo" />
      </a>
    </div>
  );
}
