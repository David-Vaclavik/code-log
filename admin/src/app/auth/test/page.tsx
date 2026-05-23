import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h1>Register Form</h1>
      <RegisterForm />

      <h1>Login Form</h1>
    </div>
  );
}
