class Brand extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = /*html*/`
            <style>
                .container {
                    display:flex;
                    flex-direction:column;
                    gap:3rem;
                    align-items:center;
                    margin:1rem;
                }

                .brand {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .brand img {
                    width: 75rem;
                }

                .text {
                    width: 75rem;
                    position: absolute;
                    animation: swing 10s ease-in-out infinite;
                }

                .option-zone {
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    gap:0.2rem;
                }

                .option a{
                    text-decoration:none;
                    color:white;
                    font-size:20px;
                }

                .option h1{
                    transition: transform 0.3s;
                }

                .option h1:hover {
                    transform: scale(1.3);
                }

                @keyframes swing {
                    20% {
                    transform: rotate(2deg);
                    }
                    40% {
                    transform: rotate(-2deg);
                    }
                    60% {
                    transform: rotate(2deg);
                    }
                    80% {
                    transform: rotate(-2deg);
                    }
                    90% {
                    transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(0deg);
                    }
                }
            </style>
            <div class="container">
                <div class="brand">
                    <img class="back" src="images/Brand_back.png">
                    <img class="text" src="images/brand_name.png">
                </div>
                <div class="option-zone">
                    <div class="option">
                        <a href="select.html"><h1>Niveles</h1></a>
                    </div>
                    <div class="option">
                        <a href="select.html"><h1>Niveles</h1></a>
                    </div>
                    <div class="option">
                        <a href="select.html"><h1>Niveles</h1></a>
                    </div>
                    <div class="option">
                        <a href="select.html"><h1>Niveles</h1></a>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('brand-component', Brand);
