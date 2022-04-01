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
        localStorage.setItem('lang',param)
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


// addEventListener('DOMContentLoaded', () => {
//     const paths = document.querySelectorAll('#logo path')

//     paths.forEach(path => {
//         console.log(path.getTotalLength()) 
//     })
// })

// CHANGE  LANGUAGE



//=======================
// THREE JS
//=======================

// Option 1: Import the entire three.js core library.
import * as THREE from '/build/three.module.js';
import vertexShader from '../shaders/vertex.js'
import fragmentShader from '../shaders/fragment.js'
import atmosphereVertexShader from '../shaders/atmosphereVertex.js'
import atmosphereFragmentShader from '../shaders/atmosphereFragment.js'



const scene = new THREE.Scene();



const camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight , 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    
})
renderer.setClearColor(0xffffff, 0);



renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)//for higher res
document.body.appendChild(renderer.domElement)

//CREATE A SPHERE
let earthSize  
if(window.matchMedia("(min-width: 920px)").matches) {
    earthSize = 5
}else{
    earthSize = 3.0
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
// camera.position.z = 10


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

camera.position.z = 10

// TO MOVE THE EARTH LATTERALY

// if(window.matchMedia("(min-width: 920px)").matches) {
//     camera.position.x = -2.5

// }


const mouse = {
    x: 1,
    y: 1
} 

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera) 
    sphere.rotation.y += 0.003
    
    

    //COMMENTED CODE IS FOR USE WITHOUT GSAP
    // group.rotation.y = mouse.x * 0.5
    // group.rotation.x =  mouse.y
    gsap.to(group.rotation, {
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



