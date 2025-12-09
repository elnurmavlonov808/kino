 
const db = {
    tarjima: [
        { title: "Jolli: Yuridik fanlar bakalavri 3", img: "https://images.uzmovi.tv/2025-12-04/3f840e6b21ad70d70d374e17b9c58f22.jpg", genre: "komediya" },
        { title: "Gedda", img: "https://images.uzmovi.tv/2025-12-02/0876c8c468db2dddd86430165071d576.jpg", genre: "jangari" },
        { title: "Ako qasri", img: "https://images.uzmovi.tv/2025-12-02/7879ba4f2b7fd5986d81a388e73bbcf8.jpg", genre: "drama" },
        { title: "OLTIN KARVONI", img: "https://images.uzmovi.tv/2025-12-05/81b7e52a30156040ee26f3750efa4c87.jpg", genre: "jangari" },
        { title: "NOQONUNIY/NIKOHSIZ TUG'ILGAN", img: "https://images.uzmovi.tv/2025-12-05/f0f369eb370cb330fc9b2bb71dcba167.jpg", genre: "drama" },
        { title: "XATARLI TA'TIL", img: "https://images.uzmovi.tv/2025-11-28/74e11984e24dad9557bf1c41d5136ed4.jpg", genre: "triller" }
    ],

    hind: [
        { title: "Jolli: Yuridik fanlar", img: "https://images.uzmovi.tv/2025-12-04/d0785bb29ec356455909a054c2a5170a.jpg", genre: "komediya" },
        { title: "CHIN QADRIYATLAR", img: "https://images.uzmovi.tv/2025-12-02/c19dba78ddcedb6a329dc4be38e848f4.jpg", genre: "drama" },
        { title: "AYYOR QIZ", img: "https://images.uzmovi.tv/2025-11-28/5b8a5159d0010e7b5a2a8b574e9114c0.jpg", genre: "komediya" },
        { title: "ISHQPARASTLAR", img: "https://images.uzmovi.tv/2025-11-28/a87327e79f55e5975d422eab5613f8b6.jpg", genre: "romantika" }
    ],

    serial: [
        { title: "G'ALATI NARSALAR 5", img: "https://images.uzmovi.tv/2025-11-28/123c289c8326f515d0f45cf2d0000dbf.jpg", genre: "fantastika" },
        { title: "G'AROYIB ADVOKAT VU", img: "https://images.uzmovi.tv/2025-11-25/d4638b2dc58455c70d4c27456b61eca3.jpg", genre: "drama" },
        { title: "Daxshatli o'qituvchi serial barcha qismlari uzbek o'zbek tilida", img: "https://images.uzmovi.tv/2025-11-25/9308ae4d4e9bc96a05401eddd9fd2dfa.jpg", genre: "triller" },
        { title: "Gangnamning boshqa ikkinchi tomoni serial barcha qismlari uzbek o'zbek tilida", img: "https://images.uzmovi.tv/2025-11-25/6b24108c5194bd4a581631c394d3912b.jpg", genre: "triller" }
    ],

    multfilm: [
        { title: "Marvel zombilari", img: "https://images.uzmovi.tv/2025-10-01/a3758303ac1f0c43802fd85b3e719d58.jpg", rating: "8.4" },
        { title: "Hayvonlar shahri 2", img: "https://images.uzmovi.tv/2025-12-03/d16374cf769e2ee64b559890c65d3a80.jpg", rating: "9.1" },
        { title: "O'lik kelin", img: "https://images.uzmovi.tv/2025-10-02/43510619aae1b0f671fdba05da96da99.jpg", rating: "8.7" }
    ]
};
   

   

