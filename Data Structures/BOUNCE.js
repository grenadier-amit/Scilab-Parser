function BOUNCE () {


	var n = 2;

	var k = 1],[ipar=[];
	for (var i=1; i < n; i++){
	for (var j=i+1; j < n; j++){
	this.ipar(k)=i
	this.k=k+1
	this.ipar(k)=j
	this.k=k+1
	}
	}

	var walls = [[0],[5],[0],[5]];
	this.x = new ScilabDouble([2],[2.5]);

	var xd = [[0],[0]];

	var y = [[3],[5]];

	var yd = [[0],[0]];

	var g = 9.81;

	var C = 0;

	var rpar1 = ones(n,1);

	var rpar2 = rpar1;

	var state = [x,xd,y,yd];
	state=state';

	var model = scicos_model();
	model.sim=list(new ScilabString(["bounce_ball"]),new ScilabDouble([4]));
	model.in1 = new ScilabDouble();
	model.out = new ScilabDouble([n],[n]);
	model.state=...state;
	model.rpar = new ScilabDouble([rpar1],[rpar2],[walls],[g],[C]);
	model.ipar=ipar;
	model.nzcross=n*(n-1)/2+4*n;
	model.blocktype = new ScilabString(["c"]);
	model.dep_ut = new ScilabBoolean([false,true]);

	var exprs = [[strcat(sci2exp(rpar1))],[strcat(sci2exp(rpar2))],[strcat(sci2exp(walls))],[strcat(sci2exp(x))],[strcat(sci2exp(xd))],[strcat(sci2exp(y))],[strcat(sci2exp(yd))]];

	var gr_i = [];
	this.x=new standard_define(new ScilabDouble([3,2]),model,exprs,gr_i);
	
	return new BasicBlock(this.x)
}
