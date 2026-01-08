import AuthLayout from "../../components/layouts/AuthLayout"
import LoginForm from "../../components/auth/LoginForm";
import { Toaster } from "react-hot-toast";

export default function Login() {

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

      <LoginForm />

    </AuthLayout>

  );
}