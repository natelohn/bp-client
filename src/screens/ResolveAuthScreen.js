import { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Context as AuthContext } from "../context/AuthContext";
import { GET_USER_FROM_CONTEXT } from '../apollo/gql'


const ResolveAuthScreen = ({ navigation }) => {
    const { tryLocalSignIn } = useContext(AuthContext);
    const { loading, error, data } = useQuery(GET_USER_FROM_CONTEXT);

    useEffect(() => {
        if (!loading) {
            tryLocalSignIn(data, error);
        }
    }, [loading]);

    return null;
};

export default ResolveAuthScreen;