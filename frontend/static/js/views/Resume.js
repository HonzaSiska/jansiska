import AbstractView from './AbstractView.js'

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle('Zivotopis')
        
    }
    //GET DATA FROM JSON FILE
    async getData(){
        const  data = await fetch('/data')
     
        const parsedData = await data.json()
        console.log('parsed',parsedData)
        let html = `
        <nav class="nav">
            <a href="/" class="nav__link" data-link>Domů</a>
            <a href="/resume" class="nav__link" data-link>Zivotopis</a> 
        </nav>
        <h1 class="title-stroke">Zivotopis !!</h1>
        <div id="curriculum-intro" >
            <p>${parsedData.desc.cz.intro}</p>
        </div>
        <section id="tl-wrapper">
        `

        const cz = parsedData.data.cz
        const edu = parsedData.desc.cz

        cz.forEach((item, index) => {
            
            const { year, title, desc } = item
   
            html += `

            <div class="tl-date-section ">
                <div class="tl-date-container" >
                    <div>
                        <div class="date-circle">
                            ${year}
                        </div>
                        <div class="carret">
                            <svg  data-id="${index}" class="carret-bottom" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 8 8">
                            <path class="carret-path" d="M0 0l4 4 4-4h-8z" transform="translate(0 2)" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div> 
            <div  data-desc="${index}" class="tl-desc-section">
                <div class="tl-desc-section-left">
                <div class="close-desc-section-btn" data-pointer="${index}">
                        <svg  class="close-desc-section-btn-img" fill="red" width="30" height="30" viewBox="0 0 8 8">
                        <path d="M4 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-1.5 1.78l1.5 1.5 1.5-1.5.72.72-1.5 1.5 1.5 1.5-.72.72-1.5-1.5-1.5 1.5-.72-.72 1.5-1.5-1.5-1.5.72-.72z" />
                        </svg>
                </div>
                <div  class="triangle"></div>
                </div>
                <div class="tl-desc-section-right">
                    <div >
                        <div class="">
                        </div>
                    </div>
                    <div data-descwrapper ="${index}" class="desc-wrapper">
                        <h2>${title}</h2>
                        <p>
                        ${desc}
                        </p>
                    </div>
                </div>
            </div>
           
            `
            
        })

        //EDUCATION

        const educations = parsedData.desc.cz.education
        const skills = parsedData.desc.cz.skills
        const skillsTitle = parsedData.desc.cz.skillsTitle

        

        html += `
            <div class="tl-date-section">
                <div class="tl-date-container">
                    <div class="date-circle">
                        DNES
                    </div>
                
                </div>
            </div> 
            <div class="edu-section">
                <div class="edu-title"><h2>${edu.eduTitle}</h2></div>
            </div>
        `
        educations.forEach(edu => {
            html+= `<div class="edu-item">
                <h3>${edu.title}</h3>
                <p>${edu.desc}</p>
            </div>`
        })

        html+=`
        
            <div class="edu-section">
                <div class="edu-title"><h2>${skillsTitle}</h2></div>
            </div>

        `
        skills.forEach(skill => {
            html+= `<ul class="edu-item">
                
                <p>${skill}</p>
            </ul>`
        })

        html+=`</section>`
        
        
        return html

    }
    async getHtml(){

        let data = await this.getData()
        
        return data
    }
}