const btnHamburger = document.querySelector('#btnHamburger');
const glassPanel = document.querySelector('#glass-layer');

btnHamburger.addEventListener('click', function(){
    console.log('open hamburger');

    if(btnHamburger.classList.contains('header__open')){
        btnHamburger.classList.remove('header__open');
    }
    else {
      btnHamburger.classList.add('header__open');
    }

    if(glassPanel.classList.contains('panel__open')){
      glassPanel.classList.remove('panel__open');
    }
    else {
      glassPanel.classList.add('panel__open');
    }




    
});

// document
//   .querySelectorAll("a")
//   .forEach((el) => el.addEventListener("click", "boom"));

  