import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { errorValue } from '../Recoil/commonState';
import { useNavigate } from 'react-router-dom';
import useSignInHook from '../Hooks/signIn';

export const SingIn: React.FC = () => {
  const [uname, setUname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showpass, setPass] = useState(false);
  const { useSignInFunction } = useSignInHook();

  const [error, setError] = useRecoilState(errorValue);

  const navigate = useNavigate();

  const handleInputSubmission = () => {
    const intialSiginData = {
      email,
      password,
    };
    useSignInFunction(intialSiginData);
  };

  return (
    <div
      className="flex flex-row justify-center items-center w-full h-screen  bg-black bg-cover"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/564x/15/96/6c/15966cfd2da3fd68ade8de4fe8bf75f6.jpg')",
      }}
    >
      <div className="signupForm w-80 mx-auto h-1/2 bg-white p-8 rounded-lg shadow-md ">
        <h1 className="text-black my-3 font-bold text-4xl">
          Real <span className="text-yellow-200 font-bold">Chat</span>
        </h1>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col justify-start items-start">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border-0 rounded-lg p-2 mt-1 bg-transparent border-black-100  text-gray-500"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="flex flex-col justify-start items-start ">
            <label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </label>
            <div className="flex flex-row justify-center items-center border-black-200">
              <input
                id="password"
                type={showpass ? 'text' : 'password'}
                value={password}
                placeholder="Enter your password"
                className="border-0 rounded-lg p-2 mt-1 bg-transparent outline-none text-gray-500"
                onChange={(event) => setPassword(event.target.value)}
              />
              <i onClick={() => setPass(!showpass)} className="cursor-pointer">
                show
              </i>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-3 mr-3 font-thin"
              onClick={handleInputSubmission}
            >
              Sign in
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-3 mr-3 font-thin"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </button>
          </div>

          {error.length !== 0 && <p className="text-red-500 ">{`*${error}`}</p>}
        </div>
      </div>
    </div>
  );
};
