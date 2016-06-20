function MUX_f () {


	var in1 = 2;

	var model = scicos_model();
	model.sim=list(new ScilabString(["mux"]),new ScilabDouble([1]));
	model.in=-...transpose([1:in]);
	model.out = new ScilabDouble([0]);
	model.ipar=in;
	model.blocktype = new ScilabString(["c"]);
	model.dep_ut = new ScilabBoolean([true,false]);

	var exprs = string(in);

	var gr_i = [];
	this.x=new standard_define(new ScilabDouble([0.5,2]),model,exprs,gr_i);
	return new BasicBlock(this.x)
}
