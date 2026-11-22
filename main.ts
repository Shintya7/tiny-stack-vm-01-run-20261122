import{readFileSync,readdirSync,mkdirSync,writeFileSync}from"node:fs";
import{join}from"node:path";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
for(const d of readdirSync(I).sort()){
const p=readFileSync(join(I,d,"program.bin")),q=readFileSync(join(I,d,"input.bin")),n=p.length,D=new Int32Array(256),M=new Int32Array(256),C=new Int32Array(64),o=new Uint8Array(65536);
let s=0,c=0,pc=0,t=0,ip=0,l=0,e=-1;
while(e<0){
if(t==1e6){e=10;break}
if(pc<0||pc>=n){e=9;break}
const k=p[pc],m=k==1?1:k==2?4:k>47&&k<52?2:0;
if(pc+m>=n){e=9;break}
t++;
const x=pc+1+m;
pc=x;
if(k<8){
if(!k){e=0;break}
if(k==1){if(s>255){e=3;break}D[s++]=(p[x-1]<<24)>>24}
else if(k==2){if(s>255){e=3;break}D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24}
else if(k==3){if(!s){e=2;break}s--}
else if(k==4){if(!s){e=2;break}if(s>255){e=3;break}D[s]=D[s-1];s++}
else if(k==5){if(s<2){e=2;break}const v=D[s-1];D[s-1]=D[s-2];D[s-2]=v}
else if(k==6){if(s<2){e=2;break}if(s>255){e=3;break}D[s]=D[s-2];s++}
else{if(s<3){e=2;break}const v=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=v}
}else if(k>15&&k<35&&k!=23&&k!=27&&k!=31){
if(s<2){e=2;break}
const b=D[--s],a=D[--s];
let r;
if(k==16)r=a+b|0;
else if(k==17)r=a-b|0;
else if(k==18)r=Math.imul(a,b);
else if(k==19){if(!b){e=4;break}r=(a/b)|0}
else if(k==20){if(!b){e=4;break}r=a%b|0}
else if(k==21){if(!b){e=4;break}r=Math.floor((a>>>0)/(b>>>0))|0}
else if(k==22){if(!b){e=4;break}r=(a>>>0)%(b>>>0)|0}
else if(k==24)r=a&b;
else if(k==25)r=a|b;
else if(k==26)r=a^b;
else if(k==28)r=a<<b;
else if(k==29)r=a>>b;
else if(k==30)r=(a>>>b)|0;
else if(k==32)r=a==b?1:0;
else if(k==33)r=a<b?1:0;
else r=(a>>>0)<(b>>>0)?1:0;
D[s++]=r;
}else switch(k){
case 23:if(!s){e=2;break}D[s-1]=-D[s-1]|0;break;
case 27:if(!s){e=2;break}D[s-1]=~D[s-1];break;
case 48:pc=x+(((p[x-2]|p[x-1]<<8)<<16)>>16);break;
case 49:case 50:{
if(!s){e=2;break}
const v=D[--s];
if((k==49)==(v==0))pc=x+(((p[x-2]|p[x-1]<<8)<<16)>>16);
break}
case 51:
if(c==64){e=7;break}
C[c++]=x;pc=p[x-2]|p[x-1]<<8;break;
case 52:
if(!c){e=8;break}
pc=C[--c];break;
case 64:
if(!s){e=2;break}
const a=D[s-1];
if(a<0||a>255){e=6;break}
D[s-1]=M[a];break;
case 65:{
if(s<2){e=2;break}
const w=D[s-1],v=D[s-2];
if(w<0||w>255){e=6;break}
s-=2;M[w]=v;break}
case 80:{
if(!s){e=2;break}
const u=String(D[s-1]);
if(l+u.length>65536){e=11;break}
s--;
for(let i=0;i<u.length;i++)o[l++]=u.charCodeAt(i);
break}
case 81:
if(!s){e=2;break}
if(l>65535){e=11;break}
o[l++]=D[--s]&255;break;
case 82:
if(s>255){e=3;break}
D[s++]=ip<q.length?q[ip++]:-1;break;
case 83:
if(!s){e=2;break}
e=D[--s]&255;break;
default:e=5;
}
}
mkdirSync(join(O,d),{recursive:true});
writeFileSync(join(O,d,"stdout.bin"),o.subarray(0,l));
writeFileSync(join(O,d,"exit.txt"),e+"\n");
}
