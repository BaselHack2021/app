import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonContent, useIonToast } from '@ionic/react';
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
        const data = await BarcodeScanner.scan();
        fetch(`${BASE_URL}/users/${data.text}`)
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
                <div className="mx-auto container px-10">
                    <button onClick={openBarcodeScanner} className="button-primary">
                        Scan registered user
                    </button>
                </div>
            </IonContent>
        </>
    );
};

export default RegisterUser;
