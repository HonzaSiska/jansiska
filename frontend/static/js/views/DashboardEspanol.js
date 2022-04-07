
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
                <a href="/es" class="nav__link" data-link>Inicio</a>
                <a href="/resume/es" class="nav__link" data-link>Currículum</a>
            </nav>
        
           
            <h1  class="title-stroke">Inicio</h1>
    `
    }
    
}