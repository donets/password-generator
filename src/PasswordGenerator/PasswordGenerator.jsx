import { useState } from 'react';
import './PasswordGenerator.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(12);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeUppercase, setIncludeUppercase] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);

    const generatePassword = () => {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        let characters = '';
        if (includeLowercase) characters += lowercase;
        if (includeUppercase) characters += uppercase;
        if (includeNumbers) characters += numbers;
        if (includeSymbols) characters += symbols;

        if (!characters.length) {
            return;
        }

        let newPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            newPassword += characters[randomIndex];
        }

        setPassword(newPassword);
    };

    const handleCopy = () => {
        if (!password) {
            return;
        }
        navigator.clipboard.writeText(password).then(() => {
            alert('Password copied to clipboard');
        });
    };

    const handleCheckboxChange = (setter, value) => {
        const options = [includeLowercase, includeUppercase, includeNumbers, includeSymbols];
        if (!value && options.filter(option => option).length === 1) {
            return;
        }
        setter(value);
    };

    return (
        <div className="password-generator">
            <div className="password-output">
                <input type="text" value={password} readOnly/>
                <button onClick={handleCopy} className="copy-button">
                    <FontAwesomeIcon icon={faCopy}/>
                </button>
            </div>
            <div className="password-settings">
                <div className="password-range">
                    <p>Character length {length}</p>
                    <input
                        type="range"
                        min="8"
                        max="20"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                    />
                </div>
                <label>
                    <input
                        type="checkbox"
                        checked={includeLowercase}
                        onChange={(e) => handleCheckboxChange(setIncludeLowercase, e.target.checked)}
                    />
                    Include Lowercase
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={includeUppercase}
                        onChange={(e) => handleCheckboxChange(setIncludeUppercase, e.target.checked)}
                    />
                    Include Uppercase
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={(e) => handleCheckboxChange(setIncludeNumbers, e.target.checked)}
                    />
                    Include Numbers
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={(e) => handleCheckboxChange(setIncludeSymbols, e.target.checked)}
                    />
                    Include Symbols
                </label>
            </div>
            <button className="generate-button" onClick={generatePassword}>Generate</button>
        </div>
    );
};

export default PasswordGenerator;
