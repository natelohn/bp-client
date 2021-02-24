import { useEffect } from 'react';
import { Auth } from 'aws-amplify'
import { navigate } from "../navigationRef";


const ResolveAuthScreen = () => {
    useEffect(() => {
        Auth.currentAuthenticatedUser()
        .then((user) => {
            console.log('Fuck yeah! Authenticated!', user);
            navigate('mainFlow');
        })
        .catch((err) => {
            console.log('Fuck! Not authenticated...', err);
            navigate('authFlow');
        });
    }, []);
    return null;
};

export default ResolveAuthScreen;