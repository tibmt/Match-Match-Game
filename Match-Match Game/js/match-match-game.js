class Timer {

    constructor() {
        this.timerElements = [];
        this.ticker = 1000;
        this.updateTimer = this.updateTimer.bind(this);
    }

    /**
     *
     * this method init timer
     *
     */

    init() {
        this.startedTimeMs = Date.now();
    }

    /**
     *
     * this method turn 'delay' into 'hh:mm:ss'
     * @param delay - this option turns into 'hh:mm:ss'
     *
     */

    serialize(delay) {

        let seconds = parseInt((delay / 1000) % 60);
        let minutes = parseInt((delay / (1000 * 60)) % 60);
        let hours = parseInt((delay / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return `${hours}:${minutes}:${String(seconds)}`;
    }

    /**
     *
     * this method add element
     *
     */

    addElements(timerElement) {
        this.timerElements.push(timerElement);
        return this;
    }

    /**
     *
     * this method remove element
     *
     */

    removeElement(timerElementToDelete) {
        this.timerElements = this.timerElements.filter((element) => {
            element !== timerElementToDelete
        });
        return this;
    }

    /**
     *
     * this method update timer
     *
     */

    updateTimer() {
        this.timerElements.forEach((element) => {
            element.innerHTML = this.serialize(Date.now() - this.startedTimeMs);
        });
        return this;
    }

    /**
     *
     * this method show delay
     *
     */

    showDelay() {
        this.timer = setInterval(this.updateTimer, this.ticker);
        return this;
    }

    /**
     *
     * this method stop delay
     */

    stopDelay() {
        clearInterval(this.timer);
        return this;
    }
}
class Game {

    constructor(name) {

        this.name = name;
        this.flipArray = [];
        this.flipCount = 0;
        this.gameOverCount = 0;
        this.skirtCount = 1;
        this.difficultCount = 3;
        this.cardCount = 15;
        this.log = [];
        this.skirt = [];

    }

    /**
     *
     * this method init game
     *
     */

    init() {

        this.initTopField();
        this.initField();

    }

    /**
     *
     * this method init header
     *
     */

    initTopField(){

        this.topField = document.createElement('header');
        document.body.appendChild(this.topField);

        this.cardsShirt = document.createElement('button');
        this.cardsShirt.innerHTML = 'Skirt Card';
        this.topField.appendChild(this.cardsShirt);
        this.cardsShirt.addEventListener('click', () => {
            this.asideCardSkirt.style.visibility = 'visible';
        });

        this.difficulty = document.createElement('button');
        this.difficulty.innerHTML = 'Difficulty';
        this.topField.appendChild(this.difficulty);
        this.difficulty.addEventListener('click', () => {
            this.asideDifficult.style.visibility = 'visible';
        });

        this.timerElem = document.createElement('span');
        this.timerElem.innerHTML = '00:00:00';
        this.timerElem.classList.add('timer');
        this.topField.appendChild(this.timerElem);
        this.timer = new Timer();
        this.timer.addElements(document.body.children[1].querySelector('span'));

        this.newGame = document.createElement('button');
        this.newGame.innerHTML = 'New Game';
        this.newGame.classList.add('newGame');

        this.newGame.addEventListener('click', () => {
            this.topField.remove();
            this.field  .remove();
            this.timer.stopDelay();
            this.timerElem.innerHTML = '00:00:00';
        });
        this.newGame.addEventListener('click', () => this.init());
        this.topField.appendChild(this.newGame);

    }

    /**
     *
     * this method init field with rules and game field
     *
     */

    initField(){

        this.field = document.createElement('section');
        this.field.style.cssText = "background-image: url(img/orange-field.jpg);";

        document.body.appendChild(this.field);

        document.body.style.backgroundImage = 'url(img/background-image.jpg';

        this.ruleField = document.createElement('div');

        let firstelem = document.createElement('span');
        firstelem.innerHTML = 'Rule of the Game';
        firstelem.style.cssText = "color: blue;\
                                   font-size: 40px;";
        this.ruleField.appendChild(firstelem);

        let secelem = document.createElement('p');
        secelem.innerHTML = 'Push on the cards, remember them and find pair of pictures.</br>' +
                            'And don\'t forget choose card skirt and difficulty.</br>' +
                            'Good luck.</br>';
        secelem.style.fontSize = '17px';
        this.ruleField.appendChild(secelem);

        let thirdelem = document.createElement('button');
        thirdelem.innerHTML = 'Start Game';
        thirdelem.classList.add('startGame');
        this.ruleField.appendChild(thirdelem);
        thirdelem.addEventListener('click', () => this.cardLogi());
        thirdelem.addEventListener('click', () => {
            this.timer.stopDelay();
            this.timer.init();
            this.timer.showDelay();
        });

        this.ruleField.style.cssText = "background-image: url(img/orange-field.jpg);";
        this.field.appendChild(this.ruleField);

        this.asideDifficult = document.createElement('aside');
        this.asideDifficult.innerHTML = 'Choose difficulty </br>';
        this.field.appendChild(this.asideDifficult);

        let buttomDifficultyOne = document.createElement('button');
        buttomDifficultyOne.innerHTML = 'Easy';
        buttomDifficultyOne.classList.add('diffAside');
        this.asideDifficult.appendChild(buttomDifficultyOne);
        buttomDifficultyOne.addEventListener('click',  () => {
            this.difficultCount = 1;
        });

        let buttomDifficultyTwo = document.createElement('button');
        buttomDifficultyTwo.innerHTML = 'Medium';
        buttomDifficultyTwo.classList.add('diffAside');
        this.asideDifficult.appendChild(buttomDifficultyTwo);
        buttomDifficultyTwo.addEventListener('click', () => {
            this.difficultCount = 2;
        });

        let buttomDifficultyThree = document.createElement('button');
        buttomDifficultyThree.innerHTML = 'Difficult';
        buttomDifficultyThree.classList.add('diffAside');
        this.asideDifficult.appendChild(buttomDifficultyThree);
        buttomDifficultyThree.addEventListener('click', () => {
            this.difficultCount = 3;
        });

        this.asideCardSkirt = document.createElement('aside');
        this.asideCardSkirt.innerHTML = 'Choose card skirt </br>';
        this.field.appendChild(this.asideCardSkirt);

        let buttomCardSkirtOne = document.createElement('button');
        buttomCardSkirtOne.innerHTML = '<img style="width: 100px; height: 100px" src="img/simpsons/bart-skirt.jpg"/>';
        buttomCardSkirtOne.classList.add('skirtAside');
        this.asideCardSkirt.appendChild(buttomCardSkirtOne);
        buttomCardSkirtOne.addEventListener('click', () => {
            this.skirtCount = 1;
        });

        let buttomCardSkirtTwo = document.createElement('button');
        buttomCardSkirtTwo.innerHTML = '<img style="width: 100px; height: 100px" src="img/shrek/shrek-skirt.jpg"/>';
        buttomCardSkirtTwo.classList.add('skirtAside');
        this.asideCardSkirt.appendChild(buttomCardSkirtTwo);
        buttomCardSkirtTwo.addEventListener('click', () => {
            this.skirtCount = 2;
        });

        let buttomCardSkirtThree = document.createElement('button');
        buttomCardSkirtThree.innerHTML = '<img style="width: 100px; height: 100px" src="img/kungFuPanda/panda-skirt.jpg"/>';
        buttomCardSkirtThree.classList.add('skirtAside');
        this.asideCardSkirt.appendChild(buttomCardSkirtThree);
        buttomCardSkirtThree.addEventListener('click', () => {
            this.skirtCount = 3;
        });
    }

    /**
     *
     * this method compare two flipped cards
     * @param {array} skirtArray - array of cards skirt
     * @param {array} cardsArray - array of cards
     *
     */

    compare(skirtArray, cardsArray) {

        for (let i = 0; i < this.cardCount + 1; i += 1) {
            if (cardsArray[i][2] == true) {
                this.flipArray.push(i);
                this.flipCount += 1;
            }
        }

        if (this.flipCount >= 2) {

            if(this.flipArray.length == 2){
                cardsArray[this.flipArray[0]][2] = false;
                this.flipCount = 0;
                this.flipArray = [];
            }



            if(this.flipArray.length == 3){
                setTimeout(() => {
                    if (skirtArray[this.flipArray[1]].innerHTML != skirtArray[this.flipArray[2]].innerHTML) {
                        document.body.lastElementChild.children[this.flipArray[1]].querySelector('.flipper').classList.toggle('flip');
                        document.body.lastElementChild.children[this.flipArray[2]].querySelector('.flipper').classList.toggle('flip');
                        cardsArray[this.flipArray[1]][2] = false;
                        cardsArray[this.flipArray[2]][2] = false;
                        this.flipCount = 0;
                        this.flipArray = [];
                    }
                }, 500);
            }

        }

        if (this.flipCount >= 2) {
            if (skirtArray[this.flipArray[1]].innerHTML == skirtArray[this.flipArray[2]].innerHTML) {
               this.deleteCards(skirtArray, cardsArray)
            }
        }

        this.gameOver();

    }

    /**
     *
     * this method make Game Over
     *
     */

    gameOver(){

        if(this.gameOverCount === this.cardCount + 1){
            this.gameOverCount = 0;
            this.timer.stopDelay();
            this.field.innerHTML = null;
            this.field.style.cssText = "height: 500px;\
                                        width: 500px;\
                                        position: relative;\
                                        left: 400px;\
                                        background-image: url(img/orange-field.jpg);";
            let firstel = document.createElement('div');
            firstel.innerHTML = `Congratulation.<br/>
                                 You win.<br/>
                                 Do you want to play again?<br/>
                                 Push New Game.`;
            firstel.style.cssText = "font-size: 40px;\
                                     color: #02ffe7;";
            this.field.appendChild(firstel);
        }

    }

    /**
     *
     * this method draw card field and cards
     * @param {array} realArray - array of cards
     *
     */

    drawCard(realArray){

        this.field.innerHTML = null;

        if(this.cardCount == 7){
            this.field.style.cssText = "height: 250px;\
                                        padding: 125px 0;\
                                        width: 500px;\
                                        position: relative;\
                                        left: 400px;\
                                        background-image: url(img/orange-field.jpg);";
        }
        if(this.cardCount == 11){
            this.field.style.cssText = "height: 375px;\
                                        padding: 62.5px 0;\
                                        width: 500px;\
                                        position: relative;\
                                        left: 400px;\
                                        background-image: url(img/orange-field.jpg);";
        }
        if(this.cardCount == 15){
            this.field.style.cssText = "height: 500px;\
                                        width: 500px;\
                                        position: relative;\
                                        left: 400px;\
                                        background-image: url(img/orange-field.jpg);";
        }

        let cardArray = [];
        for(let i = 0; i <= this.cardCount; i += 1){

            let one = document.createElement('article');
            one.classList.add('flip-container');
            cardArray[i] = one;

            let two = document.createElement('article');
            two.classList.add('flipper');
            cardArray[i].appendChild(two);

            let three = document.createElement('article');
            three.classList.add('front');
            three.innerHTML = realArray[i][0].innerHTML;
            cardArray[i].firstElementChild.appendChild(three);

            let four = document.createElement('article');
            four.classList.add('back');
            four.innerHTML = realArray[i][1].innerHTML;
            cardArray[i].firstElementChild.appendChild(four);

            cardArray[i].firstElementChild.addEventListener('click', function () {
                document.body.lastElementChild.children[i].querySelector('.flipper').classList.toggle('flip');
                realArray[i][2] = true;
            });
            cardArray[i].addEventListener('click', () => this.compare(cardArray, realArray));
            this.field.appendChild(cardArray[i]);
        }

    }

    /**
     *
     * this method mix array of cards
     * @param {array} mixArray - array of cards
     *
     */

    toMix(mixArray){

        let input = mixArray;

        for (let i = input.length-1; i >=0; i--) {

            let randomIndex = Math.floor(Math.random()*(i+1));
            let itemAtIndex = input[randomIndex];

            input[randomIndex] = input[i];
            input[i] = itemAtIndex;

        }

        return input;

    }

    /**
     *
     * this method make array of cards
     * causes DrawCard()
     *
     */

    cardLogi(){


        switch(this.difficultCount){
            case 1:
                this.cardCount = 7;
                break;
            case 2:
                this.cardCount = 11;
                break;
            case 3:
                this.cardCount = 15;
                break;
            default:
                this.cardCount = 15;
        }

        let pushCounter = false;

        const simpsons = [
            'img/simpsons/apu.jpg',
            'img/simpsons/apu.jpg',
            'img/simpsons/bart.jpg',
            'img/simpsons/bart.jpg',
            'img/simpsons/flanders.jpg',
            'img/simpsons/flanders.jpg',
            'img/simpsons/homer.jpg',
            'img/simpsons/homer.jpg',
            'img/simpsons/lisa.jpg',
            'img/simpsons/lisa.jpg',
            'img/simpsons/marge.jpg',
            'img/simpsons/marge.jpg',
            'img/simpsons/martin.jpg',
            'img/simpsons/martin.jpg',
            'img/simpsons/willy.jpg',
            'img/simpsons/willy.jpg'
        ];
        const simpsonsSkirt = 'img/simpsons/bart-skirt.jpg';
        const simplosnSkirtLog = new Array(this.cardCount + 1).fill(simpsonsSkirt);

        const shrek = [
            'img/shrek/cat.jpg',
            'img/shrek/cat.jpg',
            'img/shrek/donkey.jpg',
            'img/shrek/donkey.jpg',
            'img/shrek/dragon.jpg',
            'img/shrek/dragon.jpg',
            'img/shrek/fairy.jpg',
            'img/shrek/fairy.jpg',
            'img/shrek/phiona.jpg',
            'img/shrek/phiona.jpg',
            'img/shrek/phiona-women.jpg',
            'img/shrek/phiona-women.jpg',
            'img/shrek/prince.jpg',
            'img/shrek/prince.jpg',
            'img/shrek/shrek.jpg',
            'img/shrek/shrek.jpg'
        ];
        const shrekSkirt = 'img/shrek/shrek-skirt.jpg';
        const shrekSkirtLog = new Array(this.cardCount + 1).fill(shrekSkirt);

        const kungFuPanda = [
            'img/kungFuPanda/crane.jpg',
            'img/kungFuPanda/crane.jpg',
            'img/kungFuPanda/evil-tiger.jpg',
            'img/kungFuPanda/evil-tiger.jpg',
            'img/kungFuPanda/father.jpg',
            'img/kungFuPanda/father.jpg',
            'img/kungFuPanda/monkey.jpg',
            'img/kungFuPanda/monkey.jpg',
            'img/kungFuPanda/panda.jpg',
            'img/kungFuPanda/panda.jpg',
            'img/kungFuPanda/snake.jpg',
            'img/kungFuPanda/snake.jpg',
            'img/kungFuPanda/team.jpg',
            'img/kungFuPanda/team.jpg',
            'img/kungFuPanda/tiger.jpg',
            'img/kungFuPanda/tiger.jpg'
        ];
        const kungFuPandaSkirt = 'img/kungFuPanda/panda-skirt.jpg';
        const kungFuPandaSkirtLog = new Array(this.cardCount + 1).fill(kungFuPandaSkirt);

        switch(this.skirtCount){
            case 1:
                this.log = simpsons;
                this.skirt = simplosnSkirtLog;
                break;
            case 2:
                this.log = shrek;
                this.skirt = shrekSkirtLog;
                break;
            case 3:
                this.log = kungFuPanda;
                this.skirt = kungFuPandaSkirtLog;
                break;
            default:
                this.log = simpsons;
                this.skirt = simplosnSkirtLog;
        }

        switch(this.difficultCount){
            case 1:
                this.log.length = 8;
                break;
            case 2:
                this.log.length = 12;
                break;
        }

        this.toMix(this.log);

        this.realLog = [];

        for(let i = 0; i <= this.cardCount; i += 1){
            this.realLog.push([]);
        }

        this.realLog.forEach((elem, index) => {
            elem[0] = document.createElement('article');
            elem[0].innerHTML = '<img style="width: 100px; height: 100px"/>';
            elem[0].firstElementChild.setAttribute('src', this.skirt[index]);

            elem[1] = document.createElement('article');
            elem[1].innerHTML = '<img style="width: 100px; height: 100px;"/>';
            elem[1].firstElementChild.setAttribute('src', this.log[index]);

            elem[2] = pushCounter;
        });

        this.drawCard(this.realLog);

    }

    /**
     *
     * this method delete pair of the same pictures
     *
     */

    deleteCards(skirtLog, cardLog){

        skirtLog[this.flipArray[1]].style.visibility = 'hidden';
        skirtLog[this.flipArray[2]].style.visibility = 'hidden';
        cardLog[this.flipArray[1]][2] = false;
        cardLog[this.flipArray[2]][2] = false;
        this.gameOverCount += 2;
        this.flipCount = 0;
        this.flipArray = [];

    }
}

let matchMatchGame = new Game('Match-Match Game');
matchMatchGame.init();


