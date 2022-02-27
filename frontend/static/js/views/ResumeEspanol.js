import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle('Espanol Resume')
    }
    async getHtml(){
        return `
        <nav class="nav">
                <a href="/en" class="nav__link" data-link>Home</a>
                <a href="/resume/en" class="nav__link" data-link>Resume</a> 
            </nav>
           
            <h1>Espanol Resume</h1>  
            
        `
    }
}