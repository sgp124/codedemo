import * as React from 'react';
import { useState } from 'react';
import '../components/TimeApiComponentStyles.css';
interface UserInfoFormProps {
  onSubmit: (userInfo: { name: string; number: string; email: string; country: string; }) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit }) => {
    const [userInfo,setUserInfo] = useState<{ name: string; number: string; email: string; country: string; }>({
        name: '',
        number: '',
        email: '',
        country: '',
    });
    const [validationMessage, setValidationMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'number') {
        if (!/^\d*$/.test(value)) { // Simple check for numeric values
            setValidationMessage('Please enter a valid number');
        } else {
            setValidationMessage('');
        }
    }
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userInfo);
  };

  return (
    <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                    required  // Make field required
                />
            </div>
            <div className="form-group">
                <label>Number</label>
                <input
                    type="text"
                    name="number"
                    value={userInfo.number}
                    onChange={handleChange}
                    required  // Make field required
                    pattern="\d*"  // Ensure input is numeric
                />
                {validationMessage && <div className="validation-message">{validationMessage}</div>}
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    required  // Make field required
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"  // Simple email pattern
                />
            </div>
            <div className="form-group">
                <label>Country</label>
                <input
                    type="text"
                    name="country"
                    value={userInfo.country}
                    onChange={handleChange}
                    required  // Make field required
                />
            </div>
            <button type="submit" disabled={!userInfo.name || !userInfo.number || !userInfo.email || !userInfo.country}>
                Submit
            </button>
        </form>
    </div>
);


};

export default UserInfoForm;
