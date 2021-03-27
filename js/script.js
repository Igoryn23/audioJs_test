let audio = document.querySelector('audio');
let context;
let analyser;
let src;
let array;
let logo = document.querySelector('.logo'); // получаем тег logo


// обработчик событий 
window.onclick = function() {
    if (!context) {
        preparation();

    }
    if (audio.paused) {
        audio.play(); // запустить проигрывание файла 
        loop();
    } else {
        audio.pause();
    }
}

// функция визуализации
function preparation() {
    // открываем обработку звука
    context = new AudioContext();
    analyser = context.createAnalyser(); // доступ к данным аудиофайла 
    src = context.createMediaElementSource(audio); // создаем объект из тега аудио 
    src.connect(analyser); // подключаем к аудио analyser
    analyser.connect(context.destination); // передаем звук на динамики 
    loop(); // обновляем анимацию 
}

function loop() {
    // рекурсия, снижаем нагрузку на браузер 
    if (!audio.paused) { // когда не пауза 
        window.requestAnimationFrame(loop);
    }
    array = new Uint8Array(analyser.frequencyBinCount); // оптимизирует данные 
    analyser.getByteFrequencyData(array); // копируем данные частоты в массив
    //// 
    logo.style.minHeight = (array[50]) + 'px';
    logo.style.width = (array[50]) + 'px';
}