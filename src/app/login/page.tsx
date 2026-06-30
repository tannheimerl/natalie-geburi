import { Suspense } from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="wrap">
      <div className="masthead">
        <h1>Für Natalie</h1>
        <p>Diese Seite ist privat. Gib das Passwort ein, um sie zu öffnen.</p>
      </div>

      <div className="login-card">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>

      <footer>jederzeit einlösbar, kein Ablaufdatum</footer>
    </div>
  );
};

export default LoginPage;
