/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f9ff;
  color: #333;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color 0.3s, color 0.3s;
}

/* Layout e tamanhos reduzidos */
.screen {
  position: relative;
  max-width: 750px;
  min-width: 320px;
  margin: 80px auto 40px;
  background: white;
  padding: 30px 40px;
  border-radius: 15px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.12);
  z-index: 1;
}

.login-box h1 {
  font-size: 2.4rem;
  margin-bottom: 30px;
  color: #1d3557;
}

#login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

#login-form label {
  font-weight: 700;
  text-align: left;
  font-size: 1.1rem;
  color: #457b9d;
}

#login-form input {
  padding: 14px 20px;
  border: 2px solid #a8dadc;
  border-radius: 10px;
  font-size: 1.1rem;
  transition: border-color 0.3s;
  height: 44px;
}

#login-form input:focus {
  border-color: #1d3557;
  outline: none;
  background: #e6f0ff;
}

#login-form button {
  margin-top: 28px;
  padding: 14px;
  background: #1d3557;
  color: white;
  font-weight: 700;
  font-size: 1.3rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(29,53,87,0.5);
  transition: background-color 0.3s ease;
  height: 48px;
}

#login-form button:hover {
  background: #457b9d;
}

.error-message {
  color: #e63946;
  font-weight: 700;
  margin-top: 16px;
  min-height: 24px;
  font-size: 1rem;
}

/* Controle */
#controle-screen h1 {
  text-align: center;
  margin-bottom: 28px;
  color: #1d3557;
  font-size: 2.2rem;
}

.header-controle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  flex-wrap: wrap;
  gap: 12px;
}

#toggle-theme {
  padding: 8px 20px;
  background-color: #457b9d;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(69,123,157,0.7);
  transition: background-color 0.3s ease;
}

#toggle-theme:hover {
  background-color: #1d3557;
}

#last-update {
  text-align: center;
  margin-bottom: 18px;
  font-style: italic;
  color: #555;
  font-size: 1rem;
}

button#reset {
  display: block;
  margin: 0 auto 28px auto;
  padding: 14px 26px;
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(230,57,70,0.7);
  transition: background-color 0.3s ease;
  height: 46px;
}

button#reset:hover {
  background-color: #b71c1c;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  border-radius: 16px;
  overflow: hidden;
  color: #333; /* texto padrão claro */
}

th, td {
  padding: 16px 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
  color: inherit;
}

th {
  background-color: #457b9d;
  color: white;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.low-stock {
  background-color: #ffcccc !important;
}

.actions input[type="number"] {
  width: 90px;
  padding: 8px 10px;
  margin-right: 10px;
  font-size: 1rem;
  border: 2px solid #a8dadc;
  border-radius: 10px;
  transition: border-color 0.3s;
  height: 38px;
  text-align: center;
  color: #333;
  background-color: white;
}

.actions input[type="number"]:focus {
  border-color: #1d3557;
  outline: none;
  background: #e6f0ff;
}

.actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  transition: background-color 0.3s;
  height: 38px;
  line-height: 1;
}

.actions button:first-child {
  background-color: #2a9d8f;
  color: white;
  margin-right: 8px;
  box-shadow: 0 5px 14px rgba(42,157,143,0.45);
}

.actions button:first-child:hover {
  background-color: #21867a;
}

.actions button:last-child {
  background-color: #f4a261;
  color: white;
  box-shadow: 0 5px 14px rgba(244,162,97,0.45);
}

.actions button:last-child:hover {
  background-color: #c76f35;
}

/* Responsivo */

@media (max-width: 720px) {
  .screen {
    margin: 70px 15px;
    padding: 30px 25px;
  }

  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid #ccc;
    margin-bottom: 24px;
    border-radius: 12px;
    padding: 16px 18px;
    background: #fafafa;
  }

  td {
    border: none;
    padding-left: 58%;
    position: relative;
    text-align: left;
    font-size: 1.1rem;
  }

  td:before {
    position: absolute;
    top: 20px;
    left: 18px;
    width: 50%;
    white-space: nowrap;
    font-weight: 700;
    content: attr(data-label);
    color: #555;
  }

  .actions input[type="number"] {
    width: 100%;
    margin-bottom: 8px;
  }

  .actions button:last-child {
    margin-top: 6px;
  }
}

/* Modo escuro */

body.dark {
  background: #121212;
  color: #ddd;
}

body.dark .screen {
  background: #1f1f1f;
  box-shadow: 0 12px 32px rgba(255,255,255,0.1);
}

body.dark #login-form input,
body.dark .actions input[type="number"] {
  background: #333;
  border-color: #555;
  color: #ddd;
}

body.dark #login-form input:focus,
body.dark .actions input[type="number"]:focus {
  background: #444;
  border-color: #888;
}

/* CORREÇÃO para letras da tabela ficarem claras no modo escuro */
body.dark table {
  background-color: #2a2a2a;
  color: #eee;
  box-shadow: 0 0 20px rgba(255,255,255,0.15);
}

body.dark th {
  background-color: #457b9d;
  color: white;
}

body.dark td, body.dark th {
  border-color: #555;
  color: #eee;
}

body.dark .actions input[type="number"] {
  background-color: #444;
  color: #eee;
  border-color: #666;
}

body.dark .actions button:first-child {
  background-color: #21867a;
}

body.dark .actions button:first-child:hover {
  background-color: #176055;
}

body.dark .actions button:last-child {
  background-color: #c76f35;
}

body.dark .actions button:last-child:hover {
  background-color: #a25623;
}

body.dark button#reset {
  background-color: #b71c1c;
}

body.dark button#reset:hover {
  background-color: #7a0f0f;
}

body.dark #toggle-theme {
  background-color: #457b9d;
  color: white;
}

body.dark #toggle-theme:hover {
  background-color: #1d3557;
}

/* Botão WhatsApp no canto inferior direito */

.whatsapp-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #25d366;
  color: white;
  font-size: 28px;
  text-decoration: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(37, 211, 102, 0.7);
  transition: background-color 0.3s ease;
  z-index: 9999;
}

.whatsapp-btn:hover {
  background-color: #128c4a;
}
