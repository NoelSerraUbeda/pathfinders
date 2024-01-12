class Return extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.shadow.innerHTML = /*html*/`
            <style>

                button {
                    width:5rem;
                    border:none;
                    background:none;
                    position:absolute;
                    z-index:999;
                    top:1rem;
                    left:1rem;
                }

                button svg{
                    fill:white;
                    cursor:pointer;
                    transition: transform 0.3s;
                }

                button svg:hover{
                    transform:scale(1.1)
                }

            </style>
            <button id="returnButton">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left-bold-hexagon-outline</title><path d="M7,12L12,7V10H16V14H12V17L7,12M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" /></svg>
            </button>
        `;
    }

    attachEventListeners() {
        const returnButton = this.shadow.getElementById('returnButton');
        returnButton.addEventListener('click', () => {
            this.goBack();
        });
    }

    goBack() {
        window.history.back();
    }
}

customElements.define('return-component', Return);

