var pe=Object.defineProperty;var _e=(e,t,n)=>t in e?pe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ee=(e,t,n)=>(_e(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerPolicy&&(o.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?o.credentials="include":l.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}})();const app="";function noop(){}function run(e){return e()}function blank_object(){return Object.create(null)}function run_all(e){e.forEach(run)}function is_function(e){return typeof e=="function"}function safe_not_equal(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let src_url_equal_anchor;function src_url_equal(e,t){return e===t?!0:(src_url_equal_anchor||(src_url_equal_anchor=document.createElement("a")),src_url_equal_anchor.href=t,e===src_url_equal_anchor.href)}function is_empty(e){return Object.keys(e).length===0}function append(e,t){e.appendChild(t)}function insert(e,t,n){e.insertBefore(t,n||null)}function detach(e){e.parentNode&&e.parentNode.removeChild(e)}function element(e){return document.createElement(e)}function text(e){return document.createTextNode(e)}function space(){return text(" ")}function listen(e,t,n,a){return e.addEventListener(t,n,a),()=>e.removeEventListener(t,n,a)}function attr(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function children(e){return Array.from(e.childNodes)}function set_data(e,t){t=""+t,e.data!==t&&(e.data=t)}function set_input_value(e,t){e.value=t??""}function custom_event(e,t,{bubbles:n=!1,cancelable:a=!1}={}){return new CustomEvent(e,{detail:t,bubbles:n,cancelable:a})}let current_component;function set_current_component(e){current_component=e}function get_current_component(){if(!current_component)throw new Error("Function called outside component initialization");return current_component}function createEventDispatcher(){const e=get_current_component();return(t,n,{cancelable:a=!1}={})=>{const l=e.$$.callbacks[t];if(l){const o=custom_event(t,n,{cancelable:a});return l.slice().forEach(r=>{r.call(e,o)}),!o.defaultPrevented}return!0}}const dirty_components=[],binding_callbacks=[];let render_callbacks=[];const flush_callbacks=[],resolved_promise=Promise.resolve();let update_scheduled=!1;function schedule_update(){update_scheduled||(update_scheduled=!0,resolved_promise.then(flush))}function add_render_callback(e){render_callbacks.push(e)}const seen_callbacks=new Set;let flushidx=0;function flush(){if(flushidx!==0)return;const e=current_component;do{try{for(;flushidx<dirty_components.length;){const t=dirty_components[flushidx];flushidx++,set_current_component(t),update(t.$$)}}catch(t){throw dirty_components.length=0,flushidx=0,t}for(set_current_component(null),dirty_components.length=0,flushidx=0;binding_callbacks.length;)binding_callbacks.pop()();for(let t=0;t<render_callbacks.length;t+=1){const n=render_callbacks[t];seen_callbacks.has(n)||(seen_callbacks.add(n),n())}render_callbacks.length=0}while(dirty_components.length);for(;flush_callbacks.length;)flush_callbacks.pop()();update_scheduled=!1,seen_callbacks.clear(),set_current_component(e)}function update(e){if(e.fragment!==null){e.update(),run_all(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(add_render_callback)}}function flush_render_callbacks(e){const t=[],n=[];render_callbacks.forEach(a=>e.indexOf(a)===-1?t.push(a):n.push(a)),n.forEach(a=>a()),render_callbacks=t}const outroing=new Set;let outros;function transition_in(e,t){e&&e.i&&(outroing.delete(e),e.i(t))}function transition_out(e,t,n,a){if(e&&e.o){if(outroing.has(e))return;outroing.add(e),outros.c.push(()=>{outroing.delete(e),a&&(n&&e.d(1),a())}),e.o(t)}else a&&a()}function create_component(e){e&&e.c()}function mount_component(e,t,n){const{fragment:a,after_update:l}=e.$$;a&&a.m(t,n),add_render_callback(()=>{const o=e.$$.on_mount.map(run).filter(is_function);e.$$.on_destroy?e.$$.on_destroy.push(...o):run_all(o),e.$$.on_mount=[]}),l.forEach(add_render_callback)}function destroy_component(e,t){const n=e.$$;n.fragment!==null&&(flush_render_callbacks(n.after_update),run_all(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function make_dirty(e,t){e.$$.dirty[0]===-1&&(dirty_components.push(e),schedule_update(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function init(e,t,n,a,l,o,r=null,f=[-1]){const d=current_component;set_current_component(e);const s=e.$$={fragment:null,ctx:[],props:o,update:noop,not_equal:l,bound:blank_object(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(d?d.$$.context:[])),callbacks:blank_object(),dirty:f,skip_bound:!1,root:t.target||d.$$.root};r&&r(s.root);let c=!1;if(s.ctx=n?n(e,t.props||{},(i,_,...g)=>{const I=g.length?g[0]:_;return s.ctx&&l(s.ctx[i],s.ctx[i]=I)&&(!s.skip_bound&&s.bound[i]&&s.bound[i](I),c&&make_dirty(e,i)),_}):[],s.update(),c=!0,run_all(s.before_update),s.fragment=a?a(s.ctx):!1,t.target){if(t.hydrate){const i=children(t.target);s.fragment&&s.fragment.l(i),i.forEach(detach)}else s.fragment&&s.fragment.c();t.intro&&transition_in(e.$$.fragment),mount_component(e,t.target,t.anchor),flush()}set_current_component(d)}class SvelteComponent{constructor(){ee(this,"$$");ee(this,"$$set")}$destroy(){destroy_component(this,1),this.$destroy=noop}$on(t,n){if(!is_function(n))return noop;const a=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return a.push(n),()=>{const l=a.indexOf(n);l!==-1&&a.splice(l,1)}}$set(t){this.$$set&&!is_empty(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const PUBLIC_VERSION="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(PUBLIC_VERSION);const sbLogo="/assets/sb-f5249866.svg",decor1="/assets/heroLeftTop-12c0b131.svg",decor2="/assets/heroLeftBot-014cc3f3.svg",decor3="/assets/heroMidBot-3f296d7d.svg",decor4="/assets/heroRightBot-dbae4c8d.svg",decor5="/assets/heroRightTop-bbec4c8a.svg",Compiler_svelte_svelte_type_style_lang="";function create_fragment$2(e){let t,n,a,l,o,r,f,d,s,c,i,_,g,I,y,v,h,u;return{c(){t=element("form"),n=element("label"),a=text("Исходный код"),l=element("textarea"),o=space(),r=element("label"),f=text("Пользовательский код"),d=element("textarea"),s=space(),c=element("label"),i=text(`Вывод\r
        `),_=element("div"),g=element("pre"),I=text(e[2]),y=space(),v=element("button"),v.textContent="Выполнить",attr(l,"class","original svelte-1x5l805"),attr(n,"class","svelte-1x5l805"),attr(d,"class","svelte-1x5l805"),attr(r,"class","svelte-1x5l805"),attr(g,"class","svelte-1x5l805"),attr(_,"class","task1__result svelte-1x5l805"),attr(_,"id","output"),attr(c,"for","output"),attr(c,"class","svelte-1x5l805"),attr(t,"action",""),attr(t,"class","task1__compiler svelte-1x5l805"),attr(v,"class","task1__btn svelte-1x5l805"),attr(v,"type","button")},m(m,x){insert(m,t,x),append(t,n),append(n,a),append(n,l),set_input_value(l,e[0]),append(t,o),append(t,r),append(r,f),append(r,d),set_input_value(d,e[1]),append(t,s),append(t,c),append(c,i),append(c,_),append(_,g),append(g,I),insert(m,y,x),insert(m,v,x),h||(u=[listen(l,"input",e[4]),listen(d,"input",e[5]),listen(v,"click",e[3])],h=!0)},p(m,[x]){x&1&&set_input_value(l,m[0]),x&2&&set_input_value(d,m[1]),x&4&&set_data(I,m[2])},i:noop,o:noop,d(m){m&&(detach(t),detach(y),detach(v)),h=!1,run_all(u)}}}function instance($$self,$$props,$$invalidate){let sourceCode=`const encoded = [
    {
        groupId: 783,

        areaId: "0",
        departmentId: "688",
        directionId: "0",
        mediaTypeId: "0",
        mediaId: "676",
        resellingId: "18842",
        serviceTypeId: "124",
        formatTypeId: "0",
        formatId: "0",
        unitId: "82226",
        platformId: "0",
        budgetId: null,
        adPlatformId: "1026",
        service: null,
        formatSize: null,
        ca: null,
        mpmId: null,
    },
    {
        groupId: 784,

        areaId: "0",
        departmentId: "688",
        directionId: "0",
        mediaTypeId: "0",
        mediaId: "676",
        resellingId: "18842",
        serviceTypeId: "124",
        formatTypeId: "0",
        formatId: "0",
        unitId: "82226",
        platformId: "0",
        budgetId: null,
        adPlatformId: "1026",
        service: null,
        formatSize: null,
        ca: null,
        mpmId: null,
    },
    {
        groupId: 785,

        areaId: "0",
        departmentId: "688",
        directionId: "0",
        mediaTypeId: "0",
        mediaId: "676",
        resellingId: "18842",
        serviceTypeId: "124",
        formatTypeId: "0",
        formatId: "0",
        unitId: "82226",
        platformId: "0",
        budgetId: null,
        adPlatformId: "1026",
        service: null,
        formatSize: null,
        ca: null,
        mpmId: null,
    },
    {
        groupId: 786,

        areaId: "0",
        departmentId: "688",
        directionId: "0",
        mediaTypeId: "0",
        mediaId: "676",
        resellingId: "18842",
        serviceTypeId: "124",
        formatTypeId: "0",
        formatId: "0",
        unitId: "82226",
        platformId: "0",
        budgetId: null,
        adPlatformId: "1026",
        service: null,
        formatSize: null,
        ca: null,
        mpmId: null,
    },
    {
        groupId: 787,

        areaId: "0",
        departmentId: "688",
        directionId: "0",
        mediaTypeId: "0",
        mediaId: "676",
        resellingId: "18842",
        serviceTypeId: "124",
        formatTypeId: "0",
        formatId: "0",
        unitId: "82226",
        platformId: "0",
        budgetId: null,
        adPlatformId: "1026",
        service: null,
        formatSize: null,
        ca: null,
        mpmId: null,
    },
    {
        groupId: 788,

        areaId: "0",
        departmentId: "688",
        directionId: "18858",
        mediaTypeId: "111",
        mediaId: "676",
        resellingId: "18842",
        serviceTypeId: "124",
        formatTypeId: "15130",
        formatId: "0",
        unitId: "82226",
        platformId: "0",
        budgetId: null,
        adPlatformId: "1026",
        service: null,
        formatSize: null,
        ca: null,
        mpmId: null,
    },
    {
        groupId: 789,

        areaId: "0",
        departmentId: "688",
        directionId: "18858",
        mediaTypeId: "111",
        mediaId: "676",
        resellingId: "18842",
        serviceTypeId: "124",
        formatTypeId: "15152",
        formatId: "0",
        unitId: "82226",
        platformId: "0",
        budgetId: null,
        adPlatformId: "1026",
        service: null,
        formatSize: null,
        ca: null,
        mpmId: null,
    },
    {
        groupId: 790,

        areaId: "0",
        departmentId: "688",
        directionId: "18858",
        mediaTypeId: "111",
        mediaId: "676",
        resellingId: "18842",
        serviceTypeId: "124",
        formatTypeId: "15130",
        formatId: "0",
        unitId: "82226",
        platformId: "0",
        budgetId: null,
        adPlatformId: "1026",
        service: null,
        formatSize: null,
        ca: null,
        mpmId: null,
    },
    {
        groupId: 791,

        areaId: "0",
        departmentId: "688",
        directionId: "18858",
        mediaTypeId: "111",
        mediaId: "676",
        resellingId: "18842",
        serviceTypeId: "124",
        formatTypeId: "15130",
        formatId: "110639",
        unitId: "82226",
        platformId: "145868",
        budgetId: null,
        adPlatformId: "1557",
        service: null,
        formatSize: "не применим",
        ca: null,
        mpmId: null,
    },
    {
        groupId: 792,

        areaId: "0",
        departmentId: "688",
        directionId: "18858",
        mediaTypeId: "111",
        mediaId: "676",
        resellingId: "18842",
        serviceTypeId: "124",
        formatTypeId: "15130",
        formatId: "110639",
        unitId: "82226",
        platformId: "145868",
        budgetId: null,
        adPlatformId: "1026",
        service: null,
        formatSize: "не применим",
        ca: null,
        mpmId: null,
    },
    {
        groupId: 793,

        areaId: "0",
        departmentId: "688",
        directionId: "18858",
        mediaTypeId: "111",
        mediaId: "676",
        resellingId: "18842",
        serviceTypeId: "124",
        formatTypeId: "15152",
        formatId: "82193",
        unitId: "82226",
        platformId: "0",
        budgetId: null,
        adPlatformId: "1026",
        service: null,
        formatSize: "Не применимо",
        ca: null,
        mpmId: null,
    },
    ];

    const translations = {
    0: "",
    111: "СММ",
    124: "Размещение",
    676: "Диджитал",
    688: "Маркетинг",
    1026: "Telegram",
    1557: "Посевы",
    15130: "СММ - 2",
    15152: "Баннеры",
    18842: "Нет",
    18858: "СММ - 3",
    82193: "Баннеры",
    82226: "Фикс",
    110639: "Статья",
    };
    `,userCode=`function decodeFields(encoded, translations) {
    const decoded = [];

    const uniqueIds = new Set();

    encoded.forEach(obj => {
        const decodedObj = {};
        Object.entries(obj).forEach(([key, value]) => {
        
        if (key.endsWith('Id')) {
            const decodedValue = translations[value] || value;
            
            decodedObj[key] = decodedValue;
            
            if (!['groupId', 'service', 'formatSize', 'ca'].includes(key)) {
            
                uniqueIds.add(value);
            }
        
        } else {
            decodedObj[key] = value;
        }
        });
        decoded.push(decodedObj);
    });
    
    return { decoded, uniqueIds: Array.from(uniqueIds) };
    
}
    
const { decoded, uniqueIds } = decodeFields(encoded, translations);

console.log('Расшифрованные данные:');

decoded.forEach(obj => console.log(JSON.stringify(obj, null, 2)));

console.log('Уникальные id:');

const uniqueIdsArray = Array.from(uniqueIds);

for (let i = 0; i < uniqueIdsArray.length; i += 4) {

    console.log(uniqueIdsArray.slice(i, i + 4).join(', '));

}`,consoleOutput="";createEventDispatcher();function handleCompileButtonClick(){compileAndRunCode()}function compileAndRunCode(){const combinedCode=`${sourceCode}
${userCode}`;$$invalidate(2,consoleOutput="");try{let consoleLogHolder=[];const originalConsoleLog=console.log;console.log=(...e)=>{consoleLogHolder.push(e)},eval(combinedCode),console.log=originalConsoleLog,$$invalidate(2,consoleOutput=consoleLogHolder.map(e=>e.join(" ")).join(`
`))}catch(e){$$invalidate(2,consoleOutput=`Ошибка выполнения: ${e.message}`)}}function textarea0_input_handler(){sourceCode=this.value,$$invalidate(0,sourceCode)}function textarea1_input_handler(){userCode=this.value,$$invalidate(1,userCode)}return[sourceCode,userCode,consoleOutput,handleCompileButtonClick,textarea0_input_handler,textarea1_input_handler]}class Compiler extends SvelteComponent{constructor(t){super(),init(this,t,instance,create_fragment$2,safe_not_equal,{})}}const arrow="/assets/arrow-28ba790f.svg",Converter_svelte_svelte_type_style_lang="";function create_fragment$1(e){let t,n,a,l,o,r,f,d,s,c,i,_,g,I,y,v,h,u,m,x,$,j,k,te,C,ne,le,V,ae,Z,Y,p,E,T,w,z,S,P,N,L,B,D,O,q,R,A,K,H,U,F,M,oe,b,se,re,G,W,X;return{c(){t=element("ul"),n=element("li"),a=element("div"),l=element("select"),o=element("option"),o.textContent="USD - Доллар США",r=element("option"),r.textContent="RUB - Российский рубль",f=element("option"),f.textContent="CAD - Австралийский доллар",d=element("option"),d.textContent="CHF - Швейцарский франк",s=element("option"),s.textContent="JPY - Японская йена",c=element("option"),c.textContent="NZD - Новозеландский доллар",i=element("option"),i.textContent="EUR - Евро",_=element("option"),_.textContent="GBP - Британский фунт",g=element("option"),g.textContent="SEK - Шведская крона",I=element("option"),I.textContent="DKK - Датская крона",y=element("option"),y.textContent="NOK - Норвежская крона",v=element("option"),v.textContent="SGD - Сингапурский доллар",h=element("option"),h.textContent="CZK - Чешская крона",u=element("option"),u.textContent="HKD - Гонконгский доллар",m=element("option"),m.textContent="MXN - Мексиканский песо",x=element("option"),x.textContent="PLN - Польский злотый",$=element("option"),$.textContent="TRY - Турецкая лира",j=element("option"),j.textContent="ZAR - Ранд ЮАР",k=element("option"),k.textContent="CNH - Китайский юань",te=space(),C=element("img"),le=space(),V=element("input"),ae=space(),Z=element("li"),Y=element("div"),p=element("select"),E=element("option"),E.textContent="USD - Доллар США",T=element("option"),T.textContent="RUB - Российский рубль",w=element("option"),w.textContent="CAD - Австралийский доллар",z=element("option"),z.textContent="CHF - Швейцарский франк",S=element("option"),S.textContent="JPY - Японская йена",P=element("option"),P.textContent="NZD - Новозеландский доллар",N=element("option"),N.textContent="EUR - Евро",L=element("option"),L.textContent="GBP - Британский фунт",B=element("option"),B.textContent="SEK - Шведская крона",D=element("option"),D.textContent="DKK - Датская крона",O=element("option"),O.textContent="NOK - Норвежская крона",q=element("option"),q.textContent="SGD - Сингапурский доллар",R=element("option"),R.textContent="CZK - Чешская крона",A=element("option"),A.textContent="HKD - Гонконгский доллар",K=element("option"),K.textContent="MXN - Мексиканский песо",H=element("option"),H.textContent="PLN - Польский злотый",U=element("option"),U.textContent="TRY - Турецкая лира",F=element("option"),F.textContent="ZAR - Ранд ЮАР",M=element("option"),M.textContent="CNH - Китайский юань",oe=space(),b=element("img"),re=space(),G=element("input"),W=space(),X=element("div"),o.__value="USD",set_input_value(o,o.__value),attr(o,"class","svelte-1yjxt4d"),r.__value="RUB",set_input_value(r,r.__value),attr(r,"class","svelte-1yjxt4d"),f.__value="CAD",set_input_value(f,f.__value),attr(f,"class","svelte-1yjxt4d"),d.__value="USD",set_input_value(d,d.__value),attr(d,"class","svelte-1yjxt4d"),s.__value="JPY",set_input_value(s,s.__value),attr(s,"class","svelte-1yjxt4d"),c.__value="NZD",set_input_value(c,c.__value),attr(c,"class","svelte-1yjxt4d"),i.__value="EUR",set_input_value(i,i.__value),attr(i,"class","svelte-1yjxt4d"),_.__value="GBP",set_input_value(_,_.__value),attr(_,"class","svelte-1yjxt4d"),g.__value="SEK",set_input_value(g,g.__value),attr(g,"class","svelte-1yjxt4d"),I.__value="DKK",set_input_value(I,I.__value),attr(I,"class","svelte-1yjxt4d"),y.__value="NOK",set_input_value(y,y.__value),attr(y,"class","svelte-1yjxt4d"),v.__value="SGD",set_input_value(v,v.__value),attr(v,"class","svelte-1yjxt4d"),h.__value="CZK",set_input_value(h,h.__value),attr(h,"class","svelte-1yjxt4d"),u.__value="HKD",set_input_value(u,u.__value),attr(u,"class","svelte-1yjxt4d"),m.__value="MXN",set_input_value(m,m.__value),attr(m,"class","svelte-1yjxt4d"),x.__value="PLN",set_input_value(x,x.__value),attr(x,"class","svelte-1yjxt4d"),$.__value="TRY",set_input_value($,$.__value),attr($,"class","svelte-1yjxt4d"),j.__value="ZAR",set_input_value(j,j.__value),attr(j,"class","svelte-1yjxt4d"),k.__value="CNH",set_input_value(k,k.__value),attr(k,"class","svelte-1yjxt4d"),attr(l,"name",""),attr(l,"id","fromConvert"),attr(l,"class","svelte-1yjxt4d"),src_url_equal(C.src,ne=arrow)||attr(C,"src",ne),attr(C,"width","100px"),attr(C,"height","100px"),attr(C,"alt",""),attr(C,"class","svelte-1yjxt4d"),attr(a,"class","task2__top svelte-1yjxt4d"),attr(V,"id","convert1"),attr(V,"type","number"),attr(V,"name",""),attr(V,"class","svelte-1yjxt4d"),attr(n,"class","task2__item svelte-1yjxt4d"),E.__value="USD",set_input_value(E,E.__value),attr(E,"class","svelte-1yjxt4d"),T.__value="RUB",set_input_value(T,T.__value),attr(T,"class","svelte-1yjxt4d"),w.__value="CAD",set_input_value(w,w.__value),attr(w,"class","svelte-1yjxt4d"),z.__value="USD",set_input_value(z,z.__value),attr(z,"class","svelte-1yjxt4d"),S.__value="JPY",set_input_value(S,S.__value),attr(S,"class","svelte-1yjxt4d"),P.__value="NZD",set_input_value(P,P.__value),attr(P,"class","svelte-1yjxt4d"),N.__value="EUR",set_input_value(N,N.__value),attr(N,"class","svelte-1yjxt4d"),L.__value="GBP",set_input_value(L,L.__value),attr(L,"class","svelte-1yjxt4d"),B.__value="SEK",set_input_value(B,B.__value),attr(B,"class","svelte-1yjxt4d"),D.__value="DKK",set_input_value(D,D.__value),attr(D,"class","svelte-1yjxt4d"),O.__value="NOK",set_input_value(O,O.__value),attr(O,"class","svelte-1yjxt4d"),q.__value="SGD",set_input_value(q,q.__value),attr(q,"class","svelte-1yjxt4d"),R.__value="CZK",set_input_value(R,R.__value),attr(R,"class","svelte-1yjxt4d"),A.__value="HKD",set_input_value(A,A.__value),attr(A,"class","svelte-1yjxt4d"),K.__value="MXN",set_input_value(K,K.__value),attr(K,"class","svelte-1yjxt4d"),H.__value="PLN",set_input_value(H,H.__value),attr(H,"class","svelte-1yjxt4d"),U.__value="TRY",set_input_value(U,U.__value),attr(U,"class","svelte-1yjxt4d"),F.__value="ZAR",set_input_value(F,F.__value),attr(F,"class","svelte-1yjxt4d"),M.__value="CNH",set_input_value(M,M.__value),attr(M,"class","svelte-1yjxt4d"),attr(p,"name",""),attr(p,"id","toConvert"),attr(p,"class","svelte-1yjxt4d"),src_url_equal(b.src,se=arrow)||attr(b,"src",se),attr(b,"width","100px"),attr(b,"height","100px"),attr(b,"alt",""),attr(b,"class","svelte-1yjxt4d"),attr(Y,"class","task2__top svelte-1yjxt4d"),attr(G,"id","convert2"),attr(G,"type","number"),attr(G,"name",""),attr(G,"class","svelte-1yjxt4d"),attr(Z,"class","task2__item svelte-1yjxt4d"),attr(t,"class","task2__convert svelte-1yjxt4d"),attr(X,"class","task2__graph")},m(J,Q){insert(J,t,Q),append(t,n),append(n,a),append(a,l),append(l,o),append(l,r),append(l,f),append(l,d),append(l,s),append(l,c),append(l,i),append(l,_),append(l,g),append(l,I),append(l,y),append(l,v),append(l,h),append(l,u),append(l,m),append(l,x),append(l,$),append(l,j),append(l,k),append(a,te),append(a,C),append(n,le),append(n,V),append(t,ae),append(t,Z),append(Z,Y),append(Y,p),append(p,E),append(p,T),append(p,w),append(p,z),append(p,S),append(p,P),append(p,N),append(p,L),append(p,B),append(p,D),append(p,O),append(p,q),append(p,R),append(p,A),append(p,K),append(p,H),append(p,U),append(p,F),append(p,M),append(Y,oe),append(Y,b),append(Z,re),append(Z,G),insert(J,W,Q),insert(J,X,Q)},p:noop,i:noop,o:noop,d(J){J&&(detach(t),detach(W),detach(X))}}}class Converter extends SvelteComponent{constructor(t){super(),init(this,t,null,create_fragment$1,safe_not_equal,{})}}const vk="/assets/vk-c7e02a10.png",tg="/assets/tg-ab699133.png",decor6="/assets/task1LeftMid-6ac6b7cf.svg",decor7="/assets/task1RightMid-6a56b45a.svg",heart="/assets/heart-8aed8d3e.svg",App_svelte_svelte_type_style_lang="";function create_fragment(e){let t,n,a,l,o,r,f,d,s,c,i,_,g,I,y,v,h;return d=new Compiler({}),_=new Converter({}),{c(){t=element("header"),t.innerHTML=`<div class="header__container svelte-1ip53zm"><nav class="header__menu svelte-1ip53zm"><ul class="svelte-1ip53zm"><li class="header__item svelte-1ip53zm"><a href="#task1" class="svelte-1ip53zm">Task 1</a></li> <li class="header__item svelte-1ip53zm"><a href="#task2" class="svelte-1ip53zm">Task 2</a></li></ul></nav> <a href="https://sbermarketing.ru/" class="header__logo svelte-1ip53zm" target="_blank"><img src="${sbLogo}" width="32" height="32" alt="Логотип" class="svelte-1ip53zm"/> <p>СБЕР МАРКЕТИНГ</p></a></div>`,n=space(),a=element("main"),l=element("section"),l.innerHTML='<div class="hero__container svelte-1ip53zm"><div class="hero__text svelte-1ip53zm"><h1 class="hero__title svelte-1ip53zm">Тестовые задания<br/><span class="svelte-1ip53zm">СберМаркетинг</span></h1> <h2 class="hero__subtitle svelte-1ip53zm">Выполненные задания</h2></div></div>',o=space(),r=element("section"),f=element("div"),create_component(d.$$.fragment),s=space(),c=element("section"),i=element("div"),create_component(_.$$.fragment),g=space(),I=element("div"),I.innerHTML=`<img src="${decor1}" alt="Декорация" class="decor1 decor-animation svelte-1ip53zm"/> <img src="${decor2}" alt="Декорация" class="decor2 decor-animation svelte-1ip53zm"/> <img src="${decor3}" alt="Декорация" class="decor3 decor-animation svelte-1ip53zm"/> <img src="${decor4}" alt="Декорация" class="decor4 decor-animation svelte-1ip53zm"/> <img src="${decor5}" alt="Декорация" class="decor5 decor-animation svelte-1ip53zm"/> <img src="${decor6}" alt="Декорация" class="decor6 decor-animation svelte-1ip53zm"/> <img src="${decor7}" alt="Декорация" class="decor7 decor-animation svelte-1ip53zm"/>`,y=space(),v=element("footer"),v.innerHTML=`<div class="footer__container svelte-1ip53zm"><div class="footer__contacts svelte-1ip53zm"><p class="footer__email svelte-1ip53zm"><a href="mailto:d.sinyakin@mail.ru" target="_blank" class="svelte-1ip53zm">d.sinyakin@mail.ru</a></p> <ul class="footer__links svelte-1ip53zm"><li class="footer__item"><a href="https://vk.com/lkizt_off"><img src="${vk}" alt="Вконтакте" width="100" height="100" target="_blank"/></a></li> <li class="footer__item"><a href="https://t.me/lkizt"><img src="${tg}" alt="Телеграм" width="100" height="100" target="_blank"/></a></li></ul></div></div> <img src="${heart}" alt="" class="heart svelte-1ip53zm" width="200" height="200"/>`,attr(t,"id","header"),attr(l,"id","hero"),attr(f,"class","task1__container svelte-1ip53zm"),attr(r,"id","task1"),attr(i,"class","task2__container"),attr(c,"id","task2"),attr(I,"class","decor-container"),attr(a,"class","main"),attr(v,"class","footer svelte-1ip53zm")},m(u,m){insert(u,t,m),insert(u,n,m),insert(u,a,m),append(a,l),append(a,o),append(a,r),append(r,f),mount_component(d,f,null),append(a,s),append(a,c),append(c,i),mount_component(_,i,null),append(a,g),append(a,I),insert(u,y,m),insert(u,v,m),h=!0},p:noop,i(u){h||(transition_in(d.$$.fragment,u),transition_in(_.$$.fragment,u),h=!0)},o(u){transition_out(d.$$.fragment,u),transition_out(_.$$.fragment,u),h=!1},d(u){u&&(detach(t),detach(n),detach(a),detach(y),detach(v)),destroy_component(d),destroy_component(_)}}}class App extends SvelteComponent{constructor(t){super(),init(this,t,null,create_fragment,safe_not_equal,{})}}new App({target:document.getElementById("app")});document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(t){var o;t.preventDefault();const n=(o=this.getAttribute("href"))==null?void 0:o.substring(1);if(!n)return;const a=document.getElementById(n);if(!a)return;const l=a.offsetTop-80;window.scrollTo({top:l,behavior:"smooth"})})});window.addEventListener("scroll",()=>{const e=window.scrollY,t=document.getElementById("header"),n=document.querySelector(".header__container");window.scrollY>50?(n.style.padding="0",t&&(t.style.backgroundColor="rgba(53,54,55,0.55)")):(n.style.padding="25px 0",t&&(t.style.backgroundColor="transparent"));const l=-7-e*.1,o=document.querySelector(".decor1");o&&(o.style.top=l+"%");const r=-8-e*.1,f=document.querySelector(".decor2");f&&(f.style.left=r+"%");const d=-5+e*.1,s=document.querySelector(".decor4");s&&(s.style.right=-5-d+"%");const c=-30-e*.1,i=document.querySelector(".decor5");i&&(i.style.top=c+"%")});const fromConvert=document.getElementById("fromConvert"),toConvert=document.getElementById("toConvert");async function getExchangeRate(e,t){return(await(await fetch(`https://v6.exchangerate-api.com/v6/664b1622bf498758d161ff89/latest/${e}`)).json()).conversion_rates[t]}async function updateConvertedValueFrom(){const e=fromConvert.value,t=toConvert.value,n=document.getElementById("convert1"),a=document.getElementById("convert2"),l=await getExchangeRate(e,t);if(!isNaN(parseFloat(n.value))){const o=parseFloat(n.value)*l;a.value=o.toFixed(2)}}async function updateConvertedValueTo(){const e=fromConvert.value,t=toConvert.value,n=document.getElementById("convert1"),a=document.getElementById("convert2"),l=await getExchangeRate(t,e);if(!isNaN(parseFloat(a.value))){const o=parseFloat(a.value)*l;n.value=o.toFixed(2)}}var de;(de=document.getElementById("convert1"))==null||de.addEventListener("input",updateConvertedValueFrom);var ie;(ie=document.getElementById("convert2"))==null||ie.addEventListener("input",updateConvertedValueTo);var ce;(ce=document.getElementById("fromConvert"))==null||ce.addEventListener("change",updateConvertedValueFrom);var ue;(ue=document.getElementById("toConvert"))==null||ue.addEventListener("change",updateConvertedValueTo);
