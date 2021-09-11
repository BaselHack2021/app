import React, { useCallback } from 'react';
import { IonButton, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonRouterOutlet, IonRow, IonToolbar } from '@ionic/react';
import './Verification.css';
import { ellipseOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { useState } from 'react';
import { Redirect, Route } from 'react-router';
import RegisterUser from '../components/RegisterUser';
import { User } from '../../interfaces/models';

const VerificationTab: React.FC = () => {
    const [steps, setSteps] = useState({
        scanRegistration: false,
        confirmAge: false,
        linkWristband: false,
    });

    const [user, setUser] = useState<User | undefined>(undefined);

    const getIcon = (isDone: boolean) => {
        return isDone ? checkmarkCircleOutline : ellipseOutline;
    };

    const updateUser = useCallback(
        (user: User) => {
            setUser(user);
            setSteps({ ...steps, scanRegistration: true });
        },
        [setUser, setSteps, steps]
    );

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonRow>
                        <IonCol class="verification--stepper-col">
                            <IonIcon icon={getIcon(steps.scanRegistration)} class="text-primary" size="large"></IonIcon>
                            <span className="verification--stepper-description">Register</span>
                        </IonCol>
                        <IonCol class="verification--stepper-col">
                            <IonIcon icon={getIcon(steps.confirmAge)} class="text-primary" size="large"></IonIcon>
                            <span className="verification--stepper-description">Age check</span>
                        </IonCol>
                        <IonCol class="verification--stepper-col">
                            <IonIcon icon={getIcon(steps.linkWristband)} class="text-primary" size="large"></IonIcon>
                            <span className="verification--stepper-description">Wristband</span>
                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRouterOutlet>
                    <Route exact path="/verification/register">
                        <RegisterUser setUser={updateUser}></RegisterUser>
                    </Route>
                    <Route exact path="/verification/age">
                        <span>Age</span>
                    </Route>
                    <Route exact path="/verification/wristband">
                        <span>Wristband</span>
                    </Route>
                    <Route exact path="/verification">
                        <Redirect to="/verification/register" />
                    </Route>
                </IonRouterOutlet>
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
