new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true
            this.playerHealth = 100
            this.monsterHealth = 100
        },
        attack: function () {

            this.monsterAttacks()
            this.playerAttacks()
        },

        specialAttack: function () {
            this.monsterHealth -= this.calculateDamage(10, 20)
            if (this.checkWin()) {
                return
            }
            this.monsterAttacks()
        },

        playerAttacks: function () {
            this.monsterHealth -= this.calculateDamage(3, 10)
            if (this.checkWin()) {
                return
            }
        },
        monsterAttacks: function () {
            this.playerHealth -= this.calculateDamage(5, 15)
            this.checkWin()
            return
        },




        heal: function () {

        },
        giveUp: function () {

        },
        calculateDamage: function (minimum, maximum) {
            return Math.max(Math.floor(Math.random() * maximum) + 1, minimum)
        },

        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false
                }
                return true
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                }
                return true;
            }

            return false;
        }
    }
});