function createMultfilmCarousel() {
    const carousel = document.getElementById("multfilmCarousel");
    if (!carousel || !db.multfilm || db.multfilm.length === 0) return;

    const indicators = carousel.querySelector('.carousel-indicators');
    const inner = carousel.querySelector('.carousel-inner');

   
    indicators.innerHTML = '';
    inner.innerHTML = '';

    db.multfilm.forEach((film, index) => {
      
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.dataset.bsTarget = '#multfilmCarousel';
        btn.dataset.bsSlideTo = index;
        if (index === 0) btn.classList.add('active');
        indicators.appendChild(btn);

        
        const item = document.createElement('div');
        item.className = 'carousel-item' + (index === 0 ? ' active' : '');

        item.innerHTML = `
            <img src="${film.img}" 
                 class="d-block w-100" 
                 alt="${film.title}"
                 loading="lazy"
                 onerror="this.src='https://via.placeholder.com/1200x600?text=Multfilm+Rasm+Topilmadi';">
            ${film.rating ? `<div class="rating-badge">⭐ ${film.rating}</div>` : ''}
            <div class="carousel-caption d-none d-md-block">
                <h5>${film.title}</h5>
                ${film.rating ? `<p>Reyting: ${film.rating}/10</p>` : ''}
            </div>
        `;
        inner.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    if (typeof db === 'undefined') return;

    const app = document.getElementById("app");
    const multfilmNewsSection = document.querySelector('.new-content-layout');

    let currentFilter = { type: 'home', value: null }; 


    document.querySelectorAll('[data-section], [data-genre]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            
            document.querySelectorAll('.nav-link, .dropdown-item').forEach(el => el.classList.remove('active'));
            this.classList.add('active');

            const section = this.getAttribute('data-section');
            const genre = this.getAttribute('data-genre');

            if (section) {
                currentFilter = { type: 'section', value: section };
                filterContent(section);
            } else if (genre) {
                currentFilter = { type: 'genre', value: genre };
                filterByGenre(genre);
            }
        });
    });
    
    filterContent('home');
    document.querySelector('[data-section="home"]').classList.add('active');

    function filterContent(section) {
        app.innerHTML = '';
        multfilmNewsSection.style.display = 'block';

        if (section === 'home') {
            createSection("Tarjima Kinolar", db.tarjima);
            createSection("Seriallar", db.serial);
            createSection("Hind Kinolari", db.hind);
        } 
        else if (section === 'tarjima') { createSection("Tarjima Kinolar", db.tarjima); multfilmNewsSection.style.display = 'none'; }
        else if (section === 'hind')    { createSection("Hind Kinolari", db.hind); multfilmNewsSection.style.display = 'none'; }
        else if (section === 'serial')   { createSection("Seriallar", db.serial); multfilmNewsSection.style.display = 'none'; }
        else if (section === 'news')    { app.innerHTML = ''; multfilmNewsSection.style.display = 'block'; }
    }

    function filterByGenre(genre) {
        app.innerHTML = '';
        multfilmNewsSection.style.display = 'none';

        const filtered = [];

    
        if (db.tarjima) filtered.push(...db.tarjima.filter(m => m.genre === genre));
        if (db.hind) filtered.push(...db.hind.filter(m => m.genre === genre));
        if (db.serial) filtered.push(...db.serial.filter(m => m.genre === genre));

        if (filtered.length > 0) {
            createSection(`${genre.charAt(0).toUpperCase() + genre.slice(1)} filmlar`, filtered);
        } else {
            app.innerHTML = `<h3 style="color:white; text-align:center; padding:50px;">Bu janrda film topilmadi</h3>`;
        }
    }

    function createSection(title, movies) {
        if (!movies || movies.length === 0) return;

        const h3 = document.createElement('h3');
        h3.className = 'section-title';
        h3.innerHTML = '| ' + title;
        app.appendChild(h3);

        const row = document.createElement('div');
        row.className = 'row g-4 mb-5';

        movies.forEach(m => {
            const col = document.createElement('div');
            col.className = 'col-6 col-md-4 col-lg-3';
            col.innerHTML = `
                <div class="movie-card">
                    <img src="${m.img}" class="movie-img" alt="${m.title}" loading="lazy">
                    <div class="movie-title-container">
                        <p class="movie-title">${m.title}</p>
                    </div>
                </div>
            `;
            row.appendChild(col);
        });

        app.appendChild(row);
    }

   
    createMultfilmCarousel();
});