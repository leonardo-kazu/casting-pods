import styles from '../styles/PodcastContainer.module.css';

export default function PodcastContainer(props) {
  return (
    <div className={styles.area}>
      <h1 id="titulo" className={styles.titulo}>
        {props.titulo}
      </h1>
      <h2 id="autor" className={styles.autor}>
        {props.autor}
      </h2>
      <div id="mp3" className={styles.test}>
        {props.mp3}
      </div>
      <div id="descricao" className={styles.descricao}>
        {props.descricao}
      </div>
    </div>
  );
}
