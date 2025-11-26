import styles from "./MyGrid.module.css";
import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
import { Twitter } from "lucide-react";
export function MyGrid() {
  const flamengoCards = [
    {
      title: "imagens motivação",
      image: "https://picsum.photos/seed/picsum/200/300",
      description: "gerson mercenario ladrao, nota de 3 reais ",
    },
    {
      title: "imagens motivação",
      image: "https://picsum.photos/id/237/200/300",
      description: "A torcida do Mengão faz a diferença em todos os jogos.",
    },
    {
      title: "imagens motivação",
      image: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
      description: "Gabigol marca mais um gol decisivo na temporada.",
    },
    {
      title: "imagens motivação",
      image: "https://picsum.photos/200/300",
      description: "Casa cheia para mais uma noite de festa rubro-negra.",
    },
    {
      title: "imagens motivação",
      image: "https://picsum.photos/200",
      description: "Preparação intensa da equipe para os próximos desafios.",
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Clube de Regatas do Flamengo Maior do brasil</h1>
        <h2>Foco, Força e Jovem Fla</h2>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          {flamengoCards.map((card) => (
            <div className={styles.card} key={card.title}>
              <img src={card.image} alt={card.title} loading="lazy" />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <Facebook />
        <Instagram />
        <Twitter />
      </footer>
    </div>
  );
}




















































































































/*import styles from "./MyGrid.module.css";*/

/*export function MyGrid() {
  return (
    <div className={styles.container}>
      <header className={styles.header1}>Header 1</header>
      <header className={styles.header2}>Header 2</header>

      <aside className={styles.asideLeft}>Aside Esquerdo</aside>
      <aside className={styles.asideRight}>Aside Direito</aside>

      <main className={styles.main}>
        <div className={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div className={styles.card} key={num}>
              <h2>Card {num}</h2>
              <p>Descrição do Card {num}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>Rodapé</footer>
      <footer className={styles.footer2}>Rodapé 2</footer>
    </div>
  );
}*/































/*import styles from "./MyGrid.module.css";

export function MyGrid() {
  return (
    
    <div className={styles.container}>
      <header className={styles.header1} />
      <header className={styles.header2} />
      <aside className={styles.aside} />
      <div className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Card 1</h2>
            <p>This is the first card.</p>
          </div>
          <div className={styles.card}>
            <h2>Card 2</h2>
            <p>This is the second card.</p>
          </div>
          <div className={styles.card}>
            <h2>Card 3</h2>
            <p>This is the third card.</p>
          </div>
          <div className={styles.card}>
            <h2>Card 4</h2>
            <p>This is the fourth card.</p>
          </div>
          <div className={styles.card}>
            <h2>Card 5</h2>
            <p>This is the fifth card.</p>
          </div>
        </div>
      </div>
      <footer className={styles.footer} />
    </div>
  
  );
}*/
