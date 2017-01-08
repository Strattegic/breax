Breax.Menu = function(game)
{

}

Breax.Menu.prototype = {

    create: function()
    {
        this.game.stage.backgroundColor = '#202020';
        logo = this.game.add.sprite( this.game.world.centerX - 300, 100, 'logo' );
        startButton = this.game.add.button( this.game.world.centerX - 100, 300, 'gui/buttons', this.startButtonClick, this, 0, 0, 1, 0 );
        soundButton = this.game.add.button( this.game.world.width - 60, this.game.world.height - 60, 'kenney_buttons', this.soundButtonClick, this, 5, 5, 5, 5 );
        // startButton = this.game.add.button( this.game.world.centerX - 25, 200, 'kenney_buttons', this.startButtonClick, this, 77, 77, 77, 77 );
    },

    startButtonClick: function()
    {
        this.state.start('Game');
    },

    soundButtonClick: function( button )
    {
        if( this.game.global.soundEnabled )
        {
            button.setFrames(15, 15, 15, 15);
            this.game.global.soundEnabled = false;
        }
        else
        {
            button.setFrames(5, 5, 5, 5); 
            this.game.global.soundEnabled = true;
        }
    }
};