Breax.GameOver = function(game)
{

}

Breax.GameOver.prototype = {

    create: function()
    {
        // GameOver Text
        gameOverTextStyle = { font: "65px Arial", fill: "#fff", align: "center" };
        gameOverText = this.game.add.text( this.game.world.width / 2, this.game.world.height * .2, 'Game Over', gameOverTextStyle );
        gameOverText.anchor.set(0.5);

        // Score Text
        scoreTextStyle = { font: "30px Arial", fill: "#ccc", align: "center" };
        scoreText = this.game.add.text( this.game.world.width / 2, this.game.world.height * .35, "Score: " + this.game.score, scoreTextStyle );
        scoreText.anchor.set(0.5);

        retryButton = this.game.add.button( this.game.world.centerX - 100, 270, 'gui/buttons', this.retryButtonClick, this, 2, 2, 3, 2 );
        quitButton = this.game.add.button( this.game.world.centerX - 100, 350, 'gui/buttons', this.quitButtonClick, this, 4, 4, 5, 4 );

    },

    retryButtonClick: function(){
        this.game.global.sounds["menu_click"].play();
        this.state.start('Game', true, false);
    },

    quitButtonClick: function(){
        this.game.global.sounds["menu_click"].play();
        this.state.start('Menu');
    }

};