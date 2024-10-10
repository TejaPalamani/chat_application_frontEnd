import { useRecoilState, useRecoilValue } from 'recoil';
import {
  authUser,
  messageByUser,
  selectedConversation,
  activeUsers,
} from '../Recoil/commonState';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

import { conversation } from '../Recoil/commonState';
import { backendUrl } from '../constants/constants';

export const socket = io(`${backendUrl}`, {
  query: { userID: localStorage.getItem('user_id') },
});

export const ConversationBox = () => {
  const userConversation = useRecoilValue(selectedConversation);
  const [userMessages, setUserMessages] = useRecoilState(conversation);

  const [sendingmesg, setSendingMessage] = useRecoilState(messageByUser);

  const [acticveUsersList, setActiveUserList] = useRecoilState(activeUsers);

  const token = Cookies.get('token');

  //getting conversation of user from server
  const getConversationfromServer = async () => {
    //to check this function we need to add some mesg first so pusing this
    try {
      const api = `${backendUrl}/user/conversation/allConversations/${userConversation?._id}`;
      console.log(api);

      const responce = await fetch(api, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (responce.ok) {
        const data = await responce.json();
        setUserMessages(data.data.messages);
        console.log(data.data);
      } else {
        const data = await responce.json();
        console.log(data.mesg);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    // console.log('userConversation', userConversation);
    const empty = Object.keys(userConversation).length;
    if (empty !== 0) {
      getConversationfromServer();
    }
  }, [userConversation]);

  //socket.io connection
  useEffect(() => {
    if (Object.keys(userConversation).length === 0) return;

    socket.on('connect', () =>
      console.log(`user with ${socket.id} is connected`)
    );

    socket.on('newMessage', (newMessages) => {
      console.log('triggering');
      setUserMessages([...userMessages, newMessages]);
    });

    socket.on('disconnect', () =>
      console.log(`user with ${socket.id} is disconnected`)
    );

    return () => {
      socket.off('newMessage');
    };
  }, [userConversation, userMessages]);

  //checking what to display
  function checkFunction() {
    const empty = Object.keys(userConversation).length;
    if (empty !== 0) {
      return <NotEmptyConveration />;
    } else {
      return emptyConversation();
    }
  }

  //actual converation model

  function emptyConversation() {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 text-gray-500">
        <svg
          className="w-16 h-16 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 10c.75 0 1.45.14 2.1.4m-2.1 2.1A4.978 4.978 0 0115 17v2a2 2 0 01-2 2H5l-3 3V5a2 2 0 012-2h3.5m7 0h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a4.978 4.978 0 01-4.9-4.5m0-2A4.978 4.978 0 0112 3"
          ></path>
        </svg>
        <h1 className="text-xl font-semibold">No Conversation Selected</h1>
        <p className="text-center mt-2">
          Please select a conversation to start chatting, or create a new one.
        </p>
      </div>
    );
  }

  return (
    <div className="w-[600px]  h-screen flex flex-col overflow-auto">
      {checkFunction()}
    </div>
  );
};

function NotEmptyConveration() {
  const chatContainerRef = useRef(null);
  const userConversation = useRecoilValue(selectedConversation);
  const [userMessages, setUserMessages] = useRecoilState(conversation);
  const [sendingmesg, setSendingMessage] = useRecoilState(messageByUser);
  const [trigger, setTrigger] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {
    //console.log('.................userconversation', userConversation);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [userConversation, userMessages]);

  //posting conversation to server
  const sendingMessageToServer = async () => {
    const sendingObject = {
      reciver: userConversation?._id,
      message: sendingmesg,
    };

    const api = `${backendUrl}/user/conversation/sendingMesg`;

    try {
      if (sendingmesg !== '') {
        const responce = await fetch(api, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(sendingObject),
        });

        const data = await responce.json();

        if (responce.ok) {
          //console.log(data.mesg);
          setSendingMessage('');
          setTrigger(!trigger);
        } else {
          // console.log(data.mesg);
        }
      }
    } catch (e: any) {
      console.log(e.message);
    }

    //console.log(sendingObject);
  };

  return (
    <>
      <div className="bg-blue-400  h-12  w-[100%] flex flex-row justify-between items-center bg-transparent">
        <img
          src={userConversation?.profile}
          className="rounded-full w-10 h-10 mr-2"
        />
        <h1 className="text-4xl font-semibold italic">
          {userConversation?.name}
        </h1>
      </div>

      <div
        className="chat-convesation overflow-y-auto h-full scroll-p-0 scrollbar-thin bg-white "
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/35/09/26/35092624aace413e6fa28e63f52d95ad.jpg')",
        }}
        ref={chatContainerRef}
      >
        {userMessages?.map((each, index) => (
          <IndiVidualMessage mesg={each} key={each?._id} />
        ))}
      </div>

      <div className=" bg-transparent w-full h-24  flex felx-row justify-center items-center">
        <textarea
          //type="text"
          placeholder="Your Message"
          cols={10}
          rows={40}
          value={sendingmesg}
          onChange={(e) => setSendingMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendingMessageToServer()}
          className="w-[80%] h-12 rounded-lg m-2 bg-white text-black"
        />
        <button
          type="button"
          className="text-white rounded-r-lg"
          onClick={sendingMessageToServer}
        >
          send
        </button>
      </div>
    </>
  );
}

function IndiVidualMessage({ mesg }) {
  //const loggedInUser = useRecoilValue(authUser);
  const messagefromMe =
    mesg.fromUser._id === localStorage.getItem('user_id') ? true : false;

  const imageToDisplay = messagefromMe
    ? mesg.fromUser.profile
    : mesg.toUser.profile;

  // console.log('mesg you are lookig for ', mesg);

  return (
    <>
      <div
        className={`flex flex-row my-4 ${
          messagefromMe ? 'justify-end' : 'justify-start'
        } items-center ${messagefromMe ? 'ml-auto' : 'mr-auto'}`}
      >
        <img
          src={imageToDisplay}
          className={`rounded-full w-10 h-10 mr-2 ${
            messagefromMe ? 'order-2' : 'order-1'
          }`}
        />
        <p
          className={`border-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-none max-w-[70%] p-2 text-black italic ${
            messagefromMe
              ? 'bg-gradient-to-r from-pink-300 to-pink-400 self-end text-right order-1 rounded-bl-lg rounded-br-none'
              : 'bg-gradient-to-r from-blue-300 to-blue-400 self-start text-left order-2 rounded-bl-none rounded-br-lg'
          } break-words`}
        >
          {mesg.message}
        </p>
      </div>
    </>
  );
}
