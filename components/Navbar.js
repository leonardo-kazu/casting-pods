import Link from 'next/link';
import { useState } from 'react';
import {
  List,
  PersonCircle,
  ListUl,
  PersonLinesFill,
  HouseFill,
  GearFill,
  QuestionCircleFill,
  CloudArrowUpFill,
  EnvelopePlusFill,
} from 'react-bootstrap-icons';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  let [Show, setShow] = useState(false);

  const clickHandler = () => {
    let navMenu = document.getElementById('nav-menu');
    if (!Show) {
      setShow(!Show);
      navMenu.style.left = '0';
      navMenu.style.transition = '0.5s';
      navMenu.style.transitionTimingFunction = 'ease-in';
    } else {
      setShow(!Show);
      navMenu.style.left = '-17vw';
      navMenu.style.transition = '0.5';
      navMenu.style.transitionTimingFunction = 'ease-out';
    }
  };

  return (
    <div id="navbar" className={styles.navbar}>
      <div className={styles.grid}>
        <label id="menu" className={styles.menu} onClick={clickHandler}>
          <List className={styles.bi} />
        </label>
        <div id="searchbar" className={styles.searchbar}>
          <form action="./search">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Pesquisar"
              className={styles.search}
            />
          </form>
        </div>
        <div id="avatar" className={styles.avatar}>
          <PersonCircle className={styles.bi} />
        </div>
      </div>
      <div id="nav-menu" className={styles.navMenu}>
        <div className={styles.navMenuItens}>
          <Link href="/">
            <HouseFill />
            <p>Início</p>
          </Link>
          <Link href="/">
            <PersonLinesFill />
            <p>Seus Shows</p>
          </Link>
          <Link href="/">
            <ListUl />
            <p>Fila</p>
          </Link>
          <hr className={styles.hr} />
          <Link href="/">
            <GearFill />
            <p>Configurações</p>
          </Link>
          <Link href="/">
            <QuestionCircleFill />
            <p>Ajuda</p>
          </Link>
          <hr className={styles.hr} />
          <Link href="/upload">
            <CloudArrowUpFill />
            <p>Envie seu Podcast</p>
          </Link>
          <Link href="/">
            <EnvelopePlusFill />
            <p>Envie seu Feedback</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
