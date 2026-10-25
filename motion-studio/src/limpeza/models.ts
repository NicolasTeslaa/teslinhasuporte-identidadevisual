import * as T from 'three';
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {ease,motionState} from './timeline';
const BLUE=0x0551da, WHITE=0xffffff, GRAPHITE=0x4a494d, LIGHT=0xc2cee1;
const mat=(c:number,metal=.15,rough=.35)=>new T.MeshStandardMaterial({color:c,metalness:metal,roughness:rough});
const dark=mat(GRAPHITE,.65,.3), white=mat(WHITE,.15,.22), blue=mat(BLUE,.4,.26), silver=mat(LIGHT,.75,.28);
function box(g:T.Object3D,w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material=dark,r=.04){
 const o=new T.Mesh(r?new RoundedBoxGeometry(w,h,d,2,r):new T.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;
}
function ring(g:T.Object3D,r:number,tube:number,x:number,y:number,z:number,m:T.Material){const o=new T.Mesh(new T.TorusGeometry(r,tube,8,48),m);o.position.set(x,y,z);g.add(o);return o;}
function cylinder(g:T.Object3D,r:number,h:number,x:number,y:number,z:number,m:T.Material){const o=new T.Mesh(new T.CylinderGeometry(r,r,h,32),m);o.rotation.x=Math.PI/2;o.position.set(x,y,z);o.castShadow=true;g.add(o);return o;}
const glow=new T.MeshStandardMaterial({color:BLUE,emissive:BLUE,emissiveIntensity:1.7,metalness:.2,roughness:.24});
function fan(parent:T.Object3D,x:number,y:number,z:number,r=.56){
 const frame=new T.Group();frame.position.set(x,y,z);parent.add(frame);
 box(frame,r*2.3,r*2.3,.14,0,0,-.04,dark,.09);ring(frame,r,.035,0,0,.08,silver);ring(frame,r*.91,.025,0,0,.1,glow);
 const blades=new T.Group();frame.add(blades);
 for(let i=0;i<9;i++){const blade=box(blades,r*.28,r*.69,.035,0,r*.43,.09,silver,.04);const pivot=new T.Group();blades.remove(blade);pivot.add(blade);blade.rotation.z=-.48;pivot.rotation.z=i*Math.PI*2/9;blades.add(pivot);}
 cylinder(frame,r*.22,.13,0,0,.17,dark);return blades;
}
function tower(){const g=new T.Group();const fans:T.Group[]=[];
 box(g,1.95,3.55,2.25,0,0,0,dark,.08);box(g,1.73,3.23,.08,0,0,1.15,mat(0x242a38),.02);
 for(let i=0;i<3;i++)fans.push(fan(g,0,1.08-i*1.08,1.22,.43));
 const glass=new T.MeshPhysicalMaterial({color:LIGHT,metalness:.12,roughness:.15,transparent:true,opacity:.18,side:T.DoubleSide});
 box(g, .035,3.2,2.02,1.0,0,0,glass,.01);
 box(g,.06,3.18,.055,1.025,0,.99,blue);box(g,.06,3.18,.055,1.025,0,-.99,blue);
 box(g,.08,.04,1.9,1.03,.0,0,glow);box(g,.08,.24,1.6,1.025,-.5,0,dark);
 for(let i=0;i<12;i++)box(g,.045,.12,1.5,1.06,-.7-i*.04,0,silver,.005);
 for(const x of [-.65,.65])for(const z of [-.8,.8])box(g,.26,.18,.28,x,-1.85,z,dark);
 cylinder(g,.055,.03,.63,1.55,1.23,glow);
 for(let i=0;i<5;i++)box(g,.15,.035,.03,-.55+i*.21,1.54,1.22,silver,.006);
 return {g,fans};}
function consoleUnit(){const g=new T.Group();box(g,.68,3.45,1.65,0,0,0,dark,.13);
 for(const x of [-.42,.42]){const p=box(g,.14,3.7,1.85,x,.05,0,white,.065);p.rotation.z=x*.07;}
 box(g,.025,3.15,.03,.34,0,.85,glow,.01);box(g,.07,.72,.02,-.22,-.65,.84,silver,.008);
 cylinder(g,.54,.12,0,-1.86,0,dark).rotation.x=0;
 const controller=new T.Group();controller.position.set(.2,-1.35,1.5);controller.rotation.set(-.25,.1,-.15);g.add(controller);
 box(controller,1.35,.45,.42,0,0,0,white,.16);for(const x of [-.47,.47]){const grip=box(controller,.38,.6,.38,x,-.16,0,white,.14);grip.rotation.z=-x*.5;}
 box(controller,.43,.23,.04,0,.07,.24,dark,.04);for(const x of [-.27,.27])cylinder(controller,.09,.06,x,-.1,.25,dark);
 for(const [x,y] of [[-.47,.1],[-.47,-.02],[.48,.15],[.56,.07],[.48,-.01],[.4,.07]])cylinder(controller,.03,.04,x,y,.25,blue);
 return g;}
function interior(){const g=new T.Group();box(g,4.8,3.8,.2,0,0,-.45,dark,.12);
 box(g,4.45,3.45,.04,0,0,-.31,mat(0x303849),.03);
 for(let i=0;i<8;i++){box(g,.02,2.9,.02,-2+i*.5,0,-.27,silver,.001);box(g,3.9,.015,.02,0,-1.5+i*.42,-.265,blue,.001);}
 const fans=[fan(g,-.65,.2,.45,.9),fan(g,1.25,.7,.1,.5)];
 for(let i=0;i<21;i++)box(g,.05,2.35,.55,-1.7+i*.105,.05,.02,silver,.005);
 for(let i=0;i<4;i++)box(g,.18,1.7,.12,1+i*.3,-.65,-.1,i%2?blue:silver,.02);
 for(let i=0;i<9;i++)box(g,.22,.18,.12,-1.8+i*.43,-1.5,-.12,silver,.02);
 return {g,fans};}
function dust(parent:T.Object3D,count:number){const group=new T.Group();parent.add(group);const material=mat(0x9b948a,0,.95);const geo=new T.IcosahedronGeometry(.035,0);const particles:T.Mesh[]=[];
 for(let i=0;i<count;i++){const p=new T.Mesh(geo,material);p.position.set(Math.sin(i*123.13)*1.9,Math.cos(i*71.3)*1.45,.7+Math.sin(i*18.1)*.18);p.scale.setScalar(.4+(i%7)*.18);group.add(p);particles.push(p);}return {group,particles,positions:particles.map(p=>p.position.clone())};}
function house(){const g=new T.Group();box(g,1.7,1.6,1.55,0,.8,0,white,.07);
 const roof=new T.Mesh(new T.ConeGeometry(1.45,.85,4),blue);roof.rotation.y=Math.PI/4;roof.position.y=1.95;g.add(roof);
 box(g,.43,.88,.05,.38,.45,.8,dark,.03);box(g,.57,.57,.055,-.44,.95,.8,blue,.03);
 box(g,.025,.54,.06,-.44,.95,.84,white,.001);box(g,.54,.025,.06,-.44,.95,.84,white,.001);return g;}
function shop(){const g=new T.Group();box(g,2,1.7,1.65,0,.85,0,white,.08);box(g,2.15,.3,1.85,0,1.85,0,blue,.04);
 box(g,1.5,1.1,.05,0,.65,.85,dark,.03);box(g,1.35,.95,.06,0,.66,.89,silver,.02);for(let i=0;i<8;i++)box(g,1.35,.015,.07,0,.24+i*.12,.93,white,.002);
 box(g,.85,.25,.04,0,1.48,.86,blue,.02);return g;}
function van(){const g=new T.Group();box(g,1.45,.75,.8,0,.57,0,white,.12);box(g,.65,.55,.8,.63,.46,0,blue,.08);box(g,.48,.25,.81,.62,.7,0,silver,.03);
 box(g,.65,.22,.02,-.25,.62,.42,blue,.03);
 for(const x of [-.48,.64])for(const z of [-.42,.42]){cylinder(g,.22,.12,x,.19,z,dark);cylinder(g,.11,.13,x,.19,z,silver);}return g;}
export function createWorld(stage:number){
 const scene=new T.Scene();const root=new T.Group();scene.add(root);
 scene.add(new T.AmbientLight(WHITE,1.5));const key=new T.DirectionalLight(WHITE,4.5);key.position.set(-4,7,8);scene.add(key);
 const rim=new T.DirectionalLight(0x8facff,3);rim.position.set(5,1,-3);scene.add(rim);
 const fill=new T.DirectionalLight(WHITE,1.5);fill.position.set(3,-2,5);scene.add(fill);
 const camera=new T.PerspectiveCamera(34,1080/930,.1,100);camera.position.set(6,3.8,11);camera.lookAt(0,0,0);
 let animate=(t:number)=>{};
 if(stage===0 || stage===4){const pc=tower(),con=consoleUnit();pc.g.position.x=-1.1;pc.g.rotation.y=-.12;con.position.set(1.65,-.25,.3);con.scale.setScalar(.82);root.add(pc.g,con);const debris=dust(pc.g,100);debris.group.position.set(0,0,1.18);debris.group.scale.set(.43,1,.3);
 animate=t=>{root.rotation.y=-.18+Math.sin(t*.6)*.09;pc.g.position.y=Math.sin(t*1.4)*.10;con.position.y=-.25+Math.sin(t*1.4+1)*.13;pc.fans.forEach(f=>f.rotation.z=t*2);debris.group.visible=stage===0;camera.position.set(5.8-t*.08,3.4,11-t*.15);camera.lookAt(0,0,0);};
 }else if(stage===1 || stage===2){const pc=interior();root.add(pc.g);const debris=dust(pc.g,240);root.rotation.y=-.18;
 const brush=new T.Group();box(brush,.3,2.3,.3,0,1.2,0,blue,.12);box(brush,.82,.4,.4,0,-.05,0,dark,.07);
 for(let i=0;i<24;i++)box(brush,.024,.55,.024,(i%8-.5*7)*.095,-.5,Math.floor(i/8)*.12,silver,.006);
 brush.rotation.z=-.5;brush.position.set(-2,1,1.8);root.add(brush);brush.visible=stage===2;
 animate=t=>{const state=motionState(stage,t);pc.fans.forEach((f,i)=>f.rotation.z=stage===1?t*(1.5+i):t*.2);root.rotation.y=-.15+Math.sin(t*.45)*.08;root.rotation.x=.08;camera.position.set(3.4,2.2,10.5-(stage===1?Math.min(t,5)*.15:0));camera.lookAt(0,0,0);
 debris.particles.forEach((p,i)=>{const pos=debris.positions[i];p.position.copy(pos);if(stage===2){const progress=1-state.dust;p.position.x+=progress*(2+i%4);p.position.y+=progress*2;p.position.z+=progress*2;p.scale.setScalar(Math.max(0,state.dust)*(.4+(i%7)*.18));}});
 brush.position.x=-2+ease(t/3.8)*4.5;brush.position.y=.8+Math.sin(t*3)*.45;brush.visible=stage===2&&t<4.2;};
 }else{camera.position.set(7,7,11);camera.lookAt(0,.2,0);const h=house(),s=shop(),v=van();h.position.set(-2.35,0,-.2);s.position.set(2.3,0,-.9);root.add(h,s,v);
 box(root,7,.18,4.4,0,-.18,0,mat(LIGHT,0,.8),.15);
 const path=new T.CatmullRomCurve3([new T.Vector3(-2.35,.02,1.2),new T.Vector3(-1,.02,1.9),new T.Vector3(1,.02,1.8),new T.Vector3(2.3,.02,.7)]);
 const route=new T.Mesh(new T.TubeGeometry(path,64,.035,8,false),blue);root.add(route);
 const routeDots=Array.from({length:8},()=>{const dot=new T.Mesh(new T.SphereGeometry(.055,8,8),white);root.add(dot);return dot;});
 const cleaning=interior();cleaning.g.scale.setScalar(.32);cleaning.g.position.set(2.3,2.55,1);root.add(cleaning.g);
 const cleaningDust=dust(cleaning.g,70);
 const pack=box(root,.42,.6,.45,-2,.4,1,dark,.04);const spark=new T.Group();root.add(spark);spark.position.set(2.3,1.2,1);
 for(let i=0;i<6;i++){const b=box(spark,.025,.35,.025,0,.5,0,blue,.006);const pivot=new T.Group();spark.remove(b);pivot.add(b);pivot.rotation.z=i*Math.PI/3;spark.add(pivot);}
 animate=t=>{const state=motionState(3,t);const p=path.getPoint(state.vehicle);v.position.copy(p);const tangent=path.getTangent(state.vehicle);v.rotation.y=-Math.atan2(tangent.z,tangent.x)+(t>4.8?Math.PI:0);pack.position.set(t<.8?-2.1:t>7.3?-2.1:p.x,t<.8?.4:t>7.3?.4:1.05,t<.8?1:t>7.3?1:p.z);pack.visible=!state.service;spark.visible=state.service;spark.rotation.z=t*2;const ss=.8+Math.sin(t*8)*.15;spark.scale.setScalar(ss);cleaning.g.visible=state.service;cleaningDust.group.scale.setScalar(1-ease((t-3)/1.5));routeDots.forEach((dot,i)=>dot.position.copy(path.getPoint((i/8+t*.12)%1)));root.rotation.y=Math.sin(t*.3)*.05;};
 }
 return {scene,camera,animate,dispose:()=>{scene.traverse(o=>{if(o instanceof T.Mesh)o.geometry.dispose();});}};
}
