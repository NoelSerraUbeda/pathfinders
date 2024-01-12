class Reset extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadow.innerHTML = /*html*/`
            <style>
                .reset-button {
                    position: absolute;
                    top: 10px;
                    right: 40px;
                    border: none;
                    background: none;
                    height: 150px;
                    width: 150px;
                    cursor: pointer;
                    transition: transform 1.6s ease;
                }

                .reset-button svg{
                    height: 130px;
                }

                .reset-button:hover {
                    transform: rotate(360deg)scale(1.1);
                }

            </style>
            <button id="resetButton" class="reset-button">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM16 9H11L12.81 7.19C12.4443 6.81476 12.0074 6.51624 11.5249 6.31191C11.0424 6.10757 10.524 6.00154 10 6C9.25132 5.99757 8.51699 6.20531 7.88053 6.59958C7.24408 6.99386 6.73105 7.55884 6.39981 8.23027C6.06857 8.90169 5.93242 9.6526 6.00684 10.3976C6.08126 11.1426 6.36326 11.8517 6.82077 12.4443C7.27828 13.037 7.89294 13.4893 8.59481 13.7499C9.29668 14.0105 10.0576 14.0688 10.791 13.9183C11.5244 13.7679 12.2009 13.4146 12.7434 12.8987C13.286 12.3827 13.6728 11.7249 13.86 11H15.91C15.7193 12.1282 15.21 13.1783 14.4421 14.0266C13.6742 14.8749 12.6798 15.4859 11.5761 15.7876C10.4724 16.0893 9.30549 16.0692 8.21287 15.7296C7.12024 15.3899 6.14752 14.7449 5.40939 13.8707C4.67125 12.9964 4.1985 11.9293 4.04685 10.7952C3.89521 9.66109 4.07101 8.50727 4.55352 7.46979C5.03603 6.43231 5.80513 5.55442 6.77013 4.93964C7.73514 4.32487 8.85581 3.99884 10 4C10.7865 4.00099 11.5648 4.15894 12.2894 4.46459C13.0141 4.77024 13.6704 5.21745 14.22 5.78L16 4V9Z"
                        fill="white" />
                </svg>
            </button>

        `;
    }
    addEventListeners() {
        const resetButton = this.shadow.getElementById('resetButton');
        resetButton.addEventListener('click', () => this.resetGrid());
    }
    resetGrid() {
        location.reload();
    }
}

customElements.define('reset-component', Reset);
