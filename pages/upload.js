import Head from 'next/head';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set } from 'firebase/database';
import { getStorage, ref as ref_storage, uploadBytes } from 'firebase/storage';

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
  let ids = [];
  const app = initializeApp(firebaseConfig);
  const dbRef = ref(getDatabase(app));
  await get(child(dbRef, `ids`))
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        ids.push(childSnapshot.val());
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return { props: { ids, firebaseConfig } };
}

export default function Upload(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    let file = event.target.file.files[0];
    let isRand = false;
    let randomId = 0;

    while (!isRand) {
      isRand = true;
      randomId = parseInt(Math.random() * (1000000 - 99999) + 99999);
      props.ids.forEach((element) => {
        if (element == randomId) {
          isRand = false;
        }
      });
    }

    if (file == undefined || file.type != 'audio/mpeg') {
      alert('Insira um podcast no formato mp3!');
    } else {
      let blob = file.slice(0, file.size, 'audio/mpeg');
      file = new File([blob], `${randomId}.mp3`, { type: 'audio/mpeg' });

      const app = initializeApp(props.firebaseConfig);
      const storage = getStorage(app);
      const database = getDatabase(app);
      const storageRef = ref_storage(storage, file.name);

      let fileSent = uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Podcast sent');
      });
      let ids = set(ref(database, `ids/${props.ids.length}`), randomId);
      let podcasts = set(ref(database, `podcasts/${randomId}/content`), {
        author: event.target.author.value,
        name: event.target.title.value,
        desc: event.target.desc.value,
        linkmp3: file.name,
      });
      let search = set(ref(database, `search/` + event.target.title.value), {
        id: randomId,
      });
      await Promise.all([podcasts, ids, search, fileSent]).then(() => {
        console.log('all sent');
      });
    }
    // console.log(event.target.file.files[0].name);
  };
  return (
    <React.Fragment>
      <Head>
        <title>Upload</title>
      </Head>
      <Navbar></Navbar>
      <div className={styles.container}>
        <h1 className={styles.header}>Faça o upload do seu podcast! (em mp3)</h1>
        <hr></hr>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" name="title" placeholder="Titulo" required />
          <input type="text" name="author" placeholder="Autor" required />
          <textarea name="desc" rows="5" cols="20" defaultValue="Descrição"></textarea>
          <input type="file" name="file" className={styles.end} />
          <hr></hr>
          <input type="submit" value="Submit" className={styles.button} />
        </form>
      </div>
    </React.Fragment>
  );
}
