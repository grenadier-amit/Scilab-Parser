function RELATIONALOP () {


	var ipar = [2];

	var label = "&lt";

	var model = scicos_model();
	model.sim=list("relationalop",4);
	model.in = new ScilabDouble([1],[1]);
	model.out = new ScilabDouble([1]);
	model.ipar=new ScilabDouble([ipar]);
	model.blocktype = new ScilabString(["c"]);
	model.dep_ut = new ScilabBoolean([true,false]);

	var exprs = [[ipar.toString()],[0.toString()]];

	var gr_i = [];
	this.x=new standard_define(new ScilabDouble([2,2]),model,exprs,gr_i);
	this.x.graphics.style = new ScilabString(["fontSize=13],[fontStyle=1],[displayedLabel="+label]);
}
