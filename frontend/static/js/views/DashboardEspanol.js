
import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Inicio")
    }
    async getHtml(){
        // console.log(this.params.id)
        return `
            <nav class="nav">
                <a href="/en" class="nav__link" data-link>Home</a>
                <a href="/resume/en" class="nav__link" data-link>Resume</a> 
            </nav>
        
           
            <h1  class="title-stroke">Inicio</h1>
    `
    }
    
}