import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle('Jan Siska')
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
                <a href="/" class="nav__link" data-link>Domů</a>
                <a href="/resume" class="nav__link" data-link>Zivotopis</a> 
            </nav>
            <h1 class="title-stroke">Vitej na me strance</h1>

            <main>
                <div class="description">
                    <p>${data.cz}</p>     
                </div>
            </main>
            
        `
    }
}