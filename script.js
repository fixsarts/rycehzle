/* ============================================================
   WEDDING WEBSITE — script.js
   Fikri & Amel | 9 Agustus 2026
   Handles: Loader, Navbar, Countdown, Particles, Scroll Reveal,
            Music, Copy to Clipboard, Mobile Menu
============================================================ */

// ============================================================
// 1. LOADING SCREEN
// Fade out setelah animasi loading bar selesai (~3 detik)
// ============================================================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');

  // Tunggu loading bar animation (2s delay 0.8s = ~2.8s total)
  setTimeout(() => {
    loader.classList.add('hidden');
    // Aktifkan animasi hero section setelah loader selesai
    document.querySelectorAll('.fade-up').forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, i * 150);
    });
  }, 3200);
});


// ============================================================
// 2. NAVBAR — Scroll effect & shadow
// Tambahkan class .scrolled saat halaman di-scroll
// ============================================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ============================================================
// 3. MOBILE MENU
// Toggle overlay menu di layar kecil
// ============================================================
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu   = document.getElementById('mobileMenu');
const mobileClose  = document.getElementById('mobileClose');
const mobileLinks  = document.querySelectorAll('.mobile-link');

// Buka menu
hamburgerBtn.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden'; // Kunci scroll saat menu terbuka
});

// Tutup menu
function closeMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

mobileClose.addEventListener('click', closeMenu);

// Tutup otomatis saat klik link
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});


// ============================================================
// 4. SMOOTH SCROLL
// Navigasi halus ke setiap section saat klik nav link
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const offsetTop = target.offsetTop - navHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});


// ============================================================
// 5. COUNTDOWN TIMER
// Hitung mundur menuju 9 Agustus 2026, 08:00 WITA (UTC+8)
// ============================================================
function updateCountdown() {
  // Target: 9 Agustus 2026, pukul 08:00 WITA (UTC+8)
  const targetDate = new Date('2026-08-09T08:00:00+08:00');
  const now        = new Date();
  const diff       = targetDate - now;

  if (diff <= 0) {
    // Hari H! Tampilkan pesan spesial
    document.getElementById('days').textContent    = '00';
    document.getElementById('hours').textContent   = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Pad angka dengan leading zero (01, 02, ...)
  const pad = (n) => String(n).padStart(2, '0');

  document.getElementById('days').textContent    = pad(days);
  document.getElementById('hours').textContent   = pad(hours);
  document.getElementById('minutes').textContent = pad(minutes);
  document.getElementById('seconds').textContent = pad(seconds);

  // Animasi angka saat berubah
  animateCountdown('seconds');
}

// Animasi flip pada elemen countdown
function animateCountdown(id) {
  const el = document.getElementById(id);
  el.style.transform = 'translateY(-4px)';
  el.style.opacity = '0.5';
  setTimeout(() => {
    el.style.transform = 'translateY(0)';
    el.style.opacity = '1';
  }, 150);
}

// Jalankan setiap detik
updateCountdown();
setInterval(updateCountdown, 1000);


// ============================================================
// 6. PARTICLE CANVAS BACKGROUND
// Titik-titik bergerak halus (bintang) di hero section
// ============================================================
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');

  let particles = [];
  const PARTICLE_COUNT = 80;

  // Sesuaikan ukuran canvas dengan layar
  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Buat partikel baru dengan posisi & kecepatan acak
  function createParticle() {
    return {
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      radius:  Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      vx:      (Math.random() - 0.5) * 0.3,
      vy:      (Math.random() - 0.5) * 0.3,
      // Beberapa partikel berwarna emas
      isGold:  Math.random() < 0.15,
    };
  }

  function initParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.isGold
        ? `rgba(201, 169, 110, ${p.opacity})`
        : `rgba(255, 255, 255, ${p.opacity})`;
      ctx.fill();

      // Gerak partikel
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < -5)               p.x = canvas.width + 5;
      if (p.x > canvas.width + 5) p.x = -5;
      if (p.y < -5)               p.y = canvas.height + 5;
      if (p.y > canvas.height + 5) p.y = -5;

      // Kedip halus
      p.opacity += (Math.random() - 0.5) * 0.01;
      p.opacity  = Math.max(0.05, Math.min(0.6, p.opacity));
    });

    requestAnimationFrame(drawParticles);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  resizeCanvas();
  initParticles();
  drawParticles();
})();


// ============================================================
// 7. SCROLL REVEAL
// Animasi elemen masuk saat di-scroll ke dalam viewport
// ============================================================
(function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Hentikan observasi setelah animasi jalan (sekali saja)
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,      // Trigger saat 12% elemen terlihat
    rootMargin: '0px 0px -40px 0px' // Sedikit sebelum batas bawah viewport
  });

  revealElements.forEach(el => observer.observe(el));
})();


// ============================================================
// 8. BACKGROUND MUSIC
// Play/pause musik latar dengan tombol di navbar
// ============================================================
const bgMusic  = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');

let isPlaying = false;

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    isPlaying = false;
    musicBtn.classList.remove('playing');
    musicIcon.className = 'ph ph-music-note';
    musicIcon.title = 'Putar Musik';
  } else {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicBtn.classList.add('playing');
      musicIcon.className = 'ph ph-pause';
      musicIcon.title = 'Jeda Musik';
    }).catch(err => {
      // Browser mungkin block autoplay — beri tahu user
      console.warn('Autoplay blocked:', err);
    });
  }
});

// Set volume awal (60%)
bgMusic.volume = 0.6;


