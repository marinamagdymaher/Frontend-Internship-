function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scrolling
  });
}
// if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {

window.onscroll = function () {
  console.log("Scroll");
  const button = document.getElementById("backToTop");
  console.log(window.scrollY);
  if (window.scrollY > 100) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
};
