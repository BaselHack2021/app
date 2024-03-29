import { IonIcon } from '@ionic/react';
import { backspace } from 'ionicons/icons';
import { useEffect, useState } from 'react';

interface Props {
    amountChanged: (amount: number) => void;
}

const AmountInput: React.FC<Props> = ({ amountChanged }) => {
    const [amount, setAmount] = useState('');
    const [displayTeapot, setDisplayTeapot] = useState(false);

    const typeNumber = (number: string) => {
        setAmount(`${amount}${number}`);
    };

    const deleteLast = () => {
        const newAmount = amount.substring(0, amount.length - 1);
        setAmount(newAmount);
    };

    useEffect(() => {
        const floatAmount = parseFloat(amount);
        amountChanged(floatAmount);
        if (floatAmount === 418) {
            setDisplayTeapot(true);
            setTimeout(() => setDisplayTeapot(false), 5000);
        }
    }, [amount, amountChanged]);

    return (
        <div className="app-container">
            {displayTeapot && (
                <div className="w-screen h-screen bg-black absolute top-0 left-0 z-10 flex justify-center items-center">
                    <span className="text-9xl">🫖</span>
                </div>
            )}
            <h3 className="text-xl font-semibold pb-5">Enter amount to charge</h3>
            <input type="text" disabled value={amount} placeholder="0.00"></input>
            <div className="grid grid-cols-3 gap-4">
                <div className="payment--number-input" onClick={() => typeNumber('7')}>
                    7
                </div>
                <div className="payment--number-input" onClick={() => typeNumber('8')}>
                    8
                </div>
                <div className="payment--number-input" onClick={() => typeNumber('9')}>
                    9
                </div>
                <div className="payment--number-input" onClick={() => typeNumber('4')}>
                    4
                </div>
                <div className="payment--number-input" onClick={() => typeNumber('5')}>
                    5
                </div>
                <div className="payment--number-input" onClick={() => typeNumber('6')}>
                    6
                </div>
                <div className="payment--number-input" onClick={() => typeNumber('1')}>
                    1
                </div>
                <div className="payment--number-input" onClick={() => typeNumber('2')}>
                    2
                </div>
                <div className="payment--number-input" onClick={() => typeNumber('3')}>
                    3
                </div>
                <div className="payment--number-input" onClick={() => typeNumber('.')}>
                    .
                </div>
                <div className="payment--number-input" onClick={() => typeNumber('0')}>
                    0
                </div>
                <div className="payment--number-input" onClick={deleteLast}>
                    <IonIcon icon={backspace}></IonIcon>
                </div>
            </div>
        </div>
    );
};

export default AmountInput;
