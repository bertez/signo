import React from 'react';

export default function MainWrapper({ children }) {
  return (
    <main className="main-wrapper">
      <header>
        <nav>header links...</nav>
        <h1>Signo</h1>
        <nav>Menu links</nav>
      </header>
      {children}
      <footer>
        <p>(c) Signo, 2019</p>
      </footer>
    </main>
  );
}
