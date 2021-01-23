import React from 'react';

const UserContext = React.createContext({
  id: '',
  name: '',
  token: '',
});

export { UserContext };
export default UserContext.Provider;
