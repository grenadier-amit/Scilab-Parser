function BOUNCEXY () {


	var win = -1;

	var imode = 1;

	var clrs = [[1],[2]];

	var siz = [[1],[1]];

	var xmin = -5;

	var xmax = 5;

	var ymin = 0;

	var ymax = 15;

	var model = scicos_model();
	model.sim=list(new ScilabString(["bouncexy"]),new ScilabDouble([4]));
	model.in1 = new ScilabDouble([-1],[-1]);
	model.in2 = new ScilabDouble([1],[1]);
	model.intyp = new ScilabDouble([1],[1]);
	model.evtin = new ScilabDouble([1]);

	var z = [];
	for (var i=1; i < size(this.clrs,"*"); i++){
	this.z(6*(i-1)+1)=0
	this.z(6*(i-1)+2)=0
	this.z(6*(i-1)+3)=2*siz(i)
	this.z(6*(i-1)+4)=2*siz(i)
	this.z(6*(i-1)+5)=0.000
	this.z(6*(i-1)+6)=64.0*360.000;
	}
	model.dstate=z;
	model.rpar = new ScilabDouble([xmin],[xmax],[ymin],[ymax]);
	model.ipar = new ScilabDouble([win],[imode],[...clrs]);
	model.blocktype = new ScilabString(["d"]);
	model.firing = new ScilabDouble();
	model.dep_ut = new ScilabBoolean([false,false]);

	var exprs = [[strcat(sci2exp(clrs))],[strcat(sci2exp(siz))],[strcat(sci2exp(win))],[strcat(sci2exp(1))],[strcat(sci2exp(xmin))],[strcat(sci2exp(xmax))],[strcat(sci2exp(ymin))],[strcat(sci2exp(ymax))]];

	var gr_i = [];
	this.x=new standard_define(new ScilabDouble([2,2]),model,exprs,gr_i);
	
	return new BasicBlock(this.x)
}
