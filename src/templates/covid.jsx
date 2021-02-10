import React from 'react';

import SEO from '../components/SEO.jsx';
import Md from '../helpers/markdown.jsx';

export default function Covid() {
  return (
    <article className="content content-covid">
      <header className="ly-text-header">
        <h2>Especial proteccción COVID19</h2>

        <p>
          Elementos de protección y prevención relacionados con las nuevas
          medidas de seguridad provocadas por la pandemia de la COVID19
        </p>
      </header>
      <figure>
        <img src="/media/distancia.jpg" alt="Especial COVID19" />
      </figure>

      <section class="covid-download">
        <a href="/media/signo-covid.pdf">
          Descarga oferta de productos de protección
        </a>
      </section>

      <figure>
        <img src="/media/p1.jpg" alt="Especial COVID19" />
      </figure>
      <figure>
        <img src="/media/p2.jpg" alt="Especial COVID19" />
      </figure>
      <figure>
        <img src="/media/p3.jpg" alt="Especial COVID19" />
      </figure>
      <figure>
        <img src="/media/p4.jpg" alt="Especial COVID19" />
      </figure>
    </article>
  );
}