// ============================================================
// 9. COMMENTS SYSTEM
// Menyimpan & menampilkan komentar tamu menggunakan localStorage
// ============================================================
(function initComments() {
  const commentForm = document.getElementById('commentForm');
  const commentsList = document.getElementById('commentsList');
  const noComments = document.getElementById('noComments');
  const nameInput = document.getElementById('guestName');
  const commentInput = document.getElementById('guestComment');

  // Ambil komentar dari localStorage
  function getComments() {
    const stored = localStorage.getItem('weddingComments');
    return stored ? JSON.parse(stored) : [];
  }

  // Simpan komentar ke localStorage
  function saveComments(comments) {
    localStorage.setItem('weddingComments', JSON.stringify(comments));
  }

  // Tampilkan komentar di halaman
  function displayComments() {
    const comments = getComments();
    commentsList.innerHTML = '';

    if (comments.length === 0) {
      noComments.style.display = 'block';
      return;
    }

    noComments.style.display = 'none';

    // Tampilkan komentar terbaru dulu
    comments.reverse().forEach((comment, index) => {
      const commentEl = document.createElement('div');
      commentEl.className = 'comment-item reveal';
      commentEl.style.setProperty('--delay', `${index * 100}ms`);

      const formattedTime = new Date(comment.timestamp).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      commentEl.innerHTML = `
        <div class="comment-header">
          <span class="comment-name">${escapeHtml(comment.name)}</span>
          <span class="comment-time">${formattedTime}</span>
        </div>
        <p class="comment-text">${escapeHtml(comment.comment)}</p>
      `;

      commentsList.appendChild(commentEl);

      // Trigger animasi reveal
      setTimeout(() => {
        commentEl.classList.add('visible');
      }, 10);
    });
  }

  // Escape HTML untuk keamanan
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Handle form submit
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (!name || !comment) return;

    // Buat object komentar baru
    const newComment = {
      name: name,
      comment: comment,
      timestamp: new Date().toISOString()
    };

    // Simpan ke localStorage
    const comments = getComments();
    comments.push(newComment);
    saveComments(comments);

    // Reset form
    commentForm.reset();
    nameInput.focus();

    // Tampilkan pesan sukses
    showCommentSuccess();

    // Reload tampilan komentar
    displayComments();
  });

  // Tampilkan notifikasi sukses
  function showCommentSuccess() {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    if (toast) {
      toastMsg.textContent = 'Pesan Anda berhasil terkirim! 💕';
      toast.classList.add('show');

      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }


  // Tampilkan komentar saat halaman dimuat
  displayComments();
})();


// ============================================================
// 10. COPY TO CLIPBOARD — Gift Section
// Salin nomor rekening & tampilkan notifikasi toast
// ============================================================
const copyBtns = document.querySelectorAll('.copy-btn');
const toast    = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');

let toastTimeout; // Untuk reset timeout saat diklik berulang

copyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const number = btn.getAttribute('data-number');
    const label  = btn.getAttribute('data-label');

    // Salin ke clipboard
    navigator.clipboard.writeText(number).then(() => {
      // Feedback visual pada tombol
      btn.classList.add('copied');
      btn.innerHTML = '<i class="ph ph-check"></i>';

      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = '<i class="ph ph-copy"></i>';
      }, 2000);

      // Tampilkan toast notifikasi
      showToast(`No. ${label} berhasil disalin!`);

    }).catch(() => {
      // Fallback jika clipboard API tidak didukung
      fallbackCopy(number);
      showToast(`No. ${label} berhasil disalin!`);
    });
  });
});

// Tampilkan toast dengan pesan custom
function showToast(message) {
  toastMsg.textContent = message;
  toast.classList.add('show');

  // Reset timeout agar tidak bertumpuk
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// Fallback salin menggunakan textarea (untuk browser lama)
function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity  = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}


// ============================================================
// 10. ACTIVE NAV LINK — Highlight link aktif saat scroll
// ============================================================
(function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  function setActiveLink() {
    let current = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbar.offsetHeight - 40;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--gold)';
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
})();


// ============================================================
// 11. PARALLAX EFFECT — Hero content subtle movement
// Efek parallax ringan pada konten hero saat scroll
// ============================================================
(function initParallax() {
  const heroContent = document.querySelector('.hero-content');
  const heroOrn = document.querySelectorAll('.hero-ornament');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight && heroContent) {
      heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
      heroContent.style.opacity   = `${1 - scrollY / (window.innerHeight * 0.8)}`;
    }
    heroOrn.forEach(el => {
      el.style.transform = `translateY(${scrollY * 0.08}px)`;
    });
  }, { passive: true });
})();


// ============================================================
// 12. COUNTDOWN STYLE — Angka berotasi saat berganti
// Tambah class animasi pada elemen yang berubah
// ============================================================
(function enhanceCountdown() {
  // Tambahkan style transisi CSS ke elemen countdown via JS
  const nums = ['days', 'hours', 'minutes', 'seconds'];
  nums.forEach(id => {
    const el = document.getElementById(id);
    el.style.transition = 'transform 0.15s ease, opacity 0.15s ease';
  });
})();


// ============================================================
// UTILITY — Console greeting untuk developer
// ============================================================
console.log(
  `%c
  ╔══════════════════════════════╗
  ║   Fikri & Amel Wedding 2026  ║
  ║   9 Agustus 2026             ║
  ╚══════════════════════════════╝
  `,
  'color: #c9a96e; font-family: monospace; font-size: 14px;'
);
