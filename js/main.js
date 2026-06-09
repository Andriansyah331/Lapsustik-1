const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

const EJS_PUBLIC_KEY  = 'oprveIC_938tf2iwb';
const EJS_SERVICE_ID  = 'service_51jko96';
const EJS_TEMPLATE_ID = 'template_opci7su';
emailjs.init({ publicKey: EJS_PUBLIC_KEY });

async function kirimPesan() {
  const nama      = document.getElementById('fNama').value.trim();
  const telp      = document.getElementById('fTelp').value.trim();
  const email     = document.getElementById('fEmail').value.trim();
  const keperluan = document.getElementById('fKeperluan').value;
  const pesan     = document.getElementById('fPesan').value.trim();
  const btn       = document.getElementById('btnKirim');

  if (!nama || !email || !keperluan || !pesan) {
    tampilToast('Mohon lengkapi semua field yang wajib diisi (Nama, Email, Keperluan, dan Pesan).', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    tampilToast('Format email tidak valid. Periksa kembali alamat email Anda.', 'error');
    return;
  }

  const time = new Date().toLocaleString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  btn.disabled = true;
  btn.textContent = 'Mengirim...';

  try {
    await emailjs.send(EJS_SERVICE_ID, EJS_TEMPLATE_ID, {
      name:      nama,
      telp:      telp || '-',
      email:     email,
      keperluan: keperluan,
      message:   pesan,
      time:      time,
    });
    tampilToast('✓ Pesan Anda berhasil dikirim! Tim kami akan merespons dalam 1–2 hari kerja.', 'sukses');
    resetForm();
  } catch (err) {
    console.error('EmailJS error:', err);
    tampilToast('Gagal mengirim pesan. Silakan coba lagi atau hubungi kami langsung.', 'error');
  }

  btn.disabled = false;
  btn.textContent = 'Kirim Pesan';
}

function resetForm() {
  ['fNama','fTelp','fEmail','fPesan'].forEach(id => { document.getElementById(id).value = ''; });
  document.getElementById('fKeperluan').selectedIndex = 0;
}

function tampilToast(msg, tipe = 'sukses') {
  const t = document.getElementById('kontakToast');
  t.textContent = msg;
  t.className = `kontak-toast ${tipe}`;
  t.style.display = 'block';
  if (tipe === 'error') setTimeout(() => { t.style.display = 'none'; }, 6000);
}

const programs = {
  rehabilitasi: { tag:'01 — Rehabilitasi Medis', title:'Rehabilitasi Narkotika', icon:'🏥', color:'#0e2a38', desc:'Program Rehabilitasi Narkotika adalah layanan pemulihan fisik dan mental berbasis klinis yang dirancang khusus untuk warga binaan dengan ketergantungan narkotika. Dijalankan oleh tim dokter umum, dokter spesialis jiwa, dan perawat terlatih, program ini mencakup seluruh fase pemulihan dari detoksifikasi hingga stabilisasi kondisi kesehatan jangka panjang.', features:[{icon:'💉',text:'Detoksifikasi medis terstruktur dan terawasi'},{icon:'🩺',text:'Pemeriksaan kesehatan komprehensif rutin'},{icon:'💊',text:'Terapi substitusi opioid (Metadon/Buprenorfin)'},{icon:'🧬',text:'Penanganan penyakit penyerta (HIV, Hepatitis)'},{icon:'🏨',text:'Unit rawat inap khusus pasca-detoksifikasi'},{icon:'📋',text:'Rekam medis digital & pemantauan berkelanjutan'}] },
  kepribadian: { tag:'02 — Pembinaan Kepribadian', title:'Pembinaan Kepribadian', icon:'🧠', color:'#0e1a38', desc:'Program Pembinaan Kepribadian berfokus pada pembentukan karakter, mental, dan moral warga binaan sebagai pondasi perubahan hidup jangka panjang.', features:[{icon:'🗣️',text:'Konseling individual dan kelompok rutin'},{icon:'📓',text:'Modul pembentukan karakter dan disiplin diri'},{icon:'🎭',text:'Terapi ekspresif: seni, drama, dan musik'},{icon:'🧩',text:'Program Cognitive Behavioral Therapy (CBT)'},{icon:'👥',text:'Kelompok dukungan sebaya (peer support group)'},{icon:'📊',text:'Asesmen psikologis berkala & laporan perkembangan'}] },
  blk: { tag:'03 — Vokasional', title:'Balai Latihan Kerja', icon:'🔧', color:'#1a1208', desc:'Program Balai Latihan Kerja (BLK) membekali warga binaan dengan keterampilan teknis yang relevan dengan kebutuhan pasar kerja saat ini.', features:[{icon:'🧵',text:'Menjahit & tata busana bersertifikat'},{icon:'👨‍🍳',text:'Tata boga, memasak, & pastri profesional'},{icon:'🪚',text:'Pertukangan kayu & konstruksi bangunan ringan'},{icon:'🌱',text:'Budidaya pertanian & akuakultur hidroponik'},{icon:'🖥️',text:'Desain grafis, office, & produktivitas digital'},{icon:'🎨',text:'Kerajinan tangan & seni kriya bernilai jual'}] },
  sertifikasi: { tag:'04 — Pelatihan Bersertifikat', title:'Pelatihan Bersertifikat', icon:'📜', color:'#1a1208', desc:'Program Pelatihan Bersertifikat bekerja sama langsung dengan lembaga sertifikasi nasional.', features:[{icon:'🏅',text:'Sertifikat kompetensi resmi BNSP yang diakui nasional'},{icon:'🤝',text:'Kerjasama dengan 12+ lembaga sertifikasi profesi'},{icon:'📝',text:'Ujian kompetensi terstandarisasi & terstruktur'},{icon:'💼',text:'Pembekalan portofolio kerja & CV profesional'},{icon:'🔗',text:'Jaringan mitra perusahaan untuk penyerapan tenaga kerja'},{icon:'🔄',text:'Program re-sertifikasi dan peningkatan level kompetensi'}] },
  pkbm: { tag:'05 — Pendidikan', title:'PKBM', icon:'📖', color:'#0e2830', desc:'Program Pusat Kegiatan Belajar Masyarakat (PKBM) memastikan setiap warga binaan memiliki bekal akademis yang memadai.', features:[{icon:'📚',text:'Kesetaraan Paket A (SD), B (SMP), C (SMA)'},{icon:'✏️',text:'Literasi dasar & numerasi untuk WBP buta huruf'},{icon:'🎓',text:'Bimbingan belajar Ujian Kesetaraan Nasional'},{icon:'💻',text:'Literasi digital dan kecakapan teknologi informasi'},{icon:'📰',text:'Perpustakaan dengan koleksi 2.000+ judul buku'},{icon:'🏫',text:'Kerjasama dengan universitas untuk program beasiswa'}] },
  hipnoterapi: { tag:'06 — Pembinaan Intelektual', title:'Hypnotherapy & Pembinaan Intelektual', icon:'💡', color:'#0e0e30', desc:'Program Hypnotherapy dan Pembinaan Intelektual merupakan pendekatan inovatif dalam pengembangan mental warga binaan.', features:[{icon:'🧘',text:'Sesi hypnotherapy individual oleh terapis bersertifikat'},{icon:'💪',text:'Pelatihan motivasi & pembangunan kepercayaan diri'},{icon:'🧠',text:'Teknik mindfulness dan manajemen stres'},{icon:'📖',text:'Program literasi emosional & kecerdasan sosial'},{icon:'🎯',text:'Penetapan tujuan hidup & perencanaan masa depan'},{icon:'🌟',text:'Seminar pengembangan diri dengan pembicara inspiratif'}] },
  usaha: { tag:'07 — Kemandirian Usaha', title:'Kemandirian Usaha', icon:'🌱', color:'#0a2010', desc:'Program Kemandirian Usaha dirancang untuk membekali warga binaan dengan kemampuan berwirausaha secara mandiri setelah bebas.', features:[{icon:'🥖',text:'Pelatihan bakery & usaha kuliner skala rumahan'},{icon:'👗',text:'Usaha konveksi & tata busana siap jual'},{icon:'🎪',text:'Kerajinan tangan & produk kreatif bernilai ekspor'},{icon:'🐔',text:'Budidaya ayam petelur & pertanian produktif'},{icon:'📱',text:'Pemasaran digital & e-commerce untuk UMKM'},{icon:'💰',text:'Literasi keuangan & manajemen usaha kecil'}] },
  integrasi: { tag:'08 — Reintegrasi Sosial', title:'Integrasi & Pembebasan Bersyarat', icon:'🤝', color:'#0e0e30', desc:'Program Integrasi dan Pembebasan Bersyarat mempersiapkan warga binaan untuk kembali ke tengah masyarakat secara mulus dan berkelanjutan.', features:[{icon:'🏠',text:'Program asimilasi kerja & asimilasi sosial bertahap'},{icon:'📅',text:'Cuti menjelang bebas (CMB) & cuti bersyarat terstruktur'},{icon:'📋',text:'Pengurusan administrasi pembebasan bersyarat (PB)'},{icon:'🧭',text:'Pendampingan Balai Pemasyarakatan (BAPAS)'},{icon:'👨‍👩‍👧',text:'Rekonsiliasi keluarga & mediasi komunitas'},{icon:'📱',text:'Pemantauan pasca-bebas via aplikasi digital'}] }
};

function openModal(id) {
  const p = programs[id]; if (!p) return;
  document.getElementById('modalImgWrap').innerHTML = `<div class="modal-img-placeholder" style="background:linear-gradient(135deg,${p.color} 0%,#0d1b3e 100%);"><span style="font-size:5rem;position:relative;z-index:1;filter:drop-shadow(0 0 24px rgba(212,160,23,0.5))">${p.icon}</span><div style="position:absolute;inset:0;background:repeating-linear-gradient(45deg,rgba(212,160,23,0.04) 0,rgba(212,160,23,0.04) 1px,transparent 1px,transparent 28px)"></div><div style="position:absolute;bottom:0;left:0;right:0;height:80px;background:linear-gradient(transparent,rgba(13,27,62,0.95))"></div></div>`;
  document.getElementById('modalTag').textContent = p.tag;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalFeatures').innerHTML = p.features.map(f=>`<div class="modal-feature"><div class="modal-feature-icon">${f.icon}</div><div>${f.text}</div></div>`).join('');
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); document.body.style.overflow = ''; }
function closeModalOutside(e) { if (e.target===document.getElementById('modalOverlay')) closeModal(); }
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);} }); },{threshold:0.08});
reveals.forEach(r=>io.observe(r));

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');
window.addEventListener('scroll', ()=>{ let current=''; sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120) current=s.id;}); navLinks.forEach(a=>{const active=a.getAttribute('href')==='#'+current; a.style.color=active?'var(--gold-light)':''; a.style.opacity=active?'1':''; }); });

