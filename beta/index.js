/* Smooth Scrolling */
const btnScrollTo = (elementId) => {
    document.getElementById(elementId).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
    });
};

/* Dynamic Content - About Me */
fetch('data/about.json')
    .then(response => response.json())
    .then(data => {
        let html = "";
        data.forEach(d => {
            html += `
                <div class="aboutme-section forward">
                    <a class="aboutme-img-wrapper" href="` + d.link + `" target="_blank">
                        <img class="aboutme-img" src="` + d.image + `" alt="` + d.altText + `"/>
                    </a>
                    <div class="aboutme-content">
                        <h2>` + d.name + `</h2>
                        <p>` + d.description + `</p>
                    </div>
                </div>
            `;
        })
        document.getElementById('aboutme-container').innerHTML = html;
    });

/* Dynamic Content - Portfolio */
fetch('data/portfolio.json')
    .then(response => response.json())
    .then(data => {
        let html = "";
        let forward = true;
        data.forEach(d => {
            let techUsed = '';
            let order = 1;
            d.technologies?.forEach(t => {
                techUsed += `<img class="logo" style="--order: ` + (order++) + `; --direction: ` + (forward? "-1": "1") + `" src="` + t.image + `" alt="` + t.altText + `" title="` + t.altText + `" />`;
            });

            html += `
                <div class="portfolio-section forward">
                    <a class="portfolio-img-wrapper" href="` + d.link + `" target="_blank">
                        <img class="portfolio-img" src="` + d.image + `" alt="` + d.altText + `" />
                    </a>
                    <div class="portfolio-content">
                        <h2>` + d.name + `</h2>
                        <h4><b>` + d.jobTitle + `</b> (` + d.years + `)</h4>
                        <p>` + d.description + `</p>
                        <h3>Technologies Used:</h3>
                        <div class="logo-container">` + techUsed + `</div>
                    </div>
                </div>
            `;

            forward = !forward;
        })
        document.getElementById('portfolio-container').innerHTML = html;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
                else {
                    entry.target.classList.remove('show');
                }
            });
        });
        const hiddenElements = document.querySelectorAll('.logo');
        hiddenElements.forEach(el => observer.observe(el));
    });