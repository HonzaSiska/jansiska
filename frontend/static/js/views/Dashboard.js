import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle('Jan Siska')
    }
    async getHtml(){
        return `
            <nav class="nav">
                <a href="/" class="nav__link" data-link>Home</a>
                <a href="/resume" class="nav__link" data-link>Resume</a> 
            </nav>

            
            <h1 class="title-stroke">Vitej na me strance</h1>
            
        `
    }
}