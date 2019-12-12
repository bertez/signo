import React, { useContext, useEffect, useState } from 'react';
import { graphql, navigate } from 'gatsby';

import { CartContext } from '../provider/CartContext.jsx';

import Md from '../helpers/markdown.jsx';

export default function Projects({ data }) {
  const cartCtxt = useContext(CartContext);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (cartCtxt.cart.items.length === 0) {
      navigate('/tienda');
    }
  }, [cartCtxt.cart.items]);

  // Methods
  const handleFormSubmit = async e => {
    e.preventDefault();
    setError('');

    const MAX_SIZE = 10000000;

    const data = new FormData(e.target);

    const files = Array.from(data.entries()).filter(
      ([key, value]) => value instanceof Blob
    );

    if (files.some(([key, file]) => file.size > MAX_SIZE)) {
      setError(`Ningún fichero debe superar los ${MAX_SIZE / 1000000} Mb`);
      return;
    }

    data.append('cart', JSON.stringify(cartCtxt.cart.items));
    data.append('total', cartCtxt.getTotal() + cartCtxt.getShipping());

    try {
      setSending(true);
      const request = await fetch(
        `${process.env.GATSBY_BACKEND_SHOP}/shop/checkout`,
        {
          method: 'POST',
          mode: 'cors',
          body: data
        }
      );

      const response = await request.json();

      if (response.status === 'ok') {
        const { id, email } = response.data;
        console.log('redirect to checkout', response.data.id);
        cartCtxt.startPayment(id, email);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  //Data
  const requiredMaterialsProducts = cartCtxt.cart.items.filter(
    i => i.materials
  );

  const {
    page: { frontmatter }
  } = data;

  return (
    <article className="content content-services">
      <header className="ly-text-header">
        <h2>{frontmatter.title}</h2>
        <Md>{frontmatter.tagline}</Md>
      </header>

      <section>
        <form onSubmit={handleFormSubmit}>
          <fieldset>
            <label htmlFor="name">Nombre completo o Razón social</label>
            <input type="text" name="name" id="name" required />
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </fieldset>
          <fieldset>
            <label htmlFor="phone">Teléfono</label>
            <input type="phone" name="phone" id="phone" />
          </fieldset>
          <fieldset>
            <label htmlFor="address">Dirección</label>
            <input type="text" name="address" id="address" required />
          </fieldset>
          <fieldset>
            <label htmlFor="city">Ciudad</label>
            <input type="text" name="city" id="city" required />
          </fieldset>
          <fieldset>
            <label htmlFor="postalcode">Código postal</label>
            <input type="text" name="postalcode" id="postalcode" required />
          </fieldset>
          <fieldset>
            <label htmlFor="province">Provincia</label>
            <select name="province" id="province" required>
              <option value="">Selecciona...</option>
              <option value="lugo">Lugo</option>
              <option value="acoruña">A Coruña</option>
              <option value="ourense">Ourense</option>
              <option value="pontevedra">Pontevedra</option>
              <option value="asturias">Asturias</option>
              <option value="alava">Álava</option>
              <option value="albacete">Albacete</option>
              <option value="alicante">Alicante/Alacant</option>
              <option value="almeria">Almería</option>
              <option value="avila">Ávila</option>
              <option value="badajoz">Badajoz</option>
              <option value="barcelona">Barcelona</option>
              <option value="burgos">Burgos</option>
              <option value="caceres">Cáceres</option>
              <option value="cadiz">Cádiz</option>
              <option value="cantabria">Cantabria</option>
              <option value="castellon">Castellón/Castelló</option>
              <option value="ceuta">Ceuta</option>
              <option value="ciudadreal">Ciudad Real</option>
              <option value="cordoba">Córdoba</option>
              <option value="cuenca">Cuenca</option>
              <option value="girona">Girona</option>
              <option value="laspalmas">Las Palmas</option>
              <option value="granada">Granada</option>
              <option value="guadalajara">Guadalajara</option>
              <option value="guipuzcoa">Guipúzcoa</option>
              <option value="huelva">Huelva</option>
              <option value="huesca">Huesca</option>
              <option value="illesbalears">Illes Balears</option>
              <option value="jaen">Jaén</option>
              <option value="larioja">La Rioja</option>
              <option value="leon">León</option>
              <option value="lleida">Lleida</option>
              <option value="madrid">Madrid</option>
              <option value="malaga">Málaga</option>
              <option value="melilla">Melilla</option>
              <option value="murcia">Murcia</option>
              <option value="navarra">Navarra</option>
              <option value="palencia">Palencia</option>
              <option value="salamanca">Salamanca</option>
              <option value="segovia">Segovia</option>
              <option value="sevilla">Sevilla</option>
              <option value="soria">Soria</option>
              <option value="tarragona">Tarragona</option>
              <option value="santacruztenerife">Santa Cruz de Tenerife</option>
              <option value="teruel">Teruel</option>
              <option value="toledo">Toledo</option>
              <option value="valencia">Valencia/Valéncia</option>
              <option value="valladolid">Valladolid</option>
              <option value="vizcaya">Vizcaya</option>
              <option value="zamora">Zamora</option>
              <option value="zaragoza">Zaragoza</option>
            </select>
          </fieldset>

          {requiredMaterialsProducts.length > 0 && (
            <>
              <h3>Materiales necesarios</h3>

              <p>
                Los siguientes productos requieren que subas ficheros. Si
                necesitas subir varios ficheros comprímelos en un archivo ZIP o
                similar.
              </p>

              {requiredMaterialsProducts.map(item => (
                <fieldset key={item.sku}>
                  <h4>{item.name}</h4>
                  <label htmlFor={`material_${item.sku}`}>
                    {item.materials}
                  </label>
                  <input
                    type="file"
                    name={`material_${item.sku}`}
                    id={`material_${item.sku}`}
                    required
                  />

                  <label htmlFor={`notes_materials_${item.sku}`}>Notas:</label>
                  <input
                    type="text"
                    name={`notes_materials_${item.sku}`}
                    id={`notes_materials_${item.sku}`}
                  />
                </fieldset>
              ))}
            </>
          )}

          <button disabled={sending}>Finalizar y pagar</button>
          {sending && <p className="sending">Enviando...</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </section>
    </article>
  );
}

export const query = graphql`
  query($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        title
        tagline
      }
    }
  }
`;
