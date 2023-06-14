import { useNavigate, Link, useLocation } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { firebaseConfig } from './firebaseConfig.js';
import { useEffect, useState } from "react";

const HomeBanner = () => {
  initializeApp(firebaseConfig);
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname === '/login' ? true:false;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ isUserExist, setUserExist ] = useState(false);
  const [ isEmailUsed, setIsEmailUsed] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  

  const auth = getAuth();

  const validation = (fieldName, value) => {
    switch(fieldName) {
      case 'email':
        return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      case 'password':
        return value.length >= 6;
      default:
        break;
    }
  };

  const ctaClickHandler = (e) => {
    e.preventDefault();

    if(!validation('email', email) || !validation('password', password)){
      setEmailValid(validation('email', email));
      setPasswordValid(validation('password', password));
      return;
    }

    if(page){
      signInWithEmailAndPassword(auth, email, password)
      .then( auth => {
        if(auth){
          navigate('/dashboard');
        }
      })
      .catch( error => setUserExist(true));
      // user-not-found
    }else{
      createUserWithEmailAndPassword(auth, email, password)
      .then(
        auth => {
          if(auth){
            navigate('/dashboard');
          }
        })
        .catch( error => setIsEmailUsed(true));
    }
  };

  useEffect(()=>{
    setUserExist(false);
    setIsEmailUsed(false);
  },[location]);
  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const clickHandler = (e) => {
    e.preventDefault();
    navigate('/login');
  }
  
  return(

    <div className="home-banner">
      <div className="our-story">
        <h1 className="our-story-card-title" data-uia="hero-title">Unlimited movies, TV shows and more.</h1>
        <h2 className="our-story-card-subtitle" data-uia="our-story-card-subtitle">Watch anywhere. Cancel anytime.</h2>
        <p className="email-form-title">Ready to watch? Enter your email to create or restart your membership.</p>
        
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Email Address" />
          <button className="input-group-button bg-danger text-white" onClick={clickHandler}>Get Started</button>
        </div>
      </div>
      <div className="shadow"></div>
      <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"  alt=""></img>
    </div>
  )
}

export default HomeBanner;