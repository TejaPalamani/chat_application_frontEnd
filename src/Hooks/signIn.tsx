import React from 'react';
import Cookies from 'js-cookie';
import { useSetRecoilState } from 'recoil';
import { errorValue } from '../Recoil/commonState';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../constants/constants';

interface signInData {
  email: string;
  password: string;
}

const useSignInHook = () => {
  const setError = useSetRecoilState(errorValue);
  const navigate = useNavigate();
  const useSignInFunction = async (signInData: signInData) => {
    const userSigninObject = {
      email: signInData.email,
      password: signInData.password,
    };

    try {
      const responce = await fetch(`${backendUrl}/user/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userSigninObject),
      });

      if (responce.ok) {
        const userData = await responce.json();

        setError('');

        // set loding state here
        Cookies.set('token', userData.token, { expires: 7 });

        localStorage.setItem('user_id', userData.user_id);

        navigate('/', { replace: true });
      } else {
        const userData = await responce.json();

        setError(userData.mesg);
      }
    } catch (e: any) {
      console.log(`error :-${e.message}`);
    } finally {
      console.log('setLoding  later ');
    }
  };
  return { useSignInFunction };
};

export default useSignInHook;
