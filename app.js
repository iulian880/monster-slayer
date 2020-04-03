new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true
            this.playerHealth = 100
            this.monsterHealth = 100
            this.turns = []
        },
        attack: function () {
            this.playerAttacks()
            this.monsterAttacks()
        },

        specialAttack: function () {
            var damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster with a special attack for ' + damage
            })
            if (this.checkWin()) {
                return
            }
            this.monsterAttacks()
        },

        playerAttacks: function () {
            var damage = this.calculateDamage(3, 10)
            this.monsterHealth -= damage

            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            })
            if (this.checkWin()) {
                return
            }
        },
        monsterAttacks: function () {
            var damage = this.calculateDamage(5, 15)
            this.playerHealth -= damage

            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            })
            this.checkWin()
            return
        },




        heal: function () {
            this.turns.unshift({
                isPlayer: true,
                text: 'Player has healed for 10'
            })
            if (this.playerHealth <= 90) {
                this.playerHealth += 10
                this.monsterAttacks()
            } else {
                this.playerHealth = 100
            }
        },
        giveUp: function () {
            this.gameIsRunning = false
        },
        calculateDamage: function (minimum, maximum) {
            return Math.max(Math.floor(Math.random() * maximum) + 1, minimum)
        },

        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame()
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
                return true
            }

            return false
        }
    }
});