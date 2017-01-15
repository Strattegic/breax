Breax.GameOver = function(game)
{

    this.gameOverText;
}

Breax.GameOver.prototype = {

    create: function()
    {
        // GameOver Text
        gameOverTextStyle = { font: "65px Arial", fill: "#fff", align: "center" };
        this.gameOverText = this.game.add.text( this.game.world.width / 2, this.game.world.height * .2, 'Game Over', gameOverTextStyle );

        retryButton = this.game.add.button( this.game.world.centerX - 100, 270, 'gui/buttons', this.retryButtonClick, this, 2, 2, 3, 2 );
        quitButton = this.game.add.button( this.game.world.centerX - 100, 350, 'gui/buttons', this.quitButtonClick, this, 4, 4, 5, 4 );


        this.gameOverText.anchor.set(0.5);
    },

    retryButtonClick: function(){
        this.state.start('Game', true, false);
    },

    quitButtonClick: function(){
        this.state.start('Menu');
    },

    update: function()
    {

    }

};