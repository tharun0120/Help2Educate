import React, { useEffect } from "react";

function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);
  return <div>Thank You for Logging in.</div>;
}

export default LoginSuccess;
