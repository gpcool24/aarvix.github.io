// Sticky Header
window.onscroll = function() { stickyHeader() };

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// Mobile Menu
function toggleMenu() {
  var menu = document.getElementById("mobileMenu");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}

// Smooth Scrolling
const scrollLinks = document.querySelectorAll('a.scroll');

scrollLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Animated Counters
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  counter.innerText = '0';
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 200;
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 1);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});

// Portfolio Filters
const filterButtons = document.querySelectorAll('.filter-button');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filterValue = button.getAttribute('data-filter');
    portfolioItems.forEach(item => {
      if (item.classList.contains(filterValue) || filterValue === 'all') {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Testimonial Carousel
let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
  testimonials.forEach((testimonial, idx) => {
    testimonial.style.display = (idx === index) ? 'block' : 'none';
  });
}

function nextTestimonial() {
  currentIndex = (currentIndex + 1) % totalTestimonials;
  showTestimonial(currentIndex);
}

setInterval(nextTestimonial, 5000);
showTestimonial(currentIndex);

// FAQ Accordion
const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach(item => {
  item.querySelector('.accordion-header').addEventListener('click', () => {
    const content = item.querySelector('.accordion-content');
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});

// Form Validation
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default submission
  const isValid = validateForm();
  if (isValid) {
    form.submit();
  }
});

function validateForm() {
  let isValid = true;
  // Perform validation (add your validation logic here)
  return isValid;
}
