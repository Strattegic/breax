Breakout.Menu = function(game)
{

}

Breakout.Menu.prototype = {
    
    preload: function()
    {

    },

    create: function()
    {
        this.game.stage.backgroundColor = '#cccccc';

        this.state.start('Game');
    }
};