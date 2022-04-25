const submitBtn = document.querySelector('#submit-description-btn')

//GET DATA WHEN PAGE LOADED
const getDescription = async() => {
    const cz = document.querySelector('#desc_cz')
    const en = document.querySelector('#desc_en')
    const es = document.querySelector('#desc_es')
    try {
        const json = await fetch('/descriptdata')
        const data = await json.json()
        
        cz.value = data.cz.intro
        en.value = data.en.intro
        es.value = data.es.intro
    } catch (err) {
        const error = document.querySelector('.error')
        error.innerText = 'Server Error !!'
        window.scrollTo(0,0)
    }
    
}

if(location.pathname === '/description'){
    getDescription()
}

//UPDATE DATA ON FORM SUBMIT

const updateDescription = async (e) => {
    e.preventDefault()
    const cz = document.querySelector('#desc_cz')
    const en = document.querySelector('#desc_en')
    const es = document.querySelector('#desc_es')

    const body = {}
    body.cz= cz.value
    body.en = en.value
    body.es = es.value

    try {
        const sentData = await fetch('/descriptupdate', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
            "content-type": "application/json",
            },
        })

        const data = await sentData.json()

        console.log(data)
        const error = document.querySelector('.error')
        error.innerText = ' SUCCESS !!'
        error.style.color = "green"
        window.scrollTo(0,0)

        console.log(data.cz.intro)

        cz.value = data.cz.intro
        en.value = data.en.intro
        es.value = data.es.intro
    } catch (err) {
        const error = document.querySelector('.error')
        error.innerText = ' STALA SE CHYBA !!'
        error.style.color = "red"
        window.scrollTo(0,0)
    }

    

}

submitBtn.addEventListener('click', updateDescription)