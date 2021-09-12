import { IonContent, IonFooter, IonToolbar, useIonToast } from '@ionic/react';
import { useState } from 'react';
import { BASE_URL, TOAST_DURATION } from '../constants';
import './LinkWristband.css';
import StepperProps from '../stepper-props';
import { scanQrCode } from '../utils';

interface Props extends StepperProps {
    festivalUserId: string;
}

const LinkWristband: React.FC<Props> = ({ festivalUserId, finishStep, back }) => {
    const [wristbandUuid, setWristbandUuid] = useState<string | undefined>(undefined);
    const [present] = useIonToast();

    const openBarcodeScanner = async () => {
        const uuidLink = await scanQrCode();
        if (uuidLink) {
            const splitResult = uuidLink.split('/');
            const uuid = splitResult[splitResult.length - 1];
            setWristbandUuid(uuid);
        } else {
            present('Invalid QR code', TOAST_DURATION);
        }
    };

    const linkWristband = () => {
        const body = {
            festivalUserId,
            qrCode: wristbandUuid,
        };

        fetch(`${BASE_URL}/qr-codes/link`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(() => {
                present('Wristband linked', TOAST_DURATION);
                finishStep();
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
