function PULSE_SC () {


	var scs_m_1 = scicos_diagram(version="scicos4.2",props=scicos_params(wpar=[-162.7581,435.54369,67.607292,416.67644,827,479,0,15,827,480,715,167,1.4],Title=["SuperBlock","/home/fady/Scicos_examples/"],tol=[0.0001;0.000001;1.000D-10;100001;0;0;0],tf=10,context=["E2=E+W/100*F";
	"if (W<0 | W>100) then error(''Width must be between 0 and 100'');end";
	if ((E2 >= F)){
	this.scs_m_1.objs(1)=scicos_block(gui="CONST_m",graphics=scicos_graphics(orig=[30.801202,158.91733],sz=[40,40],flip=%t,theta=0,exprs="A",pin=[],pout=5,pein=[],peout=[],gr_i=[],id="",in_implicit=[],out_implicit="E"),model=scicos_model(sim=list("cstblk4_m",4),in1=[],in2=[],intyp=1,out=1,out2=1,outtyp=1,evtin=[],evtout=[],state=[],dstate=[],odstate=list(),rpar=[],ipar=[],opar=list(1),blocktype="d",firing=[],dep_ut=[%f,%f],label="",nzcross=0,nmode=0,equations=list()),doc=list())
	this.scs_m_1.objs(2)=scicos_block(gui="Ground_g",graphics=scicos_graphics(orig=[31.534535,215.384],sz=[40,40],flip=%t,theta=0,exprs=[],pin=[],pout=4,pein=[],peout=[],gr_i=[],id="",in_implicit=[],out_implicit="E"),model=scicos_model(sim=list("cstblk4_m",4),in1=[],in2=[],intyp=1,out=1,out2=1,outtyp=-1,evtin=[],evtout=[],state=[],dstate=[],odstate=list(),rpar=[],ipar=[],opar=list(0),blocktype="d",firing=[],dep_ut=[%f,%f],label="",nzcross=0,nmode=0,equations=list()),doc=list())
	this.scs_m_1.objs(3)=scicos_block(gui="SELECT_m",graphics=scicos_graphics(orig=[106.00652,186.09381],sz=[40,40],flip=%t,theta=0,exprs=["-1";"2";"1"],pin=[4;5],pout=11,pein=[9;8],peout=[],gr_i=[],id="",in_implicit=["E";"E"],out_implicit="E"),model=scicos_model(sim=list("selector_m",4),in1=[-1;-1],in2=[-2;-2],intyp=[-1;-1],out=-1,out2=-2,outtyp=-1,evtin=[1;1],evtout=[],state=[],dstate=1,odstate=list(),rpar=[],ipar=[],opar=list(),blocktype="c",firing=[],dep_ut=[%t,%f],label="",nzcross=0,nmode=0,equations=list()),doc=list())
	this.scs_m_1.objs(4)=scicos_link(xx=[80.105964;97.43509;97.43509],yy=[235.384;235.384;212.76048],id="drawlink",thick=[0,0],ct=[1,1],from=[2,1,0],to=[3,1,1])
	this.scs_m_1.objs(5)=scicos_link(xx=[79.372631;97.43509;97.43509],yy=[178.91733;178.91733;199.42714],id="drawlink",thick=[0,0],ct=[1,1],from=[1,1,0],to=[3,2,1])
	this.scs_m_1.objs(6)=scicos_block(gui="SampleCLK",graphics=scicos_graphics(orig=[82.349744,274.21741],sz=[60,40],flip=%t,theta=0,exprs=["F";"E2"],pin=[],pout=[],pein=[],peout=9,gr_i=[],id="",in_implicit=[],out_implicit=[]),model=scicos_model(sim="sampleclk",in1=[],in2=[],intyp=1,out=[],out2=[],outtyp=1,evtin=[],evtout=1,state=[],dstate=[],odstate=list(),rpar=[1;0.4],ipar=[],opar=list(),blocktype="d",firing=-1,dep_ut=[%f,%f],label="",nzcross=0,nmode=0,equations=list()),doc=list())
	this.scs_m_1.objs(7)=scicos_block(gui="SampleCLK",graphics=scicos_graphics(orig=[160.48879,274.21741],sz=[60,40],flip=%t,theta=0,exprs=["F";"E"],pin=[],pout=[],pein=[],peout=8,gr_i=[],id="",in_implicit=[],out_implicit=[]),model=scicos_model(sim="sampleclk",in1=[],in2=[],intyp=1,out=[],out2=[],outtyp=1,evtin=[],evtout=1,state=[],dstate=[],odstate=list(),rpar=[1;0.1],ipar=[],opar=list(),blocktype="d",firing=-1,dep_ut=[%f,%f],label="",nzcross=0,nmode=0,equations=list()),doc=list())
	this.scs_m_1.objs(8)=scicos_link(xx=[190.48879;190.48879;132.67318;132.67318],yy=[274.21741;240.99048;240.99048;231.80809],id="drawlink",thick=[0,0],ct=[5,-1],from=[7,1,0],to=[3,2,1])
	this.scs_m_1.objs(9)=scicos_link(xx=[112.34974;112.34974;119.33985;119.33985],yy=[274.21741;248.21372;248.21372;231.80809],id="drawlink",thick=[0,0],ct=[5,-1],from=[6,1,0],to=[3,1,1])
	this.scs_m_1.objs(10)=scicos_block(gui="OUT_f",graphics=scicos_graphics(orig=[174.57795,196.09381],sz=[20,20],flip=%t,theta=0,exprs="1",pin=11,pout=[],pein=[],peout=[],gr_i=[],id="",in_implicit="E",out_implicit=[]),model=scicos_model(sim="output",in1=-1,in2=-2,intyp=-1,out=[],out2=[],outtyp=1,evtin=[],evtout=[],state=[],dstate=[],odstate=list(),rpar=[],ipar=1,opar=list(),blocktype="c",firing=[],dep_ut=[%f,%f],label="",nzcross=0,nmode=0,equations=list()),doc=list())
	this.scs_m_1.objs(11)=scicos_link(xx=[154.57795;174.57795],yy=[206.09381;206.09381],id="drawlink",thick=[0,0],ct=[1,1],from=[3,1,0],to=[10,1,1])
	this.model=scicos_model()
	this.model.sim="csuper"
	this.model.in1=[]
	this.model.in2=[]
	this.model.intyp=1
	this.model.out=-1
	this.model.out2=-2
	this.model.outtyp=-1
	this.model.evtin=[]
	this.model.evtout=[]
	this.model.state=[]
	this.model.dstate=[]
	this.model.odstate=list()
	this.model.rpar=scs_m_1
	this.model.ipar=1
	this.model.opar=list()
	this.model.blocktype="h"
	this.model.firing=[]
	this.model.dep_ut=[%f,%f]
	this.model.label=""
	this.model.nzcross=0
	this.model.nmode=0
	this.model.equations=list()
	this.E=0.1
	this.W=30
	this.F=1
	this.A=1
	this.exprs=[sci2exp(E)sci2exp(W)sci2exp(F)sci2exp(A)]
	this.gr_i=[]
	this.x=standard_define([3,2],model,exprs,gr_i)
	
	return new BasicBlock(this.x)
}
