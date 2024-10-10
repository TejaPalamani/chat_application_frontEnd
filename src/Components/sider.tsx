import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import { activeUsers, selectedConversation } from '../Recoil/commonState';
import { allUserDetails } from '../Recoil/commonState';
import { loading } from '../Recoil/commonState';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { socket } from './conversationbox';
import { backendUrl } from '../constants/constants';

export const Sider = () => {
  const [isloading, setLoading] = useRecoilState(loading);
  const [userDetails, setUserDetails] = useRecoilState(allUserDetails);
  const [activeUsersList, setActiveUserList] = useRecoilState(activeUsers);
  const navigate = useNavigate();

  const active = false;

  async function getAlluserDetails() {
    const jwt = Cookies.get('token');

    const responce = await fetch(`${backendUrl}/user/allUserDetails`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (responce.ok) {
      const data = await responce.json();

      setUserDetails(data.data);
      setLoading(false);
    } else {
      const data = await responce.json();
      console.log(data.mesg);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (userDetails.length === 0) {
      getAlluserDetails();
    }

    //socket connection to listen to active users and to render them
    socket.on('activeUserDetails', (activeUsersArray) => {
      setActiveUserList(activeUsersArray);
    });

    console.log('...............................', activeUsersList);

    return () => {
      socket.off('activeUserDetails');
    };
  }, [userDetails, activeUsersList]); //

  return (
    <div className="w-[360px] h-screen bg-slate-50 text-black relative overflow-auto">
      {/* <div className="bg-slate-400 w-full h-10 flex items-center justify-center">
        <div className="bg-slate-400 w-3/4 h-auto border-2 rounded-md outline-0 flex items-center">
          <input
            type="search"
            className="bg-transparent border-0 rounded-md outline-0 text-black-400"
            placeholder="Search"
          />
          <i>icon</i>
        </div>
      </div> */}
      <ul>
        {userDetails?.map((each, index) => (
          <IndividualCard
            objectsArray={each}
            key={each?._id}
            active={activeUsersList?.includes(each?._id)}
          />
        ))}
      </ul>
      <button
        type="button"
        className="absolute left-0 bottom-0 rounded-md text-white bg-black ml-2 w-[90px] h-[30px]"
        onClick={() => {
          Cookies.remove('token'); // removing from cookie
          localStorage.removeItem('user_id'); // removing from local
          setUserDetails([]);
          navigate('/signin', { replace: true });
        }}
      >
        logout
      </button>
    </div>
  );
};

interface UserDetails {
  _id: string;
  name: string;
  gender: string;
  profile: string;
  userCreatedAt: string;
}

interface IndividualCardProps {
  data: UserDetails[];
}

const IndividualCard = ({ objectsArray, active }) => {
  const [userConversation, setUserConversation] =
    useRecoilState(selectedConversation);
  const { _id, name, gender, profile } = objectsArray;

  const conversationClicked = () => {
    //need to add function
    setUserConversation(objectsArray);
  };

  return (
    <li
      className={`rounded-2xl ${
        userConversation?._id === _id ? 'bg-blue-400' : 'bg-slate-800'
      } flex flex-row justify-between items-center cursor-pointer mb-2 transition-all text-white`}
      onClick={conversationClicked}
    >
      <div className="flex flex-row justify-start items-center p-4 ">
        <div className="relative">
          <img
            src={profile}
            alt={`${name}-profile`}
            className="rounded-full w-10 h-10"
          />
          <span
            className={`${
              active ? 'bg-green-400' : 'bg-gray-400'
            } w-4 h-4 rounded-full absolute top-0 right-0`}
          ></span>
        </div>
        <p className="ml-4">{name}</p>
      </div>

      <p className={`${active ? 'text-green-500' : 'text-gray-400'}`}>
        {active ? 'active' : 'inActive'}
      </p>
    </li>
  );
};
