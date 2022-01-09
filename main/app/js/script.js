const btnHamburger = document.querySelector('#btnHamburger');

btnHamburger.addEventListener('click', function(){
    console.log('open hamburger');

    if(btnHamburger.classList.contains('header__open')){
        btnHamburger.classList.remove('header__open');
    }
    else {
      btnHamburger.classList.add('header__open');
    }
    
});