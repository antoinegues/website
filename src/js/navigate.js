let screenContainer;
let screenList;
let pos = 0;

function initNav() {

    screenContainer = document.getElementById("screen-container");
    screenList = screenContainer.querySelectorAll('.screen');

    screenContainer.querySelectorAll(".navigator").forEach((navigator) => {

        navigator.addEventListener('click', () => {
            if (navigator.classList.contains('up')) {
                navUp();
            } else {
                navDown();
            }
        });

    });

}

function navigate() {
    screenContainer.style.transform = "translateY(" + -pos * screenList[0].offsetHeight + "px)";
}


function navDown() {
    if (pos < screenList.length - 1) {
        pos++;
        navigate();
        return true;
    } else {
        return false;
    }
}

function navUp() {
    if (pos > 0) {
        pos--;
        navigate();
        return true;
    } else {
        return false;
    }
}

initNav();

let resizeTimeout;
window.addEventListener('resize', () => {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
        navigate();
    }, 500);
});
