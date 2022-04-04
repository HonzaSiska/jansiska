import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle('Zivotopis')
    }
    async getHtml(){
        return `
            <nav class="nav">
                <a href="/" class="nav__link" data-link>Home</a>
                <a href="/resume/" class="nav__link" data-link>Resume</a> 
            </nav>
        
            <h1 class="title-stroke">Zivotopis !!</h1>

            <section id="tl-wrapper">
                <div class="tl-date-section">
                    <div class="tl-date-container">
                        <div class="date-circle">
                            <div class="date-circle-top">
                                1995
                            </div>
                            <div class="date-circle-middle">
                                -
                            </div>
                            <div class="date-circle-bottom">
                                1998
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="tl-desc-section">
                    <div class="tl-desc-section-left">
                       <div class="close-desc-section-btn">
                            <svg  class="close-desc-section-btn-img" fill="red" width="30" height="30" viewBox="0 0 8 8">
                            <path d="M4 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-1.5 1.78l1.5 1.5 1.5-1.5.72.72-1.5 1.5 1.5 1.5-.72.72-1.5-1.5-1.5 1.5-.72-.72 1.5-1.5-1.5-1.5.72-.72z" />
                            </svg>
                       </div>
                       <div class="triangle"></div>
                    </div>
                    <div class="tl-desc-section-right">
                        <div class="triangle-wrapper">
                            <div class="">
                            </div>
                        </div>
                        <div class="desc-wrapper">
                            <h2>1995 - 1998</h2>
                            <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse sagittis ultrices augue. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Aliquam erat volutpat. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante.
                            </p>
                        </div>
                    </div>
                </div>


                <div class="tl-date-section">
                    <div class="tl-date-container">
                        <div class="date-circle">
                            <div class="date-circle-top">
                                1995
                            </div>
                            <div class="date-circle-middle">
                                -
                            </div>
                            <div class="date-circle-bottom">
                                1998
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="tl-desc-section">
                    <div class="tl-desc-section-left">
                       <div class="close-desc-section-btn">
                            <svg  class="close-desc-section-btn-img" fill="red" width="30" height="30" viewBox="0 0 8 8">
                            <path d="M4 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-1.5 1.78l1.5 1.5 1.5-1.5.72.72-1.5 1.5 1.5 1.5-.72.72-1.5-1.5-1.5 1.5-.72-.72 1.5-1.5-1.5-1.5.72-.72z" />
                            </svg>
                       </div>
                       <div class="triangle"></div>
                    </div>
                    <div class="tl-desc-section-right">
                        <div class="triangle-wrapper">
                            <div class="">
                            </div>
                        </div>
                        <div class="desc-wrapper">
                            <h2>1995 - 1998</h2>
                            <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse sagittis ultrices augue. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Aliquam erat volutpat. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante.ortis a enim. Aliquam erat volutpat. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante.
                            </p>
                        </div>
                    </div>
                </div>



                <div class="tl-date-section">
                    <div class="tl-date-container">
                        <div class="date-circle">
                            
                        </div>
                    </div>
                </div> 
               
            </section>
            
            

            
        `
    }
}