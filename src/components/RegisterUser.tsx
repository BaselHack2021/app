import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonButton } from '@ionic/react';
import { useState } from 'react';
import './RegisterUser.css';

export const RegisterUser: React.FC = () => {
    const [uuid, setUuid] = useState<string | undefined>();

    const openBarcodeScanner = async () => {
        const data = await BarcodeScanner.scan();
        setUuid(data.text);
    };

    return (
        <div>
            <span>{uuid}</span>
            <IonButton onClick={openBarcodeScanner}>Scan</IonButton>
        </div>
    );
};

export default RegisterUser;
