import { IonContent, useIonToast } from '@ionic/react';
import { BASE_URL, TOAST_DURATION } from '../constants';
import { User, Response } from '@baselhack2021/interfaces/models';
import './RegisterUser.css';
import StepperProps from '../stepper-props';
import { scanQrCode } from '../utils';

interface Props extends StepperProps {
    setUser: (user: User) => void;
}

export const RegisterUser: React.FC<Props> = ({ setUser, finishStep }) => {
    const [present] = useIonToast();

    const openBarcodeScanner = async () => {
        const uuid = await scanQrCode();
        if (uuid) {
            fetch(`${BASE_URL}/users/${uuid}`)
                .then((res) => res.json())
                .then((res: Response<User>) => {
                    setUser({ ...res.data, birthdate: new Date(res.data.birthdate) });
                    finishStep();
                })
                .catch((_) => present('Could not get user', TOAST_DURATION));
        } else {
            present('Invalid QR code', TOAST_DURATION);
        }
    };

    return (
        <>
            <IonContent>
                <div className="flex items-center justify-center h-full">
                    <button onClick={openBarcodeScanner} className="button-primary">
                        Scan registered user
                    </button>
                </div>
            </IonContent>
        </>
    );
};

export default RegisterUser;
