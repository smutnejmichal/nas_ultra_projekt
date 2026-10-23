import "./OnAs.css";

export default function ONas() {
  return (
    <div className="page">
      <header className="header">
        <a href="/" className="logo">Moje stránka</a>
        <nav className="nav">
          <a href="/">Domů</a>
          <a href="/o-nas" aria-current="page">O nás</a>
          <a href="/kontakt">Kontakt</a>
        </nav>
      </header>

      <main className="main">
        <h1>O nás</h1>
        <p className="lead">
          Jsme malý tým, který dělá jednoduché věci pořádně. Žádné zbytečnosti,
          jen to, co opravdu funguje.
        </p>

        <section className="section">
          <h2>Co děláme</h2>
          <p>
            Navrhujeme a vyvíjíme webové aplikace pro menší firmy a živnostníky.
            Od prvního nápadu až po spuštění a následnou péči.
          </p>
        </section>

        <section className="section">
          <h2>Jak pracujeme</h2>
          <p>
            Vše si nejdřív probereme, pak ukážeme první verzi a postupně ji
            ladíme podle vaší zpětné vazby. Víte, v jaké fázi projekt je.
          </p>
        </section>

        <a href="/kontakt" className="button">Napište nám</a>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Moje stránka
      </footer>
    </div>
  );
}
