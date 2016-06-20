function TANBLK_f () {


	var in1 = -1;

	var model = scicos_model();
	model.sim = new ScilabString(["tanblk"]);
	model.in=in;
	model.out=in;
	model.blocktype = new ScilabString(["c"]);
	model.dep_ut = new ScilabBoolean([true,false]);

	var exprs = sci2exp(in);

	var gr_i = [];
	this.x=new standard_define(new ScilabDouble([2,2]),model,exprs,gr_i);
	return new BasicBlock(this.x)
}
