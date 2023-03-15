const inputName = document.querySelector('.form-request__input.name');
const phone = document.querySelector('.form-request__input.phone')
const btn = document.querySelector('.form-request__btn');

inputName.addEventListener('input', handleInput);
phone.addEventListener('input', handleInput)


function handleInput(e) {
  if(e.target === phone) e.target.value = `+7 ${phoneMask(e.target.value.slice(2))}`
  if(e.target === inputName) e.target.value = nameMask(e.target.value)

  if (inputName.value.length >= 3 && phone.value.length === 16) {
    btn.disabled = false;
  } else btn.disabled = true;
}

function phoneMask(phone) {
  return phone.replace(/\D/g, '')
    .replace(/^(\d{3})(\d)/, '$1 $2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{2})(\d)/, '$1-$2')
    .replace(/(-\d{2}-\d{2})\d+?$/, '$1');
}

function nameMask(name) {
  return name .replace(/[^(\p{L}|\d)]/gu, '')
}

$(function () {
  $('.services__btn').on('click', function () {
    $('.services__items-max').addClass('services__items-max--active');
  });

  $('.form-request__btn').on('click', function (e) {
    e.preventDefault();
    $('.form-request').addClass('form-request--none');
    $('.form-next').addClass('form-request--active');

  });
  
});

