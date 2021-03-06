function Flowmeter () {


	var ModelName = "Flowmeter";

	var PrametersValue = 1;

	var ParametersName = "Qini";

	var model = scicos_model();

	var Typein = [];

	var Typeout = [];

	var MI = [];

	var MO = [];

	var P = [[50,105,-1,90],[0,10,2,0],[101,10,-2,0]];

	var PortName = ["Mesure";"C1";"C2"];
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
	model.rpar=new ScilabDouble([PrametersValue]);
	mo.parameters=list(ParametersName,PrametersValue,zeros(ParametersName));

	var exprs = "1";

	var gr_i = [];
	model.blocktype = new ScilabString(["c"]);
	model.dep_ut = new ScilabBoolean([false,true]);
	mo.model=new ScilabString([ModelName]);
	model.equations=mo;
	model.in1.push(ones(size(MI,"*"),1));
	model.out=ones(size(MO,"*"),1);
	this.x=standard_define([2,2],model,exprs,list(gr_i,0));
	this.x.graphics.in_implicit=Typein;
	this.x.graphics.out_implicit=Typeout;
	
	return new BasicBlock(this.x)
}
