import { RegisterForm } from "@/components/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <RegisterForm />
    </div>
  );
}
