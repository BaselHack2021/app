import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { UUID_LENGTH } from './constants';

export const calculateAge = (birthdate: Date): number => {
    var ageDifMs = Date.now() - birthdate.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const padAmount = (amount: number | undefined) => {
    if (amount && isNaN(amount)) {
        return amount?.toFixed(2);
    }
};

export const scanQrCode = async (): Promise<string | null> => {
    const data = await BarcodeScanner.scan();
    if (data.text.length === UUID_LENGTH) {
        return data.text;
    }
    return null;
};
