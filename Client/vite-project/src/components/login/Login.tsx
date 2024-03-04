import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signOut,
  UserCredential,
} from "firebase/auth";
import firebaseApp from "./firebaseConfig";
import { authenticateUser } from "../../Redux/Actions/actions";
import "./Login.css";
import Register from "../register/Register";

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [registration, setRegistration] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        const userData = {
          uid: userFirebase.uid,
          email: userFirebase.email,
          providerId: userFirebase.providerData[0]?.providerId,
          displayName: userFirebase.displayName,
        };
        dispatch(authenticateUser(userData));
      } else {
        dispatch(authenticateUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      axios
        .post("http://localhost:3002/users/authenticate", user)
        .then((response) => {
          console.log("Información del usuario enviada al backend:", response);
        })
        .catch((error) => {
          console.error("Error al enviar información del usuario al backend:", error);
        });
    }
  }, [user]);

  const firebaseAuthentication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    try {
      if (!email || !password) {
        console.error("Correo electrónico y contraseña son obligatorios.");
        return;
      }

      if (registration) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error("Error durante la autenticación de Firebase:", error);
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
    } catch (error) {
      console.error("Error durante el inicio de sesión con Google:", error);
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error durante la desconexión:", error);
    }
  };

  return (
    <>
      <div className="userFirebase">
        <div className="padreFirebase">
          <h1>Welcome to Rentify!</h1>
          <form onSubmit={firebaseAuthentication}>
            <label>Email:</label>
            <input
              type="text"
              placeholder="myexample@gmail.com"
              className="cajaTexto"
              id="email"
            />
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="cajaTexto"
              id="password"
            />
            <button className="loginButton">
              {registration ? "" : "Log in"}
            </button>
          </form>
          <div className="estilos-google">
            {/* <p>
              {registration ? "Already have an account?" : ""}
              <button onClick={() => setRegistration(!registration)}>
                {registration ? "Log in" : ""}
              </button>
            </p> */}
          </div>
          <div className="card-body">
            {user ? (
              <p>If you want to disconnect, click on <strong>Log out</strong></p>
            ) : (
              <p>You can also log in with your <strong>Google account</strong></p>
            )}
            {!user ? (
              <button
                className="googleButton"
                type="button"
                onClick={handleGoogleLogin}
              >
                <img
                  className="estilo-profile"
                  src="https://res.cloudinary.com/dqh2illb5/image/upload/v1709152706/login/qledtqlcwqfmqlh9zhe4.png"
                  alt="Google logo"
                />
                <strong>Continue with Google</strong>
              </button>
            ) : (
              <div className="googleTime">
                {user.providerId === "password" && (
                  <button type="button" onClick={handleSignOut}>
                    Log out
                  </button>
                )}
                {user.providerId === "google.com" && (
                  <button
                    className="googleButton"
                    type="button"
                    onClick={handleSignOut}
                  >
                    <img
                      className="estilo-profile"
                      src="https://res.cloudinary.com/dqh2illb5/image/upload/v1709152706/login/qledtqlcwqfmqlh9zhe4.png"
                      alt="Google logo"
                    />
                    Log out
                  </button>
                )}
              </div>
            )}
            {user && user.providerId === "password" && (
              <p>You have successfully connected with the email: <b>{user.email}</b></p>
            )}
            {user && user.providerId === "google.com" && (
              <p>User connected: <b>{user.displayName}</b></p>
            )}
            <Link to="/register">
              <p>Don't have an account? Sign up!</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
