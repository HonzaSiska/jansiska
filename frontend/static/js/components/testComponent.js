const template = document.createElement('template')

template.innerHTML = `
    <div>
        <h1></h1>
        <a id="test-button">Click</a>
    </div>
`

class TestComponent extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.querySelector('h1').innerText = 'test';
        this.shadowRoot.querySelector('#test-button').setAttribute('href',this.getAttribute('link'))
        this.shadowRoot.querySelector('#test-button').innerText = this.getAttribute('buttontext')
    }
}
window.customElements.define('test-component', TestComponent)