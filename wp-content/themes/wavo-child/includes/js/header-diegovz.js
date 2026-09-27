document.addEventListener('scroll', function() {
  var header = document.getElementById('header-diegovz');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
