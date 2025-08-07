"use client";

import React from "react";

export default function LoginPage() {
  const handleLogin = () => {
    const authUrl = `https://www.pinterest.com/oauth/?response_type=code&client_id=${
      process.env.NEXT_PUBLIC_PINTEREST_CLIENT_ID
    }&redirect_uri=${encodeURIComponent(
      process.env.NEXT_PUBLIC_REDIRECT_URI
    )}&scope=boards:read,pins:read&state=secure_random_state`;

    window.location.href = authUrl;
  };

  return (
    <div>
      <h1>Login with Pinterest</h1>
      <button onClick={handleLogin}>Login with Pinterest</button>
    </div>
  );
}
