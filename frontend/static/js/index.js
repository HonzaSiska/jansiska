import Dashboard from "./views/Dashboard.js";
import Resume from "./views/Resume.js";
import DashboardEnglish from "./views/DashboardEnglish.js";
import ResumeEnglish from "./views/ResumeEnglish.js";
import DashboardEspanol from "./views/DashboardEspanol.js";
import ResumeEspanol from "./views/ResumeEspanol.js";

import  "./components/switch.js"
import  "./components/navEnglish.js"
import  "./components/navEspanol.js"
import  "./components/navCzech.js"



const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Dashboard },
        { path: "/resume", view: Resume },
        { path: "/en", view: DashboardEnglish },
        { path: "/resume/en", view: ResumeEnglish },
        { path: "/es", view: DashboardEspanol },
        { path: "/resume/es", view: ResumeEspanol }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();

    
});




const body = document.querySelector('body')
addEventListener('DOMContentLoaded', () => {


    
    const getMode = localStorage.getItem('mode')
    console.log('local storage',getMode)
    
    if(getMode){
        document.querySelector('mode-switch').setAttribute('colormode', getMode)
        body.classList.add(`${getMode}`)
    }else{
        document.querySelector('mode-switch').setAttribute('colormode', 'dark')
        body.classList.add(`dark`)
    }

    /// LANGUAGES SELECTION
    const params = window.location.pathname.split('/')
    const param = params[params.length-1]

    //AUTO REDIRECT TO LANGUAGE IF LANGUAGE PARAM EXIST IN THE URL
    let language = localStorage.getItem('lang')
    if(!language && param ==="es"){
        localStorage.setItem('lang','es')

    }else if(!language && param ==='en'){
        localStorage.setItem('lang','en')
    }else{
        if(param ==='resume'){
            localStorage.setItem('lang','')
        }else{
            localStorage.setItem('lang',param)
        }
        
    }
    //GET LANGUAGE AGAIN IN CASE IT WAS UPDATED ABOVE
    language = localStorage.getItem('lang')

    const languageBar = document.querySelector('#language-selector')
    const anchors = document.querySelectorAll('.language-selector-anchor')

    
    
    // MAKE LANGUAGES INVISIBLE FIRST AND THEN MAKE VISIBLE BASED ON URL
    anchors.forEach(anchor => {
        let langAnchor = anchor.getAttribute('data-url')
     
        anchor.removeAttribute('data-active')  
        console.log('link', langAnchor)
        console.log('language', language)
        if(langAnchor === '/' + language || (langAnchor === '/' && language===null)){ 
            anchor.setAttribute('data-active','')
        }
    })

    const redirectToLanguage = anchor => {
        if(anchor.dataset.url === ''){
            localStorage.removeItem('lang') 
        }else{
            localStorage.setItem('lang', anchor.dataset.url.replace('/',''))
        }
       
        location.replace(anchor.dataset.url)
    }

    //FUNCTION ADS LINK TO EACH LANGUAGE     
    const setLangRedirect = () => {
        anchors.forEach(anchor => {
            //THIS DIMS LANGUAGES IN THE SELECTION WE ARE NOT CURRENTLY ON
            if(language !== anchor.dataset.url.replace('/','')){ anchor.style.opacity='0.5'
            }
        
            anchor.addEventListener('click', () => {
                redirectToLanguage(anchor)
            })
        })
    }

     //SHOW ALL LANGUAGES
     const showAllLanguages = () => {
        anchors.forEach(anchor => {
            anchor.setAttribute('data-active','')
            languageBar.removeEventListener

        })
        setLangRedirect()
    }
    languageBar.addEventListener('click', showAllLanguages)

    

})


//TIMELINE OPEN / CLOSE

