import admin from "firebase-admin";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { cert, getApps, ServiceAccount } from "firebase-admin/app";
import { initFirestore } from "@auth/firebase-adapter";

const cred = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

export const firestoreAuth = initFirestore({
    credential: cert(cred),
});

let firestore: Firestore;
const currentApps = getApps();

if (!currentApps.length) {
    const app = admin.initializeApp({
        credential: admin.credential.cert(cred as ServiceAccount),
    });
    firestore = getFirestore(app);
} else {
    const app = currentApps[0];
    firestore = getFirestore(app);
}

export { firestore };

export const getTotalPages = async (
    firestoreQuery: FirebaseFirestore.Query<
        FirebaseFirestore.DocumentData,
        FirebaseFirestore.DocumentData
    >,
    pageSize: number
) => {
    const queryCount = firestoreQuery.count();
    const countSnapshot = await queryCount.get();
    const countData = countSnapshot.data();
    const total = countData.count;
    const totalPages = Math.ceil(total / pageSize);
    return totalPages;
};
