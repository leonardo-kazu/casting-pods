import React from 'react';
import Navbar from '../components/Navbar';
import PodcastContainer from '../components/PodcastContainer';
import styles from '../styles/PodcastContainer.module.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';
import { getStorage, ref as ref_storage, getDownloadURL } from 'firebase/storage';
import Head from 'next/head';

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
  const podcastID = context.query.id;
  const dbRef = ref(getDatabase(app));
  const podcast = `podcasts/${podcastID}`;

  let object = null;
  await get(child(dbRef, podcast))
    .then((snapshot) => {
      if (snapshot.exists()) {
        object = snapshot.val().content;
      } else {
        object = {
          name: 'Uknown',
          author: 'Uknown',
          linkmp3: '',
          desc: 'Uknown',
        };
      }
    })
    .catch((error) => {
      console.log(error);
    });

  const storage = getStorage(app);
  if (object.linkmp3 != '') {
    await getDownloadURL(ref_storage(storage, object.linkmp3)).then((url) => {
      object.linkmp3 = url;
    });
  }
  return { props: { object } };
}

export default function Podcast(props) {
  let content = props.object;
  return (
    <React.Fragment>
      <Head>
        <title>{content.name}</title>
      </Head>
      <Navbar />
      <PodcastContainer
        titulo={content.name}
        autor={'De: ' + content.author}
        mp3={
          <audio className={styles.audio} controls>
            <source src={content.linkmp3} type="audio/mpeg"></source>
          </audio>
        }
        descricao={
          <p>
            <span className={styles.bold}>Descrição: </span>
            {content.desc}
          </p>
        }
      />
    </React.Fragment>
  );
}
