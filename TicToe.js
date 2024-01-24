const GameBoard = () => {
    const Game = {
        terreno: [['', '', ''], ['', '', ''], ['', '', '']],
        jugador: 0,
        celldsLeft: 8,
        tableCreated: false, // Indicador para verificar si la tabla ha sido creada

        howcelldsLeft: function (numer) {
            this.celldsLeft = this.celldsLeft - numer;
            console.log(this.celldsLeft);
        },

        winner: function (message) {
            if (message === "X") {
                console.log("Winner is X");
                document.querySelector('table').remove();
                this.tableCreated = false; // La tabla ha sido eliminada
                let NoWinners = document.createElement('img');
                document.getElementById('boxContainer').append(NoWinners);
                NoWinners.src = "WinnerIsX.gif";
                Game.howcelldsLeft();
            } else if (message === "O") {
                console.log("Winner is O");
                document.querySelector('table').remove();
               
                this.tableCreated = false; // La tabla ha sido eliminada
                let NoWinners = document.createElement('img');
                document.getElementById('boxContainer').append(NoWinners);
                NoWinners.src = "WinnerIsO.gif";
                Game.howcelldsLeft();
            } else if (this.celldsLeft == 0) {
                console.log("No winners");
                
                document.querySelector('table').remove();
                this.tableCreated = false; // La tabla ha sido eliminada
                let NoWinners = document.createElement('img');
                document.getElementById('boxContainer').append(NoWinners);
                NoWinners.src = "noWinners.gif";
            }

            this.howcelldsLeft(message);
        },

        changeCurrentPlayer: function () {
            this.jugador = 1 - this.jugador;

        },

        statusPlayer: function () {
            return this.jugador;
        },

        WhereIam: function (position) {
            let padre = position.parentElement;
            let superPadre = padre.parentElement;
            let Sons = Array.from(superPadre.children);
            let IndeZ = Sons.indexOf(position.parentElement);
            return IndeZ;
        },

        ExactPosition: function (position) {
            let padre = position.parentElement;
            let sons = Array.from(padre.children);
            let indexFi = sons.indexOf(position);
            return indexFi;
        },

        ItsMe: function (callback) {
            return callback();
        },

        Box: function () {
            let general = document.createElement('div');
            document.querySelector('body').append(general);
            general.setAttribute('id', 'general2');

            let boxSpace = document.createElement('div');
            general.append(boxSpace);
            boxSpace.setAttribute("id", "boxContainer");

            function creating() {
                let tabla = document.createElement('table');
                boxSpace.append(tabla);
                Game.tableCreated = true; // La tabla ha sido creada

                for (let x = 0; x < 3; x++) {
                    let tr = document.createElement('tr');
                    tabla.append(tr);
                    for (let y = 0; y < 3; y++) {
                        let td = document.createElement('td');
                        tr.append(td);
                    }
                }
            }

            creating();

            let restartToNull = () => {

                Game.celldsLeft = 8;
                
                let arras = document.querySelectorAll('td');

                for (let x = 0; x < arras.length; x++) {
                    arras[x].textContent = "";
                }

                Game.terreno = [['', '', ''], ['', '', ''], ['', '', '']];
                console.log(Game.terreno);



                let existingTable = document.querySelector('table');

                if (!existingTable) {
                    // Si no existe la tabla, crearla
                    creating();
                }

               // Verificar si la imagen existe antes de intentar eliminarla
    let existingImage = document.querySelector('img');
    if (existingImage) {
        existingImage.remove();
       
    }

        
            };

            let divButton = document.createElement('div');
            general.append(divButton);

            let restart = document.createElement('button');
            divButton.append(restart);
            restart.textContent = "RESTART";
            restart.setAttribute("id", 'restart');
            restart.addEventListener('click', function (event) {
                event.preventDefault();
                console.log("Restarting the game");
                restartToNull();
            });
        },

        ManipulandoCaja: function (logicCallback) {
            document.querySelectorAll('td').forEach(object => object.addEventListener('click', function (event) {
                event.preventDefault();
                let cell = event.target;

                if (cell.textContent === "") {
                    let playerSymbol = Game.jugador === 0 ? "X" : "O";
                    cell.textContent = playerSymbol;
                    Game.changeCurrentPlayer();

                    let row = Game.WhereIam(cell);
                    let col = Game.ExactPosition(cell);

                    Game.terreno[row][col] = playerSymbol;
                    console.log(Game.terreno);

                    Game.winner(Game.ItsMe(logicCallback));
                } else {
                    console.log("Cell already taken. Choose another one.");
                }
            }));
        }
    };

    return Game;
};

const LogicaBoard = (() => {
    const logic = {
        terreno: function (terreno) {
            this.terreno = terreno;
        },
        winnerA: 0,
        winnerB: 0,

        addwinnerA: function () {
            this.winnerA += 1;
        },

        addwinnerB: function () {
            this.winnerB += 1;
        },

        reset: function () {
            this.winnerA = 0;
            this.winnerB = 0;
        },

        whoWins: function () {
            logic.reset();

            // Verificar filas
            for (let x = 0; x < this.terreno.length; x++) {
                for (let y = 0; y < this.terreno[x].length; y++) {
                    if (this.terreno[x][y] === "X") {
                        logic.addwinnerA();
                    } else if (this.terreno[x][y] === "O") {
                        logic.addwinnerB();
                    }
                }

                // Verificar ganador en fila
                if (logic.winnerA === 3) {
                    console.log("Winner is A row");
                    return "X";
                } else if (logic.winnerB === 3) {
                    console.log("Winner is B row");
                    return "O";
                }

                // Reiniciar contadores después de cada fila
                logic.reset();
            }

            // Verificar columnas
            for (let h = 0; h < this.terreno.length; h++) {
                for (let z = 0; z < this.terreno[h].length; z++) {
                    if (this.terreno[z][h] === "X") {
                        logic.addwinnerA();
                    } else if (this.terreno[z][h] === "O") {
                        logic.addwinnerB();
                    }
                }

                // Verificar ganador en columna
                if (logic.winnerA === 3) {
                    console.log("Winner is A column");
                    return "X";
                } else if (logic.winnerB === 3) {
                    console.log("Winner is B column");
                    return "O";
                }

                // Reiniciar contadores después de cada columna
                logic.reset();
            }

            // Verificar diagonales
            if (this.terreno[0][0] === "X" && this.terreno[1][1] === "X" && this.terreno[2][2] === "X") {
                console.log("Winner is A diagonal (top-left to bottom-right)");
                return "X";
            } else if (this.terreno[0][0] === "O" && this.terreno[1][1] === "O" && this.terreno[2][2] === "O") {
                console.log("Winner is B diagonal (top-left to bottom-right)");
                return "O";
            }

            if (this.terreno[0][2] === "X" && this.terreno[1][1] === "X" && this.terreno[2][0] === "X") {
                console.log("Winner is A diagonal (top-right to bottom-left)");
                return "X";
            } else if (this.terreno[0][2] === "O" && this.terreno[1][1] === "O" && this.terreno[2][0] === "O") {
                console.log("Winner is B diagonal (top-right to bottom-left)");
                return "O";
            }

            // Si no hay un ganador en ninguna condición
            return 1;
        }
    };

    return logic;
});

const ejemplo = GameBoard();
ejemplo.Box();

const logica2 = LogicaBoard();
logica2.terreno(ejemplo.terreno);

ejemplo.ManipulandoCaja(() => logica2.whoWins());
