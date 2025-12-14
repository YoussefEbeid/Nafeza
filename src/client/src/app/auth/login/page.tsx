import { Suspense } from 'react';
import LoginForm from './LoginForm'; // Import the client component you just renamed

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm /> 
    </Suspense>
  );
}