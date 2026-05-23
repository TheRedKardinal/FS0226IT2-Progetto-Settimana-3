/*
REGOLE
- Le risposte vanno scritte in JavaScript sotto questi commenti.
- Pattern fondamentale: stato -> render() -> eventi.
  Tutto cio' che vedi a schermo dipende dallo stato.
  Gli eventi modificano lo stato e poi chiamano render().
- Apri index.html nel browser. Apri la console (DevTools) per gli errori.
- Cerca su MDN solo i concetti dichiarati come "cerca tu":
  localStorage, Blob/URL.createObjectURL, FileReader.
  Tutto il resto e' stato visto in settimana.
- Niente AI per generare codice. Niente template scaricati.
*/


/* STATO
   In cima al file definisci poche variabili globali:
   - un array di oggetti come dato principale (es. libri, ricette, film, ...)
   - una variabile per il filtro corrente
   - una variabile per l'ordinamento corrente
   - una variabile per la stringa di ricerca corrente
*/

/* SCRIVI QUI LA TUA RISPOSTA */
let videogiochi = [
   {
      id: 0,
      name: 'God of War III',
      console: 'PlayStation',
      category: 'Azione e Avventura',
      isPlayed: true
   },
   {
      id: 1,
      name: 'MegaMan X4',
      console: 'Multipiattaforma',
      category: 'Azione e Avventura',
      isPlayed: true
   },
   {
      id: 2,
      name: 'Metal Gear Solid 3 - Snake Eaeter',
      console: 'PlayStation 2',
      category: 'Stealth',
      isPlayed: true
   },
   {
      id: 3,
      name: 'Monster Hunter World',
      console: 'Multipiattaforma',
      category: 'Gioco di Ruolo',
      isPlayed: true
   },
];



/* RENDER()
   Una sola funzione che ridipinge la lista. A ogni chiamata:
   1) parte dall'array completo,
   2) filtra,
   3) ordina,
   4) svuota il container DOM,
   5) ricrea gli elementi DOM per gli oggetti risultanti.
   Aggiorna anche conteggi e statistiche.
   Salva lo stato in localStorage in fondo a render() (cerca tu come funziona).
*/

/* SCRIVI QUI LA TUA RISPOSTA */
const renderLista = function () {
   const videogameList = document.querySelector('.lista');
   videogameList.innerHTML = '';

   // Dichiaro forEach 
   videogiochi.forEach(function (gioco) {
      // Creazione Card
      // Div Container
      const cardContainer = document.createElement('div');

      // Contenuto card - Scritte
      const cardText = document.createElement('div'); // Appeso
      const title = document.createElement('h4'); // Appeso
      const info = document.createElement('p'); // Appeso

      // Contenuto card - Bottoni
      const cardButtons = document.createElement('div'); // Appeso
      const badge = document.createElement('span'); // Appeso
      const playedStat = document.createElement('button'); // Appeso
      const modify = document.createElement('button'); // Appeso
      const delet = document.createElement('button'); // Appeso

      // Classe
      cardContainer.classList.add('card-gioco');

      // Proprietà da incollare
      title.textContent = gioco.name;
      info.textContent = gioco.console + ' - ' + gioco.category;
      modify.textContent = 'Modifica';
      delet.textContent = 'Elimina';

      // ID ai bottoni
      delet.dataset.id = gioco.id;
      modify.dataset.id = gioco.id;
      playedStat.dataset.id = gioco.id;
      // Appesa Div Button
      cardButtons.appendChild(badge);
      cardButtons.appendChild(playedStat);
      cardButtons.appendChild(modify);
      cardButtons.appendChild(delet);

      // Appesa Div Scritte
      cardText.appendChild(title);
      cardText.appendChild(info);
      // Appesa Div nei Div
      cardContainer.appendChild(cardText);
      cardContainer.appendChild(cardButtons);
      // Appesa Div alla Section
      videogameList.appendChild(cardContainer);
   });
}

renderLista();
/* FORM CON VALIDAZIONE
   addEventListener("submit") sul form.
   event.preventDefault().
   Leggi i valori con .value.trim().
   Se uno dei campi obbligatori e' vuoto, mostra errore e return.
   Altrimenti push allo stato, form.reset(), render().
   Id univoco con Date.now().
*/

