const fetchData = async (url) => {
    const data = await fetch(url)
    const parsedData = await data.json()
    console.log(parsedData)
    return parsedData
}

const renderData = async(url, language) => {
    const data = await fetchData(url)  
    const content = document.querySelector('#resume-content')
    // intro.innerHTML= data.data.cz[0].title

    
    
    const tl = data.data[language]
    const introduction = data.description[language].intro
    const tlTitle = data.description[language].tlTitle
    const eduTitle = data.description[language].eduTitle
    const skillsTitle = data.description[language].skillsTitle
    const education = data.description[language].education //array
    const skills = data.description[language].skills  //array


    let html = `
        <br>
        <p>${introduction}</p>
        <br>
        <h1>${tlTitle }</h1>
        <br>
        <ul>
    `

    tl.forEach(item => {
        html += `
            <li >
                <h3>${item.year} ${item.title}</h3>
                <p class="tl-list-item-text">${item.desc}</p>
            </li>
            <br>

            
        `
    })
    html += '</ul>'
    html += `
        <br><hr><br>
        <h1>${eduTitle}</h1>
        <br><ul>

    `

    education.forEach(edu => {
        html += `
        <li>
        <h3>${edu.title} </h3>
        <p>${edu.desc}</p>
    </li><br>
        `
    })
    html += '</ul>'

    html += `
    <br><hr><br>
    <h1>${skillsTitle}</h1>
    <br><ul>

`

    skills.forEach(skill => {
        html += `
        <li>
            - ${skill}
        </li>
        `
    })
    html += '</ul>'


    content.innerHTML = html

}


const langSelect = document.querySelector('#lang-select')

langSelect.addEventListener('change', (e) => {
    const target = e.target.value
    localStorage.setItem('lang', target)
    location.replace('/print')

})




if(window.location.pathname === '/print'){

    let language = localStorage.getItem('lang')

    let langMode
    switch (language) {
        case  null :
            langMode = 'cz'
            localStorage.setItem('lang','cz')
            break;
        case  '' :
            langMode = 'cz'
            localStorage.setItem('lang','cz')
            break;
        case  'cz' :
            langMode = 'cz'
            break;
        case  'en' :
            langMode = 'en'
            break;    
        case  'es' :
            langMode = 'es'
            break;
        default:
            langMode = 'cz';
    }

    //RESET DROPDOWN BASED ON SELECTED LANGUAGE AFTER REFRESH OR PAGE LOAD

    const options = langSelect.querySelectorAll('option')

    options.forEach(option => {
        if (option.value  === langMode){
            option.setAttribute('selected', true)
        }
    })
   
    
    renderData('/printdata',langMode)

}