import { signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase';

export default function useSignout() {
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const logOut = async () => {
        try {
            setLoading(true);
            let response = await signOut(auth);
            setError('');
            setLoading(false);

            return response.user;
        }
        catch (e) {
            setLoading(false);
            setError(e.message);
        }
    }

    return { error, loading, logOut }
}
