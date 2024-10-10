import './index.css';

import { useRecoilState } from 'recoil';
import { Route, Routes } from 'react-router-dom';
import { globalValue } from './Recoil/commonState';
import { SignUp } from './pages/signUp';
import { SingIn } from './pages/signIn';
import { Home } from './pages/home';
import Cookies from 'js-cookie';

function App() {
  const [intial, setIntial] = useRecoilState<string>(globalValue); // for test purpose
  const token = Cookies.get('token');

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SingIn />} />
      <Route path="/" element={token ? <Home /> : <SingIn />} />
    </Routes>
  );
}

export default App;
