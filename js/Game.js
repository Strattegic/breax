Breax.Game = function( game )
{
	this.game = game;
	this.tiles = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
	];

	this.bricks;
	this.ball;
	this.paddle;
	this.defaultBallSpeed = 400;
	this.hearts;
	this.maxLives;
	this.currentLives = this.maxLives;

	this.ballIsReset = false;
	this.scoreText;
};

Breax.Game.prototype = 
{
	create: function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
    	this.game.physics.arcade.checkCollision.down = false;

		// Bricks
		this.bricks = this.game.add.group();
    	this.bricks.enableBody = true;
		for( i = 0; i < this.tiles.length; i++ )
		{
			for( j = 0; j < this.tiles[i].length; j++ )
			{
				brick = this.bricks.create( 16 + j * 64, 100 + i * 32, 'bricks', this.tiles[i][j] );
	            brick.body.bounce.set(1);
	            brick.body.immovable = true;
			}
		}

		// Ball
		this.ball = this.game.add.sprite( 400, 350, 'ball' );
		this.game.physics.arcade.enable( this.ball, Phaser.Physics.ARCADE );
		this.ball.body.collideWorldBounds = true;
    	this.ball.checkWorldBounds = true;
		this.ball.body.onWorldBounds = new Phaser.Signal();
		this.ball.body.onWorldBounds.add(this.ballHitWall, this);
    	this.ball.events.onOutOfBounds.add( this.ballOut, this );
		this.ball.body.bounce.set(1);
		this.ballIsReset = true;

		// Paddle
		this.paddle = this.game.add.sprite( 440, 520, 'paddle' );
		this.paddle.height = 10;
		this.paddle.width = 120;
		this.game.physics.arcade.enable( this.paddle, Phaser.Physics.ARCADE );
		this.paddle.body.immovable = true;

		// Key binding
		escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    	escKey.onDown.add( this.keyPressed, this );

    	// Score Text
		scoreTextStyle = { font: "15px Arial", fill: "#cccccc", align: "right" };
    	this.scoreText = this.game.add.text( this.game.world.width - 30, this.game.world.height * 0.97, '', scoreTextStyle );
    	this.scoreText.anchor.set(1);

    	// Lives / Hearts
    	this.hearts = this.game.add.group();
    	for( var i = 0; i < this.maxLives; i++ )
    	{
    		heart = this.hearts.create( 20 + i * 30, this.game.world.height * 0.93, 'heart_sprites', 0 );
    		heart.width = 22;
    		heart.height = 19;
    	}

    	// Sounds
    	this.game.global.sounds["ball_hit"] = this.game.add.audio('ball_hit');
    	this.game.global.sounds["brick_hit"] = this.game.add.audio('brick_hit');
    	this.game.global.sounds["ball_out"] = this.game.add.audio('ball_out');
	},

	/**
	*	Initialize / reset the game variables
	**/
	init: function(){
		this.maxLives = 3;
		this.currentLives = 3;
		this.game.score = 0;
	},

	keyPressed: function( key ){
		if( key.isDown && key.keyCode == 27 )
		{
			this.game.state.start('Menu');
		}
	},

	ballHitWall: function( sprite, up, down, left, right, game ){
		this.game.global.sounds["ball_hit"].play();
	},

	ballHitBrick: function( ball, brick ){
		brick.kill();
		ball.game.score += 10;

		if( this.bricks.countLiving() == 0 )
		{
			// show success screen
			// currently: success screen == game over screen
			this.game.state.start('GameOver');
		}
		this.game.global.sounds["brick_hit"].play();
	},

	/**
	*	
	*/
	ballOut: function( game ){
		this.ballIsReset = true;
		this.ball.reset( this.game.width / 2 - this.ball.width / 2, 350 );

		if( this.currentLives > 0 )
		{
			this.currentLives--;
		}
		else
		{
			// no more lives left, gameover
			this.state.start('GameOver');
		}

		this.game.global.sounds["ball_out"].play();
	},

	restartBall: function(){
		this.ball.body.moves = true;
		angle = this.game.rnd.integerInRange(30, 150);
		this.game.physics.arcade.velocityFromAngle(angle, this.defaultBallSpeed, this.ball.body.velocity);
	},

	update: function(){
		this.game.physics.arcade.collide( this.ball, this.bricks, this.ballHitBrick, null, this );
		this.game.physics.arcade.collide( this.ball, this.paddle, this.ballHitPaddle, null, this );

		this.paddle.x = this.game.input.x - this.paddle.width/2 || this.game.world.width*0.5;

		if( this.ballIsReset && this.game.input.activePointer.leftButton.isDown )
		{
			this.restartBall();
			this.ballIsReset = false;
		}
	},

	ballHitPaddle: function( ball, paddle ){

		// calculate the point where the ball hit the paddle (the value between 0 and paddle.width)
		paddleHitX = ball.x - paddle.x > 0 ? ball.x - paddle.x : 1;

		// dampening the actual angle
		// this way there are no steep angles when hitting the ball on either end of the paddle
		if( paddleHitX < paddle.width * .2 )
		{
			paddleHitX = paddle.width * .2;
		}
		else if ( paddleHitX > paddle.width * .8 )
		{
			paddleHitX = paddle.width * .8;
		}

		// actual calculated angle for the ball
		angle = 180 + ( paddleHitX / paddle.width ) * 180;

		this.game.physics.arcade.velocityFromAngle(angle, this.defaultBallSpeed, this.ball.body.velocity);

		this.game.global.sounds["ball_hit"].play();
	},

	render: function(){
		this.scoreText.text = "Score: " + this.game.score;

		for( var i = 0; i < this.hearts.length; i++ )
		{
			if( this.currentLives == i )
			{
				// show only the full hearts
				// a missing live will not be displayed
				this.hearts.getAt( i ).visible = false
			}
		}
	}
};