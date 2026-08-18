window.addEventListener('load', function () {
  let navbar = document.querySelector('.navbar-nav');
  navbar.classList.add('active');
  
  setTimeout(function () {
    navbar.classList.remove('active');
    void navbar.offsetWidth;
    navbar.classList.add('active');
  }, 10); 
});
window.addEventListener('scroll', function () {
  var section = document.querySelector('.section-transition');
  var sectionPosition = section.getBoundingClientRect().top;
  var windowHeight = window.innerHeight;

  if (sectionPosition < windowHeight * 0.75) {
    section.classList.add('active');
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.count');
  const speed = 100;

  function updateCounters() {
    counters.forEach(counter => {
      const targetValue = +counter.dataset.target;
      let currentValue = +counter.textContent;

      const increment = targetValue / (speed / 10);

      if (currentValue < targetValue) {
        counter.textContent = Math.ceil(currentValue + increment);
      }
    });
  }

  setInterval(updateCounters, speed);
});



document.addEventListener("DOMContentLoaded", function() {
  const section = document.querySelector(".HowWoke");
  const colElements = section.querySelectorAll(".col-md-6");
  const sectionOffset = section.offsetTop - window.innerHeight + 100;

  colElements.forEach(col => {
    col.style.opacity = 0;
    col.style.transform = "translateY(20px)";
    col.style.transition = "opacity 1s ease-in-out, transform 1s ease-in-out";
    col.isAnimated = false;
  });

  function animateCols() {
    colElements.forEach(col => {
      if (!col.isAnimated && window.pageYOffset > sectionOffset) {
        col.style.opacity = 1;
        col.style.transform = "translateY(0)";
        col.isAnimated = true;
      }
    });
  }

  window.addEventListener("scroll", animateCols);
});
