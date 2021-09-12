import { useState } from 'react';
import { User } from '@baselhack2021/interfaces/models';
import './LinkWristband.css';

interface Props {
    user: User;
    finished: () => void;
}

const LinkWristband: React.FC<Props> = ({ user, finished }) => {
    const [wristbandUuid, setWristbandUuid] = useState();

    return <div></div>;
};