// ===== TYPEWRITER ANIMATION =====
const twWords = ['LAPAS', 'NARKOTIKA', 'JAKARTA'];
const twIds   = ['tw1', 'tw2', 'tw3'];
const twDelay = [300, 0, 0];   // delay awal sebelum mulai ngetik (ms)
const twSpeed = 90;            // ms per karakter

let twObserver = null;
let twRunning  = false;

function resetTypewriter() {
twIds.forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = '';
  el.style.width  = '0';
  el.classList.remove('typing', 'done');
});
twRunning = false;
}

function typeWord(index) {
if (index >= twIds.length) { twRunning = false; return; }
const el   = document.getElementById(twIds[index]);
const word = twWords[index];
if (!el) { typeWord(index + 1); return; }

el.textContent = '';
el.style.width = '0';
el.classList.add('typing');
el.classList.remove('done');

let i = 0;
const gap = index === 0 ? twDelay[0] : 200; // jeda antar baris

setTimeout(() => {
  const iv = setInterval(() => {
    if (i < word.length) {
      el.textContent += word[i];
      el.style.width = 'auto';
      i++;
    } else {
      clearInterval(iv);
      el.classList.remove('typing');
      el.classList.add('done');
      typeWord(index + 1);
    }
  }, twSpeed);
}, gap);
}

