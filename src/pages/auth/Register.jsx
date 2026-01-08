import AuthLayout from "../../components/layouts/AuthLayout"
import { Toaster } from "react-hot-toast";
import RegisterForm from "../../components/auth/RegisterForm";

export default function Register() {
  return (
    <AuthLayout>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <RegisterForm />

    </AuthLayout>
  );
}
