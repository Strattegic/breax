Breakout = {

};

Breakout.Boot = function(game)
{

}

Breakout.Boot.prototype = {
    
    preload: function()
    {
        this.load.image('phaser', 'phaser.png');
        this.load.image( 'ball', 'images/ball.png' );
    },

    create: function()
    {
        this.game.stage.backgroundColor = '#124184';
        this.add.sprite(0,100,'phaser');

        this.state.start('Menu');
    }
};