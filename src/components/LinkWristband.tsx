import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonButton, IonContent, IonFooter, IonToolbar, useIonToast } from '@ionic/react';
import { useState } from 'react';
import { User, Response } from '@baselhack2021/interfaces/models';
import { BASE_URL } from '../constants';
import './LinkWristband.css';
import StepperProps from '../stepper-props';

interface Props extends StepperProps {
    user: User;
}

const LinkWristband: React.FC<Props> = ({ user, finishStep, back }) => {
    const [wristbandUuid, setWristbandUuid] = useState<string | undefined>(undefined);
    const [present] = useIonToast();

    const openBarcodeScanner = async () => {
        const data = await BarcodeScanner.scan();
        setWristbandUuid(data.text);
    };

    const linkWristband = () => {
        fetch(`${BASE_URL}/links`)
            .then((res) => res.json())
            .then((res: Response<User>) => {
                finishStep();
                present('Wristband linked', 3000);
            })
            .catch((_) => present('Link to wristband failed', 3000));
    };

    return (
        <>
            <IonContent>
                {!wristbandUuid && (
                    <div className="mx-auto container px-10">
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
