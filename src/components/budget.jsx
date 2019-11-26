import React, { useState } from 'react';

export default function Budget({
  service,
  product,
  description,
  template,
  closeBudget
}) {
  const API_ENDPOINT = 'https://api.signorotulacion.com/mail/budget';

  const [inputs, setInputs] = useState({
    name: '',
    phone: '',
    email: '',
    comment: template || ''
  });

  const [finished, setFinished] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    setError('');

    const payload = { service, product, description, ...inputs };

    try {
      const request = await fetch(API_ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (request.ok) {
        setFinished(true);
        setTimeout(closeBudget, 2000);
      } else {
        const response = await request.json();
        throw new Error(response.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section
      className="ly-modal"
      onClick={e => {
        if (e.target.matches('.ly-modal')) {
          closeBudget();
        }
      }}
    >
      <section className="modal-content">
        {finished ? (
          <p className="message">
            Gracias, en breve nos pondremos en contacto contigo.
          </p>
        ) : (
          <form onSubmit={handleFormSubmit} className="ly-form">
            <header>
              <h2>Presupuesto</h2>
              <h3>{product}</h3>
            </header>
            <section className="fields">
              <fieldset>
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  minLength="3"
                  maxLength="100"
                  required
                  value={inputs.name}
                  onChange={handleInputChange}
                />
              </fieldset>
              <fieldset className="line">
                <label htmlFor="phone">Teléfono:</label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  minLength="9"
                  maxLength="100"
                  required
                  value={inputs.phone}
                  onChange={handleInputChange}
                />
              </fieldset>
              <fieldset className="line end">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={inputs.email}
                  onChange={handleInputChange}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="comment">
                  Comentarios: {!template && <>(opcional)</>}
                </label>
                <textarea
                  name="comment"
                  id="comment"
                  maxLength="1000"
                  value={inputs.comment}
                  onChange={handleInputChange}
                ></textarea>
              </fieldset>

              <button type="submit">Enviar</button>
              <button onClick={closeBudget}>Cancelar</button>
            </section>
            <footer>
              {error && <p className="error">{error}</p>}

              <p>
                Al pulsar enviar aceptas las{' '}
                <a href="/nota-legal" target="_blank" rel="noopener noreferrer">
                  condiciones de servicio de Signo.
                </a>
              </p>
            </footer>
          </form>
        )}
      </section>
    </section>
  );
}
