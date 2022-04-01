const template = document.createElement('template')

template.innerHTML=`
    <style>
        *{
            padding: 0;
            margin: 0;
            font-family:Helvetica;
            font-size: 15px;
            transition: left 1s ease 0s;
        }
        #switch{
            transform: scale(1.3);
            display:inline-block;
            transition: left 1s ease 0s;
        }
       


        #switch__slider{
            left: -4px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: white;
            position: absolute;
            cursor: move;
            // border: 1px solid white;
            transition: left 1s ease 0s;
            box-shadow: inset 6px -5px 7px 10px rgb(124, 224, 85);

        .dark #switch__slider {
            border: 1px solid white;
        }

            

        }
        #switch__bar{
            background: black;
            width: 80px;
            // border: 1px solid black;
            display: flex;
            justify-content:space-between; 
            align-items: center;
            position: relative;
            border-radius: 30px;
            border: 1px solid grey;
            background: black;
            margin-top: 5px;
        }

        .dark #switch__bar{
            border: 1px solid rgb(187, 249, 174);
            background: black;
        }
           
        }
        // .morph #switch__bar{
        //     border: 1px solid red;
        // }
        .switch__anchor{
            width: 20px;
            height: 20px;
            border: 1px solid black;
            border-radius: 50%;
            background: rgb(16, 66, 2);
            // border: 1px solid green;
            box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden; 
            color:rgb(124, 224, 85);
           
        }
        .switch__anchor:hover{
            cursor:pointer;
        }
    </style>
    <div id="switch">
        
        <div id="switch__bar">
            <div  id="switch__slider">
            </div>
            <div id="left-anchor" class="switch__anchor">
                L
            </div>
            <div id="center-anchor" class="switch__anchor">
                M
            </div>
            <div id="right-anchor" class="switch__anchor">
                D
            </div>
        </div>

    </div>
`
class ModeSwitch extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.slider = this.shadowRoot.querySelector('#switch__slider')
        this.wrapper = this.shadowRoot.querySelector('#switch')
        
        
    }
    //THIS ATTACHES CLASS TO THE COMPONENT WRAPPER AFTER MODE CHANGED
    attachColormodeClass(){
        const colormode = this.getAttribute('colormode')
        this.shadowRoot.querySelector('#switch').setAttribute('class',`${colormode}`)

    }

    //TRIGGERS FUNCTIONS ON ATTR CHANGE

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('attr changed.', name, oldValue, newValue );
        this.attachColormodeClass()

        if(newValue === 'morph'){
            const anchors = this.shadowRoot.querySelectorAll('.switch__anchor')
            const secondAnchor = anchors[1]

            const anchorLeft = secondAnchor.offsetLeft
            const anchorWidth = secondAnchor.offsetWidth
            const sliderWidth = this.slider.offsetWidth

            const difference = (sliderWidth - anchorWidth)/2
            const sliderPos = anchorLeft - difference

            this.slider.style.left = `${sliderPos }px`  
        }
        if(newValue === 'dark'){
            const anchors = this.shadowRoot.querySelectorAll('.switch__anchor')
            const thirdAnchor = anchors[2]

            const anchorLeft = thirdAnchor.offsetLeft
            const anchorWidth = thirdAnchor.offsetWidth
            const sliderWidth = this.slider.offsetWidth

            const difference = (sliderWidth - anchorWidth)/2
            const sliderPos = anchorLeft - difference

            this.slider.style.left = `${sliderPos }px` 
        }
        
    }

    //ATTR CHANGE LISTENER
    static get observedAttributes() { return ['colormode']; }
    

    connectedCallback() {
        

        const sliderWidth = this.slider.offsetWidth
        const body = document.querySelector("body")


        //MOVE SLIDER TO THE CLICKED ANCHOR

        this.shadowRoot.querySelectorAll('.switch__anchor').forEach(anchor => {
            anchor.addEventListener('click', (e)=> {
                
                
                const barLeftOffset = this.shadowRoot.querySelector('#switch__bar').offsetLeft
                const barWidth = this.shadowRoot.querySelector('#switch__bar').offsetWidth

                const clickedAnchorWidth = e.target.offsetWidth
                const clickedAnchorLeft = e.target.offsetLeft
                
                
                const widthDifference = sliderWidth - clickedAnchorWidth
                console.log(widthDifference)
                this.slider.style.left = `${clickedAnchorLeft - (widthDifference/2) }px`

                if(e.target.id==='left-anchor'){
                    body.classList.remove('dark')
                    body.classList.remove('morph')
                    // this.wrapper.classList.remove('dark')
                    // this.wrapper.classList.remove('morph')
                    this.setAttribute('colormode','')
                    localStorage.removeItem('mode')
                   
                }
                if(e.target.id==='center-anchor'){
                    body.classList.remove('dark')
                    body.classList.add('morph')
                    // this.wrapper.classList.remove('dark')
                    // this.wrapper.classList.add('morph')
                    this.setAttribute('colormode','morph')
                    localStorage.setItem('mode', 'morph')
                }
                if(e.target.id==='right-anchor'){
                    body.classList.add('dark')
                    body.classList.remove('morph')
                    // this.wrapper.classList.add('dark')
                    // this.wrapper.classList.remove('morph')
                    this.setAttribute('colormode','dark')
                    localStorage.setItem('mode', 'dark')
                }
                
                
                
            })}); 


        this.shadowRoot.querySelector('#switch__slider').addEventListener('dragend', (e) => this.drop(e));
      }
}

window.customElements.define('mode-switch',ModeSwitch)