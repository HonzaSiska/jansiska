import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle('Jan Siska')
    }
    async getHtml(){
        return `
            <nav class="nav">
                <a href="/" class="nav__link" data-link>Domů</a>
                <a href="/resume" class="nav__link" data-link>Zivotopis</a> 
            </nav>
            <h1 class="title-stroke">Vitej na me strance</h1>

            <main>
                <div class="description">
                    <p>
                    Donbas zahrnuje dnešní Doněckou a Luhanskou oblast, východní část Dněpropetrovské oblasti (okolí Pavlohradu) a také západní část Rostovské oblasti náležící k Ruské federaci. Na jihu zasahuje k Azovskému moři. Největším městem a centrem Donbasu, který je jednou z největších evropských aglomerací, je Doněck (1 milion obyvatel). Další velká města jsou Luhansk/rusky Lugansk (450 000), azovský přístav Mariupol (480 000), dále Makijivka/Makejevka (373 000), Horlivka/Gorlovka (275 000) a také ruské město Šachty (234 000) a jeho okolí.</p>
                </div>
            </main>
            
        `
    }
}