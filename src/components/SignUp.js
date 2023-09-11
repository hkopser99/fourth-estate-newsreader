import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';
import Alert from './Alert';
import './SignUp.css';

function SignUp() {
  const { setCurrentUser, currentUser } = useCurrentUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [apiError, setAPIError] = useState('');
  const [passwordConfError, setPasswordConfError] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounceRef = useRef(null);
  const navigate = useNavigate();

  const verifyPassword = (confirmedPassword) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      if (password === confirmedPassword) {
        setPasswordConfirm(confirmedPassword);
        setPasswordConfError(false);
        setAPIError(false);
        setShowErrorAlert(false);
        return true;
      }
      return false;
    }, 700);
  };

  const verifyAndSetPassword = (passwordConfirmString) => {
    setPasswordConfirm(passwordConfirmString);
    const verified = verifyPassword(passwordConfirmString);
    if (verified) {
      setPasswordConfError(false);
    } else {
      setPasswordConfError(true);
    }
  };

  const signUpUser = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        console.log(user);
        setCurrentUser(user);
        setIsSubmitting(false);
        setEmail('');
        setPassword('');
        setIsValid(false);
        navigate(`/profile/${user.email}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode);
        setAPIError(errorMessage || 'Uknown Error');
        setShowErrorAlert(true);
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setIsSubmitting(false);
        setIsValid(true);
      });
  };

  return (
    <div>
      { !currentUser.uid ? (
        <div className="signup-page-component">
          <h1>Sign Up</h1>
          <p>Please enter a valid email and a password to sign up.</p>
          <Alert visible={!!showErrorAlert} type="error">
            <p>Error logging in:</p>
            <p>{apiError}</p>
            <p>Try typing in your email and password and submitting again.</p>
          </Alert>
          <Alert visible={passwordConfError} type="error">
            <p>Password Match Error:</p>
            <p>Try confirming your password again to continue</p>
          </Alert>
          <form onSubmit={signUpUser}>
            <label htmlFor="email">
              Email*
              <input type="email" name="email" id="email" value={email} required onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label htmlFor="password">
              Password*
              <input type="password" name="password" id="password" value={password} required onChange={(event) => setPassword(event.target.value)} />
            </label>
            <label htmlFor="passwordConfirm">
              Confirm Password*
              <input type="password" name="passwordConfirm" id="passwordConfirm" value={passwordConfirm} required onChange={(event) => verifyAndSetPassword(event.target.value)} />
            </label>
            <button type="submit" disabled={!isValid || isSubmitting || passwordConfError}>Login</button>
            {isSubmitting && <p>Attempting signup</p>}
          </form>
        </div>
      ) : (
        <>
          <p>You are already signed up and logged in.</p>
          <Link to="/">Read some news</Link>
        </>
      )}
    </div>
  );
}

export default SignUp;
