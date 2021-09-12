import React, { useCallback } from 'react';
import { IonButton, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonRouterOutlet, IonRow, IonToolbar } from '@ionic/react';
import { ellipse, checkmarkCircle, ellipseOutline } from 'ionicons/icons';
import { useState } from 'react';
import { User } from '@baselhack2021/interfaces/models';
import RegisterUser from '../components/RegisterUser';
import PersonVerification from '../components/PersonVerification';
import './Verification.css';

const VerificationTab: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const [user, setUser] = useState<User | undefined>(undefined);

    const getIcon = (pageNumber: number) => {
        if (pageNumber < currentStep) {
            return checkmarkCircle;
        } else if (pageNumber === currentStep) {
            return ellipse;
        } else {
            return ellipseOutline;
        }
    };

    const goNext = () => setCurrentStep(currentStep + 1);

    const updateUser = useCallback(
        (user: User) => {
            setUser(user);
            goNext();
        },
        [setUser, goNext]
    );

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonRow>
                        <IonCol class="verification--stepper-col">
                            <IonIcon icon={getIcon(0)} class="text-primary" size="large"></IonIcon>
                            <span className="verification--stepper-description">Register</span>
                        </IonCol>
                        <IonCol class="verification--stepper-col">
                            <IonIcon icon={getIcon(1)} class="text-primary" size="large"></IonIcon>
                            <span className="verification--stepper-description">Age check</span>
                        </IonCol>
                        <IonCol class="verification--stepper-col">
                            <IonIcon icon={getIcon(2)} class="text-primary" size="large"></IonIcon>
                            <span className="verification--stepper-description">Wristband</span>
                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="px-3">
                    {currentStep === 0 && <RegisterUser setUser={updateUser}></RegisterUser>}
                    {currentStep === 1 && user && <PersonVerification user={user} goNext={goNext}></PersonVerification>}
                    {currentStep === 2 && <span>Wristband</span>}
                </div>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButton expand="block" disabled>
                        Continue
                    </IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default VerificationTab;