const app = document.querySelector('#app')
app.addEventListener('mousemove', () => {
    

    // OPEN ON CARRET CLICK
    
    const carrets = app.querySelectorAll('.carret-bottom')

    carrets.forEach((carret)=> {
        
        const id = carret.getAttribute('data-id')
        carret.addEventListener('click', (e) => {
            const descSection = document.querySelector(`[data-desc="${id}"]`)
            // descSection.style.transition="all 300ms ease-in"
            descSection.style.height="auto"
            descSection.style.overflow="visible"
            carret.style.visibility="hidden"
            const descSectionWrapper = document.querySelector(`[data-descwrapper="${id}"]`)
            console.log('desc', descSectionWrapper)
            descSectionWrapper.style.border='1px solid var(--light-blue)'
            const pointer = document.querySelector(`[data-pointer="${id}"]`)
            
            pointer.style.animation="flash 1s 3"
            
        })
    })

    // CLOSE ON POINTER CLICK
    const pointers = app.querySelectorAll('.close-desc-section-btn')

    pointers.forEach(pointer => {
        
        pointer.addEventListener('click', (e)=> {
            const id = pointer.getAttribute('data-pointer')
            const descSection = document.querySelector(`[data-desc="${id}"]`)
            const carret = document.querySelector(`[data-id="${id}"]`)
            descSection.style.height="0px"
            descSection.style.overflow="hidden"
            carret.style.visibility="visible"

            const descSectionWrapper = document.querySelector(`[data-descwrapper="${id}"]`)
            descSectionWrapper.style.border='none'
            
        })
    })
})





//=======================
// THREE JS
//=======================

// Option 1: Import the entire three.js core library.
import * as THREE from '/build/three.module.js';
import vertexShader from '../shaders/vertex.js'
import fragmentShader from '../shaders/fragment.js'
import atmosphereVertexShader from '../shaders/atmosphereVertex.js'
import atmosphereFragmentShader from '../shaders/atmosphereFragment.js'
// import { Float32BufferAttribute } from "three";



const scene = new THREE.Scene();

const canvasContainer = document.querySelector('#canvas-wrapper')

const camera = new THREE.PerspectiveCamera(50, canvasContainer.offsetWidth / canvasContainer.offsetHeight , 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    canvas: document.querySelector('canvas'),
    antialias: true,
    
})


renderer.setClearColor(0xffffff, 0);


console.log(canvasContainer)
renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight)
renderer.setPixelRatio(window.devicePixelRatio)//for higher res
// document.body.appendChild(renderer.domElement)

//CREATE A SPHERE
let earthSize  
if(window.matchMedia("(min-width: 920px)").matches) {
    earthSize = 5
}else{
    earthSize = 3.5
}


let sphereImage  = '../img/earth2.jpg'


const sphere = new THREE.Mesh(new THREE.SphereGeometry(earthSize, 50, 50), new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader, 
    uniforms: {
        globeTexture: {
            // value: new THREE.TextureLoader().load('../img/earth.jpg')
            value: new THREE.TextureLoader().load(sphereImage)
        }
    }
}))


// scene.add(sphere) //used if group is not used
//camera.position.z = 10


//ATMOSPHERE

const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(earthSize, 50, 50), new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader, 
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
    
}))

atmosphere.scale.set(1.1, 1.1, 1.1)
// scene.add(atmosphere)  //used if group is not used

const group = new THREE.Group()
group.add(sphere)
group.add(atmosphere)
scene.add(group)

const starGeometry = new THREE.BufferGeometry()
let starColor 

if(document.body.classList.contains('dark')) {
    starColor = '#92e571'
}else{
    starColor = '#008000'
}
const starMaterial = new THREE.PointsMaterial({
    color: starColor
})
// #008000
const stars = new THREE.Points(starGeometry, starMaterial)

const starVertices = []
for (let i = 0; i < 50000; i++){
    const x = (Math.random() - 0.5) * 2000
    const y = (Math.random() - 0.5) * 2000
    const z = -Math.random() * 500
    starVertices.push(x,y,z)
    
}
starGeometry.setAttribute('position',new THREE.Float32BufferAttribute(starVertices, 3))

scene.add(stars)
console.log(stars)
console.log(starVertices)
camera.position.z = 10

// TO MOVE THE EARTH LATTERALY

// if(window.matchMedia("(max-width: 920px)").matches) {
//     camera.position.x = -2

// }


const mouse = {
    x: 1,
    y: 1
} 

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera) 
    sphere.rotation.y += 0.004
    
    

    //COMMENTED CODE IS FOR USE WITHOUT GSAP
    // group.rotation.y = mouse.x * 0.5
    // group.rotation.x =  mouse.y
    gsap.to(group.rotation, {
        // x: -mouse.y * 0.5,
        y: mouse.x * 0.5,
        duration: 2

    })
}
animate()


addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1
    mouse.y = (event.clientY / innerHeight) * 2 + 1
    // console.log(mouse)
})



