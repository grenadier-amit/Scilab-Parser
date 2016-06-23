function CCS () {


	var ModelName = "CCS";

	var PrametersValue = [];

	var ParametersName = [];

	var model = scicos_model();

	var Typein = [];

	var Typeout = [];

	var MI = [];

	var MO = [];

	var P = [[2,50,1,0],[,70,98,2,0],[70,2,-2,0]];

	var PortName = ["Iin";"p";"n"];
	for (var i=1; i < size(this.P,"r"); i++){
	if (P(i,3)==1 ){
	this.Typein= [Typein; "E"];
	this.MI=[MI;PortName(i)];
	}
	if (P(i,3)==2 ){
	this.Typein= [Typein; "I"];
	this.MI=[MI;PortName(i)];
	}
	if (P(i,3)==-1){
	this.Typeout=[Typeout;"E"];
	this.MO=[MO;PortName(i)];
	}
	if (P(i,3)==-2){
	this.Typeout=[Typeout;"I"];
	this.MO=[MO;PortName(i)];
	}
	}
	model=scicos_model();

	var mo = modelica();
	model.sim=new ScilabString([ModelName]);
	mo.inputs=MI;
	mo.outputs=MO;
	model.rpar=PrametersValue;
	mo.parameters=list(ParametersName,PrametersValue,zeros(ParametersName));

	var exprs = [];

	var gr_i = [];
	model.blocktype = new ScilabString(["c"]);
	model.dep_ut = new ScilabBoolean([false,true]);
	mo.model=new ScilabString([ModelName]);
	model.equations=mo;
	model.in1.push(ones(size(MI,"*"),1));
	model.out=ones(size(MO,"*"),1);
	this.x=standard_define([2.1,3],model,exprs,list(gr_i,0));
	this.x.graphics.in_implicit=Typein;
	this.x.graphics.out_implicit=Typeout;
	
	return new BasicBlock(this.x)
}
