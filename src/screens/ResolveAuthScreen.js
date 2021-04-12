import { useEffect } from 'react';
import { Auth } from 'aws-amplify'
import { navigate } from "../navigationRef";
import { getUser } from '../graphql/queries';
import API, { graphqlOperation } from '@aws-amplify/api';

const ResolveAuthScreen = () => {
    useEffect(() => {
        Auth.currentAuthenticatedUser()
        .then((user) => {
            const { phone_number } = user.attributes;
            console.log(phone_number);
            return API.graphql(graphqlOperation(getUser, { phone: phone_number }));
        })
        .then(({ data }) => {
            const bpUser =  data.getUser;
            if (bpUser) {
                // add user to the context
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