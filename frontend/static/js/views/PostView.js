
import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("viewing posts")
    }
    async getHtml(){
        console.log(this.params.id)
        return `
        <h1>Post ${this.params.id}</h1>
    `
    }
    
}