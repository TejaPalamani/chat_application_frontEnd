import { useEffect } from 'react';

import { Sider } from '../Components/sider';
import { ConversationBox } from '../Components/conversationbox';
import '../index.css';

//i think here the intial connection need to be made on socket io
//we can manage the hook and pass the socket as result
//dont need to pass we can make the connection here and listen to the event here itself
//and mantain the state with new mesg
export const Home = () => {
  return (
    <div
      className=" w-auto  flex flex-row justify-center items-center bg-cover"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/564x/15/96/6c/15966cfd2da3fd68ade8de4fe8bf75f6.jpg')",
      }}
    >
      <Sider />
      <ConversationBox />
    </div>
  );
};
