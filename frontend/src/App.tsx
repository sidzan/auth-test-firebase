import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onClick = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(">>> userCredentials", userCredential);
        console.log(userCredential.user.uid);
        // Signed in
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        setError(error.message);
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };
  return (
    <div>
      <h2>Sign up</h2>
      <form
        onSubmit={onClick}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <label>Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" onClick={onClick}>
          Submit
        </button>
      </form>
      <div>{error && <div style={{ background: "red" }}>{error}</div>}</div>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onClick = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log({ userCredential });
        console.log(userCredential.user!.uid);
        // Signed in
        var user = userCredential.user;
        firebase
          .auth()
          .currentUser!.getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            fetch("http://localhost:9000/", {
              headers: {
                "Content-Type": "application/json",
                Authorization: idToken,
              },
              method: "POST",
              body: JSON.stringify({
                firstName: "Sijan",
                lastName: "Shrestha",
              }),
            });
            // Send token to your backend via HTTPS
            // ...
          })
          .catch(function (error) {
            // Handle error
          });

        // ...
      })
      .catch((error) => {
        console.log({ error });
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };
  return (
    <div>
      <h2>Login</h2>
      <form
        onSubmit={onClick}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <label>Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" onClick={onClick}>
          Submit
        </button>
      </form>
      <div>{error && <div style={{ background: "red" }}>{error}</div>}</div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <SignUp />
      <Login />
    </div>
  );
}

export default App;
