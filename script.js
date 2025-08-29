// Data profil & link
const PROFILE = {
  name: "YUKARI AI",
  bio: "selamat datang di website yukariAI, kalian dapat melanjukan ke akun media sosial lain dengan link dibawa.",
  avatar: "IMG_20250805_120754.png",
  links: [
    { name: "Instagram", url: "https://instagram.com/username" },
    { name: "YouTube", url: "https://youtube.com/@yukariaiofficial?si=QgmByBqoVhkjI6Ou" },
    { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61577255909852&mibextid=ZbWKwL" },
  ],
  photos: [
    "file_000000000c10622f8ddfcd56cc2a1489.png",
    "file_00000000a83461fb897faf24f30fce87.png",
    "file_00000000bad061f99b07e1ea358f5573.png",
    "file_00000000be1461f8a2e62d80f3f1a9fb.png",
    "file_00000000c58061f88f002d2614ad8cf5.png",
    "file_00000000cd186230b1b2d9534df33232.png",
    "file_00000000d3cc61f89749c0c81c2a9df2 (1).png",
    "file_00000000d66c61f78912bf87f1535dfa.png",
    "file_000000005dd461f8805b7c5de75e4e1f (1).png",
    "file_0000000020b861fa9720754021b55489 (1).png",
    "file_000000002b446246b9078bc39a9a8e0d.png",
    "20250728_074825.jpg",
    "file_0000000000dc622fb7dc2b9e7c447ec2.png",
    "file_00000000afb861f999b4f0a19e1b194a.png",
    "file_00000000e19c61fda5319353467015dd.png",
    "file_000000005c5861fbada912139ef46112.png",
    "file_000000008bd861fd93af97a7dbae2424.png",
    "file_0000000079e0622faf84b9e6ac371e06.png",
    "file_00000000571c61f980c1ff858e7109ab.png",
    "file_00000000687c622fa9cce03347089a82 (1).png",
    "file_00000000991461f79833d4382e9cad1f.png",
    "memory6.jpg",
    "file_00000000052c61f9a2b06f70c66a6dbf.png",
    "file_0000000058a461f797f28f7ab4e9747a.png",
    "file_0000000076c461f4aef91565e7fd528c.png",
    "memory4.jpg",
    "file_00000000298062309fcfbf017cfe22d3.png",
    "file_00000000085461f7a49b88c1401dddc0.png",
    "file_00000000212061f5b3959c0489cb22ae.png",
    "memory7.jpg",
    "file_00000000b43462309beba30a7aac5a84.png",
    "file_0000000088dc622fb498905c377647d1.png",
    "file_00000000812861f494bc55b0fcfc45a9.png",
    "file_00000000946861faa85dd855d3eca2bb.png",

  ]
};

// Render profil
const nameEl = document.getElementById('name');
const bioEl = document.getElementById('bio');
const avatarEl = document.getElementById('avatar');
nameEl.textContent = PROFILE.name;
bioEl.textContent = PROFILE.bio;
avatarEl.src = PROFILE.avatar;

// Tahun otomatis
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Render links
const linksContainer = document.getElementById('linksContainer');
PROFILE.links.forEach(link => {
  const card = document.createElement('div');
  card.className = 'link-card';
  card.innerHTML = `<a href="${link.url}" target="_blank">${link.name}</a> <button class="btn copyBtn" data-url="${link.url}">Salin</button>`;
  linksContainer.appendChild(card);
});

// Copy link
const copyButtons = document.querySelectorAll('.copyBtn');
copyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.url);
    alert('Link disalin!');
  });
});

// Copy bio
const copyBioBtn = document.getElementById('copyBio');
if(copyBioBtn){
  copyBioBtn.addEventListener('click',()=>{
    navigator.clipboard.writeText(PROFILE.bio);
    alert('Bio disalin!');
  });
}

// Copy semua link
const copyAllBtn = document.getElementById('copyAllLinks');
if(copyAllBtn){
  copyAllBtn.addEventListener('click',()=>{
    const allLinks = PROFILE.links.map(l=>l.url).join("\n");
    navigator.clipboard.writeText(allLinks);
    alert('Semua link disalin!');
  });
}

// Render gallery
const gallery = document.getElementById('galleryContainer');
PROFILE.photos.forEach(url => {
  const img = document.createElement('img');
  img.src = url;
  img.addEventListener('click',()=>openLightbox(url));
  gallery.appendChild(img);
});

// Lightbox
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
const lightImg = document.createElement('img');
lightbox.appendChild(lightImg);
document.body.appendChild(lightbox);

function openLightbox(url){
  lightImg.src = url;
  lightbox.style.display='flex';
}
lightbox.addEventListener('click',()=>{
  lightbox.style.display='none';
});

// Share profile
const shareBtn = document.getElementById('shareProfile');
if(shareBtn && navigator.share){
  shareBtn.addEventListener('click',()=>{
    navigator.share({title:PROFILE.name,text:PROFILE.bio,url:window.location.href});
  });
} else if(shareBtn){
  shareBtn.addEventListener('click',()=>{
    alert('Fitur share tidak didukung di browser ini.');
  });
}

// Form kontak -> Google Sheets
const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'; // ganti dengan URL Apps Script
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('formMsg');

if(form){
  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(() => {
        msg.textContent = 'Pesan berhasil terkirim!';
        form.reset();
      })
      .catch(() => {
        msg.textContent = 'Gagal mengirim pesan!';
      });
  });
}
