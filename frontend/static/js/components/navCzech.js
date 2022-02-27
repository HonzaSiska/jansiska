const template = document.createElement('template')

template.innerHTML=`
    <style>
        .nav__link {
            display: block;
            padding: 12px 18px;
            text-decoration: none;
            color: rgb(81, 145, 8);
            font-weight: 500;
        },
    </style>
    <nav class="nav">
        <a href="/" class="nav__link" data-link>Hlavní stránka</a>
        <a href="/resume" class="nav__link" data-link>životopis</a>
        
    </nav>
`

class CzechNav extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    // navigateTo = url => {
    //     history.pushState(null, null, url);
    //     router();
    // }
    // connectedCallback() {
    //     this.shadowRoot.querySelectorAll('.nav__link').forEach(link => {
    //         link.addEventListener('click',e => {
    //             e.preventDefault();
    //             this.navigateTo(e.target.href);
    //         })
    //     })
    // }

}
window.customElements.define('nav-czech',CzechNav)