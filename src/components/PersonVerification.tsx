import { IonButton } from '@ionic/react';
import { useState } from 'react';
import { User } from '../../interfaces/models';
import { BASE_URL } from '../constants';
import { calculateAge } from '../utils';
import './PersonVerification.css';

interface Props {
    user: User;
    goNext: () => void;
}

const PersonVerification: React.FC<Props> = ({ user, goNext }) => {
    const [esc, setEsc] = useState(0);

    const incEsc = () => {
        setEsc(esc + 1);
    };

    const verifyUser = () => {
        const json = JSON.stringify({ ...user, status: true });
        fetch(`${BASE_URL}/users/${user._id}`, {
            method: 'PUT',
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((_) => goNext());
    };

    const parseBirthdate = (birthdate: Date): string => {
        return birthdate.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <div className="py-3">
            <div className="flex flex-col items-start p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
                <div>
                    <p className="person-verification--info">
                        {user.firstName} {user.lastName}
                    </p>
                    <p className="person-verification--label">Name</p>
                </div>
                <div className="mt-4">
                    <p className="person-verification--info">{parseBirthdate(user.birthdate)}</p>
                    <p className="person-verification--label">Birthdate</p>
                </div>
                <div className="mt-4">
                    <p className="person-verification--info">{calculateAge(user.birthdate)}</p>
                    <p className="person-verification--label">Age</p>
                </div>
                <div className="mt-4" onClick={incEsc}>
                    {esc >= 10 ? (
                        <p className="person-verification--info esc-animation-text">{user.gender ? 'True' : 'False'}</p>
                    ) : (
                        <p className="person-verification--info">{user.gender ? 'Male' : 'Female'}</p>
                    )}
                    <p className="person-verification--label">Gender</p>
                </div>
            </div>
            <IonButton onClick={verifyUser} class="mt-4 w-100t">
                Verify user
            </IonButton>
        </div>
    );
};

export default PersonVerification;
