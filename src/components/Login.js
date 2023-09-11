import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';
import Alert from './Alert';
import './Login.css';

function Login() {
  const { setCurrentUser, currentUser } = useCurrentUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [apiError, setAPIError] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        console.log(user);
        setCurrentUser(user);
        setIsSubmitting(false);
        setEmail('');
        setPassword('');
        setIsValid(false);
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode);
        setAPIError(errorMessage || 'Uknown Error');
        setShowErrorAlert(true);
        setEmail('');
        setPassword('');
        setIsSubmitting(false);
        setIsValid(true);
      });
  };

  return (
    <div>
      { !currentUser.uid ? (
        <div className="login-page-component">
          <h1>Login</h1>
          <Alert visible={!!showErrorAlert} type="error">
            <p>Error logging in:</p>
            <p>{apiError}</p>
            <p>Try typing in your email and password and submitting again.</p>
          </Alert>
          <form onSubmit={loginUser}>
            <label htmlFor="email">
              Email*
              <input type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label htmlFor="password">
              Password*
              <input type="password" name="password" id="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <button type="submit" disabled={!isValid || isSubmitting}>Login</button>
            {isSubmitting && <p>Logging in...</p>}
            <p>New to Fourth Estate?</p>
            <Link to="/signup">Sign Up</Link>
          </form>
        </div>
      ) : (
        <>
          <p>You are logged in!</p>
          <Link to="/">Read some news</Link>
        </>
      )}
    </div>
  );
}

export default Login;
