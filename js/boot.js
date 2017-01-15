Breax = {
    
};

Breax.Boot = function(game)
{

}

Breax.Boot.prototype = {
    
    preload: function()
    {
        this.load.spritesheet('gui/buttons', 'images/gui/buttons.png', 200, 60, 6);
        this.load.spritesheet('kenney_buttons', 'images/gui/sheet_white1x.png', 50, 50, 200 );
        this.load.image('logo', 'images/gui/logo.png');

        this.load.image('brick', 'images/brick.png');
        this.load.image('paddle', 'images/paddle.png');
        this.load.image('ball', 'images/ball.png');
        this.game.load.spritesheet('heart_sprites', 'images/gui/heart_sprites.png', 22, 19, 2);
        this.game.load.spritesheet('bricks', 'images/bricks.png', 64, 32, 25);
    },

    create: function()
    {
        this.game.stage.backgroundColor = '#202020';
        this.state.start('Menu');
        this.game.soundEnabled = true;
        this.game.score = 0;
    },

    update: function()
    {

    }
};