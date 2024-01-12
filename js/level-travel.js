class Travel extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    
        document.addEventListener('buttonsActivated', this.handleActivated.bind(this));
    }

    handleActivated = () => {
        const buttons = this.shadow.querySelectorAll(".button");
    
        buttons.forEach(function (button) {
            button.style.visibility = 'visible';
            button.classList.add('activated');
        });
    }
    

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = /*html*/`
            <style>
                .button {
                    width: 300px;
                    font-size: 40px;
                    border: solid black 5px;
                    padding-top: 2rem;
                    padding-bottom: 2rem;
                    background-color: hsl(0, 0%, 70%);
                    border-radius: 1.5rem;
                    cursor: pointer;
                    visibility: hidden;
                    transition: transform 0.3s ease-in-out;
                }

                .activated {
                    animation: shake 0.5s ease-in-out; 
                }
                
                .level-traveling-buttons {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    width: 45rem;
                    height:1rem;
                }

                @keyframes shake {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    25%, 75% {
                        transform: translateX(-5px);
                    }
                    50% {
                        transform: translateX(5px);
                    }
                }

                .button:hover {
                    transition: transform 0.3s ease-in-out;
                    transform: scale(1.2);
                    background-color: hsl(0, 0%, 0%);
                    color: white;
                }

            </style>

            <div class="level-traveling-buttons">
                <button id="previousButton" class="button">Previous level</button>
                <button id="nextButton" class="button">Next level</button>
            </div>
        `;
        this.initializeGrid();
    }
}

customElements.define('travel-component', Travel);
