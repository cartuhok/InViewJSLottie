const target = document.querySelector('.wrapper');
inView('.section').on('enter', el => {
  let color = el.getAttribute('data-background-color');
  target.style.backgroundColor = color;
});