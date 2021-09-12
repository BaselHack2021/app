import { IonContent, IonFooter, IonToolbar, useIonToast } from '@ionic/react';
import { useState } from 'react';
import { User, Response } from '@baselhack2021/interfaces/models';
import { BASE_URL, TOAST_DURATION } from '../constants';
import './LinkWristband.css';
import StepperProps from '../stepper-props';
import { scanQrCode } from '../utils';

interface Props extends StepperProps {
    user: User;
}

const LinkWristband: React.FC<Props> = ({ user, finishStep, back }) => {
    const [wristbandUuid, setWristbandUuid] = useState<string | undefined>(undefined);
    const [present] = useIonToast();

    const openBarcodeScanner = async () => {
        const uuid = await scanQrCode();
        if (uuid) {
            setWristbandUuid(uuid);
        } else {
            present('Invalid QR code', TOAST_DURATION);
        }
    };

    const linkWristband = () => {
        fetch(`${BASE_URL}/links`)
            .then((res) => res.json())
            .then((res: Response<User>) => {
                finishStep();
                present('Wristband linked', TOAST_DURATION);
            })
            .catch((_) => present('Link to wristband failed', TOAST_DURATION));
    };

    return (
        <>
            <IonContent>
                {!wristbandUuid && (
                    <div className="flex items-center justify-center h-full">
                        <button onClick={openBarcodeScanner} className="button-primary">
                            Scan wristband
                        </button>
                    </div>
                )}
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <div className="flex">
                        <button className="w-6/12 button-secondary" onClick={back}>
                            Back
                        </button>
                        <button className="w-6/12 button-primary" onClick={linkWristband} disabled={!wristbandUuid}>
                            Confirm link
                        </button>
                    </div>
                </IonToolbar>
            </IonFooter>
        </>
    );
};

export default LinkWristband;
