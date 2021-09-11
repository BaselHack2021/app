import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonButton, useIonToast } from '@ionic/react';
import { BASE_URL } from '../constants';
import { User, Response } from '../../interfaces/models';
import './RegisterUser.css';

export const RegisterUser: React.FC<{ setUser: (user: User) => void }> = ({ setUser }) => {
    const [present] = useIonToast();

    const openBarcodeScanner = async () => {
        const data = await BarcodeScanner.scan();
        fetch(`${BASE_URL}/users/${data.text}`)
            .then((res) => res.json())
            .then((res: Response<User>) => {
                setUser({ ...res.data, birthdate: new Date(res.data.birthdate) });
            })
            .catch((_) => present('Could not get user', 3000));
    };

    return (
        <div>
            <IonButton onClick={openBarcodeScanner} class="mx-auto container px-10">
                Scan registered user
            </IonButton>
        </div>
    );
};

export default RegisterUser;
