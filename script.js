let currentPageUrl ='https://swapi.dev/api/people/'

window.onload = async () =>{
    try{
      await loadCharacters(currentPageUrl);
    } catch(error) {
      console.log(error);
      alert('Erro ao carregar cards');

    }
    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')
    

    nextButton.addEventListener('click',loadNextPage)
    backButton.addEventListener('click',loadPreviousPage)



};

async function loadCharacters(url){
  const mainContent = document.getElementById('main-content')
  mainContent.innerHTML = '';  //vai limpar os resultados anteriores!

  try{
    const response = await fetch(url);
    const responseJson = await response.json();

    responseJson.results.forEach((character) => { //o forEach vai fazer um loop
      const card = document.createElement("div")//vai criar um elemento html é como se fosse criar uma div dentro do index
      card.style.backgroundImage =
      `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g,"")}.jpg')`
      card.className = "cards"

      const characterNameBG = document.createElement("div")
      characterNameBG.className = "character-name-bg"

      const characterName = document.createElement("span")    
      characterName.className = "character-name"
      characterName.innerText = `${character.name}`

      characterNameBG.appendChild(characterName) // coloca um elemento dengtro do outro!
      card.appendChild(characterNameBG)

      card.onclick = () => {
        const modal = document.getElementById("modal")
        modal.style.visibility = "visible"

        const modalContent = document.getElementById("modal-content")
        modalContent.innerHTML = ''

        const characterImage = document.createElement("div")
        characterImage.style.backgroundImage = 
        `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g,"")}.jpg')`
        characterImage.className = "character-image"

        const name = document.createElement("span")
        name.className = "character-details"
        name.innerText =`Nome: ${character.name}`


        const characterHeight = document.createElement("span")
        characterHeight.className = "character-details"
        characterHeight.innerText =`Altura: ${convertHeight(character.height)}`

        const mass = document.createElement("span")
        mass.className = "character-details"
        mass.innerText =`Peso: ${convertMass(character.mass)}`

        const eyecolor = document.createElement("span")
        eyecolor.className = "character-details"
        eyecolor.innerText =`Cor dos olhos: ${convertEyeColor(character.eye_color)}`

        const birthYear = document.createElement("span")
        birthYear.className = "character-details"
        birthYear.innerText =`Nascimento: ${convertBirthYear(character.birth_year)}`

        modalContent.appendChild(characterImage)
        modalContent.appendChild(name)
        modalContent.appendChild(characterHeight)
        modalContent.appendChild(mass)
        modalContent.appendChild(eyecolor)
        modalContent.appendChild(birthYear)





    }
        
       
      
      
      mainContent.appendChild(card)
     
    });
      


    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')
    

    nextButton.disabled = !responseJson.next 
    backButton.disabled = !responseJson.previous

    nextButton.style.visibility = responseJson.next? "visible" : "hidden"  
    backButton.style.visibility = responseJson.previous? "visible" : "hidden"


    currentPageUrl = url

  }catch (error){
    alert ('Erro ao carregar os personagens')
    console.log(error)
  }
}



async function loadPreviousPage(){
  if (!currentPageUrl) return;

  try{
    const response = await fetch(currentPageUrl)
    const responsejson = await response.json()

    await loadCharacters(responsejson.previous)

  }catch(error){
    console.log(error)
    alert('Erro ao carregar a página anterior')
}
}


async function loadNextPage() {
  if (!currentPageUrl) return;

  try{
    const response = await fetch(currentPageUrl)
    const responseJson = await response.json()

    await loadCharacters(responseJson.next)

  }catch(error){
    console.log(error)
    alert('Erro ao carregar a próxima página')
  }
}

function hideModal(){
  const modal = document.getElementById("modal")
  modal.style.visibility ="hidden"
}

function convertEyeColor(eyecolor){
  const  cores ={
    blue:"azul",
    brown:"castanho",
    green:"verde",
    yellow:"amarelo",
    black:"preto",
    pink:"rosa",
    red:"vermelho",
    orange:"laranja",
    hazel:"avela",
    unknown:"desconhecida"
  };

  return cores [eyecolor.toLowerCase()] || eyecolor;
}

function convertHeight(height){
  if(height ==="unknown"){
      return "desconhecida"
  }

  return(height / 100).toFixed(2);
}

function convertMass(mass){
  if(mass ==="unknown"){
    return "desconhecido"
 }

 return `${mass} kg`
}

function convertBirthYear(birthYear){
  if(birthYear ==="unknown"){
    return "desconhecido"
 }

 return birthYear
}
