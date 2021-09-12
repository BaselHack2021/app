import { IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { useState } from 'react';
import AmountInput from '../components/AmountInput';
import { calculateAge, padAmount, scanQrCode } from '../utils';
import { BASE_URL, TOAST_DURATION } from '../constants';
import { User, Response } from '@baselhack2021/interfaces/models';
import './Payment.css';

const Tab1: React.FC = () => {
    const [userUuid, setUserUuid] = useState<string | undefined>(undefined);
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const [userAge, setUserAge] = useState<number | undefined>(undefined);
    const [user, setUser] = useState<User | undefined>(undefined);

    const [present] = useIonToast();

    const openBarcodeScanner = async () => {
        const uuid = await scanQrCode();
        if (uuid) {
            setUserUuid(uuid);
            loadUserAge(uuid);
        } else {
            present('Invalid QR code', TOAST_DURATION);
        }
    };

    const chargeUser = () => {
        // fetch
    };

    const loadUserAge = (uuid: string) => {
        fetch(`${BASE_URL}/festival-users/${uuid}`)
            .then((res) => res.json())
            .then((res: Response<User>) => {
                if (res.data) {
                    setUser(res.data);
                    setUserAge(calculateAge(new Date(res.data.birthdate)));
                }
            })
            .catch((_) => present('Could not calculate age', TOAST_DURATION));
    };

    const getAgeClass = (age: number | undefined): string => {
        if (age !== undefined) {
            if (age > 17) {
                return 'payment--age-bg-green';
            } else if (age > 15) {
                return 'payment--age-bg-yellow';
            } else {
                return 'payment--age-bg-red';
            }
        }
        return '';
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Payment</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen scrollY={false}>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Payment</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {!userUuid && (
                    <div className="flex items-center justify-center h-full">
                        <button onClick={openBarcodeScanner} className="button-primary">
                            Scan QR Code for payment
                        </button>
                    </div>
                )}
                <IonModal isOpen={!!userUuid} cssClass="my-custom-class">
                    <div>
                        <div className={'payment--age-check ' + getAgeClass(userAge)}>
                            <span className="text-lg font-semibold text-black">Age: {userAge}</span>
                        </div>
                        <AmountInput amountChanged={setAmount}></AmountInput>
                    </div>
                    <div className="w-full flex flex-col mb-10">
                        <button className="button-secondary mx-3" onClick={() => setUserUuid(undefined)}>
                            Cancel
                        </button>
                        <button className="button-primary m-3" disabled={!amount} onClick={chargeUser}>
                            Charger user {padAmount(amount) || ''}
                        </button>
                    </div>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
