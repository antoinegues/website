import projects from '../assets/data/projects.json';
import imageUrl from '../assets/img/projects/*';

const portfolio = document.querySelector('.portfolio');

let pos = 0;

function navPrevious() {

    pos--;
    if(pos < 0) {
        pos = projects.length -1 ;
    }
    renderProject(pos);
}

function navNext() {
    pos++;
    pos %= projects.length;
    renderProject(pos);
}

function initNav() {

    portfolio.querySelector('.portfolio-content-action-navigate-previous').addEventListener('click', () => {
            navPrevious();
        }
    );
    portfolio.querySelector('.portfolio-content-action-navigate-next').addEventListener('click', () => {
            navNext();
        }
    )

}


function renderProject() {
    portfolio.classList.add('loading');
    portfolio.querySelector('.portfolio-image').addEventListener("transitionend", () => {
        changeData(pos);
        portfolio.classList.remove('loading');
    }, {once: true});
}

function changeData(index) {
    portfolio.querySelector('.portfolio-image').src = imageUrl[projects[index].img];
    portfolio.querySelector('.portfolio-content-header-logo').src = imageUrl[projects[index].logo];
    portfolio.querySelector('.portfolio-content-header-name').innerHTML = projects[index].name;
    portfolio.querySelector('.portfolio-content-desc').innerHTML = projects[index].desc;
    portfolio.querySelector('.portfolio-content-action-github').href = projects[index].github;
}

changeData(pos);
initNav();
