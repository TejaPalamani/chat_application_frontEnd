import { useRecoilState, useSetRecoilState } from 'recoil';
import { errorValue, loading } from '../Recoil/commonState';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../constants/constants';

interface signUpData {
  uname: string;
  password: string;
  cpass: string;
  gender: string;
  email: string;
}

const useSignupHook = () => {
  const navigate = useNavigate();
  const setError = useSetRecoilState(errorValue);
  const signUpFunction = async (initialData: signUpData) => {
    const compare = ValidationFunction(initialData.password, initialData.cpass);
    if (!compare) {
      setError('password mismatch!');
      return;
    }
    try {
      const userObject = {
        name: initialData.uname,
        password: initialData.password,
        gender: initialData.gender,
        email: initialData.email,
      };

      const responce = await fetch(`${backendUrl}/user/signup`, {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(userObject),
      });

      if (responce.status === 201) {
        setError('');
        const data = await responce.json();
        console.log(data.mesg);
        navigate('/signin');
      } else {
        setError('user Already exists');
      }
    } catch (e: any) {
      console.log(e.message);
    } finally {
      console.log('later setLoadin function here ');
    }
  };

  return { signUpFunction };
};

export default useSignupHook;

const ValidationFunction = (password: string, cpass: string): boolean => {
  return password === cpass;
};
