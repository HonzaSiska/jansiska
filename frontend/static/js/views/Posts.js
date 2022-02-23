import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle('Posts')
    }
    async getHtml(){
        return `
            <h1>Posts</h1>
            
            <p>
                <a href="/posts" data-link>View recent posts</a>
            </p>
            <p>
                <a href="/posts" data-link>View recent posts</a>
            </p>
            <p>
                <a href="/posts" data-link>View recent posts</a>
            </p>

            <test-component name="Component" link="/settings" buttontext="Settings"></test-component>
            

            
        `
    }
}