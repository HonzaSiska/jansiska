
import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Home")
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
            <a href="/en" class="nav__link" data-link>Home</a>
            <a href="/resume/en" class="nav__link" data-link>Resume</a> 
        </nav>
      
        <h1 class="title-stroke">Dashboard English</h1>

        <div class="description">
            <p>${data.en}</p>     
        </div>
    `
    }
    
}