// chuyển hình ở hero
const hero = document.querySelector('.hero');

const images = [
  "https://statics.vinpearl.com/lau-nuong-ha-noi-1_1693441482.jpg",
  "https://phongcachmoc.vn/upload/images/thiet-ke-nha-hang-nuong-18.JPG",
  "https://plantotravel.vn/uploads/images/news/jogae-quan-nuong-bbq-1654511209.jpeg",
  "https://thietkethicong.org/images/Product/Thiet-ke-thi-cong-nha-hang-lau-nuong-2.jpg",
  "https://pasgo.vn/Upload/anh-chi-tiet/nha-hang-nuong-bbq-nam-trung-yen-slide-1-normal-131299315828.webp"
];

let index = 0;
function changeBackground() {
  hero.style.backgroundImage = `url(${images[index]})`;
  index = (index + 1) % images.length;
}
changeBackground();
setInterval(changeBackground, 5000);

// làm thông tin xuất hiện khi scroll chuột Trang chủ
document.addEventListener("DOMContentLoaded", function () {
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    reveals.forEach(function (el) {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 150; // Khoảng cách để trigger hiệu ứng

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // check ngay khi load trang
});
