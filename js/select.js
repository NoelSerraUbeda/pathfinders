class Select extends HTMLElement {
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
          .center {
            background-image: url(../images/background.svg);
            background-position-y: -1rem;
            background-color: rgb(8, 112, 168);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            margin: 0;
            font-family: monospace;
            height: 100%;
          }

        .container {
            background-color: bisque;
            width: 85%;
            height: 80%;
            padding: 1rem;
            border-radius: 1rem;
            border: 10px solid black;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 5rem;
            margin-top: 2rem;
          }

        .container_levels {
            display: flex;
            justify-content: center;
            align-items: start;
            flex-wrap: wrap;
            gap: 2rem;
          }

        .container_card {
            transition: color 0.1s ease, fill 0.3s ease, transform 0.3s ease;
            background-color: green;
            width: 6rem;
            height: 6rem;
            margin: 0.5rem;
            border-radius: 1rem;
            border: solid 3px black;
          }

        .container_card:hover{
            transform: scale(1.15);
          }

        .container_card a{
            border-radius: 1rem;
            background-color: none;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            font-size: 36px;
            color: white;
          }

        .container_card a:hover{
            background-color: white;
            color: black;
          }

        .container_arrows {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 3rem;
            font-size: 20px;
          }

        .container_arrows svg,
        .container_arrows h2 {
            text-align: center;
            width: 3rem;
            transition: color 0.1s ease, fill 0.3s ease, transform 0.3s ease;
          }

        .container_arrows svg:hover,
        .container_arrows h2:hover {
            cursor: pointer;
            color: blue;
            fill: blue;
            transform: scale(1.2);
          }

        </style>

        <div class="center">
          <div class="container">
              <div class="container_levels">
                  <div class="container_card">
                      <a href="level.html?level=01">
                          <h2>01</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>02</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>03</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>04</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>05</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>06</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>07</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>08</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>09</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>10</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>11</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>12</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>13</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>14</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>15</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>16</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>17</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>18</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>19</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>20</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>21</h2>
                      </a>
                  </div>
                  <div class="container_card">
                      <a href="level.html">
                          <h2>22</h2>
                      </a>
                  </div>  
              </div>
              <div class="container_arrows">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <title>arrow-left-bold</title>
                      <path d="M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z" />
                  </svg>
                  <h2>1</h2>
                  <h2>2</h2>
                  <h2>3</h2>
                  <span>...</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <title>arrow-right-bold</title>
                      <path d="M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z" />
                  </svg>
              </div>
          </div>
        </div>
      `;
  }


}

customElements.define('select-component', Select);

