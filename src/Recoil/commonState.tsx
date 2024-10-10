import { atom, selector } from 'recoil';

export const globalValue = atom<string>({
  key: 'initalValue',
  default: 'Teja hi',
});

export const errorValue = atom<string>({
  key: 'errorValue',
  default: '',
});

export const messageByUser = atom({
  key: 'messageByUser',
  default: '',
});

export const loading = atom<boolean>({
  key: 'loading',
  default: false,
});

export const allUserDetails = atom({
  key: 'allUserDetails',
  default: [],
});

export const selectedConversation = atom({
  key: 'selectedConversation',
  default: {},
});

interface Message {
  id: string;
  text: string;
  sender: string;
}

export const conversation = atom<Message[]>({
  key: 'conversation',
  default: [],
});

export const authUser = atom({
  key: 'authUser',
  default: localStorage.getItem('user_id') || null,
});

export const activeUsers = atom<any[]>({
  key: 'activeUsers',
  default: [],
});
