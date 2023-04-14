import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, limit, addDoc } from 'firebase/firestore/lite';

const firebaseConfig  = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getAllData(name){
    const col = collection(db, name);
    const resCol = await getDocs(col);
    const resList = resCol.docs.map(x => x.data());

    return resList;
}

export async function getSpecificItem(name, id){
    const q = query(collection(db, name), where('id', '==', id), limit(1));
    const resCol = await getDocs(q);
    const resList = resCol.docs.map(x => x.data());
    
    return resList[0];
}

export async function getCategoryItems(id){
    const q1 = query(collection(db, 'categories'), where('id', '==', id), limit(1));
    const resCol1 = await getDocs(q1);
    const resList1 = resCol1.docs.map(x => x.data());
    const q2 = query(collection(db, 'itemList'), where('typeId', '==', resList1[0].id));
    const resCol2 = await getDocs(q2);
    const resList2 = resCol2.docs.map(x => x.data());
    
    return resList2;
}

export async function addNewOrder(newOrder){
    const orders = await addDoc(collection(db, 'orders'), newOrder);

    return orders;
}