/* SCRIVI QUI LA TUA RISPOSTA */
const addGames = document.querySelector('.form form');
// Blocco evento predefinito
addGames.addEventListener('submit', (e) => {
   e.preventDefault();
   // iniziamo a prendere i dati dal form
   const title = document.querySelector('#title').value.trim();
   const consoleValue = document.querySelector('#console').value.trim();
   const category = document.querySelector('#categories').value.trim();
   // Errore
   if (title === '' || consoleValue === '' || category === '') {
      alert('"Attenzione: compila tutti i campi prima di aggiungere un gioco!"');
      return;
   }
   // Bimbo nuovo
   const nuovoGioco = {
      id: Date.now(),
      name: title,
      console: consoleValue,
      category: category,
      isPlayed: false,
   };
   // Innesto bimbo nuovo e render
   videogiochi.push(nuovoGioco);
   renderLista();
   // Svuota form
   addGames.reset();
});

/* INTERAZIONI BASE — eliminare, modificare, contare
   - Elimina: filter per id, render(). Event delegation sul container.
   - Modifica in-place: button "Modifica". Al click il testo diventa <input>,
     si conferma con Invio o blur.
   - Conteggi dinamici dentro render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */
const modificaLista = document.querySelector('.lista');
// Intercetto bottone
modificaLista.addEventListener('click', (e) => {
   // Se il bottone che hai cliccato è "Elimina"?
   if (e.target.textContent === 'Elimina') {
      const gameToDelete = Number(e.target.dataset.id);
      videogiochi = videogiochi.filter((gioco) => {
         return gioco.id !== gameToDelete;
      })
      renderLista();
      // e se invce hai cliccato "Modifica"?
   } else if (e.target.textContent === 'Modifica') {
      const gameToModify = Number(e.target.dataset.id);
      const thisGame = videogiochi.find((gioco) => {
         return gioco.id = gameToModify;
      });
      // Localizzo card e titolo
      const cardCliccata = e.target.closest('.card-gioco');
      const titoloH4 = cardCliccata.querySelector('h4');
      // Bisogna creare un input volante che permetta di scrivere sul titolo
      const inputMage = document.createElement('input');
      // Il valore dell'input mago diventa il valore di thisGame (che in questa funzione equivale all'array videogiochi)
      inputMage.value = thisGame.name;
      titoloH4.replaceWith(inputMage);
   }
});

/* RICERCA, FILTRO, ORDINAMENTO
   - Ricerca live: <input> con event "input". Salva in stato e render().
   - Filtro: <select> con event "change". Salva in stato e render().
   - Ordinamento: due button (o select). Salva in stato e render().
   I tre si compongono dentro render() in fila.
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* NOTIFICHE TEMPORANEE
   Funzione notifica(testo) che imposta il testo del <div id="notifica">,
   lo mostra (display: block), poi dopo 3000ms (setTimeout) lo nasconde.
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* TEMA CHIARO/SCURO
   Un button che chiama document.body.classList.toggle("dark").
   In CSS scrivi le regole opposte (es. body.dark { background: #111; ... }).
*/

/* SCRIVI QUI LA TUA RISPOSTA */
const darkMode = document.querySelector('#darkModeTog');
const body = document.body;

darkMode.addEventListener('click', (e) => {
   document.body.classList.toggle('darkMode');
   if (body.classList.contains('darkMode')) {
      darkMode.textContent = 'Tema scuro';
   } else {
      darkMode.textContent = 'Tema chiaro';
   };
});

/* PERSISTENZA — localStorage (cerca tu su MDN)
   - In fondo a render(), salva lo stato:
       localStorage.setItem("dati", JSON.stringify(stato));
   - All'avvio, prima della prima render(), carica:
       const salvato = localStorage.getItem("dati");
       if (salvato) stato = JSON.parse(salvato);
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* RIORDINO ↑ ↓
   Due button su ogni elemento. Click su ↑ scambia con il precedente nell'array,
   ↓ con il successivo. Event delegation. Poi render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* ESPORTAZIONE / IMPORTAZIONE JSON (cerca tu su MDN)
   - Esporta: crea un Blob con JSON.stringify(stato), genera un URL con
     URL.createObjectURL e simula il click su un <a download>.
   - Importa: <input type="file"> + FileReader per leggere il contenuto come
     testo, JSON.parse, sostituisci lo stato, render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* STATISTICHE GRAFICHE
   Almeno due indicatori: contatori grandi e/o barre orizzontali
   (<div> con width: X% in base al dato). Aggiorna dentro render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* MULTI-VISTA — lista / card / tabella
   Una variabile globale "vista" che render() legge per decidere quale HTML
   produrre. Tre button cambiano "vista" e chiamano render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* CATEGORIE
   Aggiungi un campo categoria nello schema. Nel form un <select> per sceglierla.
   In render(), raggruppa con reduce in { categoria: [elementi] } e disegna un
   header per categoria con sotto la lista di quella categoria.
*/

/* SCRIVI QUI LA TUA RISPOSTA */


