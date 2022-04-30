/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
let givenAnswers = {};
let finalAnswers = {
    blep: 0,
    burger: 0,
    cart: 0,
    dopey: 0,
    happy: 0,
    nerd: 0,
    shy: 0,
    sleeping: 0,
    sleepy: 0
};
const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
const client_id = '75b1449734b17dd0f190a525e828621d4d67b001';
const client_secret = '7+L8kNgmwHmm5cYu0s+GI9/41lAmdu8Lu48ItZw0mY9cKuSL5wtrUiFtjcdmPqgfW52CecNAZOOUI2HlR0JfBpAbw8UVn8h/sxIStlkhJz/bg7Cqil0Jj5upQyKwO/TW';


function findPersonality(){

    for(const key in givenAnswers){
        for(const key2 in finalAnswers){
            if(givenAnswers[key] == key2){
                finalAnswers[key2]++;
            }
        }
    }

    let max = 0;
    let personality = '';
    for(const key in finalAnswers){
        if(finalAnswers[key] > max){
            max = finalAnswers[key];
            personality = key;
        }
    }
    if(max == 1){
        personality = givenAnswers.first;
    }
    return personality;

}

function getResult(){

      if(givenAnswers.first !== undefined && givenAnswers.second !== undefined && givenAnswers.third !== undefined && givenAnswers.fourth !== undefined){

        const answers = document.querySelectorAll('.choice-grid div');
        for(const answer of answers){
            answer.removeEventListener('click', onClick);
        }

        form.classList.add('hidden');
        const result = document.querySelector('#result');
        result.classList.remove('hidden');
        const title = result.querySelector('h1');
        const content = result.querySelector('p');

        let personality = findPersonality();
        title.textContent = RESULTS_MAP[personality].title;
        content.textContent = RESULTS_MAP[personality].contents;
      }

}

function onClick(event){
    const container = event.currentTarget;
    container.classList.remove('unselected');
    container.classList.add('selected');

    const checkbox = container.querySelector('.checkbox');
    checkbox.src='images/checked.png'

    const unselected = document.querySelectorAll('.choice-grid div');
    for(const selection of unselected){
        if(selection.dataset.questionId == container.dataset.questionId){
            if(selection != container){
                selection.classList.remove('selected');
                selection.classList.add('unselected');
                const unchecked = selection.querySelector('.checkbox');
                unchecked.src='images/unchecked.png'
            }
        }   
    }

    if(container.dataset.questionId == "one"){
        givenAnswers.first = container.dataset.choiceId;
        console.log(givenAnswers);
    } else if(container.dataset.questionId == "two"){
        givenAnswers.second = container.dataset.choiceId;
        console.log(givenAnswers);
    } else if(container.dataset.questionId == "three"){
        givenAnswers.third = container.dataset.choiceId;
        console.log(givenAnswers);
    } else if(container.dataset.questionId == "four"){
        givenAnswers.fourth = container.dataset.choiceId;
        console.log(givenAnswers);
    }

    getResult();
}

function restart(){
    const answers = document.querySelectorAll('.choice-grid div');
    for(const answer of answers){
        answer.addEventListener('click', onClick);
        answer.classList.remove('selected');
        answer.classList.remove('unselected');

        const image = answer.querySelector('.checkbox');
        image.src='images/unchecked.png'
    }
    
    for(const answer of bonusAnswers){
        answer.classList.add('hidden');
    }
    form.classList.remove('hidden');
    const searchBar = document.querySelector('#searchBar');
    searchBar.value = '';
    videoDiv.classList.add('hidden');

    const result = document.querySelector('#result');
    result.classList.add('hidden');
    
    givenAnswers = {};
    finalAnswers = {
        blep: 0,
        burger: 0,
        cart: 0,
        dopey: 0,
        happy: 0,
        nerd: 0,
        shy: 0,
        sleeping: 0,
        sleepy: 0
    };
}




function onResponse(response){
    return response.json();
}

function onError(error){
    console.log('Errore: ' + error);
}

function onJson(json){
    console.log(json);
    let drinks = json.drinks.length;
    if (drinks > 9) drinks = 9;

    for (let i=0; i<drinks; i++){

        const drinkImg = json.drinks[i].strDrinkThumb;

        const img = bonusAnswers[i].querySelector('img');
        img.src = drinkImg;

        bonusAnswers[i].classList.remove('hidden');
    }

    for(let j=drinks; j<9; j++){
        bonusAnswers[j].classList.add('hidden');
    }

}

function onSubmit(event){
    event.preventDefault();
    for(const answer of bonusAnswers){
        answer.classList.remove('selected');
        answer.classList.remove('unselected');
        const image = answer.querySelector('.checkbox');
        image.src='images/unchecked.png'
    }
    const searchBar = document.querySelector('#searchBar');
    const searchBar_value = encodeURIComponent(searchBar.value);

    fetch(endpoint + '?i=' + searchBar_value).then(onResponse, onError).then(onJson);
}




function onOauthJson(json){
    console.log(json);

    let index;
    const personality = findPersonality()
    if (personality == 'blep'){
        index = 0;
    } else if (personality == 'burger'){
        index = 1;
    } else if (personality == 'cart'){
        index = 2;
    } else if (personality == 'dopey'){
        index = 3;
    } else if (personality == 'happy'){
        index = 9;
    } else if (personality == 'nerd'){
        index = 5;
    } else if (personality == 'shy'){
        index = 6;
    } else if (personality == 'sleeping'){
        index = 7;
    } else if (personality == 'sleepy'){
        index = 8;
    }
    console.log('indice:  ' + index);
    
    videoDiv.src = json.data[index].player_embed_url;
    videoDiv.classList.remove('hidden');
}

function onOauthResponse(response){
    console.log(response);
    return response.json();
}

function onClick2(event){
    event.preventDefault();

    fetch("https://api.vimeo.com/videos?query=food",
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onOauthResponse).then(onOauthJson);
}


function onTokenJson(json)
{
  console.log(json);
  console.log(json.access_token);
  token = json.access_token;
}

function onTokenResponse(response){
    console.log(response);
    return response.json();
}







const answers = document.querySelectorAll('.choice-grid div');
for(const answer of answers){
    answer.addEventListener('click', onClick);
}

const button = document.querySelector('button');
button.addEventListener('click', restart);


const bonusAnswers = document.querySelectorAll('#bonusQuest div');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);


let token; 
fetch("https://api.vimeo.com/oauth/authorize/client", { 
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
    {
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
        'Content-Type': 'application/vnd.vimeo.*+json;version=3.4',
        'Accept': 'application/vnd.vimeo.*+json;version=3.4'
    }
}).then(onTokenResponse).then(onTokenJson);

const videoDiv = document.querySelector('iframe');
const videoButton = document.querySelector('#oauthButton');
videoButton.addEventListener('click', onClick2);