const template = document.createElement('template')

template.innerHTML=`
<style>
    #pop-up{
        border: 3px solid rgb(8, 83, 108); 
        border-radius: 5px;
        background: rgb(0, 0, 0);
        color: rgb(0, 246, 255);
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100px;
        width: 200px;
        box-shadow: 0px 10px 35px -3px rgb(0, 246, 255, 0.8);
    }
</style>
<div>
<div id='pop-up'>
    <div id="pop-up-content">
        TOHLE JE POPUP
    </div>
</div>
</div>

`

class PopUp extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));


    }
    //THIS ATTACHES CLASS TO THE COMPONENT WRAPPER AFTER MODE CHANGED
    setTextContent(){
        const textContent = this.getAttribute('text')
        this.shadowRoot.querySelector('#pop-up-content').innerHTML=`${textContent}`

    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('attr changed.', name, oldValue, newValue );
        this.setTextContent()

        //document.querySelector('pop-up').setAttribute('text', 'TESTING')

        // if(newValue === 'morph'){
        //     const anchors = this.shadowRoot.querySelectorAll('.switch__anchor')
        //     const secondAnchor = anchors[1]

        //     const anchorLeft = secondAnchor.offsetLeft
        //     const anchorWidth = secondAnchor.offsetWidth
        //     const sliderWidth = this.slider.offsetWidth

        //     const difference = (sliderWidth - anchorWidth)/2
        //     const sliderPos = anchorLeft - difference

        //     this.slider.style.left = `${sliderPos }px`  
        // }
        // if(newValue === 'dark'){
        //     const anchors = this.shadowRoot.querySelectorAll('.switch__anchor')
        //     const thirdAnchor = anchors[2]

        //     const anchorLeft = thirdAnchor.offsetLeft
        //     const anchorWidth = thirdAnchor.offsetWidth
        //     const sliderWidth = this.slider.offsetWidth

        //     const difference = (sliderWidth - anchorWidth)/2
        //     const sliderPos = anchorLeft - difference

        //     this.slider.style.left = `${sliderPos }px` 
        // }
        
    }
    //ATTR CHANGE LISTENER
    static get observedAttributes() { return ['text']; }
}
window.customElements.define('pop-up',PopUp)