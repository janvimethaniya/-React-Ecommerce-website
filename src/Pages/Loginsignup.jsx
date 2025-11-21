
import React, { useState } from 'react';
import './css/loginsignup.css';

const Loginsignup = () => {
const [isSignIn, setIsSignIn] = useState(false);
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [agree, setAgree] = useState(false);
const [error, setError] = useState('');

const handleSubmit = (e) => {
e.preventDefault();
// Just a placeholder alert for simplicity
if (isSignIn) {
alert(`Logging in with ${email}`);
} else {
if (!agree) {
alert('You must agree to terms');
return;
}
alert(`Signing up with ${name}, ${email}`);
}
};

return ( <div className='loginsignup'> <div className='loginsignup-container'>
{/* Tabs */} <div className='tab-buttons'>
<button
className={!isSignIn ? 'active' : ''}
onClick={() => setIsSignIn(false)}
>
Sign Up </button>
<button
className={isSignIn ? 'active' : ''}
onClick={() => setIsSignIn(true)}
>
Sign In </button> </div>

```
    <h1>{isSignIn ? 'Welcome Back' : 'Create Account'}</h1>

    <form onSubmit={handleSubmit} className='loginsignup-form'>
      {!isSignIn && (
        <input
          type='text'
          placeholder='Your Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        type='email'
        placeholder='Email Address'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {!isSignIn && (
        <div className='loginsignup-agree'>
          <input
            type='checkbox'
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <p>I agree to the Terms & Conditions</p>
        </div>
      )}

      <button type='submit'>{isSignIn ? 'Log In' : 'Sign Up'}</button>
    </form>

    {error && <div className='auth-error'>{error}</div>}
  </div>
</div>

);
};

export default Loginsignup;
