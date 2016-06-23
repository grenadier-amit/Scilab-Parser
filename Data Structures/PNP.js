function PNP () {


	var ModelName = "PNP";

	var PrametersValue = [[50],[0.1],[0],[0.02],[1.200D-10],[5.000D-09],[1.000D-12],[4.000D-13],[5.000D-13],[0.8],[0.4],[0.8],[0.333],[1.000D-15],[1.000D-15],[0.02585],[40]];

	var ParametersName = ["Bf";"Br";"Is";"Vak";"Tauf";"Taur";"Ccs";"Cje";"Cjc";"Phie";"Me";"Phic";"Mc";"Gbc";"Gbe";"Vt";"EMinMax"];

	var model = scicos_model();

	var Typein = [];

	var Typeout = [];

	var MI = [];

	var MO = [];

	var P = [[100,90,-2,0],[0,50,2,0],[100,10,-2,0]];

	var PortName = ["C";"B";"E"];
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

	var exprs = ["50";"0.1";"1.e-16";"0.02";"0.12e-9";"5e-9";"1e-12";"0.4e-12";"0.5e-12";"0.8";"0.4";"0.8";"0.333";"1e-15";"1e-15";"0.02585";"40"];

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
