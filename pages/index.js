import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Casting Pods</title>
      </Head>
      <Navbar />
      <div id="Main Area" className={styles.container}>
        <h1 className={styles.header}>Podcasts Publicados</h1>
        <hr></hr>
        <div className={styles.grid}>
          <Link href="/podcast?id=873264" className={styles.card}>
            <Image
              src="/thumb1.jpeg"
              width={153}
              height={153}
              style={{ 'border-radius': '5px' }}
              alt="PodLes"
            ></Image>
            <p>PodLes</p>
            <span>Confira neste podcast as últimas novidadas da área de programação web</span>
          </Link>
          <Link href="/podcast?id=123984" className={styles.card}>
            <Image
              src="/thumb2.webp"
              width={153}
              height={153}
              style={{ 'border-radius': '5px' }}
              alt="PodZu"
            ></Image>
            <p>PodZu</p>
            <span>Olá! Bem-vindo ao podcast mais bem avaliado do Brasil.</span>
          </Link>
          <Link href="/podcast?id=234765" className={styles.card}>
            <Image
              src="/thumb3.jpg"
              width={153}
              height={153}
              style={{ 'border-radius': '5px' }}
              alt="PodJames"
            ></Image>
            <p>PodJames</p>
            <span>
              Hello my name is James, I'm new at this website. Just figuring out how to upload
              content
            </span>
          </Link>
          <Link href="/podcast?id=238495" className={styles.card}>
            <Image
              src="/thumb4.jpg"
              width={153}
              height={153}
              style={{ 'border-radius': '5px' }}
              alt="PoDiniz"
            ></Image>
            <p>PoDiniz</p>
            <span>Esse é um podcast de muita relevância para o cenário geopolítico atual.</span>
          </Link>
          <Link href="/podcast?id=487955" className={styles.card}>
            <Image
              src="/thumb5.jpg"
              width={153}
              height={153}
              style={{ 'border-radius': '5px' }}
              alt="Podcast Extravaganza"
            ></Image>
            <p>Podcast Extravaganza</p>
            <span>This is a test</span>
          </Link>
          <Link href="/podcast?id=654876" className={styles.card}>
            <Image
              src="/thumb6.jpg"
              width={153}
              height={153}
              style={{ 'border-radius': '5px' }}
              alt="PodZé"
            ></Image>
            <p>PodZé</p>
            <span>
              Fala gurizado do meu Brasil, confiram meu podcast que tá bão demais da conta.
            </span>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
