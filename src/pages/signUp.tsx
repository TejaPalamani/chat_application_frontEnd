import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { errorValue } from '../Recoil/commonState';
import useSignupHook from '../Hooks/signUp';
import { useNavigate } from 'react-router-dom';

export const SignUp: React.FC = () => {
  const [uname, setUname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cpass, setCpass] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [error, setError] = useRecoilState(errorValue);
  const { signUpFunction } = useSignupHook();
  const navigate = useNavigate();

  const handleSubmission = (): void => {
    const intialData = {
      password,
      cpass,
      uname,
      email,
      gender,
    };

    //making backend call

    //add navigation function here later
    signUpFunction(intialData);
  };

  return (
    <div
      className="flex flex-row justify-center items-center w-full h-screen  bg-black bg-cover"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/564x/15/96/6c/15966cfd2da3fd68ade8de4fe8bf75f6.jpg')",
      }}
    >
      <div className="signupForm w-90  h-auto bg-white p-8 rounded-lg shadow-md ">
        <h1 className="text-black my-3 font-bold text-4xl">
          Real <span className="text-yellow-200 font-bold">Chat</span>
        </h1>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col justify-start items-start">
            <label htmlFor="userName" className="text-gray-700 font-medium">
              Name
            </label>
            <input
              id="userName"
              type="text"
              placeholder="Enter your name"
              className="border rounded-lg p-2 mt-1 bg-transparent text-gray-500"
              onChange={(event) => setUname(event.target.value)}
              value={uname}
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border rounded-lg p-2 mt-1 bg-transparent  text-gray-500"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="flex flex-col justify-start items-start">
            <label className="text-gray-700 font-medium">Gender</label>
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="male"
                  type="radio"
                  value="male"
                  name="gender"
                  className="mr-2 bg-white"
                  onChange={(event) => setGender(event.target.value)}
                />
                <label htmlFor="male" className="text-gray-700">
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="female"
                  type="radio"
                  value="female"
                  name="gender"
                  className="mr-2 bg-white"
                  onChange={(event) => setGender(event.target.value)}
                />
                <label htmlFor="female" className="text-gray-700">
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start">
            <label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Enter your password"
              className="border rounded-lg p-2 mt-1 bg-transparent  text-gray-500"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <label
              htmlFor="confirmPassword"
              className="text-gray-700 font-medium"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={cpass}
              placeholder="Confirm your password"
              onChange={(event) => setCpass(event.target.value)}
              className="border rounded-lg p-2 mt-1 bg-transparent  text-gray-500"
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-3 mr-3 font-thin"
              onClick={handleSubmission}
            >
              Register
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-3 mr-3 w-auto font-thin"
              onClick={() => navigate('/signin')}
            >
              Existing User <span className="text-red-500">?</span>
            </button>
          </div>
          {error.length !== 0 && <p className="text-red-500 ">{`*${error}`}</p>}
        </div>
      </div>
    </div>
  );
};
