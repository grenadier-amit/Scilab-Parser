function MBLOCK () {


	var in1 = ["u1"];

	var intype = ["I"];

	var out = ["y1";"y2"];

	var outtype = ["I";"E"];

	var param = ["R";"L"];

	var paramv = list(0.1,.0001);

	var pprop = [[0],[0]];

	var nameF = "generic";

	var exprs = ...colon_operator(tlist,["MBLOCK","in","intype","out","outtype","param","paramv","pprop","nameF","funtxt"],sci2exp(...in1),sci2exp(...intype),sci2exp(...out),sci2exp(...outtype),sci2exp(...param),list(string(0.1),string(.0001)),sci2exp(pprop(,)),nameF,[]);

	var model = scicos_model();
	model.blocktype = new ScilabString(["c"]);
	model.dep_ut = new ScilabBoolean([false,true]);
	model.rpar = new ScilabDouble();
	for (var i=1; i < lstsize(paramv); i++){
	this.model.rpar=[model.rpar;paramv(i)(:)]
	}

	var mo = modelica();
	mo.model=new ScilabString([nameF]);
	mo.parameters=list(param,paramv);
	model.sim=list(mo.model,new ScilabDouble([30004]));
	mo.inputs=new ScilabString([in1]);
	mo.outputs=new ScilabString([out]);
	model.in1.push(ones(size(mo.inputs,"r"),1));
	model.out=ones(size(mo.outputs,"r"),1);
	model.equations=mo;

	var gr_i = [];
	this.x=new standard_define(new ScilabDouble([3,2]),model,exprs,gr_i);
	this.x.graphics.in_implicit=new ScilabString([intype]);
	this.x.graphics.out_implicit=new ScilabString([outtype]);
	
	return new BasicBlock(this.x)
}
