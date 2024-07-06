(()=>{"use strict";var e={5554:(e,t,r)=>{r.d(t,{Z:()=>d});var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"container"},[t("h1",{staticClass:"title"},[e._v("Login")]),t("b-form",{on:{submit:function(t){return t.preventDefault(),e.onLogin.apply(null,arguments)}}},[t("b-form-group",{attrs:{id:"input-group-Username","label-cols-sm":"3",label:"Username:","label-for":"Username"}},[t("b-form-input",{attrs:{id:"Username",type:"text",state:e.validateState("username")},model:{value:e.$v.form.username.$model,callback:function(t){e.$set(e.$v.form.username,"$model",t)},expression:"$v.form.username.$model"}}),t("b-form-invalid-feedback",[e._v(" Username is required ")])],1),t("b-form-group",{attrs:{id:"input-group-Password","label-cols-sm":"3",label:"Password:","label-for":"Password"}},[t("b-form-input",{attrs:{id:"Password",type:"password",state:e.validateState("password")},model:{value:e.$v.form.password.$model,callback:function(t){e.$set(e.$v.form.password,"$model",t)},expression:"$v.form.password.$model"}}),t("b-form-invalid-feedback",[e._v(" Password is required ")])],1),t("b-button",{staticClass:"mx-auto w-100",staticStyle:{width:"100px",display:"block"},attrs:{type:"submit",variant:"primary"}},[e._v("Login")]),t("div",{staticClass:"mt-2"},[e._v(" Do not have an account yet? "),t("router-link",{attrs:{to:"register"}},[e._v(" Register in here")])],1)],1),e.form.submitError?t("b-alert",{staticClass:"mt-2",attrs:{variant:"warning",dismissible:"",show:""}},[e._v(" Login failed: "+e._s(e.form.submitError)+" ")]):e._e()],1)},i=[],s=r(124),n=r(8534),o=(r(7658),r(379)),c=r(9239);const l={name:"Login",data:function(){return{form:{username:"",password:"",submitError:void 0}}},validations:{form:{username:{required:o.C1},password:{required:o.C1}}},methods:{validateState:function(e){var t=this.$v.form[e],r=t.$dirty,a=t.$error;return r?!a:null},Login:function(){var e=this;return(0,n.Z)((0,s.Z)().mark((function t(){var r;return(0,s.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:try{r=!0,(0,c.sD)(e.form.username,e.form.password,r),console.log(e.$root.store.login),e.$root.store.login(e.form.username),e.$router.push("/")}catch(a){console.log(a.response),e.form.submitError=a.response.data.message}case 1:case"end":return t.stop()}}),t)})))()},onLogin:function(){this.form.submitError=void 0,this.$v.form.$touch(),this.$v.form.$anyError||this.Login()}}},u=l;var p=r(1001),m=(0,p.Z)(u,a,i,!1,null,"33d655f6",null);const d=m.exports},3628:(e,t,r)=>{r.d(t,{Z:()=>l});r(9753),r(2222),r(7042);var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"card recipe-card",staticStyle:{width:"18rem"}},[t("router-link",{staticClass:"card-img-link",attrs:{to:{name:"recipe",params:{recipeId:e.recipe.id}}}},[t("div",{staticClass:"image-container"},[e.image_load?t("img",{staticClass:"card-img-top recipe-image",attrs:{src:e.recipe.image},on:{click:function(t){return e.markAsViewed()}}}):e._e()])]),t("div",{staticClass:"card-body"},[t("h5",{staticClass:"card-title",attrs:{title:e.recipe.title}},[e._v(e._s(e.recipe.title))]),t("ul",{staticClass:"card-text recipe-overview"},[t("li",[e._v(e._s(e.recipe.readyInMinutes)+" minutes")]),t("li",[e._v(e._s(e.recipe.aggregateLikes)+" likes")])]),t("div",{staticClass:"card-icons"},[e.isViewed?t("b-icon",{staticClass:"viewed-icon",attrs:{icon:"eye"}}):e._e(),e.recipe.vegetarian?t("span",[t("img",{staticClass:"vegi",attrs:{src:r(7330)}})]):e._e(),e.recipe.vegan?t("span",[t("img",{staticClass:"vegan",attrs:{src:r(3238)}})]):e._e(),e.recipe.glutenFree?t("span",[t("img",{staticClass:"glutenfree",attrs:{src:r(3754)}})]):e._e(),t("div",{staticClass:"btn-group-toggle"},[t("label",{staticClass:"btn btn-secondary active",staticStyle:{"background-color":"white"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.isFavorite,expression:"isFavorite"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.isFavorite)?e._i(e.isFavorite,null)>-1:e.isFavorite},on:{change:[function(t){var r=e.isFavorite,a=t.target,i=!!a.checked;if(Array.isArray(r)){var s=null,n=e._i(r,s);a.checked?n<0&&(e.isFavorite=r.concat([s])):n>-1&&(e.isFavorite=r.slice(0,n).concat(r.slice(n+1)))}else e.isFavorite=i},e.toggleFavorite]}}),t("img",{staticClass:"favorite-icon",attrs:{src:e.favoriteImage,alt:"Favorite"}})])])],1)])],1)},i=[];r(5212),r(1539),r(7658),r(8862),r(4553),r(561),r(6699),r(2023);const s={name:"RecipePreviewCard",props:{recipe:{type:Object,required:!0}},data:function(){return{image_load:!0,isFavorite:this.getFavoriteState(this.recipe),isViewed:this.checkIfViewed(this.recipe.id)}},computed:{favoriteImage:function(){return this.isFavorite?r(8051):r(3421)}},methods:{toggleFavorite:function(){this.isFavorite=!this.isFavorite,this.isFavorite?this.addToFavorites():this.removeFromFavorites()},addToFavorites:function(){var e=this,t=JSON.parse(localStorage.getItem("favorites"))||[];t.some((function(t){return t.id===e.recipe.id}))||(t.push(this.recipe),localStorage.setItem("favorites",JSON.stringify(t)))},removeFromFavorites:function(){var e=this,t=JSON.parse(localStorage.getItem("favorites"))||[],r=t.findIndex((function(t){return t.id===e.recipe.id}));-1!==r&&(t.splice(r,1),localStorage.setItem("favorites",JSON.stringify(t)))},markAsViewed:function(){var e=JSON.parse(localStorage.getItem("viewedRecipes"))||[];e.includes(this.recipe.id)||(e.push(this.recipe.id),localStorage.setItem("viewedRecipes",JSON.stringify(e)),this.isViewed=!0)},checkIfViewed:function(e){var t=JSON.parse(localStorage.getItem("viewedRecipes"))||[];return t.includes(e)},getFavoriteState:function(e){var t=JSON.parse(localStorage.getItem("favorites"))||[];return t.some((function(t){return t.id===e.id}))}},created:function(){this.isFavorite=this.getFavoriteState(this.recipe),this.isViewed=this.checkIfViewed(this.recipe.id)},updated:function(){this.isFavorite=this.getFavoriteState(this.recipe),this.isViewed=this.checkIfViewed(this.recipe.id)}},n=s;var o=r(1001),c=(0,o.Z)(n,a,i,!1,null,"4a8b4938",null);const l=c.exports},5230:(e,t,r)=>{r(6992),r(8674),r(9601),r(7727),r(9554),r(1539),r(4747);var a=r(144),i=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("div",{attrs:{id:"nav"}},[t("router-link",{attrs:{to:{name:"main"}}},[e._v("Vue Recipes")]),e._v("| "),t("router-link",{attrs:{to:{name:"search"}}},[e._v("Search")]),e._v("| "),t("router-link",{attrs:{to:{name:"about"}}},[e._v("About")]),e._v("| "),e.$root.store.username?t("span",[t("b-button",{on:{click:e.toggleModal}},[e._v("Add New Recipe")]),t("new-recipe-page",{attrs:{"show-modal":e.showRecipeModal},on:{hide:e.handleHide}}),t("b-dropdown",{staticClass:"m-2",attrs:{id:"dropdown-left",text:"Personal Info",variant:"primary"}},[t("b-dropdown-item",{attrs:{href:"#"}},[t("router-link",{attrs:{to:{name:"favorites"}}},[e._v("Favorites")])],1),t("b-dropdown-item",{attrs:{href:"#"}},[t("router-link",{attrs:{to:{name:"myrecipes"}}},[e._v("My Recipes")])],1),t("b-dropdown-item",{attrs:{href:"#"}},[t("router-link",{attrs:{to:{name:"familyrecipes"}}},[e._v("Family Recipes")])],1)],1),t("h1",{staticClass:"user-greeting"},[e._v("Hello, "+e._s(this.firstName))]),e._v("| "),t("button",{on:{click:e.Logout}},[e._v("Logout")])],1):t("span",[t("h1",{staticClass:"user-greeting"},[e._v("Hello, Guest")]),e._v("| "),t("router-link",{staticClass:"highlight-button",attrs:{to:{name:"register"}}},[e._v("Register")]),e._v("| "),t("router-link",{staticClass:"highlight-button",attrs:{to:{name:"login"}}},[e._v("Login")])],1)],1),t("router-view")],1)},s=[],n=(r(7658),r(8309),function(){var e=this,t=e._self._c;return t("b-modal",{attrs:{title:"Create New Recipe","ok-title":"Submit"},on:{hide:e.onModalClose,ok:e.createRecipe},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[t("b-form",[t("b-form-group",{attrs:{label:"Recipe Title:"}},[t("b-form-input",{attrs:{required:""},model:{value:e.recipe.title,callback:function(t){e.$set(e.recipe,"title",t)},expression:"recipe.title"}})],1),t("b-form-group",{attrs:{label:"Summary:"}},[t("b-form-textarea",{attrs:{rows:"3",required:""},model:{value:e.recipe.summary,callback:function(t){e.$set(e.recipe,"summary",t)},expression:"recipe.summary"}})],1),t("b-form-group",{attrs:{label:"Preparation Time (in minutes):"}},[t("b-form-input",{attrs:{type:"number",required:""},model:{value:e.recipe.readyInMinutes,callback:function(t){e.$set(e.recipe,"readyInMinutes",t)},expression:"recipe.readyInMinutes"}})],1),t("b-form-group",{attrs:{label:"Number of Servings:"}},[t("b-form-input",{attrs:{type:"number",required:""},model:{value:e.recipe.servings,callback:function(t){e.$set(e.recipe,"servings",t)},expression:"recipe.servings"}})],1),t("b-form-group",{attrs:{label:"Ingredients:"}},[e._l(e.recipe.ingredients,(function(r,a){return t("div",{key:a,staticClass:"mb-3"},[t("b-input-group",[t("b-form-input",{staticStyle:{width:"140px"},attrs:{placeholder:"Ingredient name",required:""},model:{value:r.name,callback:function(t){e.$set(r,"name",t)},expression:"ingredient.name"}}),t("b-form-input",{staticStyle:{width:"50px"},attrs:{type:"number",placeholder:"Amount",required:""},model:{value:r.amount,callback:function(t){e.$set(r,"amount",t)},expression:"ingredient.amount"}}),t("b-form-select",{staticStyle:{width:"50px"},attrs:{options:e.units,required:""},model:{value:r.unit,callback:function(t){e.$set(r,"unit",t)},expression:"ingredient.unit"}}),t("b-button",{attrs:{variant:"danger"},on:{click:function(t){return e.removeIngredient(a)}}},[e._v("Remove")])],1)],1)})),t("b-button",{on:{click:e.addIngredient}},[e._v("Add Ingredient")])],2),t("b-form-group",{attrs:{label:"Instructions:"}},[t("b-form-textarea",{attrs:{rows:"5",required:""},model:{value:e.recipe.instructions,callback:function(t){e.$set(e.recipe,"instructions",t)},expression:"recipe.instructions"}})],1)],1)],1)}),o=[];r(561),r(3843),r(3710),r(1249),r(8862);const c={props:["showModal"],data:function(){return{recipe:{id:null,title:"",summary:"",readyInMinutes:0,servings:1,ingredients:[{name:"",amount:null,unit:"tsp"}],instructions:""},units:["tsp","Tbsp","cup","ml","l","g","kg","pinches","servings","cloves","ounces"]}},methods:{addIngredient:function(){this.recipe.ingredients.push({name:"",amount:null,unit:"tsp"})},removeIngredient:function(e){this.recipe.ingredients.splice(e,1)},createRecipe:function(){this.recipe.id=Date.now();var e=localStorage.getItem("myRecipes"),t=e?JSON.parse(e):[],r=this.recipe.ingredients.map((function(e){return{name:e.name,amount:{metric:{value:e.amount,unit:e.unit},us:{value:e.amount,unit:e.unit}}}})),a={id:this.recipe.id,title:this.recipe.title,summary:this.recipe.summary,readyInMinutes:this.recipe.readyInMinutes,servings:this.recipe.servings,ingredients:r,instructions:this.recipe.instructions,image:this.recipe.image,analyzedInstructions:[{name:"",steps:this.recipe.instructions.split("\n").map((function(e,t){return{number:t+1,step:e,ingredients:[],equipment:[]}}))}]};t.push(a),localStorage.setItem("myRecipes",JSON.stringify(t)),this.$emit("recipe-saved"),this.showModal=!1,this.resetRecipe()},onModalClose:function(){this.$emit("hide")},resetRecipe:function(){this.recipe={id:null,title:"",summary:"",readyInMinutes:0,servings:1,ingredients:[{name:"",amount:null,unit:"tsp"}],instructions:""}}}},l=c;var u=r(1001),p=(0,u.Z)(l,n,o,!1,null,"7b53bfb0",null);const m=p.exports;var d=r(5993);const g={name:"App",components:{NewRecipePage:m},computed:{username:function(){return this.$root.store.username},firstName:function(){return this.$root.store.firstName||d.users[this.username]}},data:function(){return{showRecipeModal:!1}},methods:{handleHide:function(){var e=this;this.$nextTick((function(){e.showRecipeModal=!1}))},toggleModal:function(){this.showRecipeModal=!this.showRecipeModal,console.log("Toggle modal to:",this.showRecipeModal)},Logout:function(){var e=this;this.$root.store.logout(),this.$root.toast("Logout","User logged out successfully","success"),localStorage.removeItem("lastSearch"),this.$router.push("/")["catch"]((function(){e.$forceUpdate()}))}}},h=g;var f=(0,u.Z)(h,i,s,!1,null,null,null);const v=f.exports;var b=r(1939),A=r.n(b),w=r(9669),y=r.n(w),k=r(869),S=r(3017),I=(r(7024),r(8783),r(3948),function(){var e=this,t=e._self._c;return t("div",{staticClass:"container"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-6 left-column"},[t("RecipePreviewList",{ref:"recipeList",staticClass:"RandomRecipes",attrs:{title:"Explore these recipes",listType:"random"}}),t("button",{staticClass:"btn btn-primary",on:{click:e.generateRandomRecipes}},[e._v("Show More Recipes")])],1),t("div",{staticClass:"col-md-6 right-column"},[t("div",{staticClass:"user-section"},[e.$root.store.username?t("span",[t("RecipePreviewList",{staticClass:"LastViewedRecipes",attrs:{title:"Last Viewed Recipes",listType:"lastviewed",disabled:""}})],1):t("span",[t("Login")],1)])])])])}),x=[],C=function(){var e=this,t=e._self._c;return t("b-container",[t("h3",[e._v(" "+e._s(e.title)+" "),e._t("default")],2),t("b-row",e._l(e.recipes,(function(e){return t("b-col",{key:e.id},[t("RecipePreview",{staticClass:"recipePreview",attrs:{recipe:e}})],1)})),1)],1)},L=[],P=r(124),F=r(5957),O=r(8534),T=(r(189),r(2222),r(5827),r(3628));r(199),r(5352);const N={name:"RecipePreviewList",components:{RecipePreview:T.Z},props:{title:{type:String,required:!0},listType:{type:String,default:"random"}},data:function(){return{recipes:[]}},mounted:function(){this.updateRecipes()},methods:{updateRecipes:function(){var e=this;return(0,O.Z)((0,P.Z)().mark((function t(){var r,a,i,s,n,o,c,l,u,p,m,d,g,h,f,v,b;return(0,P.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.recipes=[],"lastviewed"!==e.listType){t.next=31;break}if(r=JSON.parse(localStorage.getItem("lastviewed"))||[],console.log("Viewed recipes:",r),!(r.length>=3)){t.next=13;break}return i=[e.getrecipe(r[r.length-1]),e.getrecipe(r[r.length-2]),e.getrecipe(r[r.length-3])],t.next=8,Promise.all(i);case 8:s=t.sent,console.log("Fetched recipes:",s),(a=e.recipes).push.apply(a,(0,F.Z)(s)),t.next=29;break;case 13:if(!(r.length>=2)){t.next=22;break}return o=[e.getrecipe(r[r.length-1]),e.getrecipe(r[r.length-2])],t.next=17,Promise.all(o);case 17:c=t.sent,console.log("Fetched recipes:",c),(n=e.recipes).push.apply(n,(0,F.Z)(c)),t.next=29;break;case 22:if(!(r.length>=1)){t.next=29;break}return u=[e.getrecipe(r[r.length-1])],t.next=26,Promise.all(u);case 26:p=t.sent,console.log("Fetched recipes:",p),(l=e.recipes).push.apply(l,(0,F.Z)(p));case 29:t.next=58;break;case 31:t.prev=31,d=new Set,g=[],console.log("length",e.recipes.length),h=0;case 36:if(!(h<3)){t.next=46;break}if(f=Math.floor(1e5+9e5*Math.random()),console.log("index",f),d.has(f)){t.next=44;break}return t.next=42,e.getrecipe(f);case 42:v=t.sent,null!==v&&(g.push(Promise.resolve(v)),h++,d.add(f));case 44:t.next=36;break;case 46:return t.next=48,Promise.all(g);case 48:b=t.sent,console.log("Fetched recipes:",b),(m=e.recipes).push.apply(m,(0,F.Z)(b)),d.add(randomIndex),console.log("length",e.recipes.length),t.next=58;break;case 55:t.prev=55,t.t0=t["catch"](31),console.log(t.t0);case 58:case"end":return t.stop()}}),t,null,[[31,55]])})))()},getrecipe:function(e){return(0,O.Z)((0,P.Z)().mark((function t(){var r,a,i,s,n,o,c,l,u,p,m;return(0,P.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r="709325a1a8844ca3ab65110a4d2e4b90",a=e,t.prev=2,t.next=5,y().get("https://api.spoonacular.com/recipes/".concat(a,"/information?apiKey=").concat(r));case 5:return i=t.sent,console.log("Recipe API response:",i),s=i.data,n=s.analyzedInstructions,o=s.extendedIngredients,c=s.aggregateLikes,l=s.readyInMinutes,u=s.image,p=s.title,m=n.map((function(e){return e.steps})).reduce((function(e,t){return[].concat((0,F.Z)(e),(0,F.Z)(t))}),[]),t.abrupt("return",{_instructions:m,extendedIngredients:o,aggregateLikes:c,readyInMinutes:l,image:u,title:p,id:e});case 12:return t.prev=12,t.t0=t["catch"](2),console.error("Error fetching recipe from API:",t.t0.response?t.t0.response.status:t.t0.message),t.abrupt("return",null);case 16:case"end":return t.stop()}}),t,null,[[2,12]])})))()}}},R=N;var M=(0,u.Z)(R,C,L,!1,null,"614e4c11",null);const j=M.exports;var _=r(5554);const Z={components:{RecipePreviewList:j,Login:_.Z},data:function(){return{randomKey:0}},methods:{generateRandomRecipes:function(){this.$refs.recipeList.updateRecipes()}}},B=Z;var V=(0,u.Z)(B,I,x,!1,null,"306463e6",null);const q=V.exports;var E=function(){var e=this,t=e._self._c;return t("div",{staticClass:"container"},[t("h1",[e._v("No pasta for you!!")]),t("router-link",{attrs:{to:"/",exact:""}},[e._v("ET Go Home")])],1)},U=[],z={},D=(0,u.Z)(z,E,U,!1,null,null,null);const $=D.exports;var G=[{path:"/",name:"main",component:q},{path:"/register",name:"register",component:function(){return r.e(211).then(r.bind(r,211))}},{path:"/login",name:"login",component:function(){return r.e(342).then(r.bind(r,5342))}},{path:"/search",name:"search",component:function(){return r.e(487).then(r.bind(r,1487))}},{path:"/about",name:"about",component:function(){return r.e(631).then(r.bind(r,6631))}},{path:"/favorites",name:"favorites",component:function(){return r.e(172).then(r.bind(r,2172))}},{path:"/myrecipes",name:"myrecipes",component:function(){return r.e(201).then(r.bind(r,9201))}},{path:"/familyrecipes",name:"familyrecipes",component:function(){return Promise.all([r.e(173),r.e(214)]).then(r.bind(r,5214))}},{path:"/recipe/:recipeId",name:"recipe",component:function(){return r.e(135).then(r.bind(r,135))},props:!0},{path:"/recipeprep/:id",name:"recipeprep",component:function(){return Promise.all([r.e(173),r.e(691)]).then(r.bind(r,2691))},props:!0},{path:"*",name:"notFound",component:$}];const H=G;var K=r(8345),J=r(8620),Q=r(508),W=r(7563),X=r(7419),Y=r(1869),ee=r(295),te=r(3090),re=r(794),ae=r(4063),ie=r(8793),se=r(7772);a["default"].use(k.XG7),a["default"].use(S.A7),a["default"].use(K.ZP);var ne=new K.ZP({routes:H});[Q.E,W.w6,X.g,Y.SY,ee.xL,te.u3,re.v5,ae.F,ie.m$,se.A6].forEach((function(e){return a["default"].use(e)})),a["default"].use(J.ZP),y().interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),y().interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)})),a["default"].use(A(),y()),a["default"].config.productionTip=!1;var oe={server_domain:"http://localhost:3000",username:localStorage.username,login:function(e){localStorage.setItem("username",e),this.username=e,console.log("login",this.username)},logout:function(){console.log("logout"),localStorage.removeItem("username"),this.username=void 0}};console.log(oe),new a["default"]({router:ne,data:function(){return{store:oe}},methods:{toast:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];this.$bvToast.toast("".concat(t),{title:"".concat(e),toaster:"b-toaster-top-center",variant:r,solid:!0,appendToast:a,autoHideDelay:3e3})}},render:function(e){return e(v)}}).$mount("#app")},9239:(e,t,r)=>{function a(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!t)throw{status:409,response:{data:{message:"A user is already logged in",success:!1}}};return{status:200,response:{data:{message:"login succeeded",success:!0}}}}function i(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!t)throw{status:409,response:{data:{message:"Username taken",success:!1}}};return{status:200,response:{data:{message:"user created",success:!0}}}}r.d(t,{Ge:()=>i,sD:()=>a})},8051:(e,t,r)=>{e.exports=r.p+"img/favorite.df03436a.png"},3754:(e,t,r)=>{e.exports=r.p+"img/glutenfree.6a0578e9.png"},3421:e=>{e.exports="data:image/png;base64,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"},3238:(e,t,r)=>{e.exports=r.p+"img/vegan.d6a992f4.png"},7330:(e,t,r)=>{e.exports=r.p+"img/vegiterian.0b1fe7f9.png"},199:e=>{e.exports=JSON.parse('{"id":716429,"image":"https://img.spoonacular.com/recipes/716429-556x370.jpg","title":"Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs","readyInMinutes":45,"aggregateLikes":209,"vegetarian":false,"vegan":false,"glutenFree":false,"summary":"You can never have too many main course recipes, so give Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs a try. One serving contains <b>543 calories</b>, <b>17g of protein</b>, and <b>16g of fat</b>. For <b>$1.57 per serving</b>, this recipe <b>covers 22%</b> of your daily requirements of vitamins and minerals. This recipe serves 2. A mixture of butter, white wine, pasta, and a handful of other ingredients are all it takes to make this recipe so yummy. 209 people have tried and liked this recipe. It is brought to you by fullbellysisters.blogspot.com. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 83%</b>, which is tremendous. If you like this recipe, take a look at these similar recipes: <a href=\\"https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1230187\\">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, <a href=\\"https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229807\\">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, and <a href=\\"https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229669\\">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>.","analyzedInstructions":[],"instructions":"","extendedIngredients":[{"id":1001,"aisle":"Milk, Eggs, Other Dairy","image":"butter-sliced.jpg","consistency":"SOLID","name":"butter","nameClean":"butter","original":"1 tbsp butter","originalName":"butter","amount":1,"unit":"tbsp","meta":[],"measures":{"us":{"amount":1,"unitShort":"Tbsp","unitLong":"Tbsp"},"metric":{"amount":1,"unitShort":"Tbsp","unitLong":"Tbsp"}}},{"id":10011135,"aisle":"Produce","image":"cauliflower.jpg","consistency":"SOLID","name":"cauliflower florets","nameClean":"cauliflower florets","original":"about 2 cups frozen cauliflower florets, thawed, cut into bite-sized pieces","originalName":"about frozen cauliflower florets, thawed, cut into bite-sized pieces","amount":2,"unit":"cups","meta":["frozen","thawed","cut into bite-sized pieces"],"measures":{"us":{"amount":2,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":200,"unitShort":"g","unitLong":"grams"}}},{"id":1038,"aisle":"Cheese","image":"parmesan.jpg","consistency":"SOLID","name":"cheese","nameClean":"pecorino romano","original":"2 tbsp grated cheese (I used romano)","originalName":"grated cheese (I used romano)","amount":2,"unit":"tbsp","meta":["grated","(I used romano)"],"measures":{"us":{"amount":2,"unitShort":"Tbsps","unitLong":"Tbsps"},"metric":{"amount":2,"unitShort":"Tbsps","unitLong":"Tbsps"}}},{"id":1034053,"aisle":"Oil, Vinegar, Salad Dressing","image":"olive-oil.jpg","consistency":"LIQUID","name":"extra virgin olive oil","nameClean":"extra virgin olive oil","original":"1-2 tbsp extra virgin olive oil","originalName":"extra virgin olive oil","amount":1,"unit":"tbsp","meta":[],"measures":{"us":{"amount":1,"unitShort":"Tbsp","unitLong":"Tbsp"},"metric":{"amount":1,"unitShort":"Tbsp","unitLong":"Tbsp"}}},{"id":11215,"aisle":"Produce","image":"garlic.png","consistency":"SOLID","name":"garlic","nameClean":"garlic","original":"5-6 cloves garlic","originalName":"garlic","amount":5,"unit":"cloves","meta":[],"measures":{"us":{"amount":5,"unitShort":"cloves","unitLong":"cloves"},"metric":{"amount":5,"unitShort":"cloves","unitLong":"cloves"}}},{"id":10720420,"aisle":"Pasta and Rice","image":"spaghetti.jpg","consistency":"SOLID","name":"pasta","nameClean":"linguine","original":"6-8 ounces pasta (I used linguine)","originalName":"pasta (I used linguine)","amount":6,"unit":"ounces","meta":["(I used linguine)"],"measures":{"us":{"amount":6,"unitShort":"oz","unitLong":"ounces"},"metric":{"amount":170.097,"unitShort":"g","unitLong":"grams"}}},{"id":1032009,"aisle":"Spices and Seasonings","image":"red-pepper-flakes.jpg","consistency":"SOLID","name":"couple of pepper flakes","nameClean":"red pepper flakes","original":"couple of pinches red pepper flakes, optional","originalName":"couple of red pepper flakes, optional","amount":2,"unit":"pinches","meta":["red"],"measures":{"us":{"amount":2,"unitShort":"pinches","unitLong":"pinches"},"metric":{"amount":2,"unitShort":"pinches","unitLong":"pinches"}}},{"id":1102047,"aisle":"Spices and Seasonings","image":"salt-and-pepper.jpg","consistency":"SOLID","name":"salt and pepper","nameClean":"salt and pepper","original":"salt and pepper, to taste","originalName":"salt and pepper, to taste","amount":2,"unit":"servings","meta":["to taste"],"measures":{"us":{"amount":2,"unitShort":"servings","unitLong":"servings"},"metric":{"amount":2,"unitShort":"servings","unitLong":"servings"}}},{"id":11291,"aisle":"Produce","image":"spring-onions.jpg","consistency":"SOLID","name":"scallions","nameClean":"spring onions","original":"3 scallions, chopped, white and green parts separated","originalName":"scallions, chopped, white and green parts separated","amount":3,"unit":"","meta":["white","green","separated","chopped"],"measures":{"us":{"amount":3,"unitShort":"","unitLong":""},"metric":{"amount":3,"unitShort":"","unitLong":""}}},{"id":14106,"aisle":"Alcoholic Beverages","image":"white-wine.jpg","consistency":"LIQUID","name":"white wine","nameClean":"dry white wine","original":"2-3 tbsp white wine","originalName":"white wine","amount":2,"unit":"tbsp","meta":[],"measures":{"us":{"amount":2,"unitShort":"Tbsps","unitLong":"Tbsps"},"metric":{"amount":2,"unitShort":"Tbsps","unitLong":"Tbsps"}}},{"id":99025,"aisle":"Pasta and Rice","image":"breadcrumbs.jpg","consistency":"SOLID","name":"bread crumbs","nameClean":"whole wheat breadcrumbs","original":"1/4 cup whole wheat bread crumbs (I used panko)","originalName":"whole wheat bread crumbs (I used panko)","amount":0.25,"unit":"cup","meta":["whole wheat","(I used panko)"],"measures":{"us":{"amount":0.25,"unitShort":"cups","unitLong":"cups"},"metric":{"amount":27,"unitShort":"g","unitLong":"grams"}}}],"servings":2}')},5352:e=>{e.exports=JSON.parse('[{"id":716429,"image":"https://img.spoonacular.com/recipes/716429-556x370.jpg","title":"Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs","readyInMinutes":45,"aggregateLikes":209,"vegetarian":false,"vegan":false,"glutenFree":false,"favorite":false,"summary":"You can never have too many main course recipes, so give Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs a try. One serving contains <b>543 calories</b>, <b>17g of protein</b>, and <b>16g of fat</b>. For <b>$1.57 per serving</b>, this recipe <b>covers 22%</b> of your daily requirements of vitamins and minerals. This recipe serves 2. A mixture of butter, white wine, pasta, and a handful of other ingredients are all it takes to make this recipe so yummy. 209 people have tried and liked this recipe. It is brought to you by fullbellysisters.blogspot.com. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 83%</b>, which is tremendous. If you like this recipe, take a look at these similar recipes: <a href=\\"https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1230187\\">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, <a href=\\"https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229807\\">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, and <a href=\\"https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229669\\">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>."},{"id":123456,"image":"https://img.spoonacular.com/recipes/123456-556x370.jpg","title":"Apple Delight Canadian 1962","readyInMinutes":30,"aggregateLikes":150,"vegetarian":true,"vegan":true,"glutenFree":false,"favorite":false,"summary":"This recipe is a delightful vegetarian option. Each serving contains <b>400 calories</b>, <b>15g of protein</b>, and <b>20g of fat</b>. It costs <b>$2.00 per serving</b> and takes approximately <b>30 minutes</b> to prepare. It\'s brought to you by deliciousrecipes.com. If you like this recipe, check out these similar recipes: <a href=\\"https://spoonacular.com/recipes/crispy-fried-tofu-sandwich-1230188\\">Crispy Fried Tofu Sandwich</a>, <a href=\\"https://spoonacular.com/recipes/tofu-sandwich-with-avocado-slaw-1229808\\">Tofu Sandwich with Avocado & Slaw</a>."},{"id":234567,"image":"https://img.spoonacular.com/recipes/234567-556x370.jpg","title":"Butterscotch Drop Scones","readyInMinutes":25,"aggregateLikes":320,"vegetarian":false,"vegan":false,"glutenFree":false,"favorite":false,"summary":"Lemon Garlic Shrimp Pasta is a quick and easy dish perfect for a weeknight dinner. It has <b>350 calories</b>, <b>20g of protein</b>, and <b>12g of fat</b> per serving. The cost is <b>$3.00 per serving</b>. This recipe takes about <b>25 minutes</b> to prepare and has a spoonacular score of <b>90%</b>. More similar recipes: <a href=\\"https://spoonacular.com/recipes/lemon-garlic-shrimp-pasta-1230189\\">Lemon Garlic Shrimp Pasta</a>, <a href=\\"https://spoonacular.com/recipes/garlic-shrimp-pasta-1229809\\">Garlic Shrimp Pasta</a>."},{"id":345678,"image":"https://img.spoonacular.com/recipes/345678-556x370.jpg","title":"Peppermint-topped Brownies","readyInMinutes":20,"aggregateLikes":280,"vegetarian":true,"vegan":false,"glutenFree":true,"favorite":false,"summary":"A healthy and refreshing salad perfect for lunch or dinner. It contains <b>250 calories</b>, <b>8g of protein</b>, and <b>15g of fat</b> per serving. The cost per serving is <b>$2.50</b>. It takes about <b>20 minutes</b> to prepare. Similar recipes: <a href=\\"https://spoonacular.com/recipes/quinoa-salad-with-avocado-and-feta-1230190\\">Quinoa Salad with Avocado and Feta</a>, <a href=\\"https://spoonacular.com/recipes/avocado-quinoa-salad-1229810\\">Avocado Quinoa Salad</a>."},{"id":456789,"image":"https://img.spoonacular.com/recipes/456789-556x370.jpg","title":"Apricot Turkey Pinwheels","readyInMinutes":40,"aggregateLikes":180,"vegetarian":true,"vegan":true,"glutenFree":false,"favorite":false,"summary":"This Spicy Black Bean Burger is perfect for a hearty and flavorful meal. Each serving contains <b>320 calories</b>, <b>12g of protein</b>, and <b>10g of fat</b>. It costs <b>$1.80 per serving</b>. Preparation takes about <b>40 minutes</b>. Similar recipes: <a href=\\"https://spoonacular.com/recipes/spicy-black-bean-burger-1230191\\">Spicy Black Bean Burger</a>, <a href=\\"https://spoonacular.com/recipes/black-bean-burger-1229811\\">Black Bean Burger</a>."},{"id":567890,"image":"https://img.spoonacular.com/recipes/567890-556x370.jpg","title":"Caesar Chicken Tortellini","readyInMinutes":35,"aggregateLikes":210,"vegetarian":true,"vegan":true,"glutenFree":true,"favorite":false,"summary":"A flavorful and spicy curry that is both vegan and gluten-free. Each serving has <b>300 calories</b>, <b>10g of protein</b>, and <b>12g of fat</b>. It costs <b>$2.20 per serving</b> and takes about <b>35 minutes</b> to prepare. Similar recipes: <a href=\\"https://spoonacular.com/recipes/thai-green-curry-with-vegetables-1230192\\">Thai Green Curry with Vegetables</a>, <a href=\\"https://spoonacular.com/recipes/green-curry-vegetables-1229812\\">Green Curry Vegetables</a>."}]')},5993:e=>{e.exports=JSON.parse('{"users":{"shalevq":"Noam","amirrot":"Rotem","user1":"Shlomi"}}')}},t={};function r(a){var i=t[a];if(void 0!==i)return i.exports;var s=t[a]={exports:{}};return e[a](s,s.exports,r),s.exports}r.m=e,(()=>{var e=[];r.O=(t,a,i,s)=>{if(!a){var n=1/0;for(u=0;u<e.length;u++){for(var[a,i,s]=e[u],o=!0,c=0;c<a.length;c++)(!1&s||n>=s)&&Object.keys(r.O).every((e=>r.O[e](a[c])))?a.splice(c--,1):(o=!1,s<n&&(n=s));if(o){e.splice(u--,1);var l=i();void 0!==l&&(t=l)}}return t}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[a,i,s]}})(),(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return r.d(t,{a:t}),t}})(),(()=>{r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,a)=>(r.f[a](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+e+"."+{135:"50e4e2b7",172:"6332872c",173:"0590befb",201:"e4ec6ccf",211:"e74edf35",214:"0f75d5b0",342:"0055a1ec",487:"60f1fd1e",631:"bc6bebfb",691:"2427c300"}[e]+".js"})(),(()=>{r.miniCssF=e=>"css/"+e+"."+{135:"4ad90474",172:"372c2f31",173:"4f034e44",201:"86c2212c",211:"8b4468e7",214:"fd5d4649",487:"b5d95b24",631:"4f72d2c5",691:"a54b72da"}[e]+".css"})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="assignment-2-1:";r.l=(a,i,s,n)=>{if(e[a])e[a].push(i);else{var o,c;if(void 0!==s)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var p=l[u];if(p.getAttribute("src")==a||p.getAttribute("data-webpack")==t+s){o=p;break}}o||(c=!0,o=document.createElement("script"),o.charset="utf-8",o.timeout=120,r.nc&&o.setAttribute("nonce",r.nc),o.setAttribute("data-webpack",t+s),o.src=a),e[a]=[i];var m=(t,r)=>{o.onerror=o.onload=null,clearTimeout(d);var i=e[a];if(delete e[a],o.parentNode&&o.parentNode.removeChild(o),i&&i.forEach((e=>e(r))),t)return t(r)},d=setTimeout(m.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=m.bind(null,o.onerror),o.onload=m.bind(null,o.onload),c&&document.head.appendChild(o)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.p="/"})(),(()=>{if("undefined"!==typeof document){var e=(e,t,r,a,i)=>{var s=document.createElement("link");s.rel="stylesheet",s.type="text/css";var n=r=>{if(s.onerror=s.onload=null,"load"===r.type)a();else{var n=r&&("load"===r.type?"missing":r.type),o=r&&r.target&&r.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=n,c.request=o,s.parentNode&&s.parentNode.removeChild(s),i(c)}};return s.onerror=s.onload=n,s.href=t,r?r.parentNode.insertBefore(s,r.nextSibling):document.head.appendChild(s),s},t=(e,t)=>{for(var r=document.getElementsByTagName("link"),a=0;a<r.length;a++){var i=r[a],s=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(s===e||s===t))return i}var n=document.getElementsByTagName("style");for(a=0;a<n.length;a++){i=n[a],s=i.getAttribute("data-href");if(s===e||s===t)return i}},a=a=>new Promise(((i,s)=>{var n=r.miniCssF(a),o=r.p+n;if(t(n,o))return i();e(a,o,null,i,s)})),i={143:0};r.f.miniCss=(e,t)=>{var r={135:1,172:1,173:1,201:1,211:1,214:1,487:1,631:1,691:1};i[e]?t.push(i[e]):0!==i[e]&&r[e]&&t.push(i[e]=a(e).then((()=>{i[e]=0}),(t=>{throw delete i[e],t})))}}})(),(()=>{var e={143:0};r.f.j=(t,a)=>{var i=r.o(e,t)?e[t]:void 0;if(0!==i)if(i)a.push(i[2]);else{var s=new Promise(((r,a)=>i=e[t]=[r,a]));a.push(i[2]=s);var n=r.p+r.u(t),o=new Error,c=a=>{if(r.o(e,t)&&(i=e[t],0!==i&&(e[t]=void 0),i)){var s=a&&("load"===a.type?"missing":a.type),n=a&&a.target&&a.target.src;o.message="Loading chunk "+t+" failed.\n("+s+": "+n+")",o.name="ChunkLoadError",o.type=s,o.request=n,i[1](o)}};r.l(n,c,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,a)=>{var i,s,[n,o,c]=a,l=0;if(n.some((t=>0!==e[t]))){for(i in o)r.o(o,i)&&(r.m[i]=o[i]);if(c)var u=c(r)}for(t&&t(a);l<n.length;l++)s=n[l],r.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return r.O(u)},a=self["webpackChunkassignment_2_1"]=self["webpackChunkassignment_2_1"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var a=r.O(void 0,[998],(()=>r(5230)));a=r.O(a)})();
//# sourceMappingURL=app.a4443f06.js.map