import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react'
import { auth } from '../firebase';

export default function useSignup() {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signUp = async (email, password) => {
        try {
            setLoading(true);
            let response = await createUserWithEmailAndPassword(auth, email, password);
            setLoading(false);
            setError('');

            return response.user;
        }
        catch(e) {
            setError(e.message);
            setLoading(false);
        }
    }
    return {error, loading, signUp}
}
