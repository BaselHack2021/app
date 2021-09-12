import React, { useCallback } from 'react';
import { IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonRouterOutlet, IonRow, IonToolbar } from '@ionic/react';
import { ellipse, checkmarkCircle, ellipseOutline } from 'ionicons/icons';
import { useState } from 'react';
import { User } from '@baselhack2021/interfaces/models';
import RegisterUser from '../components/RegisterUser';
import PersonVerification from '../components/PersonVerification';
import LinkWristband from '../components/LinkWristband';
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

    const goNext = () => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        } else {
            setCurrentStep(0);
        }
    };

    const goBack = () => {
        if (currentStep !== 0) {
            setCurrentStep(currentStep - 1);
        }
    };

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
            {currentStep === 0 && <RegisterUser setUser={setUser} finishStep={goNext}></RegisterUser>}
            {currentStep === 1 && user && <PersonVerification user={user} finishStep={goNext} back={goBack}></PersonVerification>}
            {currentStep === 2 && user && <LinkWristband user={user} finishStep={goNext} back={goBack}></LinkWristband>}
        </IonPage>
    );
};

export default VerificationTab;
