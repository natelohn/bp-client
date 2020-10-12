import { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Context as AuthContext } from "../context/AuthContext";
import { USER_ID_QUERY } from '../apollo/gql'


const ResolveAuthScreen = () => {
    const { tryLocalSignIn } = useContext(AuthContext);
    const { loading, error, data } = useQuery(USER_ID_QUERY);

    useEffect(() => {
        if (!loading) {
            tryLocalSignIn(data, error);
        }
    }, [loading]);

    return null;
};

export default ResolveAuthScreen;