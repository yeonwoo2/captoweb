import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            // Mock userData for demo
            setUserData({
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || 'User',
              plan: 'free',
              subscriptionStartDate: new Date(),
              captureUsage: {
                today: 0,
                total: 0,
                limit: 10
              }
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserData({
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || 'User',
            plan: 'free',
            subscriptionStartDate: new Date(),
            captureUsage: {
              today: 0,
              total: 0,
              limit: 10
            }
          });
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, setUserData, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
