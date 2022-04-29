function toggleNightMode() {
    let body = document.body;
    let header = document.getElementsByTagName('header')[0];
    let cardHolder = document.getElementsByClassName('cards-holder');
    let card = document.getElementsByClassName('card');
    let symbol = document.getElementById('sun-moon');

    if(body.style.backgroundColor != 'rgb(64, 64, 64)') {   
        // if mode is not dark, then dark mode
        body.style.backgroundColor = 'rgb(64, 64, 64)';
        body.style.color = "white";
        header.style.backgroundColor = 'rgba(93, 115, 153, 1)';
        for(let i = 0; i < cardHolder.length; ++i) {
            cardHolder[i].style.backgroundColor = "inherit";
        }
        for(let i = 0; i < card.length; ++i) {
            card[i].style.backgroundColor = 'inherit';
        }
        symbol.classList.add('bi-brightness-high');
        symbol.classList.remove('bi-moon-stars-fill');

    } else {     // else light mode
        body.style.backgroundColor = 'rgb(241, 243, 246)';
        body.style.color = 'black';
        header.style.backgroundColor = 'rgba(40, 116, 240, 1)';
        for(let i = 0; i < cardHolder.length; ++i) {
            cardHolder[i].style.backgroundColor = 'white';
        }
        for(let i = 0; i < card.length; ++i) {
            card[i].style.backgroundColor = 'white';
        }
        symbol.classList.remove('bi-brightness-high');
        symbol.classList.add('bi-moon-stars-fill');
    }
}