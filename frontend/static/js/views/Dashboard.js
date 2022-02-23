import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle('Dashboard')
    }
    async getHtml(){
        return `
            <h1>Welcome to single page app - dashboard</h1>
            <p>this is a single page javascript tutorial</p>
            <p>
                <a href="/posts" data-link>View recent posts</a>
            </p>
            
        `
    }
}