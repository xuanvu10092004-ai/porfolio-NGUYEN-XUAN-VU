// ===== HIỆU ỨNG GÕ CHỮ (TYPING EFFECT) CHO HERO SECTION =====
const titleElement = document.querySelector('.title');
const textToType = "AI Student & Application Developer";
let typingIndex = 0;
let isTyping = true;
const enableTypingEffect = false;

function typeWriter() {
    if (isTyping && typingIndex < textToType.length) {
        // Cắt chuỗi và thêm class cursor ở cuối
        titleElement.innerHTML = textToType.substring(0, typingIndex + 1) + ' <span class="cursor">|</span>';
        typingIndex++;
        // Tốc độ gõ chữ, có thể chỉnh sửa ms ở đây
        setTimeout(typeWriter, 120); 
    } else {
        isTyping = false;
    }
}

// Chạy hiệu ứng khi tải trang xong
window.addEventListener('load', () => {
    if (!enableTypingEffect) return;
    // Xóa text mẫu HTML đi trước khi chạy hiệu ứng (nếu cần)
    titleElement.innerHTML = '<span class="cursor">|</span>';
    setTimeout(typeWriter, 500); // Trì hoãn một chút trước khi gõ
});


// ===== MENU RESPONSIVE (MOBILE) =====
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li a");

// Mở / Đóng menu khi ấn vào icon Hamburger
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Đóng menu khi ấn vào một link bất kỳ
links.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    });
});


// ===== ẨN HIỆN NAVBAR KHI CUỘN TRANG =====
let prevScrollpos = window.pageYOffset;
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("back-to-top");

window.addEventListener('scroll', () => {
    let currentScrollPos = window.pageYOffset;
    
    // Nếu cuộn lên trên thì hiện navbar, cuộn xuống thì ẩn
    if (prevScrollpos > currentScrollPos) {
        navbar.style.top = "0";
    } else {
        // Ẩn lên trên 100px
        navbar.style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;

    backToTop.classList.toggle("visible", currentScrollPos > 500);

    // Đóng mobile menu nếu đang cuộn trang
    if (navLinks.classList.contains("active")) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    }
});


// ===== HIỆU ỨNG FADE-IN KHI CUỘN TỚI (SCROLL ANIMATION) =====
// Sử dụng Intersection Observer API, hiệu năng tốt, dễ hiểu
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Kích hoạt khi thấy 15% phần tử
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Chỉ chạy 1 lần
        }
    });
}, observerOptions);

// Chọn tất cả các phần tử cần thêm hiệu ứng
const elementsToAnimate = document.querySelectorAll(
    '.section-title, .about-text, .about-image, .skill-category, .project-card, .experience-card, .timeline-item'
);

// Khởi tạo thêm class fade-in và bắt đầu quan sát
elementsToAnimate.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
