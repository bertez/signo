import React, { useState } from 'react';

export default function Budget({ service, product, description, closeBudget }) {
  const [inputs, setInputs] = useState({
    name: '',
    phone: '',
    email: '',
    comments: ''
  });
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    // TODO: actually do this
    console.log(inputs);
    setFinished(true);
    setTimeout(closeBudget, 2000);
  };

  return (
    <section className="ly-modal">
      <section className="modal-content">
        {finished ? (
          <p class="message">
            Gracias, en breve nos pondremos en contacto contigo.
          </p>
        ) : (
          <form onSubmit={handleFormSubmit} className="ly-form">
            <header>
              <h2>Pedir presupuesto</h2>
              <h3>{product}</h3>
            </header>
            <section className="fields">
              <fieldset>
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={inputs.name}
                  onChange={handleInputChange}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="phone">Teléfono:</label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  required
                  value={inputs.phone}
                  onChange={handleInputChange}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={inputs.email}
                  onChange={handleInputChange}
                />
                <span>opcional</span>
              </fieldset>
              <fieldset>
                <label htmlFor="comments">Comentarios:</label>
                <textarea
                  name="comments"
                  id="comments"
                  value={inputs.comments}
                  onChange={handleInputChange}
                ></textarea>
              </fieldset>

              <button type="submit">Enviar</button>
              <button onClick={closeBudget}>Cancelar</button>
            </section>
          </form>
        )}
      </section>
    </section>
  );
}
