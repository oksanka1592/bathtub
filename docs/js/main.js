const inputName = document.querySelector('.form-request__input.name');
const btn = document.querySelector('.form-request__btn');
const phone = document.querySelector('.form-request__input.phone');

inputName.addEventListener('input', changeHandler);
phone.addEventListener('input', changeHandler);

function changeHandler() {
  if (inputName.value && phonenumber(phone)) {
    btn.disabled = false;
  } else btn.disabled = true;
}

function phonenumber(inputtxt) {
  const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/;
  if (inputtxt.value.match(phoneno)) {
    return true;
  }
  else {
    return false;
  }
}



$(function(){
  $('.services__btn').on('click', function () {
    $('.services__items-max').addClass('services__items-max--active');
  });

  // $('.phone').mask('+7 (999) 999-99-99', { completed: ()=>{alert('hgh')} });

  $('.form-request__btn').on('click', function(e){
    e.preventDefault();
    $('.form-request').addClass('form-request--none');
    $('.form-next').addClass('form-request--active');

  });
});

