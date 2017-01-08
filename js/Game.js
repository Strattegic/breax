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

	this.ballIsReset = false;
};

Breax.Game.prototype = 
{
	create: function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// Bricks
		this.bricks = this.game.add.group();
		for( i = 0; i < this.tiles.length; i++ )
		{
			for( j = 0; j < this.tiles[i].length; j++ )
			{
				brick = this.game.add.sprite( 16 + j * 64, 100 + i * 32, 'bricks', this.tiles[i][j] );
				this.game.physics.enable( brick );
				brick.body.immovable = true;
				this.bricks.add( brick );
			}
		}

		// Ball
		this.ball = this.game.add.sprite( 400, 350, 'ball' );
		this.game.physics.arcade.enable( this.ball, Phaser.Physics.ARCADE );
		this.ball.body.collideWorldBounds = true;
		this.ball.body.onWorldBounds = new Phaser.Signal();
		this.ball.body.onWorldBounds.add(this.ballHitWall, this);
		this.ball.body.bounce.set(1);
		this.ballIsReset = true;

		// Paddle
		this.paddle = this.game.add.sprite( 440, 520, 'paddle' );
		this.paddle.height = 10;
		this.paddle.width = 120;
		this.game.physics.arcade.enable( this.paddle, Phaser.Physics.ARCADE );
		this.paddle.body.immovable = true;

		escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    	escKey.onDown.add( this.keyPressed, this );
	},

	keyPressed: function( key )
	{
		if( key.isDown && key.keyCode == 27 )
		{
			this.game.state.start('Menu');
		}
	},

	brickHitWithBall: function( ball, brick ){
		brick.kill();
	},

	/**
	*	
	*/
	ballHitWall: function( sprite, up, down, left, right ){
		if( down )
		{
			this.ballIsReset = true;
			this.ball.body.moves = false;
			this.ball.body.velocity.setTo(0, 0);
			this.ball.x = this.game.width / 2 - this.ball.width / 2;
			this.ball.y = 350;
		}
	},

	restartBall: function(){
		this.ball.body.moves = true;
		angle = this.game.rnd.integerInRange(30, 150);
		this.game.physics.arcade.velocityFromAngle(angle, 400, this.ball.body.velocity);
	},

	update: function(){
		this.game.physics.arcade.collide( this.ball, this.bricks, this.brickHitWithBall );
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

		this.game.physics.arcade.velocityFromAngle(angle, 400, this.ball.body.velocity);
	},

	render: function(){
		// this.game.debug.bodyInfo(this.ball, 32, 32);
  //       this.game.debug.body(this.ball);
  //       this.game.debug.body(this.paddle);
	}
};