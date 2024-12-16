const screenAspectRatio = screen.width / screen.height;
const main_container = document.getElementById('main-container');
const background = document.getElementById('background');
const aspectRatioInfo = document.getElementById('aspectRatioInfo');
const ambiente = document.getElementById('ambiente');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
ambiente.volume = 0.0;
ambiente.loop = true;
ambiente.play();

//Función para cambiar fondo en main-container según aspecto de pantalla
aspectRatioInfo.innerHTML = screen.orientation.type + ": " + screenAspectRatio.toFixed(2);
screen.orientation.onchange = function(){
    aspectRatioInfo.innerHTML = screen.orientation.type + ": " + screenAspectRatio.toFixed(2);
};

// Function to handle visibility change 
function handleVisibilityChange() { 
    if (document.hidden) { 
        console.log("The page is in the background."); 
        ambiente.pause();
    } else { 
        console.log("The page is active."); 
        ambiente.currentTime = 0;
        ambiente.play()
    };
}; 
// Add event listeners for visibility change 
document.addEventListener("visibilitychange", handleVisibilityChange, false); 
handleVisibilityChange(); 
   

const mainLinks = document.getElementsByName('link'); 
const containers = document.getElementsByClassName('container');


for(let i = 0; i < mainLinks.length; i++){
    mainLinks[i].onclick = function(e) {
        button2.play();
        openContainer(containers[i], i);
    };
   
};


function openContainer(container, index) {
    
    //cierra cualquier posible container que haya quedado abierto ej. irizar
    for(let i = 0; i < containers.length; i++){
        if(i != index){
            containers[i].style.display = "none"; 
        };
    };
    const x = container.getElementsByClassName('x');
    main_container.style.filter = 'blur(5px)' ; // blurea el fondo

    container.style.display = 'block';
    const audioIcons = container.getElementsByClassName('audio-icon');
    const audios = container.getElementsByTagName('audio');
    if(audios.length != 0 || audioIcons.length != 0){
        const isPlaying = [];
        for(let i=0; i < audios.length; i++){
                isPlaying.push(false);
                audioIcons[i].onclick = function() {
                    for(let n = 0; n < audios.length; n++){
                        audios[n].pause();
                    }
                    if(isPlaying[i]){
                        audios[i].pause();
                        ambiente.play();
                    }else{
                        audios[i].play();
                        ambiente.pause();
                    }
                };
                audios[i].onplaying = function() {
                    isPlaying[i] = true;
                    audioIcons[i].src = 'GifAnimados/Sound_animation(transp).gif';
                };
                audios[i].onpause = function() {
                    isPlaying[i] = false;
                    audioIcons[i].src = 'Fotos/Play.png';
                };
                x[0].onclick = function(){
                    container.style.display = "none";
                    for(let n = 0; n < audios.length; n++){
                        audios[n].pause();
                        audios[i].currentTime = 0;
                    }
                    main_container.style.filter = 'blur(0px)'; 
                    button1.play(); 
                    ambiente.play();
                };            
        };
    } else {
        if(audioIcons.length == 0){
            console.log(x);
            x[0].onclick = function(){
                container.style.display = "none";
                main_container.style.filter = 'blur(0px)';  
                button1.play(); 
            };
        };
    };
}

//SCREEN SAVER
let inactivityTime = 8000; // 5 seconds of inactivity to start screensaver  
let snowflakes = [];
let screensaverActive = false; 
let timeout;
let snowflakeInterval;

// Create snowflake  
function createSnowflake() {
    const zIndex = Math.trunc(Math.random() * 10);
    const blur = 10 * (1/zIndex);
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄';
    snowflake.style.left = `${Math.random() * window.innerWidth}px`;
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = `${Math.random() * 1.5 + 0.5}em`;
    snowflake.style.filter = `blur(${blur}px)`;
    snowflake.style.zIndex = zIndex;
    document.body.appendChild(snowflake);
    snowflakes.push(snowflake);
    dropSnowflake(snowflake);
}

// Drop snowflake  
function dropSnowflake(snowflake) {
    const fallDuration = Math.random() * 3 + 2;
    snowflake.style.transition = `top ${fallDuration}s linear`;
    snowflake.style.top = `${-50}px`;
    setTimeout(() => {
        snowflake.style.top = `${window.innerHeight}px`;
    }, 50);

    setTimeout(() => {
        snowflake.remove();
        snowflakes = snowflakes.filter(s => s !== snowflake);
    }, fallDuration * 1000);
}

// Start screensaver  
function startScreensaver() {
    if (!screensaverActive) {
        screensaverActive = true;
        snowflakeInterval = setInterval(createSnowflake, 200);
    }
}

// Stop screensaver  
function stopScreensaver() {
    if (screensaverActive) {
        screensaverActive = false;
        clearInterval(snowflakeInterval);
        snowflakes.forEach(s => s.remove());
        snowflakes = [];
    }
}

// Reset inactivity timer  
function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        startScreensaver(); // Start screensaver after inactivity  
    }, inactivityTime);
}

// Handle user interaction  
function handleUserInteraction() {
    stopScreensaver(); // Stop the screensaver on interaction  
    resetTimer(); // Reset the inactivity timer  
}

// Initialize inactivity timer  
window.onload = resetTimer;
document.addEventListener('mousemove', handleUserInteraction);
document.addEventListener('keydown', handleUserInteraction);
document.body.addEventListener('click', handleUserInteraction);
document.addEventListener('touchstart', handleUserInteraction);





        //SUBS Generator
        // Define the subtitles with their corresponding time intervals (in seconds)
        // const subtitlesDiv = document.getElementById('subtitles');
// const subtitles = [
//     { text: "Cristóbal Colón es el descubridor de América.", start: 0.01, end: 5.329 },
//     { text: "Es un personaje que llegó a, cuenta la historia,", start: 7.070, end: 12.279 },
//     { text: "que llegó a las tierras americanas en 1492.", start: 12.290, end: 16.449 },
//     { text: "Se supone, según cuenta la historia, que América fue", start: 17.990, end: 22.138 },
//     { text: "descubierta por azares de la vida, por casualidad.", start: 22.150, end: 25.389 },
//     { text: "En realidad, se cuenta que la idea era buscar una nueva", start: 25.390, end: 30.359 },
//     { text: "ruta para comercializar con las indias.", start: 30.370, end: 33.469 },
//     { text: "En esos tiempos, España tenía actividades comerciales con", start: 34.070, end: 40.139 },
//     { text: "las indias, de donde traía cantidad, sobre todo de", start: 40.150, end: 43.639 },
//     { text: "especias, que eran muy apreciadas en esa época.", start: 43.650, end: 46.049 },
//     { text: "Y había problemas para hacer esos viajes, eran muy largos.", start: 47.010, end: 55.149 },
//     { text: "entonces Cristóbal Colón se le ocurrió pensar que debía", start: 55.150, end: 59.969 }
// ];

        // audio.ontimeupdate = function() {
        //     const currentTime = audio.currentTime;
        
        //     // Clear existing subtitles  
        //     subtitlesDiv.textContent = '';
        //     subtitlesDiv.style.opacity = 0; // Hide during updates
        
        //     // Find and display the current subtitle  
        //     for (let i = 0; i < subtitles.length; i++) {
        //         if (currentTime >= subtitles[i].start && currentTime <= subtitles[i].end) {
        //             subtitlesDiv.textContent = subtitles[i].text;
        //             subtitlesDiv.style.opacity = 1; // Show the subtitle  
        //             break; // Exit the loop once the current subtitle is found  
        //         }
        //     }
        // };