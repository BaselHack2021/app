import { IonButton, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonRouterOutlet, IonRow, IonToolbar } from '@ionic/react';

import './Verification.css';
import { ellipseOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { useState } from 'react';
import { Redirect, Route } from 'react-router';

const VerificationTab: React.FC = () => {
    const [steps, setSteps] = useState({
        scanRegistration: false,
        confirmAge: false,
        linkWristband: false,
    });

    const getIcon = (isDone: boolean) => {
        return isDone ? checkmarkCircleOutline : ellipseOutline;
    };

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
                        <span>Register</span>
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
                    <IonButton expand="block">Continue</IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default VerificationTab;
