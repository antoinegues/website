const colorCodeLine = ["#E67E22", "#2ECC71", "#F1C40F", "#3498DB", "#E74C3C"];
history.scrollRestoration = 'manual';


let position = 0;
let reset;


/**
 * Generate a random number between min and max
 * @param min
 * @param max
 * @return {number}
 */
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function lineMaxWidth(){
    if (window.innerWidth > 1000){
        return window.innerWidth / 2;
    }
    else{
        return (window.innerWidth - window.innerWidth * 0.1);
    }
}

/**
 * GenerateLineCode for the background
 */
function generateCodeLine(){
    if(position !== 0) {
        return;
    }

    const nb = Math.floor((window.innerHeight) / 30);
    const codeLineDiv = document.getElementById("code-line-container");
    const lineWidth = lineMaxWidth();
    removeCodeLine();
    let lastWidthFactor = -1;

    for (let i = 0; i < nb; i++){
        let codeLine = document.createElement("div");
        codeLine.classList.add('code-line');


        let widthFactor;
        do{
            widthFactor = getRandomInt(1, 24);
        }
        while (lastWidthFactor === widthFactor);
        lastWidthFactor = widthFactor;

        codeLine.style.backgroundColor = colorCodeLine[i % colorCodeLine.length];
        codeLine.style.width = (lineWidth / 24) * widthFactor + 'px';

        setTimeout(() => {
            codeLineDiv.append(codeLine);
        }, i * 10);
    }


}

function codeLineGetOut(){
    const codeLineDivChild = document.getElementById("code-line-container").querySelectorAll('.code-line');

    let i = 0;
    [...codeLineDivChild].reverse().forEach((selector) => {
        setTimeout(() => {

            selector.classList.add('get-out');
            if (codeLineDivChild.length - 1 === i){
                selector.addEventListener('animationend', () => {
                    removeCodeLine();
                }, {once: true});
            }

        }, i * 10);
        i++;
    });

}


function wheelFunctionInit(){
    let wheelFunction  = (e) => {

        if (reset && 50 < Math.abs(e.deltaY)){
            reset = 0;
        }

        e.stopPropagation();
        if (!reset && Math.abs(e.deltaY) > 50){
            window.removeEventListener('wheel', wheelFunction);
            scrollEvent(e);
        }

    }
    window.addEventListener('touchmove', wheelFunction);

    window.addEventListener('wheel', wheelFunction);
}

function removeCodeLine(){
    const codeLineDiv = document.getElementById("code-line-container");

    while (codeLineDiv.firstChild){
        codeLineDiv.removeChild(codeLineDiv.lastChild);
    }
}


function scrollEvent(e){
    let content = document.getElementById('content');
    let screenList = content.querySelectorAll('.screen');
    let lastPosition = position;
    if (e.deltaY > 0){
        position = Math.min(position + 1, screenList.length - 1);
    }
    else{
        position = Math.max(position - 1, 0);
    }


    if (position === lastPosition){
        wheelFunctionInit();
    }
    else{
        switch (position){
            case 0:
                generateCodeLine();
                break;
            case 1 :
                codeLineGetOut();
                break;
        }

        content.style.transform = "translateY(" + -(position * 100) + "vh)";
        reset = 1;
        content.addEventListener('transitionend', () => {
            wheelFunctionInit();
        }, {once: true});

    }

}


generateCodeLine();
wheelFunctionInit();

let lastInterval;
window.addEventListener('resize', () => {
    clearInterval(lastInterval);
    lastInterval = setTimeout(() => {
        generateCodeLine();
    }, 1000);
});
