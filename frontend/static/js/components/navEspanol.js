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
        <a href="/es" class="nav__link" data-link>Home</a>
        <a href="/resume/es" class="nav__link" data-link>Resume</a>
        
    </nav>
`

class EspanolNav extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
window.customElements.define('nav-espanol',EspanolNav)