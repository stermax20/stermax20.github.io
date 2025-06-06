"use strict";

// 타이핑 효과 세팅
const typingTarget = document.getElementById("typing");
const typingText = "www.stermax.kro.kr";
let forward = true;
let charIndex = 0;

// 타이핑 애니메이션 실행
const animateTyping = () => {
  const delay = forward ? 100 : 80;

  if (forward) {
    charIndex++;
    if (charIndex > typingText.length) {
      forward = false;
      setTimeout(animateTyping, 2000); // 끝까지 타이핑 후 2초간 멈춤
      return;
    }
  } else {
    charIndex--;
    if (charIndex < 0) {
      forward = true;
      setTimeout(animateTyping, 1000); // 모두 지우고 1초간 멈춤
      return;
    }
  }

  typingTarget.textContent = typingText.slice(0, charIndex);
  setTimeout(animateTyping, delay);
};
animateTyping(); // 실행 시작

// 메뉴 토글 버튼 설정 (모바일용)
const toggleBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// 버튼 클릭 시 메뉴 열기/닫기
toggleBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// 네비게이션 클릭 시 부드럽게 스크롤 이동
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });
    navLinks?.classList.remove("open"); // 클릭 시 메뉴 닫기
  });
});

// 캔버스 요소 가져오기
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

// 캔버스 리사이즈 (화면 해상도 대응)
const resizeCanvas = () => {
  const dpr = window.devicePixelRatio || 1;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
};
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // 초기 사이즈 세팅

// 파티클 배열 생성
const particles = Array.from({ length: 100 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 1.5 + 0.5,
  dx: (Math.random() - 0.5) * 0.5,
  dy: (Math.random() - 0.5) * 0.5
}));

// 배경 애니메이션 루프
const animateCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "#00bfff";
    ctx.fill();

    // 파티클 이동
    p.x += p.dx;
    p.y += p.dy;

    // 화면 밖으로 나가지 않게 반사 처리
    if (p.x < 0 || p.x > window.innerWidth) p.dx *= -1;
    if (p.y < 0 || p.y > window.innerHeight) p.dy *= -1;
  });

  requestAnimationFrame(animateCanvas); // 재귀 호출
};
animateCanvas();
