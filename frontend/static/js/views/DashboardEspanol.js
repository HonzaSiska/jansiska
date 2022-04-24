
import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Inicio")
    }

    async getData(){
        const data = await fetch('/introdata')
        const json = await data.json()
     
        return json
    }
    async getHtml(){
        const data = await this.getData()
        return `
        
            <nav class="nav">
                <a href="/es" class="nav__link" data-link>Inicio</a>
                <a href="/resume/es" class="nav__link" data-link>Currículum</a>
            </nav>
        
           
            <h1  class="title-stroke">Inicio</h1>
            <div class="description">
                <p>${data.es}</p>     
            </div>
    `
    }
    
}