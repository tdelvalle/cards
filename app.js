
// Url de la api
const apiUrl = 'https://jsonplaceholder.typicode.com/photos';

// Capturamos el elemento html donde se mostrara las tarjertas:
const cardsContainer = document.querySelector('.cards-container');
const gridContainer = document.createElement('div');
const cardFilter = document.getElementById('cardFilter');
let cardShow;

// funcion para obtener  mostrar las tartejas:
async function getDisplayCards(){

  try{
    const respuesta = await fetch(apiUrl);
    const data = await respuesta.json()

    // 
    cardShow = data.slice(0,12);

    gridContainer.classList.add('row','justify-content-center');

    cardShow.forEach((cards,index)=> {
      const card = document.createElement('div');
      card.classList.add('col-md-3','mb-3');
      card.innerHTML = `
      <div class="card card-p" data-index="${index}" >
          <img src="${cards.url}" alt="${cards.title}" class="card-img-top">
          <div class="card-body">
            <p class="card-text fw-bold">${cards.title}</p>
          </div>
      </div>
      `;
      gridContainer.appendChild(card)

       // Agregamos las opciones al select
       const option = document.createElement('option');
       option.value = index;
       option.text = cards.title;
       cardFilter.appendChild(option);
  })

    cardsContainer.appendChild(gridContainer)
  } catch (error){
    console.log('Hay un error en la api', error)
  }

}



// Llamamos la funcion:
getDisplayCards();


function filterCards() {
  const selectedIndex = cardFilter.value;
  
  if (selectedIndex === 'Elige una tarjeta...') {
    for (let i = 0; i < gridContainer.children.length; i++) {
      gridContainer.children[i].style.display = "block";
    }
  } else {
    for (let i = 0; i < gridContainer.children.length; i++) {
      if (i == selectedIndex) {
        gridContainer.children[i].style.display = "block";
      } else {
        gridContainer.children[i].style.display = "none";
      }
    }
  }
}

// Evento para el select
cardFilter.addEventListener('change', filterCards);