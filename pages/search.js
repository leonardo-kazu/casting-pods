import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import React from 'react';
import Head from 'next/head';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,

    authDomain: process.env.FIREBASE_AUTHDOMAIN,

    databaseURL: process.env.FIREBASE_DATABASEURL,

    projectId: process.env.FIREBASE_PROJECTID,

    storageBucket: process.env.FIREBASE_STORAGEBUCKET,

    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,

    appId: process.env.FIREBASE_APPID,
  };
  const app = initializeApp(firebaseConfig);
  const query = context.query.search;
  const dbRef = ref(getDatabase(app));
  let object = {
    id: '',
    query: query,
  };
  await get(child(dbRef, `search/${query}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        object.id = snapshot.val().id;
      } else {
        object = {
          id: 'Not Found',
        };
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return { props: { object } };
}

export default function Home(props) {
  console.log(props);
  return (
    <React.Fragment>
      <Head>
        <title>Searching</title>
      </Head>
      <Navbar />
      <div id="Main Area" className={styles.container}>
        <h1 className={styles.header}>Resultados da pesquisa:</h1>
        <hr></hr>
        {props.object.id == 'Not Found' ? (
          <h2 className={styles.searchResult}>Not Found</h2>
        ) : (
          <Link href={`./podcast?id=${props.object.id}`}>
            <h2 className={styles.searchResult}>{props.object.query}</h2>
          </Link>
        )}
      </div>
    </React.Fragment>
  );
}
