import { Suspense } from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-dvh w-full flex flex-col justify-center items-center p-[24px]">
      <div className="w-full bg-card rounded-[12px] p-[24px] shadow-[0_24px_48px_-16px_theme(colors.shadow)]">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
};

export default LoginPage;
