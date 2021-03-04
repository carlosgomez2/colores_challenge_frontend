import { UserContext } from '../context/UserContext';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [value, setValue] = useState(null);

  return (
    <UserContext.Provider value={{ value, setValue }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
