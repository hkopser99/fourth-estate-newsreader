import {
  useState, useRef, useEffect,
} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  getDatabase, ref, set, get,
} from 'firebase/database';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';
import Alert from './Alert';
import './ProfilePage.css';

function ProfilePage() {
  const { currentUser } = useCurrentUserContext();
  console.log('Current user object', currentUser);
  const [firstName, setFirstName] = useState(currentUser.firstName || '');
  const [lastName, setLastName] = useState(currentUser.lastName || '');
  const [username, setUsername] = useState(currentUser.username || '');
  const [usernameError, setUsernameError] = useState(false);
  const [alternativeEmail, setAlternativeEmail] = useState(currentUser.alternative || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [saving, setSaving] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [saveErrorMessage, setSaveErrorMessage] = useState('');
  const navigate = useNavigate();
  const debounceRef = useRef(null);

  const { userEmail } = useParams();
  console.log('user email', userEmail);

  const isFormValid = username.trim() && username.length >= 3
  && firstName.trim() && firstName.length >= 3
  && lastName.trim() && lastName.length >= 3
  && bio.trim() && bio.length >= 3;

  const validateFirstName = ((userFirstName) => {
    setFirstName(userFirstName);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      if (firstName.length >= 3) {
        setFirstNameError(false);
      } else {
        setFirstNameError(true);
      }
    }, 450);
  });

  const validateLastName = ((userLastName) => {
    setLastName(userLastName);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      if (userLastName.length >= 3) {
        setLastNameError(false);
      } else {
        setLastNameError(true);
      }
    }, 450);
  });

  const validateUsername = ((usernameEntered) => {
    setUsername(usernameEntered);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      if (usernameEntered.length >= 3) {
        setUsernameError(false);
      } else {
        setUsernameError(true);
      }
    }, 450);
  });

  const handleUserDataCheck = (userData) => {
    setFirstName(userData.firstName || '');
    setLastName(userData.lastName || '');
    setUsername(userData.username || '');
    setAlternativeEmail(userData.alternativeEmail || '');
    setBio(userData.bio || '');
  };

  useEffect(() => {
    const db = getDatabase();
    const userDBReference = `users/${currentUser.uid}`;
    get(ref(db, userDBReference)).then((snapshot) => {
      if (snapshot.exists()) {
        handleUserDataCheck(snapshot.val());
      } else {
        console.log('No current user data object');
      }
    });
  }, [currentUser.uid]);

  const saveInfo = (event) => {
    event.preventDefault();
    setSaving(true);
    setSaveErrorMessage('');
    console.log('Saving profile info now');
    const db = getDatabase();
    const userDBReference = `users/${currentUser.uid}`;
    set(ref(db, userDBReference), {
      firstName,
      lastName,
      username,
      alternativeEmail,
      bio,
    }).then(() => {
      setFirstName('');
      setLastName('');
      setAlternativeEmail('');
      setUsername('');
      setBio('');
      setFirstNameError(false);
      setLastNameError(false);
      setUsernameError(false);
      setSaving(false);
      setShowSuccessAlert(true);
      navigate('/');
    }).catch((error) => {
      console.error('Saving failed. Reason:', error);
      setSaving(false);
      setSaveErrorMessage(error);
      setShowSuccessAlert(false);
    });
  };

  return (
    <div className="profile-page-component">
      {currentUser.uid ? (
        <>
          <Alert visible={firstNameError} type="error">
            <p>Error: First name must be 3 or more characters long.</p>
          </Alert>
          <Alert visible={lastNameError} type="error">
            <p>Error: Last name must be 3 or more characters long.</p>
          </Alert>
          <Alert visible={usernameError} type="error">
            <p>Error: Username must be 3 or more characters long.</p>
          </Alert>
          <Alert visible={saveErrorMessage} type="error">
            <p>Error saving changes:</p>
            <p>{`${saveErrorMessage}`}</p>
            <p>Check your internet connection and try saving again!</p>
          </Alert>
          <Alert visible={showSuccessAlert} type="success">
            <p>Successfully saved!</p>
            <Link to="/">Return home</Link>
          </Alert>
          <form onSubmit={saveInfo}>
            <label htmlFor="firstName">
              First Name*:
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                required
                onChange={(event) => validateFirstName(event.target.value)}
              />
            </label>
            <label htmlFor="lastName">
              Last Name*:
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                required
                onChange={(event) => validateLastName(event.target.value)}
              />
            </label>
            <label htmlFor="username">
              Username*:
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                required
                onChange={(event) => validateUsername(event.target.value)}
              />
            </label>
            <label htmlFor="altEmail">
              Alternative Email:
              <input
                type="email"
                name="altEmail"
                id="altEmail"
                value={alternativeEmail}
                onChange={(event) => setAlternativeEmail(event.target.value)}
              />
            </label>
            <label htmlFor="bio">
              Bio:
              <input
                type="text"
                name="bio"
                id="bio"
                value={bio}
                required
                onChange={(event) => setBio(event.target.value)}
              />
            </label>
            <button type="submit" disabled={!isFormValid}>Save</button>
            {saving && <p>Saving changes</p>}
          </form>
        </>
      ) : <Link to="/login">Login or Signup</Link>}
    </div>
  );
}

export default ProfilePage;
