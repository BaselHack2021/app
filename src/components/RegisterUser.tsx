import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonButton, IonContent, IonFooter, IonToolbar, useIonToast } from '@ionic/react';
import { BASE_URL } from '../constants';
import { User, Response } from '@baselhack2021/interfaces/models';
import './RegisterUser.css';
import StepperProps from '../stepper-props';

interface Props extends StepperProps {
    setUser: (user: User) => void;
}

export const RegisterUser: React.FC<Props> = ({ setUser, finishStep }) => {
    const [present] = useIonToast();

    const openBarcodeScanner = async () => {
        // const data = await BarcodeScanner.scan();
        fetch(`${BASE_URL}/users/613cf70c975c4abfb0ea5db9`)
            .then((res) => res.json())
            .then((res: Response<User>) => {
                setUser({ ...res.data, birthdate: new Date(res.data.birthdate) });
                finishStep();
            })
            .catch((_) => present('Could not get user', 3000));
    };

    return (
        <>
            <IonContent>
                <IonButton onClick={openBarcodeScanner} class="mx-auto container px-10">
                    Scan registered user
                </IonButton>
            </IonContent>
        </>
    );
};

export default RegisterUser;
