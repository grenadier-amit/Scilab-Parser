function GOTOMO () {


	var model = scicos_model();
	model.sim = new ScilabString(["gotomo"]);
	model.in = new ScilabDouble([-1]);
	model.in2 = new ScilabDouble([-2]);
	model.intyp = new ScilabDouble();
	model.out = new ScilabDouble();
	model.out2 = new ScilabDouble();
	model.outtyp = new ScilabDouble([1]);
	model.ipar=int(1);
	model.opar=list("A");
	model.blocktype = new ScilabString(["c"]);
	model.dep_ut = new ScilabBoolean([false,false]);

	var mo = modelica();
	mo.model = new ScilabString(["gotomo"]);
	mo.inputs = new ScilabString(["p"]);

	var exprs = [["A"],[sci2exp(1)]];

	var gr_i = [];
	this.x=new standard_define(new ScilabDouble([2,1]),model,exprs,gr_i);
	this.x.graphics.in_implicit = new ScilabString(["I"]);
	return new  BasicBlock (this.x)
}
