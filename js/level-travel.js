class Travel extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    
        document.addEventListener('buttonsActivated', this.handleActivated.bind(this));
    }

    handleActivated = () => {
        const buttons = this.shadow.querySelectorAll(".level-traveling-buttons");
    
        buttons.forEach(function (button) {
            button.classList.add('activated');
        });
    }
    

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = /*html*/`
            <style>

                .center {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                }
                .level-traveling-buttons {
                    display: none;
                    justify-content: space-around;
                    align-items: center;
                    width: 45rem;
                    height:0rem;
                    margin-top:4rem;
                    visibility: hidden;
                }

                .button {
                    width: 300px;
                    font-size: 40px;
                    border: solid black 5px;
                    padding-top: 1.3rem;
                    padding-bottom: 1.3rem;
                    background-color: hsl(0, 0%, 70%);
                    border-radius: 1.5rem;
                    cursor: pointer;
                    transition: transform 0.3s ease-in-out;
                }

                .activated {
                    animation: shake 0.5s ease-in-out; 
                    visibility: visible;
                    display:flex;
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
            <div class="center">
                <div class="level-traveling-buttons">
                    <button id="previousButton" class="button">Previous level</button>
                    <button id="nextButton" class="button">Next level</button>
                </div>
            </div>
        `;
        this.initializeGrid();
    }
}

customElements.define('travel-component', Travel);
