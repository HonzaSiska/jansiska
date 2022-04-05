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
                        <div>
                            <div class="date-circle">
                                1994-1998
                            </div>
                            <div>
                                <svg data-id="0" class="carret-bottom" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 8 8">
                                <path class="carret-path" d="M0 0l4 4 4-4h-8z" transform="translate(0 2)" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div> 
                <div  data-desc="0" class="tl-desc-section">
                    <div class="tl-desc-section-left">
                       <div class="close-desc-section-btn" data-pointer="0">
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
                        <div data-descwrapper ="0" class="desc-wrapper">
                            <h2>HOTEL SLEZAN</h2>
                            <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse sagittis ultrices augue. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Aliquam erat volutpat. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante.
                            </p>
                        </div>
                    </div>
                </div>



                
                <div class="tl-date-section">
                    <div class="tl-date-container">
                        <div>
                            <div class="date-circle">
                                1998-2000
                            </div>
                            <div >
                                <svg data-id="1" class="carret-bottom" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 8 8">
                                <path class="carret-path" d="M0 0l4 4 4-4h-8z" transform="translate(0 2)" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div> 
                <div data-desc="1" class="tl-desc-section">
                    <div class="tl-desc-section-left" >
                       <div  class="close-desc-section-btn" data-pointer="1">
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
                        <div class="desc-wrapper" data-descwrapper ="1">
                            <h2>HOME OFFICE</h2>
                            <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse sagittis ultrices augue. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Aliquam erat volutpat. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante.ortis a enim. Aliquam erat volutpat. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante.
                            </p>
                        </div>
                    </div>
                </div>




                <div class="tl-date-section">
                    <div class="tl-date-container">
                        <div>
                            <div class="date-circle">
                                2000
                            </div>
                            <div >
                                <svg data-id="2" class="carret-bottom" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 8 8">
                                <path class="carret-path" d="M0 0l4 4 4-4h-8z" transform="translate(0 2)" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div> 
                <div data-desc="2" class="tl-desc-section">
                    <div class="tl-desc-section-left" >
                       <div  class="close-desc-section-btn" data-pointer="2">
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
                        <div class="desc-wrapper" data-descwrapper ="2">
                            <h2>SISKA BUILDING SYSTEM</h2>
                            <p>
                                
                            Trilingual and goal-oriented person with tremendous work ethic and strong communication skills. Developed strengths during a diverse career in various countries and career fields, valuable sales and small business management skills as a tropical fruit winery owner/operator. Proficient at using computers.

                            </p>
                        </div>
                    </div>
                </div>





                <div class="tl-date-section">
                    <div class="tl-date-container">
                        <div class="date-circle">
                            DNES
                        </div>
                       
                    </div>
                </div> 
               
            </section>
            
            

            
        `
    }
}