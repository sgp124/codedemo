import * as React from 'react';
import { useState } from 'react';
import UserInfoForm from '../../TimeIOQuiz/components/UserInfo'; 
import TimeApiComponents from '../../TimeIOQuiz/components/TimeDisplay';

const ParentComponent: React.FC = () => {
  const [userInfoSubmitted, setUserInfoSubmitted] = useState<boolean>(false);
  const [userInfo,setUserInfo] = useState<{ name: string; number: string; email: string; country: string; }>({
    name: '',
    number: '',
    email: '',
    country: '',
});
  const handleUserInfoSubmit = (userInfo: { name: string; number: string; email: string; country: string; }) => {
    setUserInfo(userInfo);
    setUserInfoSubmitted(true);
  };

  return (
    <div>
      {!userInfoSubmitted ? (
        <UserInfoForm onSubmit={handleUserInfoSubmit} />
      ) : (
        <TimeApiComponents userInfo={userInfo} /> // Ensure TimeApiComponents can accept and utilize `userInfo` prop
      )}
    </div>
  );
};

export default ParentComponent;
