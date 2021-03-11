import { useEffect } from 'react';
import { Auth } from 'aws-amplify'
import { navigate } from "../navigationRef";


const ResolveAuthScreen = () => {
    useEffect(() => {
        Auth.currentAuthenticatedUser()
        .then((user) => {
            // TODO: Add a check to see if the user has a profile yet
            // If not, send them to the settings screen and make them sign up.
            // If so, add it to the context and go to the mainflow
            const userHasProfile = false;
            if (userHasProfile) {
                navigate('mainFlow');
            } else {
                navigate('Settings', { signingUp: true })
            }
        })
        .catch((err) => {
            navigate('authFlow');
        });
    }, []);
    return null;
};

export default ResolveAuthScreen;