function startTypewriter() {
if (twRunning) return;
twRunning = true;
resetTypewriter();
setTimeout(() => typeWord(0), 150);
}

// Observer: nyala tiap kali h1 masuk viewport
window.addEventListener('DOMContentLoaded', () => {
const h1 = document.querySelector('#hero h1');
if (!h1) return;

twObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startTypewriter();
    } else {
      resetTypewriter();
    }
  });
}, { threshold: 0.5 });

twObserver.observe(h1);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
const target = parseInt(el.dataset.target);
const suffix = el.dataset.suffix || '';
const duration = 1800;
const startTime = performance.now();

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

function update(now) {
  const elapsed  = now - startTime;
  const progress = Math.min(elapsed / duration, 1);
  const current  = Math.round(easeOut(progress) * target);
  el.textContent = current.toLocaleString('id-ID') + suffix;
  if (progress < 1) requestAnimationFrame(update);
}

requestAnimationFrame(update);
}

// Observer buat trigger counter saat stat bar masuk viewport
const statBar = document.querySelector('.hero-stats-bar');
if (statBar) {
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num[data-target]').forEach(el => {
        el.textContent = '0';
        animateCounter(el);
      });
      counterObserver.unobserve(statBar); // cukup sekali
    }
  });
}, { threshold: 0.6 });
counterObserver.observe(statBar);
}

// ===== PARALLAX SCROLL =====
const heroBg     = document.querySelector('.hero-bg');
const heroBgGrid = document.querySelector('.hero-bg-grid');

function updateParallax() {
const scrollY = window.scrollY;
const speed1  = scrollY * 0.35;  // layer belakang
const speed2  = scrollY * 0.18;  // grid sedikit lebih lambat

if (heroBg)     heroBg.style.transform     = `translateY(${speed1}px)`;
if (heroBgGrid) heroBgGrid.style.transform = `translateY(${speed2}px)`;
}

