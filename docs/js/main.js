$(function () {
  $('.services__btn').on('click', function () {
    $('.services__items-max').addClass('services__items-max--active');
    $('.services__items-min').addClass('services__items-max--disactive');
  });

  $('.form-request__btn').on('click', function (e) {
    e.preventDefault();
    $('.form-request').addClass('form-request--none');
    $('.form-next').addClass('form-request--active');

  });

  $('.header__burger').on('click', function (e) {
    e.preventDefault();
    $('.header__burger,.header__menu').toggleClass('active');
    $('body').toggleClass('lock');
  });
});



if (document.querySelector('.checkout__form.form-request')) {
  formValidate('.checkout__form.form-request')
}
if (document.querySelector('.popup__form')) {
  formValidate('.popup__form')
}


// if (document.location.pathname === '/services.html'
//   || document.location.pathname === '/price.html') {

if (document.querySelector('.consultation__form')) {
  formValidate('.consultation__form')
}

function formValidate(selector) {
  const form = document.querySelector(selector);
  const inputName = form.querySelector('.name');
  const phone = form.querySelector('.phone');
  const btn = form.querySelector('.button');

  form.addEventListener('input', handleInput);

  function handleInput(e) {
    if (e.target === phone) {
      e.target.value = phoneMask(e.target.value)
    }

    if (inputName) {
      if (e.target === inputName) e.target.value = nameMask(e.target.value)
      inputName.value.length >= 3 && phone.value.length === 16 ? btn.disabled = false : btn.disabled = true
      return
    }

    btn.disabled = phone.value.length !== 16
  }
}

function phoneMask(phone) {
  if (phone.slice(0, 3) === '+7 ') phone = phone.slice(3)
  if (phone.slice(0, 2) === '+7') phone = phone.slice(2)
  let res = phone
    .replace(/\D/g, '')
    .replace(/^(\d{3})(\d)/, '$1 $2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{2})(\d)/, '$1-$2')
    .replace(/(-\d{2}-\d{2})\d+?$/, '$1')
  return '+7 ' + res
}

function nameMask(name) {
  return name.replace(/[^(\p{L}|\d)]/gu, '')
}


