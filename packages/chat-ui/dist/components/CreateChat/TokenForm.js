import{jsx as e,jsxs as i,Fragment as t}from"react/jsx-runtime";import{useState as r}from"react";import{useForm as n}from"react-hook-form";import{Stack as s,Switch as o,Text as a,FormControl as l,FormLabel as c,FormHelperText as d,FormErrorMessage as m,Icon as u,Link as g,Input as h,Flex as f,ButtonGroup as p,Button as b}from"@chakra-ui/react";import*as v from"yup";import{yupResolver as j}from"@hookform/resolvers/yup";import{RiErrorWarningFill as O}from"react-icons/ri";import{NATIVE_MINT as y}from"@solana/spl-token";import{FormControlWithError as k}from"../form/FormControlWithError.js";import{MintSelect as S}from"../form/MintSelect.js";import{usePublicKey as x}from"@strata-foundation/react";import{routes as w}from"../../routes.js";const I=e=>v.object({amount:v.number().required().min(0),...e?{mint:v.string().required()}:{startingPrice:v.number().required().min(0),legalDisclosure:v.bool().oneOf([!0],"Field must be checked")}}).required(),z=({onSubmit:v,onBack:z,defaultValues:C})=>{const[E,q]=r(C.isExisting),{handleSubmit:D,setValue:T,register:P,getValues:L,clearErrors:M,setError:F,watch:V,formState:{errors:B}}=n({mode:"onChange",resolver:j(I(E)),defaultValues:C}),{mint:U,amount:W,isExisting:_}=V(),A=x(U),N={bg:"gray.200",_dark:{bg:"gray.800"}},R=e=>{T("mint",e),e?M("mint"):F("mint",{message:"Mint is a required field"})};return e("form",Object.assign({onSubmit:D((e=>{v({type:_&&A?.equals(y)?"native":"token",...e})})),style:{width:"100%"}},{children:i(s,Object.assign({w:"full",alignItems:"start",gap:8,spacing:0},{children:[i(s,Object.assign({direction:"row",justifyContent:"center",alignItems:"center"},{children:[e(o,{size:"lg",colorScheme:"primary",isChecked:_,onChange:e=>{(()=>{const{isExisting:e,...i}=L();Object.keys(i).forEach((e=>T(e,null)))})(),M(),T("isExisting",e.target.checked),q(e.target.checked)}},void 0),e(a,{children:"Use existing token"},void 0)]}),void 0),i(s,Object.assign({w:"full",alignItems:"start",gap:6,spacing:0},{children:[_?i(l,Object.assign({isInvalid:!!B.mint?.message},{children:[e(c,Object.assign({htmlFor:"mint"},{children:_?"Mint":"Purchase Mint"}),void 0),e(S,{value:V("mint"),onChange:R},void 0),B.mint?.message?i(m,Object.assign({fontSize:"xs",textTransform:"capitalize"},{children:[e(u,{as:O,mr:2,fontSize:"1.3rem"},void 0),i(a,{children:[B.mint.message,". If you want users using SOL, use ",e(a,Object.assign({color:"primary.500",as:"span",cursor:"pointer",onClick:()=>R(y.toString())},{children:y.toString()}),void 0)]},void 0)]}),void 0):i(d,Object.assign({fontSize:"xs"},{color:"black",_dark:{color:"gray.400"}},{children:[_?"The mint of the existing token to use for this permission.":"The mint that should be used to purchase this token."," If you want users using SOL, use ",e(a,Object.assign({color:"primary.500",as:"span",cursor:"pointer",onClick:()=>R(y.toString())},{children:y.toString()}),void 0)]}),void 0)]}),void 0):i(t,{children:[i(a,Object.assign({fontSize:"xs"},{children:["We'll create a token for you thats bonded to SOL, via a stable curve, with 5% buy royalties. If you want a more advanced token/curve please"," ",e(g,Object.assign({color:"primary.500",isExternal:!0,href:w.fullyManagedLaunchpad.path},{children:"launch one."}),void 0)]}),void 0),e(k,Object.assign({id:"startingPrice",label:"Starting Price",errors:B,help:"The starting price in SOL of the token. The price will increase as\n                    more tokens are purchased"},{children:e(h,Object.assign({id:"startingPrice",variant:"filled",type:"number",fontSize:"sm",min:0,step:1e-12},N,P("startingPrice")),void 0)}),void 0)]},void 0),e(k,Object.assign({id:"amount",label:"Required Amount",errors:B,help:"The amount required to hold of this token."},{children:e(h,Object.assign({id:"amount",variant:"filled",type:"number",fontSize:"sm",min:0,step:1e-12},N,P("amount")),void 0)}),void 0),!_&&i(l,Object.assign({display:"flex",flexDirection:"column",alignItems:"center",isInvalid:!!B.legalDisclosure?.message},{children:[i(f,Object.assign({alignItems:"center"},{children:[e(o,Object.assign({id:"legalDisclosure",colorScheme:"primary"},P("legalDisclosure")),void 0),e(c,Object.assign({htmlFor:"legalDisclosure",mb:"0",ml:"4",fontSize:"xs"},{children:"I represent that I have undertaken sufficient legal analysis to determine that the token does not constitute a security under U.S. law."}),void 0)]}),void 0),B.legalDisclosure?.message&&i(m,Object.assign({textTransform:"capitalize",display:"flex",w:"full"},{children:[e(u,{as:O,mr:2,fontSize:"1.3rem"},void 0),B.legalDisclosure.message]}),void 0)]}),void 0)]}),void 0),i(p,Object.assign({variant:"outline",colorScheme:"primary",w:"full"},{children:[e(b,Object.assign({w:"full",onClick:z},{children:"Back"}),void 0),e(b,Object.assign({w:"full",variant:"solid",type:"submit",disabled:_&&!U||!W},{children:"Next"}),void 0)]}),void 0)]}),void 0)}),void 0)};export{z as TokenForm,I as validationSchema};
//# sourceMappingURL=TokenForm.js.map
