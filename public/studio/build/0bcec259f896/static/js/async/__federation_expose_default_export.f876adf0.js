/*! For license information please see __federation_expose_default_export.f876adf0.js.LICENSE.txt */
"use strict";(self.chunk_ckeditor_studio_bundle=self.chunk_ckeditor_studio_bundle||[]).push([["525"],{1020(e,t,i){var o=i(2932),l=Symbol.for("react.element"),r=Symbol.for("react.fragment"),n=Object.prototype.hasOwnProperty,a=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function s(e,t,i){var o,r={},s=null,c=null;for(o in void 0!==i&&(s=""+i),void 0!==t.key&&(s=""+t.key),void 0!==t.ref&&(c=t.ref),t)n.call(t,o)&&!d.hasOwnProperty(o)&&(r[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps)void 0===r[o]&&(r[o]=t[o]);return{$$typeof:l,type:e,key:s,ref:c,props:r,_owner:a.current}}t.Fragment=r,t.jsx=s,t.jsxs=s},4848(e,t,i){e.exports=i(1020)},9972(e,t,i){i.r(t),i.d(t,{CKEditorPlugin:()=>R});var o=i(2977),l=i(4781),r=i(2703),n=i(4848),a=i(2932),d=i(9869),s=i(8267);let c=(0,i(6039).createStyles)(e=>{let{css:t,token:i}=e;return{editor:t`
      border: 1px solid ${i.colorBorder};
      border-radius: ${i.borderRadius}px;
      min-height: 100px;
      min-width: 200px;
      background-color: ${i.colorBgContainer};
      cursor: text;
      display: flex;
      overflow: hidden;
      flex-direction: column;
      /* Keeps the bottom border off the edge of Studio's scroll container. */
      margin-bottom: ${i.marginXS}px;

      /* Presence list (premium RTC) keeps its height when the editor is capped. */
      > .ckeditor-presence-list {
        flex-shrink: 0;
      }

      /* min-height: 0 lets the flex chain shrink below the content height, so a
         capped wrapper (max-height) scrolls inside the editable while the
         toolbar stays visible. */
      .ck.ck-editor {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        min-height: 0;
      }

      .ck.ck-editor__top {
        flex-shrink: 0;
      }

      .ck.ck-editor__main {
        flex: 1 1 auto;
        min-height: 0;
        overflow: auto;
      }

      .ck.ck-toolbar,
      .ck.ck-editor__editable_inline {
        border: none;
      }

      .ck.ck-toolbar {
        border-bottom: 1px solid ${i.colorBorder};
      }

      .ck.ck-editor__editable_inline.ck-read-only {
        background-color: ${i.colorBgContainerDisabled};
        cursor: not-allowed;
      }
    `,"editor-document":t`
      min-height: 100px;
      min-width: 200px;
      cursor: text;
      display: flex;
      overflow: hidden;
      flex-direction: column;

      > .ckeditor-presence-list {
        flex-shrink: 0;
      }

      /* Same shrinkable flex chain as data object fields: an editable with a
         configured height scrolls inside the editing area instead of clipping. */
      .ck.ck-editor {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        min-height: 0;
      }

      .ck.ck-editor__top {
        flex-shrink: 0;
      }

      .ck.ck-editor__main {
        flex: 1 1 auto;
        min-height: 0;
        overflow: auto;
      }

      .ck.ck-toolbar {
        border: 1px solid ${i.colorBorder};
        border-top-left-radius: ${i.borderRadius}px;
        border-top-right-radius: ${i.borderRadius}px;
      }

      .ck.ck-editor__editable_inline {
        border-left: 1px solid ${i.colorBorder};
        border-right: 1px solid ${i.colorBorder};
        border-bottom: 1px solid ${i.colorBorder};
        border-bottom-left-radius: ${i.borderRadius}px;
        border-bottom-right-radius: ${i.borderRadius}px;
      }
    `,"editor-inline":t`
      min-width: 200px;
      cursor: text;
      overflow: auto;

      /* The text keeps the page's own typography; only a light frame marks the
         editable area, stronger while focused. */
      .ck.ck-editor__editable_inline {
        padding: 0 ${i.paddingXS}px;
        border: 1px dashed transparent;
        border-radius: ${i.borderRadius}px;
        color: inherit;
        font: inherit;
        background: transparent;
      }

      .ck.ck-editor__editable_inline:hover {
        border-color: ${i.colorBorder};
      }

      .ck.ck-editor__editable_inline.ck-focused {
        border: 1px solid ${i.colorPrimary};
        box-shadow: none;
      }

      .ck.ck-editor__editable_inline.ck-read-only {
        cursor: not-allowed;
      }
    `}});var u=i(8421);let p=e=>!!Array.isArray(e)&&e.includes("application/json");var m=i(5508),f=i(2696),b=i(3842);let g=["undo","redo","|","heading","|","bold","italic","underline","|","alignment","|","bulletedList","numberedList","outdent","indent","|","blockQuote","link","insertTable","|","sourceEditing","fullscreen"],h={},y=()=>{var e,t,i,o,r,n,a,d,s,c,u,p;let m,f=l.appConfig.ckeditorStudio??{},b="string"==typeof f.licenseKey&&""!==f.licenseKey?f.licenseKey:null;return{licenseKey:b??"GPL",hasLicenseKey:null!==b,toolbar:Array.isArray(m=f.toolbar)&&m.length>0&&m.every(e=>"string"==typeof e)?f.toolbar:g,premium:{ai:{enabled:(null==(t=f.premium)||null==(e=t.ai)?void 0:e.enabled)===!0,config:(null==(o=f.premium)||null==(i=o.ai)?void 0:i.config)??h,container:(null==(n=f.premium)||null==(r=n.ai)?void 0:r.container)==="overlay"?"overlay":"sidebar"},realtimeCollaboration:{enabled:(null==(d=f.premium)||null==(a=d.realtimeCollaboration)?void 0:a.enabled)===!0,tokenUrl:(null==(c=f.premium)||null==(s=c.realtimeCollaboration)?void 0:s.tokenUrl)??null,webSocketUrl:(null==(p=f.premium)||null==(u=p.realtimeCollaboration)?void 0:u.webSocketUrl)??null}}}},k=e=>"object"==typeof e&&null!==e&&!Array.isArray(e),v=(e,t)=>{let i=k(e)?{...e}:{},o=k(i.attributes)?{...i.attributes}:{};return o.pimcore_id=t.id,void 0!==t.type?o.pimcore_type=t.type:delete o.pimcore_type,{...i,attributes:o}},_=Object.freeze({plugins:[],config:{},realtimeCollaborationActive:!1,toolbarItems:[]}),w="[ckeditor-studio-bundle]",x=async(e,t)=>{let{ai:o,realtimeCollaboration:l}=e.premium,[r]=await Promise.all([i.e("399").then(i.t.bind(i,146,23)),Promise.all([i.e("29"),i.e("595")]).then(i.bind(i,7806))]),n={plugins:[],config:{},realtimeCollaborationActive:!1,toolbarItems:[]},a={};null!==l.tokenUrl&&""!==l.tokenUrl&&(a.tokenUrl=l.tokenUrl),null!==l.webSocketUrl&&""!==l.webSocketUrl&&(a.webSocketUrl=l.webSocketUrl),(void 0!==a.tokenUrl||void 0!==a.webSocketUrl)&&(n.config.cloudServices=a);let d=o.enabled&&null!==t.element&&void 0!==t.element&&null!==t.anchor&&void 0!==t.anchor;if(o.enabled&&(n.toolbarItems.push("toggleAi","aiQuickActions"),void 0===a.tokenUrl&&console.warn(`${w} ckeditor_studio.premium.ai is enabled without a Cloud Services token endpoint (ckeditor_studio.premium.realtime_collaboration.token_url, used for AI authentication even when the realtime_collaboration gate is off). The AI features will not reach the AI service unless premium.ai.config provides its own authentication (for example a legacy AI Assistant adapter).`),null!==t.root&&void 0!==t.root&&(n.config.root={title:t.root.title,description:t.root.description})),d){let d=t.element,{acquireSharedContext:s}=await i.e("199").then(i.bind(i,5306)),c=s(r,{key:`pimcore-${d.type}-${d.id}`,anchor:t.anchor,licenseKey:e.licenseKey,cloudServices:a,aiConfig:o.config,container:o.container,presence:l.enabled&&void 0!==a.tokenUrl&&void 0!==a.webSocketUrl});n.release=c.release;try{n.config.context=await c.contextPromise}catch(e){throw c.release(),e}n.plugins.push(r.AIEditorIntegration,r.AIQuickActions)}else o.enabled&&(n.plugins.push(r.AIEditorIntegration,r.AIChat,r.AIChatShortcuts,r.AIQuickActions,r.AIReviewMode,r.AITranslate),n.config.ai={container:{type:"overlay"},...o.config});return l.enabled&&(void 0===a.tokenUrl||void 0===a.webSocketUrl?console.warn(`${w} ckeditor_studio.premium.realtime_collaboration is enabled but token_url and/or web_socket_url is missing. Skipping real-time collaboration for this editor; the free feature set stays active.`):null===t.channelId?console.warn(`${w} ckeditor_studio.premium.realtime_collaboration is enabled but no collaboration channel id could be derived for this field (no open element context or no field name, for example in document editables). Skipping real-time collaboration for this editor. You can set an explicit editorConfig.collaboration.channelId per field to opt in.`):(n.plugins.push(r.RealTimeCollaborativeEditing),n.realtimeCollaborationActive=!0,n.config.sourceEditing={allowCollaborationFeatures:!0},d||null===t.presenceListContainer||void 0===t.presenceListContainer||(n.plugins.push(r.PresenceList),n.config.presenceList={container:t.presenceListContainer}))),null!==t.channelId&&(o.enabled||n.realtimeCollaborationActive)?n.config.collaboration={channelId:t.channelId}:o.enabled&&(n.config.collaboration={channelId:`pimcore-ai-${C()}`}),n},C=()=>"u">typeof crypto&&"function"==typeof crypto.randomUUID?crypto.randomUUID():Math.random().toString(36).slice(2)+Date.now().toString(36),$=(0,a.forwardRef)((e,t)=>{let{editorType:i="classic",defaultValue:o="",onTextChange:r,maxCharacters:d,editorConfig:c,placeholder:g="",readOnly:h=!1,fieldName:k,fieldTitle:C}=e,{t:$}=(0,l.useTranslation)(),I=(0,a.useRef)(null),S=(0,a.useRef)(null);(0,a.useImperativeHandle)(t,()=>({onDrop:e=>{let t=I.current;null!==t&&function(e,t){let i=t.data,o=i.id,l=i.fullPath,r=!e.model.document.selection.isCollapsed;if("asset"===t.type){if("image"===i.type&&!r){let t,r=600,n=!1;void 0!==i.width&&(l=(0,f.createImageThumbnailUrl)(o,{width:600,mimeType:"JPEG"}),i.width<600&&["jpg","jpeg","gif","png"].includes((t=i.fullPath.split("."))[t.length-1].toLowerCase())&&(l=i.fullPath,n=!0),i.width<600&&(r=i.width));let a=[`src="${N(l)}"`,'alt="asset_image"',`style="width:${(0,s.toCssDimension)(r)};"`,`pimcore_id="${N(String(o))}"`,'pimcore_type="asset"'];n&&a.push('pimcore_disable_thumbnail="true"'),M(e,`<img ${a.join(" ")}>`);return}H(e,l,o,"asset");return}"document"===i.elementType&&("page"===i.type||"hardlink"===i.type||"link"===i.type)?H(e,l,o,"document"):"object"===i.elementType?H(e,l,o,"object"):H(e,l,o)}(t,e)}}));let R=(0,a.useMemo)(y,[]),E=(0,a.useMemo)(()=>(e=>{let{ai:t,realtimeCollaboration:i}=e.premium;return(!!t.enabled||!!i.enabled)&&(!!e.hasLicenseKey||(console.warn(`${w} Premium features are enabled in ckeditor_studio config but no license key is configured (CKEDITOR_LICENSE_KEY / ckeditor_studio.license_key). Falling back to the free feature set.`),!1))})(R),[R]),T=(0,b.useOptionalElementContext)(),U=(0,a.useRef)(null),L=(0,a.useRef)(null),[j,D]=(0,a.useState)(E?null:_);(0,a.useEffect)(()=>{var e;if(!E)return;let t=function(e,t,i,o){let l=null;if(null!==t)l={type:String(t.elementType),id:t.id};else if(null!==e){var r;let t=null==(r=e.ownerDocument.defaultView)?void 0:r.pimcore_document_id;("number"==typeof t||"string"==typeof t)&&""!==String(t)&&(l={type:"document",id:t})}if(void 0!==i&&""!==i)return{element:l,field:{name:i,title:void 0!==o&&""!==o?o:A(i),kind:"field"}};let n=(null==e?void 0:e.closest('.pimcore_editable[id^="pimcore_editable_"]'))??null;if(null!==n){let e=n.id.slice(17),t=n.dataset.realName??n.dataset.name??e;return{element:l,field:{name:e,title:A(t),kind:"editable"}}}return{element:l,field:null}}(L.current,T,k,C),i=null==c||null==(e=c.collaboration)?void 0:e.channelId,o=null;"string"==typeof i&&""!==i?o=i:null!==t.element&&null!==t.field&&(o=`pimcore-${t.element.type}-${t.element.id}-${t.field.name}`);let l=!1,r=null;return x(R,{channelId:o,presenceListContainer:U.current,element:t.element,anchor:L.current,root:null!==t.field&&null!==t.element?{title:t.field.title,description:`Rich text ${t.field.kind} "${t.field.name}" of the Pimcore ${t.element.type.replace("-"," ")} with id ${t.element.id}.`}:null}).then(e=>{if(l){var t;null==(t=e.release)||t.call(e);return}r=e,D(e)}).catch(e=>{console.error("[ckeditor-studio-bundle] Loading ckeditor5-premium-features failed; falling back to the free feature set.",e),l||D(_)}),()=>{var e;l=!0,null==r||null==(e=r.release)||e.call(r)}},[]);let P=(0,a.useMemo)(()=>{if(null===j)return null;let e="inline"===i,t=e?R.toolbar.filter(e=>"fullscreen"!==e):R.toolbar;return{licenseKey:R.licenseKey,plugins:[m.Essentials,m.Paragraph,m.Heading,m.Bold,m.Italic,m.Underline,m.Alignment,m.Link,m.List,m.Indent,m.BlockQuote,m.Table,m.TableToolbar,m.Image,m.ImageResize,m.SourceEditing,m.GeneralHtmlSupport,...e?[]:[m.Fullscreen],...j.plugins],toolbar:{items:0===j.toolbarItems.length?t:[...t,"|",...j.toolbarItems.filter(e=>!t.includes(e))],shouldNotGroupWhenFull:e},table:{contentToolbar:["tableColumn","tableRow","mergeTableCells"]},htmlSupport:{allow:[{name:/^.*$/,attributes:["pimcore_id","pimcore_type","pimcore_disable_thumbnail","id"],classes:!0,styles:!0}]},initialData:o,...""!==g?{placeholder:g}:{},...j.config,...c??{}}},[j]);(0,a.useEffect)(()=>{let e=I.current;null===e||(null==j?void 0:j.realtimeCollaborationActive)!==!0&&o!==S.current&&o!==e.getData()&&e.setData(o)},[o,j]);let K=e=>{let t;I.current=e,t=e.editing.view.document,e.listenTo(t,"dragover",(e,t)=>{let i=((e,t)=>{if(!p(e))return null;switch(t){case"copy":case"copyLink":return"copy";case"link":return"link";default:return"move"}})(t.dataTransfer.types,t.dataTransfer.effectAllowed);null!==i&&(t.dataTransfer.dropEffect=i)},{priority:"lowest"}),e.listenTo(t,"drop",(t,i)=>{let o=i.dropRange;if(!p(i.dataTransfer.types)||null==o)return;let l=e.editing.mapper.toModelRange(o);e.model.change(e=>{e.setSelection(l)})},{priority:"high"}),function(e){var t;let i=null==(t=e.config.get("roots"))?void 0:t.main,o="string"==typeof(null==i?void 0:i.title)?i.title:null,l="string"==typeof(null==i?void 0:i.description)?i.description:null;if(null===o&&null===l)return;let r=e.model.document.getRoot();null!==r&&(r.getAttribute("$title")!==(o??void 0)||r.getAttribute("$description")!==(l??void 0))&&e.model.enqueueChange({isUndoable:!1},e=>{null!==o&&e.setAttribute("$title",o,r),null!==l&&e.setAttribute("$description",l,r)})}(e),B(e,e.getData())},O=(e,t)=>{let i=t.getData();S.current=i,null==r||r(i),B(t,i)};return(0,n.jsxs)(n.Fragment,{children:[E&&(0,n.jsx)("span",{hidden:!0,ref:L}),E&&R.premium.realtimeCollaboration.enabled&&(0,n.jsx)("div",{className:"ckeditor-presence-list",ref:U}),null!==P&&("inline"===i?(0,n.jsx)(u.CKEditor,{config:P,disabled:h,editor:m.InlineEditor,onChange:O,onReady:K}):(0,n.jsx)(u.CKEditor,{config:P,disabled:h,editor:m.ClassicEditor,onChange:O,onReady:K}))]});function B(e,t){let i=e.editing.view.getDomRoot();if(void 0===i)return;i.style.border="",i.setAttribute("title","");let o=t.replace(/<[^>]*>/g,"").length;"number"==typeof d&&0!==d&&o>d&&(i.style.border="1px solid red",i.setAttribute("title",$("maximum_length_is")+" "+String(d)))}function M(e,t){let i=e.data.processor.toView(t),o=e.data.toModel(i);e.model.insertContent(o)}function N(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function H(e,t,i,o){if(!e.model.document.selection.isCollapsed){let l=e.model,r={id:String(i),...void 0!==o?{type:o}:{}};l.change(i=>{for(let{range:o,value:n}of(e.execute("link",t),((e,t,i)=>{let o=[];for(let l of e)l.getAttribute("linkHref")===t&&o.push({item:l,value:v(l.getAttribute("htmlA"),i)});return o})(Array.from(l.document.selection.getRanges()).flatMap(e=>Array.from(e.getItems())),t,r).map(e=>{let{item:t,value:o}=e;return{range:i.createRangeOn(t),value:o}})))i.setAttribute("htmlA",n,o)});return}let l=void 0!==o?` pimcore_type="${N(o)}"`:"";M(e,`<a href="${N(t)}" pimcore_id="${N(String(i))}"${l}>${N(t)}</a>`)}});function A(e){let t=e.replace(/[_-]+/g," ").replace(/([a-z])([A-Z0-9])/g,"$1 $2").trim().toLowerCase();return t.charAt(0).toUpperCase()+t.slice(1)}$.displayName="Editor";let I=(0,a.forwardRef)((e,t)=>{let{value:i,onChange:o,disabled:l,width:r,height:u,maxCharacters:p,placeholder:m,editorConfig:f,context:b,...g}=e,h=(0,a.useRef)(null),{styles:y}=c(),k=function(e){let t=e.combinedFieldName;if("string"==typeof t&&""!==t)return t;let i=e.name;return Array.isArray(i)&&i.length>0?i.map(String).join("."):"string"==typeof i&&""!==i?i:void 0}(g);(0,a.useImperativeHandle)(t,()=>({onDrop:e=>{var t;null==(t=h.current)||t.onDrop(e)}}));let v=b===d.WysiwygContext.DOCUMENT,{editorType:_,...w}=f??{},x=v&&"inline"===_?"inline":"classic",C=(0,s.toCssDimension)(u),[A,I]=function(e){let t=(0,a.useRef)(null),[i,o]=(0,a.useState)(void 0);return(0,a.useLayoutEffect)(()=>{let i=t.current;if(!e||null===i)return void o(void 0);let l=function(e){let t=e.parentElement;for(;null!==t;){if(/(auto|scroll)/.test(getComputedStyle(t).overflowY))return t;t=t.parentElement}return null}(i),r=()=>{let e=Math.round(.7*window.innerHeight);if(null===l||0===l.clientHeight)return void o(e);let t=i.getBoundingClientRect().top-l.getBoundingClientRect().top+l.scrollTop;o(Math.max(320,Math.min(e,t<l.clientHeight?l.clientHeight-t-16:l.clientHeight-32)))};r();let n=new ResizeObserver(r);return null!==l&&n.observe(l),window.addEventListener("resize",r),()=>{n.disconnect(),window.removeEventListener("resize",r)}},[e]),[t,i]}(!v&&void 0===C);return(0,n.jsx)("div",{className:["ckeditor-editor","inline"===x?y["editor-inline"]:v?y["editor-document"]:y.editor].join(" "),ref:A,style:{maxWidth:(0,s.toCssDimension)(r),maxHeight:v?void 0:C??I},children:(0,n.jsx)($,{defaultValue:i??"",editorConfig:w,editorType:x,fieldName:k,fieldTitle:"string"==typeof g.title?g.title:void 0,maxCharacters:p,onTextChange:e=>{null!=o&&o(e)},placeholder:m,readOnly:l,ref:h})})});I.displayName="CKEditorEditor";let S={onInit:()=>{o.container.get(l.serviceIds["App/ComponentRegistry/ComponentRegistry"]).override({component:I,name:r.componentConfig.wysiwyg.editor.name})}};void 0!==(e=i.hmd(e)).hot&&e.hot.accept();let R={name:"ckeditor-studio-plugin",onInit:()=>{},onStartup:e=>{let{moduleSystem:t}=e;t.registerModule(S)}}}}]);