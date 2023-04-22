import { login } from 'app/shared/reducers/authentication';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/config/store';

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [UserName, setuserName] = React.useState('');
    const [Password, setpassword] = React.useState('');
    const [UserNameMandatory, setuserNameMandatory] = React.useState(false);
    const [PasswordMandatory, setpasswordMandatory] = React.useState(false);
    const [PasswordValidation, setpasswordValidation] = React.useState(false);
    const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

    /**
     * Checker for password
     * @param str 
     * @returns 
     */
    const checkCases = str => {
        const isSpecialChars = str => /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
        const isUppercase = str => /^[A-Z]+$/.test(str);
        const isLowecase = str => /^[a-z]+$/.test(str);
        const minimumCharacters = 8;
        let SpecialChars, Uppercase, Lowecase;
        for (let i in str) {
            isSpecialChars(str[i]) ? SpecialChars = true : null;
            isUppercase(str[i]) ? Uppercase = true : null;
            isLowecase(str[i]) ? Lowecase = true : null;
        }
        return (SpecialChars && Uppercase && Lowecase && Password.length >= minimumCharacters) ? true : false;
    }

    /**
     * Login Function
     */
    const loginAction = () => {
        if (UserName === '') {
            setuserNameMandatory(true);
        } else {
            setuserNameMandatory(false);
        }
        if (Password === '') {
            setpasswordMandatory(true);
        } else {
            setpasswordMandatory(false);
            if (checkCases(Password)) {
                setpasswordValidation(false);
                handleLogin(UserName, Password);
                isAuthenticated ? navigate('/users-list') : null;
            } else {
                toast.error('Password should be minimum of 8 characters with at least 1 uppercase, 1 lowercase, and 1 special character!');
                setpasswordValidation(true);
            }
        }
    };

    const handleLogin = (username, password) => dispatch(login(username, password));




    return (
        <div className='loginPage form'>
            <div className='Login-Form'>
                <h1>Sign in</h1>
                <div className='control'>
                    <label htmlFor="username">User Name<span>*</span></label>
                    <input type={'text'} id="username" value={UserName} className={`${UserNameMandatory ? 'invalid' : ''}`} onChange={(e) => setuserName(e.target.value)} />
                    {UserNameMandatory &&
                        <small id="username-help">
                            Username is mandatory field.
                        </small>
                    }
                </div>

                <div className='control'>
                    <label htmlFor="username">Password<span>*</span></label>
                    <input type={'password'} id="password" value={Password} className={`${(PasswordMandatory || PasswordValidation) ? 'p-invalid' : ''}`} onChange={(e) => setpassword(e.target.value)} />
                    {PasswordMandatory &&
                        <small id="password-help">
                            Password is mandatory field.
                        </small>
                    }
                </div>
                <button onClick={loginAction}>Login</button>
            </div>
        </div>
    );
}

export default LoginPage;