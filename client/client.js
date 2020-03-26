console.log('Hello');

const form = document.querySelector('form');  // It is form not class of form i.e. 'tweet-form'
const loadingElement = document.querySelector('.loading');
const tweetElement = document.querySelector('.tweets');

const URL = 'http://localhost:4000/tweet';


form.style.display='';
loadingElement.style.display = 'none';

form.addEventListener('submit',(event) => {
    
    event.preventDefault();
    
    const formData = new FormData(form); // FormData is a build in function to retrieve all form data
  
    const name = formData.get('name');
    const content = formData.get('content')

    const tweet = {
        name ,
        content
    }

    loadingElement.style.display = '';

    fetch(URL, {
        method :'POST',
        body : JSON.stringify(tweet),
        headers : {
            'content-type' : 'application/json'
        }
    }).then( response => response.json())
    .then( (data) => {
        form.reset();
        loadingElement.style.display = 'none';
         console.log(data);
    }).catch((error) => {
        console.error('Error:', error);
    });
  
});


listALLTweets();

function listALLTweets () {
    tweetElement.innerHTML='';
    fetch(URL)
    .then(response => response.json())
    .then( tweets => {
        tweets.reverse();
       tweets.forEach(tweet => {
           
        const div = document.createElement('div');

        const header = document.createElement('p');
        header.textContent = tweet.name;

        const contents = document.createElement('h3');
        contents.textContent = tweet.content;

        const date = document.createElement('small');
        date.textContent= new Date(tweet.createdDate)

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        tweetElement.appendChild(div);

           
       });                
    })
    .catch((error) => {
        console.error('Error:', error);
    }); 
    

}