window.addEventListener('scroll', updateParallax, { passive: true });

// ===== GOLD PARTICLE SYSTEM =====
(function() {
const canvas  = document.getElementById('particleCanvas');
const wrap    = document.querySelector('.coin-flip-wrap');
if (!canvas || !wrap) return;

const ctx     = canvas.getContext('2d');
let particles = [];
let animId    = null;
let isHovered = false;

const COLORS = [
  '#f5c800', '#d4a017', '#ffe566', '#ffd700', '#fff0a0', '#e8b800'
];

function resize() {
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width  = rect.width  + 120;
  canvas.height = rect.height + 120;
}

class Particle {
  constructor() { this.reset(true); }

  reset(initial = false) {
    // Spawn dari lingkaran tepi coin
    const angle  = Math.random() * Math.PI * 2;
    const radius = 148 + Math.random() * 10;
    const cx     = canvas.width  / 2;
    const cy     = canvas.height / 2;

    this.x    = cx + Math.cos(angle) * radius;
    this.y    = cy + Math.sin(angle) * radius;

    const speed = 0.6 + Math.random() * 2.2;
    const spread = angle + (Math.random() - 0.5) * 1.1;
    this.vx   = Math.cos(spread) * speed;
    this.vy   = Math.sin(spread) * speed - 0.4;

    this.size   = 2 + Math.random() * 3.5;
    this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha  = initial ? Math.random() : 0;
    this.life   = initial ? Math.random() : 0;
    this.maxLife = 55 + Math.random() * 60;
    this.gravity = 0.035 + Math.random() * 0.025;
    this.shape  = Math.random() > 0.5 ? 'circle' : 'diamond';
    this.rot    = Math.random() * Math.PI * 2;
    this.rotV   = (Math.random() - 0.5) * 0.12;
  }

  update() {
    this.life++;
    this.vy += this.gravity;
    this.x  += this.vx;
    this.y  += this.vy;
    this.rot += this.rotV;
    this.vx *= 0.99;

    const t = this.life / this.maxLife;
    // Fade in cepat, fade out pelan
    this.alpha = t < 0.15
      ? t / 0.15
      : 1 - ((t - 0.15) / 0.85);
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha) * 0.92;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.fillStyle = this.color;

    if (this.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Diamond
      const s = this.size * 1.3;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.6, 0);
      ctx.lineTo(0, s);
      ctx.lineTo(-s * 0.6, 0);
      ctx.closePath();
      ctx.fill();
    }

    // Kilap kecil di tengah particle
    ctx.globalAlpha *= 0.5;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(-this.size * 0.25, -this.size * 0.25, this.size * 0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  isDead() { return this.life >= this.maxLife; }
}

function spawnBurst(count) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Spawn terus selama hover
  if (isHovered && particles.length < 80) {
    spawnBurst(3);
  }

  particles = particles.filter(p => !p.isDead());
  particles.forEach(p => { p.update(); p.draw(); });

  if (particles.length > 0 || isHovered) {
    animId = requestAnimationFrame(loop);
  } else {
    animId = null;
  }
}

function startLoop() {
  if (!animId) animId = requestAnimationFrame(loop);
}

wrap.addEventListener('mouseenter', () => {
  isHovered = true;
  canvas.style.opacity = '1';
  spawnBurst(18); // ledakan awal
  startLoop();
});

wrap.addEventListener('mouseleave', () => {
  isHovered = false;
  canvas.style.opacity = '0';
});

window.addEventListener('resize', resize);
resize();
})();

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
if (!progressBar) return;
const scrollTop  = window.scrollY;
const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
progressBar.style.width = pct + '%';
}, { passive: true });

// ===== STAGGERED CARD REVEAL =====
const staggerCards = document.querySelectorAll('.stagger-card');
if (staggerCards.length) {
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target
        .closest('.shortcut-grid')
        .querySelectorAll('.stagger-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('stagger-visible');
        }, i * 160); // delay 160ms antar card
      });
      staggerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

// Observe card pertama aja sebagai trigger
staggerObserver.observe(staggerCards[0]);
}

// ===== RIPPLE EFFECT =====
document.querySelectorAll('.ripple-btn').forEach(btn => {
btn.addEventListener('click', function(e) {
  const existing = this.querySelector('.ripple-wave');
  if (existing) existing.remove();

  const rect   = this.getBoundingClientRect();
  const size   = Math.max(rect.width, rect.height);
  const x      = e.clientX - rect.left - size / 2;
  const y      = e.clientY - rect.top  - size / 2;

  const ripple = document.createElement('span');
  ripple.classList.add('ripple-wave');
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
  this.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
});
});
