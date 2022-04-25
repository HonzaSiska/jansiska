//ADMIN


const addTlContentForm = document.querySelector('#add-tl-item-form')
const submitContentFormBtn = document.querySelector('#submit-tl-item-btn')
const updateFormBtn = document.querySelectorAll('.update-form-btn')
const error = document.querySelector('.error')

const getContent = async () => {
    const fetchedData = await fetch('/data')
    const parsedData = await fetchedData.json()
    console.log(parsedData)

    return parsedData
}

const renderContent = (data) => {
    const target = document.querySelector('#admin-content')
    let html =''

    length
    data.cz.forEach((item, index) => {
        html += `
    
        
        <form id="update-tl-item-form-${index}"  method="POST" action="/update/${index}" >
            <h1>${index + 1}</h1>

            <label>Rok</label> 
            <input type="text" name="year" id="year${index}" value="${item.year}" required>
            <br>
            <label>Title-CZ</label> 
            <input type="text" name="title_cz" id="title_cz${index}" value="${item.title}" required>
            <br>
            <label>Title-ES</label> 
            <input type="text" name="title_es" id="title_es${index}" value="${data.es[index].title}" required>
            <br>
            <label>Title-EN</label> 
            <input type="text" name="title_en" id="title_en${index}" value="${data.en[index].title}" required>
            <br>
            
            <label>Popis-CZ</label> 
            <textarea rows="10" cols="40" type="text" name="desc_cz" id="desc_cz${index}" required>${item.desc}</textarea>

            <label>Popis-ES</label> 
            <textarea rows="10" cols="40" type="text" name="desc_es" id="desc_es${index}" required>${data.es[index].desc}</textarea>

            <label>Popis-EN</label> 
            <textarea rows="10" cols="40" type="text" name="desc_en"  id="desc_en${index}" required>${data.en[index].desc}</textarea>

            <input style="background:blue;" data-index="${index}" class="update-form-btn" form="update-tl-item-form-${index}" type="submit" id="submit-tl-item-btn${index}">
    
        </form>
        <form id="tl-delete-form${index}" method="POST" action="/delete/${index}">
            <input style="background:red;padding: 10px; font-weight: bold;" type="submit" value="Delete-${index + 1}" form="tl-delete-form${index}" id="tl-delete-btn${index}">
        </form>
        <hr>
            
        `


    })
    target.innerHTML = html
    const updateFormBtn = document.querySelectorAll('.update-form-btn')
    updateFormBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            console.log('update')
            updateContent(e)
        })
    })
}
const addTlContent = async (e) => {
    const allFields = addTlContentForm.querySelectorAll('[type=text]')

    let isEmpty 
    
    allFields.forEach(field => {
        if(field.value === '') return isEmpty = true
        return isEmpty = false
    })

    if(isEmpty){
        return error.innerHTML='Vypln vsechna pole'    
    }

    //ADD TO DATABASE AND RETURN UPDATED DATA AND UPDATE DOM
    //FETCH

    const body = {}
    allFields.forEach(field => {
        const name = field.getAttribute('name')
        body[name] = field.value
    })

    const submittedData = await fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })

    const receivedData = await getContent()
    console.log(body)
    console.log(submittedData)
    console.log(receivedData)

    renderContent(receivedData)
    return error.innerHTML='PRIDANO'

    
}

var updateContent =  async (e) => {
    console.log(e.target)
    const tlIndex = e.target.getAttribute('data-index')
    console.log(tlIndex)
    const form = document.querySelector(`#update-tl-item-form-${tlIndex}`)
    const allFields = form.querySelectorAll('[type=text]')
    
    let isEmpty 
    
    allFields.forEach(field => {
        if(field.value === '') return isEmpty = true
        return isEmpty = false
    })

    if(isEmpty){
        return error.innerHTML='Vypln vsechna pole'    
    }

    //UPDATE AND RETURN UPDATED DATA AND UPDATE DOM
    //FETCH

    const body = {}
    allFields.forEach(field => {
        const name = field.getAttribute('name')
        body[name] = field.value
    })
    console.log(body)

    try{
        const submittedData = await fetch(`/update/${tlIndex}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        const result = await submittedData.json()
        console.log(result)
        renderContent (result)
        
    }catch(e){
        console.log(e)
    }

    

}



addEventListener('DOMContentLoaded', ()=> {
    submitContentFormBtn.addEventListener('click', (e)=> {
        e.preventDefault()
        return addTlContent()
        // return addTlContentForm.submit()

    })
    

    if(location.pathname === '/admin'){
        const content = getContent()
        .then(data => {
            renderContent(data)
        }).catch(e => alert(e))
    }   

})





