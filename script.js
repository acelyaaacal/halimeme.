// --- 1. Arka Plana Pembe Kalpler Ekleme ---
const heartsBg = id('heartsBg');
for (let i = 0; i < 25; i++) {
    const heart = document.createElement('div');
    heart.className = 'bg-heart';
    heart.innerHTML = '♥';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    heartsBg.appendChild(heart);
}

// --- Mektup Metni (Buraya kendi özel mesajını yazabilirsin) ---
const messageText = `Canım Arkadaşım,\n\nÖzel sebeplerden dolayı bu mutlu gününde yanında olamadım, bunun için gerçekten çok üzgünüm... Ama bil ki kalbim ve aklım tamamen seninle!\n\nYeni yaşında dilediğin tüm güzellikler seni bulsun. İyi ki hayatımdasın, iyi ki en yakın arkadaşımsın. Doğum günün kutlu olsun! ve son olarak eklemek istediğim bir şey var. kendimi ne zaman kaybolmuş hissettiğim de, yanımda oldun ve destek oldun. bu yüzden sana ne kadar minnettar oldugumu kelimelerle anlatmam imkansız. sadece şunu söylemek isterim ki, iyi ki varsın ve benim bacımsın. bu küçük hediyeyi de umarım beğenirsin, doğum gününden bir kaç gün sonra atabildim bunun için kusura bakma daha kod yazmada yeniyim :( burada emoji koyamıyorum PUADHAJKDKHA bos yaptım hehe neyse seni cok seviyotrum İYİ Kİ VARSIN!`;

function id(elemId) { return document.getElementById(elemId); }

// --- 2. Hediye Kutusunu Açma İşlemi ---
function openGift() {
    const gift = id('giftWrapper');
    gift.style.opacity = '0';
    gift.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        gift.style.display = 'none';
        const letter = id('letterContainer');
        letter.style.display = 'flex';
        setTimeout(() => letter.classList.add('show'), 50);
        
        // Kelime kelime yazdırma başlat
        typeWords(messageText, id('letterText'), 150);
    }, 500);
}

// Kelime Kelime Yazdırma Fonksiyonu
function typeWords(text, element, speed) {
    const words = text.split(' ');
    let index = 0;
    
    function printWord() {
        if (index < words.length) {
            element.innerHTML += words[index] + ' ';
            index++;
            setTimeout(printWord, speed);
        } else {
            // Yazı bitince butonu göster
            const btn = id('nextBtn');
            btn.style.display = 'block';
        }
    }
    printWord();
}

// --- 3. Gece Mavisi ve Yıldızlar Aşaması ---
function startNightPhase() {
    // Arka planı değiştir
    document.body.style.backgroundColor = '#0a0e27'; // Derin gece mavisi
    id('heartsBg').style.display = 'none';
    id('letterContainer').style.display = 'none';

    // Yıldızları Oluştur
    const starsBg = id('starsBg');
    starsBg.style.display = 'block';
    for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = (Math.random() * 3 + 1) + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.setProperty('--duration', (Math.random() * 1.5 + 0.5) + 's');
        starsBg.appendChild(star);
    }

    // Kalp Çizimini Başlat
    id('canvasContainer').style.display = 'flex';
    drawAnimatedHeart();
}

// --- Matematiksel Fonksiyon ile Kalp Çizimi ---
function drawAnimatedHeart() {
    const canvas = id('heartCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.strokeStyle = '#ff758f';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    let t = 0;
    const speed = 0.05;

    function animate() {
        if (t <= Math.PI * 2) {
            // Kalbin matematiksel parametrik denklemi
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));

            // Ekran ortasına ölçekleme
            const cx = width / 2 + x * 8;
            const cy = height / 2 + y * 8 - 10;

            if (t === 0) {
                ctx.beginPath();
                ctx.moveTo(cx, cy);
            } else {
                ctx.lineTo(cx, cy);
                ctx.stroke();
            }

            t += speed;
            requestAnimationFrame(animate);
        } else {
            // Çizim tamamlandığında mesajı göster
            id('finalMsg').style.opacity = '1';
        }
    }
    animate();
}
