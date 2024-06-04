import React, { useEffect } from 'react';
import { auth } from '../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth';

const authDetails = () => {

    const [authuser, setAuthUser] = useState(null);

    useEffect(() => {
        const listn = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null);
            }
        })
    }, [])

    return (
        <div>
            {authuser ? <p>Signed In</p> : <p>Signed Out</p>}
        </div>
    )
}

export default authDetails