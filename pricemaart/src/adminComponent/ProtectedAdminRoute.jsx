import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children, role }) => {
  const navigate = useNavigate();
  // const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (role) {


      if (role !== 'admin' && role !== 'testAdmin') {
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      }
    }
  }, [role, navigate]);



  if (role !== 'admin' && role !== 'testAdmin') {
    return (
      <div className="h-screen flex justify-center items-center">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-2xl">You are not authorized to access this page.</p>
          <p className="mt-4 text-lg">Redirecting to Home...</p>
        </div>
      </div>
    </div>
    );
  }

  return children;
};

export default ProtectedAdminRoute;
