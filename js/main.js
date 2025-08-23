document.addEventListener("DOMContentLoaded", () => {

  let output = document.querySelector('.lang output'),
    li = document.querySelectorAll('.lang li'),
    ul = document.querySelector('.lang ul');

  output.innerHTML = li[0].innerHTML;

  ul.onmouseover = function () {
    ul.style.height = (40 * li.length) + 40 + 'px';
    if (li.length >= 10) {
      ul.setAttribute('style', 'height: 200px; overflow: auto;');
    }
  };
  ul.onmouseout = function () {
    ul.removeAttribute('style');
  };

  li.forEach(function (e) {
    let text = e.innerHTML;
    e.addEventListener('click', function () {
      output.innerHTML = text;
    });
  });

  const menuBtn = document.querySelector('.menu__btn');
  const menu = document.querySelector('.menu');

  menuBtn.addEventListener('click', ()=>{
  menu.classList.toggle('menu__open');
  document.body.classList.toggle('no-scroll');
  });

  $('.slider').slick({
    arrows: false,
    fade: true,
    autoplay: 3000,
    dots: false,
  });

  const slides = document.querySelectorAll('.about-slide');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  window.nextSlide = function () {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  };

  window.prevSlide = function () {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  };

  showSlide(currentIndex);

  const tags = document.querySelectorAll('.fiatures-tag');
  const texts = document.querySelectorAll('.fiatures-text');
  const indicatorContainer = document.getElementById('indicatorContainer');
  const points = [];
  const lines = [];
  const totalItems = tags.length;
  const itemHeight = 100 / (totalItems - 1);

  tags.forEach((tag, index) => {
    const point = document.createElement('div');
    point.className = 'indicator-point';
    if (index === 0) point.classList.add('active');
    indicatorContainer.appendChild(point);
    points.push(point);
  });

  for (let i = 0; i < totalItems - 1; i++) {
    const line = document.createElement('div');
    line.className = 'indicator-line';
    line.style.height = `${itemHeight - 2}%`;
    line.style.top = `${itemHeight * (i + 0.5) - (itemHeight - 2) / 2}%`;
    line.style.opacity = i === 0 ? '1' : '0';
    indicatorContainer.appendChild(line);
    lines.push(line);
  }

  texts[0].style.display = 'block';

  function updateActive(index) {
    texts.forEach((text, i) => {
      if (i === index) {
        text.classList.add('block');
        text.style.display = 'block';
      } else {
        text.classList.remove('block');
        setTimeout(() => {
          if (!text.classList.contains('block')) {
            text.style.display = 'none';
          }
        }, 400);
      }
    });

    points.forEach((point, i) => {
      point.classList.toggle('active', i === index);
    });

    lines.forEach((line, i) => {
      if (index === 0) {
        line.style.opacity = i === 0 ? '1' : '0';
      } else if (index === totalItems - 1) {
        line.style.opacity = i === totalItems - 2 ? '1' : '0';
      } else {
        line.style.opacity = i === index ? '1' : '0';
      }
    });
  }

  tags.forEach((tag, index) => {
    tag.addEventListener('click', () => {
      updateActive(index);
    });
  });
});