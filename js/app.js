// =============================================================================
// All Terrain Campers — main application JavaScript
//
// This file carries every front-end behavior on the site. Inside the file,
// section banners use a ===== separator pattern; search with that prefix to
// navigate.
//
// Major sections (in source order):
//   DATA            — PRODUCTS, MODELS, TESTIMONIALS, GALLERY, CFG_RESULTS,
//                     TRUCKS, INFO, FEATURES (ATC-verbatim content lives here)
//   RENDER          — populates the DOM from the data arrays
//   CART            — localStorage-backed cart + checkout flow
//   DRAWER          — mobile hamburger drawer
//   CAROUSEL        — testimonial carousel
//   LIGHTBOX        — full-screen photo viewer
//   CONFIGURATOR    — "Find My Camper" step-through
//   TRUCK MODAL     — per-brand detail popups
//   INFO MODAL      — verbatim deep-dives (experience / construction / factory / custom)
//   MODEL MODAL     — per-model detail popups
//   HERO SLIDESHOW  — auto-rotating hero photos
//   DELIVERED-PRICE CALCULATOR
//   INIT            — bootstrap at page load
//
// Data order is intentional: render functions reference const arrays defined
// above them in source order. If you reorder declarations, keep them above
// their first caller.
// =============================================================================

/* ==== inline bootstrap (was on line 1291 of index.html) ==== */
      /* inject hero-card bg after paint */
      document.querySelectorAll('.feat-card').forEach(c=>{const v=c.style.getPropertyValue('--bg-img');if(v){c.style.cssText += ';--x:1';c.querySelector('.card-body')||0;const st=document.createElement('style');st.textContent=`[style*="--bg-img:${v.replace(/"/g,'\\"')}"]::before{background-image:${v}}`;document.head.appendChild(st)}})
    

/* ==== main application (was on line 2211 of index.html) ==== */
/* ================ DATA ================ */
const PRODUCTS = [
  { id:'jacks', cat:'Jacks & Mounts', name:'Mechanical Jacks (Set of 4)', brand:'Happijac (typical)', price:975, img:'/images/products/jacks.jpg',
    desc:'Four manually-cranked mechanical camper jacks. Installs directly on the corner jack brackets that come standard on every ATC camper. Used to raise the camper off your truck for storage or to lift the camper level when offloaded at a campsite.',
    specs:[['Included','4 jacks + mounting hardware'],['Mount','Standard ATC corner jack brackets'],['Operation','Manual hand crank'],['Installation','Factory install or DIY with included hardware'],['Compatibility','All ATC models']],
    color:'#8e5129', iconText:'⚙' },
  { id:'solar', cat:'Solar & Electric', name:'Solar Panel — 200W Renogy', brand:'Renogy', price:1095, img:'/images/products/solar.jpg',
    desc:'Roof-mounted 200-watt Renogy monocrystalline solar panel. Every ATC camper comes pre-wired for solar installation, so this panel plugs straight into the existing solar harness and deep-cycle battery system.',
    specs:[['Power Rating','200W'],['Cell Type','Monocrystalline'],['Open Circuit Voltage','~25.7 V'],['Max Power Voltage','~20 V'],['Max Power Current','~9.8 A'],['Dimensions','58.6" × 26.4" × 1.37"'],['Weight','~26.5 lbs'],['Manufacturer Warranty','25-year power output (via Renogy)'],['Included','Panel + mounting brackets'],['Pre-wiring','Yes, standard on every ATC camper']],
    color:'#1d3a5c', iconText:'☀' },
  { id:'awning', cat:'Awnings & Racks', name:'Fiamma Awning — 8 Foot Side', brand:'Fiamma', price:1600, img:'/images/products/awning.jpg',
    desc:'Fiamma 8-foot side-mount awning. Anodized aluminum case mounted along the passenger side of the camper for rapid deployment of shaded outdoor space. Pairs with the optional Awning Light.',
    specs:[['Length (closed)','~8 feet (2.5m)'],['Case Material','Anodized aluminum'],['Mount','Passenger side of camper'],['Fabric','Vinyl (Fiamma stock)'],['Installation','Factory install recommended'],['Pairs With','AT Awning Light ($85 add-on)']],
    color:'#3f7754', iconText:'⛱' },
  { id:'cwp', cat:'Insulation', name:'Cold Weather Pack', brand:'All Terrain Campers', price:950, img:'https://img1.wsimg.com/isteam/ip/354b13ea-92f0-4970-847f-493021238e1c/Coldwx001f.png/:/rs=w:900,m/qt=q:90',
    desc:'Insulation layer attaching with Velcro inside the camper along the soft pop-up portion. Creates a one-inch dead air space all the way around the inside of the camper.',
    specs:[['Type','Velcro-attached insulation liner'],['Air Gap','1 inch dead air space'],['Heater Load Reduction','~50% less in cold weather (per ATC)'],['Summer Benefit','Keeps interior a little cooler'],['Install','Included in price'],['Compatibility','All ATC models']],
    verbatim:'"The heater only has to work about half as much with it in place in cold weather, and we have discovered that it also works well in the summer to keep the camper a little cooler." — allterraincampers.com FAQ',
    color:'#4a5f7e', iconText:'❄' },
  { id:'fridge', cat:'Furnace & Fridge', name:'Dometic Refrigerator NRX 50C (12V)', brand:'Dometic', price:1050, img:'/images/products/fridge.jpg',
    desc:'12-volt Dometic NRX 50C refrigerator. Runs on the camper\'s deep-cycle battery system (charged by solar or shore power). Built for vibration and off-road use.',
    specs:[['Model','NRX 50C'],['Capacity','~49 L / 1.7 cu ft'],['Power','12/24V DC or 100-240V AC'],['Temperature Range','~+10°C to -18°C (50°F to 0°F)'],['Mount','In the camper\'s refrigerator cabinet location'],['Manufacturer','Dometic']],
    color:'#2e5641', iconText:'🧊' },
  { id:'furnace', cat:'Furnace & Fridge', name:'Dometic Automatic Furnace (12,000 BTU)', brand:'Dometic', price:995, img:'/images/products/furnace.jpg',
    desc:'Dometic automatic forced-air furnace rated at 12,000 BTU. Thermostat-controlled with automatic ignition. Runs off the camper\'s propane tank and 12V battery.',
    specs:[['Rating','12,000 BTU'],['Fuel','Propane (via standard 5-gallon tank)'],['Control','12V thermostat + automatic ignition'],['Mount','Integrated in cabinet'],['Manufacturer','Dometic']],
    color:'#b07b1f', iconText:'🔥' },
  { id:'slide', cat:'Beds', name:'Slide-Out Bed', brand:'All Terrain Campers', price:575, img:'https://img1.wsimg.com/isteam/ip/354b13ea-92f0-4970-847f-493021238e1c/20251013_103217.jpg/:/rs=w:800,m/qt=q:88',
    desc:'Slide-out upper bed extension. Available on Cougar, Panther, and Ocelot models. Extends the overhead bed width when deployed so you can sleep crosswise more comfortably.',
    specs:[['Fits','Cougar, Panther, Ocelot'],['Extension','Slide-out frame + mattress'],['Installed Size','64" × 82" (Cougar/Panther) or 64" × 76" (Ocelot)'],['Operation','Manual slide'],['Install','Factory only']],
    color:'#1d3a5c', iconText:'🛏' },
  { id:'rack', cat:'Awnings & Racks', name:'Luggage & Boat Rack', brand:'All Terrain Campers', price:395, img:'/images/products/rack.jpg',
    desc:'Roof-mounted luggage and boat rack. "You can carry just about anything on the roof in the down position" — per ATC FAQ. Items must be removed before raising the roof.',
    specs:[['Mount','Roof rail'],['Use','Luggage, kayaks, bikes, boats'],['Constraint','Remove before raising roof']],
    verbatim:'"You can carry just about anything on the roof in the down position. Just keep in mind that you will probably have to unload whatever you put on the roof to raise it." — allterraincampers.com FAQ',
    color:'#8a4620', iconText:'🎒' },
  { id:'fan', cat:'Ventilation', name:'Fantastic Fan (3-Speed Roof Vent)', brand:'Dometic Fan-Tastic', price:325, img:'/images/products/fan.jpg',
    desc:'Fan-Tastic Vent 3-speed roof vent fan. Replaces the standard roof vent with a powered fan for airflow, cooling, and moisture control.',
    specs:[['Speeds','3 speeds'],['Opening','Standard 14" × 14" roof vent'],['Power','12V DC'],['Manufacturer','Dometic Fan-Tastic Vent']],
    color:'#2e568a', iconText:'💨' },
  { id:'steps', cat:'Access', name:'Rear Wall Steps', brand:'All Terrain Campers', price:275, img:'/images/products/steps.jpg',
    desc:'Integrated rear wall steps for accessing the roof with gear stowed on top.',
    specs:[['Location','Rear wall, driver or passenger side'],['Mount','Welded to aluminium frame'],['Install','Factory only']],
    color:'#5a6370', iconText:'↥' },
  { id:'tracks', cat:'Awnings & Racks', name:'Yakima Tracks — 108"', brand:'Yakima', price:495, img:'/images/products/tracks.jpg',
    desc:'Yakima roof-mounted track system. Accepts all Yakima crossbars and gear mounts. The 72" version is also available ($355).',
    specs:[['Length','108 inches'],['Compatibility','Yakima crossbar system'],['Mount','Roof-mounted on ATC camper'],['Also Available','Yakima Tracks 72" — $355']],
    color:'#14202e', iconText:'═' },
  { id:'110v', cat:'Solar & Electric', name:'110V System with Converter', brand:'Progressive Dynamics', price:650, img:'/images/products/converter.jpg',
    desc:'110V shore-power system with AC-to-DC converter. Plug into any campsite pedestal for unlimited power.',
    specs:[['Input','110V AC shore power'],['Output','12V DC + AC receptacles'],['Converter','Integrated'],['Install','Factory']],
    color:'#c26139', iconText:'⚡' },
];

// All testimonials below are verbatim from allterraincampers.com homepage.
// Square-bracket ellipses [...] indicate developer cuts for carousel length.
// No word inside the quote marks has been added or rephrased.
const TESTIMONIALS = [
  { photo:'Marc.png', name:'Marc', meta:'Cougar Owner', quote:'After finishing my "Whirl Wind" 1300 plus mile first trip with the Cougar, I have one word to sum up my experience... WOW !!! [...] From the high country of the Sierras to the wind blown beaches of the Central Coast, (two days of 25 knots with gusts to 35) the Cougar performed flawlessly. [...] I couldn\'t be happier.' },
  { photo:'PatandCarolin.png', name:'Pat & Carolin', meta:'Off-Road Owners', quote:'We went over some very rough roads and several extremely steep hills, one was so steep that we feared the aluminum turnbuckles might snap. However, the camper stayed in place for the entire trip and did not even require the slightest adjustment! [...] basically we can now go wherever we want to.' },
  { photo:'George.png', name:'George', meta:'Bobcat · Toyota Tacoma', quote:'The All Terrain Bobcat is an aluminum framed, pop-up camper that performs very well on smaller pick-ups like the Toyota Tacoma. [...] Since the bed is on a slide, and you sleep lengthwise, you get a very large bed, essentially a queen size.' },
  { photo:'Dan.png', name:'Dan', meta:'Baja Adventure Owner', quote:'Just back from Baja, and I have to tell you, the camper is even more than I expected. [...] everyone was very impressed with the fit, finish, and design of the rig. One quick story... a guy came running into camp one afternoon saying his car was stuck in a wash about two miles away. [...] we stowed everything and hauled off. [...] He was a little embarrassed to be pulled out by a camper.' },
  { photo:'Clark.png', name:'Clark', meta:'Long-Time Customer', quote:'I can\'t remember the last time that I was treated as honestly and fairly as when I purchased my camper from you. [...] That kind of integrity is difficult to find. [...] Every time I look in it I am more amazed at the quality of workmanship. [...] My buddies who are involved in high-end R & D and who build intricate systems themselves were stunned when they saw the camper. They have NEVER seen a camper built like this.' },
];

const GALLERY = [
  { src:'/images/landscape_02.jpg', span:'w3 h2', local:true, label:'Sunset on the highway' },
  { src:'/images/popup_03.jpg', local:true, label:'Pop-up · fully extended' },
  { src:'/images/popup_02.jpg', local:true, label:'Pop-up · midway' },
  { src:'/images/popup_01.jpg', local:true, label:'Low profile · popped down' },
  { src:'/images/hero-w8.jpg', span:'w2', local:true, label:'Factory-delivered rig' },
  { src:'/images/landscape_03.jpg', local:true, label:'Interior · couch & cabinet' },
  { src:'/images/landscape_01.jpg', span:'h2', local:true, label:'Interior · bed + kitchen' },
  { src:'1000005253.jpg', span:'w2 h2' },
  { src:'20251013_103217.jpg', span:'w2 h2' },
  { src:'20251013_103530.jpg', span:'w2' },
  { src:'20250815_083118.jpg' },
  { src:'20250815_083255.jpg' },
  { src:'20251013_103925.jpg', span:'w2' },
  { src:'20251013_104325.jpg' },
  { src:'20251013_104420.jpg' },
  { src:'BradUpgrades3.jpg', span:'w2' },
  { src:'20250815_083327.jpg' },
  { src:'20250815_083337.jpg' },
  { src:'20250815_083423.jpg', span:'w2' },
  { src:'1000000712.jpg' },
  { src:'1000000713.jpg' },
  { src:'1000000714.jpg', span:'w2' },
  { src:'20251111_154949.jpg', span:'w2' },
  { src:'FURGUSON_FLATBED_012.jpg', span:'w3' },
  { src:'PU001.jpg' },
  { src:'PU002.jpg' },
  { src:'PU003.jpg' },
  { src:'1000005253-620cb7f.jpg', span:'w2' },
  { src:'W8.jpg', span:'w2' },
];

const IMG_BASE = 'https://img1.wsimg.com/isteam/ip/354b13ea-92f0-4970-847f-493021238e1c/';

/* ================ RENDER ================ */
function shadeColor(col,amt){
  const n=parseInt(col.replace('#',''),16);
  const r=Math.max(0,Math.min(255,(n>>16)+amt));
  const g=Math.max(0,Math.min(255,((n>>8)&0xff)+amt));
  const b=Math.max(0,Math.min(255,(n&0xff)+amt));
  return '#'+((r<<16)|(g<<8)|b).toString(16).padStart(6,'0');
}
function renderShop(){
  const g = document.getElementById('shopGrid');
  g.innerHTML = PRODUCTS.map(p=>`
    <article class="product" onclick="showProductDetail('${p.id}')" style="cursor:pointer">
      <div class="thumb" style="background:#fff;display:flex;align-items:center;justify-content:center;position:relative;aspect-ratio:1/1;overflow:hidden">
        ${p.img ? `<img src="${p.img}" alt="${p.name}" style="width:88%;height:88%;object-fit:contain" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div style="display:none;position:absolute;inset:0;background:linear-gradient(135deg,${p.color},${shadeColor(p.color,-30)});align-items:center;justify-content:center;font-size:72px;color:rgba(255,255,255,.95)">${p.iconText||'•'}</div>` : `<div style="font-size:72px;color:rgba(255,255,255,.95)">${p.iconText||'•'}</div>`}
        <div style="position:absolute;top:10px;right:10px;background:rgba(22,32,44,.85);color:#fff;font-size:10px;letter-spacing:.12em;text-transform:uppercase;padding:4px 10px;border-radius:100px;font-weight:700;backdrop-filter:blur(6px)">${p.brand||''}</div>
      </div>
      <div class="p-body">
        <div class="p-cat">${p.cat}</div>
        <h4>${p.name}</h4>
        <p class="p-desc">${p.desc.length>110?p.desc.slice(0,110)+'…':p.desc}</p>
        <div class="p-foot">
          <span class="p-price">$${p.price.toLocaleString()}</span>
          <button class="add-btn" onclick="event.stopPropagation();addToCart('${p.id}','${p.name.replace(/'/g,"\\'")}',${p.price},this)">Add to Cart</button>
        </div>
      </div>
    </article>
  `).join('');
}

function galleryThumbUrl(img){
  return img.local ? img.src : (IMG_BASE + img.src + '/:/rs=w:800,m/qt=q:85');
}
function galleryFullUrl(img){
  return img.local ? img.src : (IMG_BASE + img.src + '/:/rs=w:1800,m/qt=q:92');
}
function renderGallery(){
  const g = document.getElementById('galleryGrid');
  g.innerHTML = GALLERY.map((img,i)=>`
    <div class="${img.span||''}" style="background-image:url('${galleryThumbUrl(img)}')" onclick="openLightbox(${i})" role="button" aria-label="${img.label||'Photo '+(i+1)}" title="${img.label||''}"></div>
  `).join('');
}

function renderTestimonials(){
  const t = document.getElementById('carouselTrack');
  t.innerHTML = TESTIMONIALS.map(ts=>`
    <div class="carousel-slide">
      <img src="${IMG_BASE}${ts.photo}/:/rs=w:280,h:280,cg:true,m/qt=q:90" alt="${ts.name}">
      <div class="ts-body">
        <div class="ts-stars">★★★★★</div>
        <div class="ts-quote">${ts.quote}</div>
        <div class="ts-author">${ts.name}</div>
        <div class="ts-meta">${ts.meta}</div>
      </div>
    </div>
  `).join('');
  const d = document.getElementById('carouselDots');
  d.innerHTML = TESTIMONIALS.map((_,i)=>`<button class="carousel-dot ${i===0?'active':''}" onclick="carouselGo(${i})" aria-label="Slide ${i+1}"></button>`).join('');
}

/* ================ CART ================ */
const CART_KEY = 'atc_cart_v1';
let cart = (()=>{try{return JSON.parse(localStorage.getItem(CART_KEY))||[]}catch(e){return[]}})();
function saveCart(){localStorage.setItem(CART_KEY,JSON.stringify(cart));renderCart()}
function addToCart(id,name,price,btn){
  const e = cart.find(c=>c.id===id);
  if(e) e.qty++; else cart.push({id,name,price,qty:1});
  saveCart();
  if(btn){btn.textContent='Added ✓';btn.classList.add('added');setTimeout(()=>{btn.textContent='Add to Cart';btn.classList.remove('added')},1400)}
}
function removeFromCart(id){cart = cart.filter(c=>c.id!==id);saveCart()}
function changeQty(id,d){const e = cart.find(c=>c.id===id);if(!e)return;e.qty+=d;if(e.qty<=0)removeFromCart(id);else saveCart()}
function cartTotal(){return cart.reduce((s,c)=>s+c.price*c.qty,0)}
function renderCart(){
  const badge = document.getElementById('cartBadge');
  const qty = cart.reduce((s,c)=>s+c.qty,0);
  badge.textContent = qty;
  badge.classList.toggle('zero', qty===0);

  const items = document.getElementById('cartItems');
  const foot = document.getElementById('cartFoot');
  if(cart.length===0){
    items.innerHTML = `<div class="cart-empty"><svg viewBox="0 0 24 24"><path d="M7 4h-2l-1 2v2h2l3.6 7.6-1.4 2.4c-.5.9 0 2 1 2h12v-2h-11l1-2h7.5c.8 0 1.4-.4 1.7-1l3.6-6.5c.3-.6-.2-1.5-.9-1.5h-15.2l-1-2z"/></svg><p>Your cart is empty.</p><p style="margin-top:14px"><a href="#shop" onclick="closeCart()" style="color:var(--accent-2)">Browse accessories →</a></p></div>`;
    foot.style.display='none';
  }else{
    items.innerHTML = cart.map(c=>`
      <div class="cart-item">
        <div class="ci-body">
          <div class="ci-name">${c.name}</div>
          <div class="ci-price">$${(c.price*c.qty).toLocaleString()}</div>
          <div class="ci-qty">
            <button onclick="changeQty('${c.id}',-1)" aria-label="Decrease">−</button>
            <span class="q">${c.qty}</span>
            <button onclick="changeQty('${c.id}',1)" aria-label="Increase">+</button>
          </div><br>
          <button class="ci-rm" onclick="removeFromCart('${c.id}')">Remove</button>
        </div>
      </div>
    `).join('');
    document.getElementById('cartTotal').textContent = '$'+cartTotal().toLocaleString();
    foot.style.display='block';
  }
}
function toggleCart(){const d=document.getElementById('cartDrawer');const bd=document.getElementById('backdrop');d.classList.toggle('open');bd.classList.toggle('show')}
function closeCart(){document.getElementById('cartDrawer').classList.remove('open');document.getElementById('backdrop').classList.remove('show')}
function sendCartToContact(){
  if(cart.length===0)return;
  const lines = cart.map(c=>`• ${c.name} (×${c.qty}) — $${(c.price*c.qty).toLocaleString()}`).join('\n');
  const msg = 'I\'d like to order the following:\n\n'+lines+'\n\nTotal: $'+cartTotal().toLocaleString();
  const ta = document.querySelector('form.inquiry textarea[name="msg"]');
  if(ta){ta.value = msg;ta.focus()}
  closeCart();
}

/* ================ DRAWER ================ */
function openDrawer(){document.getElementById('drawer').classList.add('open');document.getElementById('backdrop').classList.add('show')}
function closeDrawer(){document.getElementById('drawer').classList.remove('open');document.getElementById('backdrop').classList.remove('show')}

/* ================ CAROUSEL ================ */
let carouselIdx = 0, carouselTimer = null;
function carouselGo(i){
  carouselIdx = (i+TESTIMONIALS.length)%TESTIMONIALS.length;
  document.getElementById('carouselTrack').style.transform = `translateX(-${carouselIdx*100}%)`;
  document.querySelectorAll('.carousel-dot').forEach((d,j)=>d.classList.toggle('active',j===carouselIdx));
  resetCarouselTimer();
}
function carouselPrev(){carouselGo(carouselIdx-1)}
function carouselNext(){carouselGo(carouselIdx+1)}
function resetCarouselTimer(){clearInterval(carouselTimer);carouselTimer=setInterval(()=>carouselGo(carouselIdx+1),7000)}

/* ================ LIGHTBOX ================ */
let lbIdx = 0;
function openLightbox(i){
  lbIdx = i;
  document.getElementById('lbImg').src = galleryFullUrl(GALLERY[i]);
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox(e){if(e && e.target && e.target.tagName==='IMG')return;document.getElementById('lightbox').classList.remove('open')}
function lbNav(d){lbIdx=(lbIdx+d+GALLERY.length)%GALLERY.length;document.getElementById('lbImg').src = galleryFullUrl(GALLERY[lbIdx])}
document.addEventListener('keydown',e=>{
  if(!document.getElementById('lightbox').classList.contains('open'))return;
  if(e.key==='Escape')closeLightbox();
  if(e.key==='ArrowLeft')lbNav(-1);
  if(e.key==='ArrowRight')lbNav(1);
});

/* ================ CONFIGURATOR ================ */
let cfg = {size:null, bed:null};
const CFG_RESULTS = {
  'full-short': {name:'Ocelot or Panther', desc:'Full-size short-bed 6.5\' trucks. Panther is 84" wide, Ocelot is 72-78" wide. Both 80" floor, 128" roof.', price:'$20,995', img:'PU003.jpg', anchor:'#ocelot'},
  'full-long':  {name:'Cougar or Puma',   desc:'Full-size long-bed 8\' trucks. Cougar is 84" wide, Puma is 72-78" wide. Both 96" floor, 144" roof.', price:'$21,350', img:'1000005253.jpg', anchor:'#cougar'},
  'mid-short':  {name:'Bobcat',            desc:'Built for Tacoma and mid-size short-bed trucks. 78"×69" bed, convertible couch, queen-size sleep with slide.', price:'$21,570', img:'BradUpgrades3.jpg', anchor:'#bobcat'},
  'mid-long':   {name:'Lynx',              desc:'Mid-size 8\' long-bed. Same welded aluminium build as the Bobcat with more floor length.', price:'$21,925', img:'20251013_103241.jpg', anchor:'#lynx'},
};
function configPickSize(s){
  cfg.size = s;
  document.querySelectorAll('#cpanel1 .choice').forEach(c=>c.classList.toggle('selected',c.dataset.size===s));
  document.getElementById('cstep1').classList.remove('active');
  document.getElementById('cstep1').classList.add('done');
  document.getElementById('cstep2').classList.add('active');
  setTimeout(()=>{document.getElementById('cpanel1').style.display='none';document.getElementById('cpanel2').style.display='block';},280);
}
function configPickBed(b){
  cfg.bed = b;
  document.querySelectorAll('#cpanel2 .choice').forEach(c=>c.classList.toggle('selected',c.dataset.bed===b));
  document.getElementById('cstep2').classList.remove('active');
  document.getElementById('cstep2').classList.add('done');
  document.getElementById('cstep3').classList.add('active');
  setTimeout(showConfigResult, 320);
}
function showConfigResult(){
  const key = cfg.size+'-'+cfg.bed;
  const r = CFG_RESULTS[key];
  if(!r)return;
  document.getElementById('cpanel2').style.display='none';
  document.getElementById('cresName').textContent = r.name;
  document.getElementById('cresDesc').textContent = r.desc;
  document.getElementById('cresPrice').textContent = r.price;
  document.getElementById('cresImg').src = IMG_BASE+r.img+'/:/rs=w:600,m/qt=q:90';
  document.getElementById('cresult').classList.add('show');
}
function configReset(){
  cfg = {size:null, bed:null, options:new Set(), basePrice:0, baseName:''};
  document.querySelectorAll('.choice').forEach(c=>c.classList.remove('selected'));
  document.querySelectorAll('.config-step').forEach((s,i)=>{s.classList.remove('done','active');if(i===0)s.classList.add('active')});
  document.getElementById('cpanel2').style.display='none';
  document.getElementById('cpanel1').style.display='block';
  document.getElementById('cresult').classList.remove('show');
  const cp4 = document.getElementById('cpanel4');
  if(cp4) cp4.style.display='none';
}

/* Step 4: options panel */
function configNext(){
  const key = cfg.size+'-'+cfg.bed;
  const r = CFG_RESULTS[key];
  if(!r) return;
  // Parse first price from "$21,350" etc.
  const num = parseInt(r.price.replace(/[^0-9]/g,''));
  cfg.basePrice = num;
  cfg.baseName = r.name.split(' or ')[0]; // pick first model name
  cfg.options = new Set();
  document.getElementById('cresult').classList.remove('show');
  document.getElementById('cstep3').classList.remove('active');
  document.getElementById('cstep3').classList.add('done');
  document.getElementById('cstep4').classList.add('active');
  document.getElementById('cpanel4').style.display='block';
  renderConfigOptions();
  updateConfigTotal();
}

function renderConfigOptions(){
  const el = document.getElementById('cfgOptions');
  el.innerHTML = PRODUCTS.map(p=>`
    <div class="cfg-opt" data-id="${p.id}">
      <div class="cfg-opt-toggle" onclick="toggleConfigOption('${p.id}')">
        <div class="cb"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg></div>
        <div class="cfg-opt-text">
          <div class="name">${p.name}</div>
          <div class="sub">${p.cat} · ${p.brand||''}</div>
        </div>
        <div class="price">+$${p.price.toLocaleString()}</div>
      </div>
      <button type="button" class="cfg-info" onclick="showProductDetail('${p.id}')" aria-label="View product details" title="View photo & specs">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><circle cx="12" cy="8" r=".5" fill="currentColor"/></svg>
      </button>
    </div>
  `).join('');
}

function toggleConfigOption(id){
  if(cfg.options.has(id)) cfg.options.delete(id);
  else cfg.options.add(id);
  // refresh selected state
  document.querySelectorAll('.cfg-opt').forEach((el,i)=>{
    el.classList.toggle('selected', cfg.options.has(PRODUCTS[i].id));
  });
  updateConfigTotal();
}

function updateConfigTotal(){
  document.getElementById('cfgTotModel').textContent = cfg.baseName + ' · Base $' + cfg.basePrice.toLocaleString();
  const lines = document.getElementById('cfgTotLines');
  const selected = PRODUCTS.filter(p=>cfg.options.has(p.id));
  lines.innerHTML = selected.length===0 ? '<div class="cfg-tot-line"><span class="n" style="color:var(--mute);font-style:italic">No options added yet — check any above</span></div>' : selected.map(p=>`<div class="cfg-tot-line"><span class="n">${p.name}</span><span class="p">$${p.price.toLocaleString()}</span></div>`).join('');
  const total = cfg.basePrice + selected.reduce((s,p)=>s+p.price,0);
  document.getElementById('cfgTotPrice').textContent = '$'+total.toLocaleString();
}

function configSendQuote(){
  const selected = PRODUCTS.filter(p=>cfg.options.has(p.id));
  const total = cfg.basePrice + selected.reduce((s,p)=>s+p.price,0);
  const lines = selected.map(p=>`• ${p.name} — $${p.price.toLocaleString()}`).join('\n');
  const msg = `Build-out quote request:\n\nBase model: ${cfg.baseName} — $${cfg.basePrice.toLocaleString()}\n\nOptions selected:\n${lines||'(base model only)'}\n\nEstimated total: $${total.toLocaleString()}\n\nPlease contact me to finalize this build.`;
  const ta = document.querySelector('form.inquiry textarea[name="msg"]');
  if(ta){
    ta.value = msg;
    const sel = document.querySelector('form.inquiry select[name="model"]');
    if(sel){
      for(const opt of sel.options){
        if(opt.text.toLowerCase().includes(cfg.baseName.toLowerCase().split(' ')[0])){
          opt.selected = true; break;
        }
      }
    }
  }
  // Scroll to contact form
  document.querySelector('#contact').scrollIntoView({behavior:'smooth',block:'start'});
}

/* ================ TRUCK MODAL ================ */
const TRUCKS = {
  ford: {
    brand:'FORD', title:'Built to fit every Ford truck.',
    fits:[
      {truck:'F-150 / F-250 / F-350 · 8\' Long Bed', model:'Cougar or Puma'},
      {truck:'F-150 · 6.5\' Short Bed', model:'Panther or Ocelot'},
      {truck:'Ranger · 6\' Bed', model:'Bobcat'},
    ],
    quote:'Cougar and/or Puma camper will fit all full-size trucks with an 8′ bed, such as: Ford, Chevrolet, Dodge, and Toyota Tundra.',
    photos:['1000005253.jpg','PU001.jpg','20251013_103530.jpg'],
  },
  chevy: {
    brand:'CHEVROLET', title:'Built to fit every Chevy truck.',
    fits:[
      {truck:'Silverado 1500 / 2500 / 3500 · 8\' Bed', model:'Cougar or Puma'},
      {truck:'Silverado · 6.5\' Short Bed', model:'Panther or Ocelot'},
      {truck:'Colorado · 6\' Bed (and older S-10)', model:'Bobcat'},
    ],
    quote:'Panther and/or Ocelot camper will fit all full-size trucks with a 6′ bed, such as: Ford, Chevrolet, Dodge, Toyota Tundra, and Nissan Titan trucks.',
    photos:['PU002.jpg','20251013_103217.jpg','20251013_104325.jpg'],
  },
  ram: {
    brand:'RAM (DODGE)', title:'Built to fit every RAM truck.',
    fits:[
      {truck:'RAM 1500 / 2500 / 3500 · 8\' Long Bed', model:'Cougar or Puma'},
      {truck:'RAM 1500 · 6.5\' Short Bed', model:'Panther or Ocelot'},
      {truck:'Dakota · 6\' Bed', model:'Bobcat'},
    ],
    quote:'Cougar and/or Puma camper will fit all full-size trucks with an 8′ bed, such as: Ford, Chevrolet, Dodge, and Toyota Tundra.',
    photos:['1000005253-620cb7f.jpg','W8.jpg','20251111_154949.jpg'],
  },
  toyota: {
    brand:'TOYOTA', title:'Built to fit every Toyota truck.',
    fits:[
      {truck:'Tundra · 8\' Long Bed', model:'Cougar or Puma'},
      {truck:'Tundra · 6.5\' Short Bed', model:'Panther or Ocelot'},
      {truck:'Tacoma · 6\' Bed (most popular Bobcat host)', model:'Bobcat'},
    ],
    quote:'The ATC Bobcat is a simple design. The camper extends to the back of the standard bed, and a bit over the sides. Since the bed is on a slide, and you sleep lengthwise, you get a very large bed, essentially a queen size. — George, Bobcat owner on a Toyota Tacoma',
    photos:['BradUpgrades3.jpg','20250815_083327.jpg','20250815_083423.jpg'],
  },
  gmc: {
    brand:'GMC', title:'Built to fit every GMC truck.',
    fits:[
      {truck:'Sierra 1500 / 2500 / 3500 · 8\' Bed', model:'Cougar or Puma'},
      {truck:'Sierra · 6.5\' Short Bed', model:'Panther or Ocelot'},
      {truck:'Canyon · 6\' Bed', model:'Bobcat'},
    ],
    quote:'We refurbish, repair, upgrade not only our own All Terrain Campers but Four Wheel campers (up to 2005) as well. We have worked on Four Wheel campers for years and are very familiar with them.',
    photos:['20250815_083255.jpg','20251013_103241.jpg','20251013_103925.jpg'],
  },
  nissan: {
    brand:'NISSAN', title:'Built to fit every Nissan truck.',
    fits:[
      {truck:'Titan · 6\' Full-Size Bed', model:'Panther or Ocelot'},
      {truck:'Frontier · Smaller 6\' Bed', model:'Bobcat'},
    ],
    quote:'Bobcat camper will fit all small-size trucks with a 6′ bed, such as Toyota Tacoma, Ford Ranger, Dodge Dakota, Chevrolet S-10, and Nissan small trucks.',
    photos:['PU003.jpg','20251013_104420.jpg','20250815_083337.jpg'],
  },
  jeep: {
    brand:'JEEP', title:'Jeep Gladiator — 5\' bed.',
    fits:[
      {truck:'Gladiator · 5\' Bed', model:'Bobcat (Custom Fit)'},
    ],
    quote:'Yes! We build custom units all the time! Let us know what you have in mind and we will be happy to tell you if it is possible.',
    photos:['BradUpgrades3.jpg','20251013_103217.jpg','1000000712.jpg'],
  },
};

function openTruckModal(key){
  const t = TRUCKS[key];
  if(!t) return;
  document.getElementById('tmBrand').textContent = t.brand;
  document.getElementById('tmTitle').textContent = t.title;
  const body = document.getElementById('tmBody');
  body.innerHTML = `
    <h4>Which ATC model fits</h4>
    <ul class="tm-fits">
      ${t.fits.map(f=>`<li><div class="tf-l"><span class="tf-truck">${f.truck}</span></div><span class="tf-model">${f.model}</span></li>`).join('')}
    </ul>
    <h4>Build quality photos</h4>
    <div class="tm-photos">
      ${t.photos.map(p=>`<div style="background-image:url('${IMG_BASE}${p}/:/rs=w:600,m/qt=q:85')" onclick="closeTruckModal();setTimeout(()=>{openLightbox(GALLERY.findIndex(g=>g.src==='${p}'))},300)"></div>`).join('')}
    </div>
    <div class="tm-testi">
      <div class="tq">${t.quote}</div>
      <div class="ta">— from All Terrain Campers' own FAQ</div>
    </div>
    <div class="tm-cta">
      <a href="#config" class="btn btn-primary" onclick="closeTruckModal()">Build My Camper →</a>
      <a href="#contact" class="btn btn-ghost" onclick="closeTruckModal()">Request a Quote</a>
    </div>
  `;
  document.getElementById('truckModal').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeTruckModal(){
  document.getElementById('truckModal').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&document.getElementById('truckModal').classList.contains('open'))closeTruckModal();
});

/* ================ INFO MODAL (verbatim deep-dives) ================ */
const INFO = {
  experience: {
    eyebrow:'Heritage',
    title:'Over 50 years of experience.',
    body:`
      <blockquote class="verb">"We produce the lightest weight, lowest profile, and most durable pop-up campers on the market today. With over 50 years of experience in the camper industry, we'll meet your needs whether you are an off-road enthusiast or just a casual camper."</blockquote>

      <blockquote class="verb">"After listening to our customers' feedback, All Terrain Campers, with over 50 years of experience in the industry, builds campers that will suit your needs and desires... campers you'll enjoy for years to come!"</blockquote>

      <blockquote class="verb">"When you purchase an All-Terrain camper, you are buying a camper built by campers for campers. We use the campers we build... all the time!"</blockquote>

      <p class="verb-src">Source: allterraincampers.com (Home + Standard Features pages, verbatim).</p>

      <div class="tm-cta">
        <a href="#reviews" class="btn btn-primary" onclick="closeInfoModal()">See Owner Stories</a>
        <a href="#press" class="btn btn-ghost" onclick="closeInfoModal()">Press Coverage</a>
      </div>`,
  },
  construction: {
    eyebrow:'Construction & Materials',
    title:'Welded aluminium. Made to flex.',
    body:`
      <blockquote class="verb">"We Produce Strong, Light-Weight, Welded Aluminium Frame Slide-In 4x4 Campers... Built to Survive!"</blockquote>

      <blockquote class="verb">"Every camper is built with an aluminum frame that is made to flex with your truck bed without coming apart as most camper frames do over time."</blockquote>

      <blockquote class="verb">"Everyone at All Terrain Campers takes a lot of pride not only in our workmanship but also in the materials we use to build your camper. That's why you will never find any particle or pressboard in our campers. We currently are building to order. Please call us to see if we have any new campers in production for you to look at."</blockquote>

      <h4 style="margin-top:20px">Materials & Standard Equipment</h4>
      <blockquote class="verb">"Stainless steel sink and foldable faucet. Comes with electric water pump."</blockquote>
      <blockquote class="verb">"The stove is a 2 burner, flush mount with a protective glass top lid. The lid folds down when not in use, protecting the stove and giving you a usable, flat surface."</blockquote>
      <blockquote class="verb">"Marine/RV Deep-Cycle battery, a screen door with a deadbolt, and a front picture window."</blockquote>

      <h4 style="margin-top:20px">Weight</h4>
      <blockquote class="verb">"Our campers can weigh 895 pounds - 1200 pounds depending on how you have it built."</blockquote>

      <blockquote class="verb">"Our shells weight 560 pounds - 1200 pounds depending on how you have it built."</blockquote>
      <p class="verb-src" style="margin-top:-10px;font-size:11px">Source: allterraincampers.com pricing-and-options page. ATC&rsquo;s own text uses &quot;weight&quot; in the second sentence &mdash; preserved verbatim here including the typo.</p>

      <h4 style="margin-top:20px">An Owner on Workmanship (Clark, verbatim)</h4>
      <blockquote class="verb">"Every time I look in it I am more amazed at the quality of workmanship. I learned how to be picky from my father, who was a mechanic and a professional drag racer, and my uncle, who was a master welder and inventor for the Aerospace Industry. I know both of them would be giving me high fives if they were alive to see this camper. My buddies who are involved in high-end R & D and who build intricate systems themselves were stunned when they saw the camper. They have NEVER seen a camper built like this."</blockquote>

      <p class="verb-src">Source: allterraincampers.com (Home + Standard Features + Pricing &amp; Options pages, verbatim).</p>

      <h4 style="margin-top:20px">Construction photos</h4>
      <div class="tm-photos">
        <div style="background-image:url('${'https://img1.wsimg.com/isteam/ip/354b13ea-92f0-4970-847f-493021238e1c/'}20250815_083118.jpg/:/rs=w:600,m/qt=q:85')"></div>
        <div style="background-image:url('${'https://img1.wsimg.com/isteam/ip/354b13ea-92f0-4970-847f-493021238e1c/'}1000000713.jpg/:/rs=w:600,m/qt=q:85')"></div>
        <div style="background-image:url('${'https://img1.wsimg.com/isteam/ip/354b13ea-92f0-4970-847f-493021238e1c/'}20251013_103217.jpg/:/rs=w:600,m/qt=q:85')"></div>
      </div>

      <div class="tm-cta">
        <a href="#features" class="btn btn-primary" onclick="closeInfoModal()">See Standard Features</a>
        <a href="#gallery" class="btn btn-ghost" onclick="closeInfoModal()">Build Gallery</a>
      </div>`,
  },
  factory: {
    eyebrow:'Factory Direct',
    title:'No dealers. No games.',
    body:`
      <blockquote class="verb">"No, we are factory direct."</blockquote>

      <blockquote class="verb">"You are buying directly from the factory. You will find that you are not dealing with a typical RV-type dealer. There are no high-pressure sales or other games. We will answer your questions and see if our camper will fit your style of camping. In turn, we do not negotiate our prices. We have never had a customer complain about our sales method."</blockquote>

      <h4 style="margin-top:20px">Shipping anywhere in the U.S.</h4>
      <blockquote class="verb">"Yes, we can ship you the camper. We currently change $1.50 a mile to ship one way."</blockquote>

      <h4 style="margin-top:20px">Installation at the factory</h4>
      <blockquote class="verb">"Due to insurance regulations and safety issues, we can not allow a customer to install the camper themselves. We hope that you can understand our position on this."</blockquote>

      <h4 style="margin-top:20px">Warranty service anywhere</h4>
      <blockquote class="verb">"We are proud of the fact that warranty issues rarely come up. However, if there is an issue and you live too far away from us to fix the camper for you, we will be happy to have you take it to a local RV dealer and pay for the repair with prior approval of All Terrain Camper, Inc."</blockquote>

      <p class="verb-src">Source: allterraincampers.com (FAQ page, verbatim).</p>

      <div class="tm-cta">
        <a href="tel:+18004461003" class="btn btn-primary">Call 1 (800) 446-1003</a>
        <a href="#contact" class="btn btn-ghost" onclick="closeInfoModal()">Request a Quote</a>
      </div>`,
  },
  custom: {
    eyebrow:'Custom Builds',
    title:'Built to order, built to suit.',
    body:`
      <blockquote class="verb">"Yes! We build custom units all the time! Let us know what you have in mind and we will be happy to tell you if it is possible."</blockquote>

      <blockquote class="verb">"Yes, we do. Every model camper that we make also has an empty shell version. Our price list also shows some options you may add to a shell model of a camper. If you don't see what you need, give us a call!"</blockquote>

      <blockquote class="verb">"We currently are building to order. Please call us to see if we have any new campers in production for you to look at."</blockquote>

      <h4 style="margin-top:20px">An Owner on Personal Service (Clark, verbatim)</h4>
      <blockquote class="verb">"To the team at All Terrain -- First of all, thank you very much for all of the personal services. I can't remember the last time that I was treated as honestly and fairly as when I purchased my camper from you. You answered all of my questions and truly worked with me on the options that I needed, not just the ones that were for sale. That kind of integrity is difficult to find. It's also great to work with a bunch of guys who actually use the camper and know what it takes to make a successful camping experience."</blockquote>

      <blockquote class="verb">"Thank you for your interest in All Terrain Campers. We at All Terrain Campers would like to hear from you! If you need a quote or have a question, you can either fill out the form below or just give us a call!"</blockquote>

      <p class="verb-src">Source: allterraincampers.com (FAQ + Standard Features + Contact + Home pages, verbatim).</p>

      <div class="tm-cta">
        <a href="#config" class="btn btn-primary" onclick="closeInfoModal()">Find Your Model</a>
        <a href="#pricing" class="btn btn-ghost" onclick="closeInfoModal()">See Options & Prices</a>
      </div>`,
  },
};
function openInfoModal(key){
  const info = INFO[key];
  if(!info) return;
  document.getElementById('imEyebrow').textContent = info.eyebrow;
  document.getElementById('imTitle').textContent = info.title;
  document.getElementById('imBody').innerHTML = info.body;
  document.getElementById('infoModal').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeInfoModal(){
  document.getElementById('infoModal').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&document.getElementById('infoModal').classList.contains('open'))closeInfoModal();
});

/* ================ STANDARD EQUIPMENT — clickable items
   Every FEATURES entry's `verb` field is VERBATIM text from allterraincampers.com.
   Items without a `verb` field are bullet-list entries on ATC's Standard Features
   page (ATC publishes them as labels only, with no accompanying description).
   For those, we display the label with a neutral note instead of inventing a quote. ================ */
const FEATURES = [
  // ---- Items ATC publishes with a full written description (standard-features page) ----
  { name:'Stainless steel sink', verb:'Stainless steel sink and foldable faucet.  Comes with electric water pump.', photo:'landscape_01.jpg', local:true },
  { name:'2-burner stove', verb:'The stove is a 2 burner, flush mount with a protective glass top lid. The lid folds down when not in use, protecting the stove and giving you a usable, flat surface.', photo:'20251013_103217.jpg' },
  { name:'12V outlet with USB', verb:'A 12-volt outlet w/USB is standard in each model camper. Located in the cabinet to the right of the sink, you can plug in an appliance and set it on top of the icebox. Another outlet can be added to the camper in the front of the cabinet. Storage in cabinet.' },
  { name:'Fire extinguisher & smoke alarm', verb:'Each camper comes with a fire extinguisher and a smoke alarm. Hopefully, you\'ll never have to use the extinguisher.' },
  { name:'Generous storage', verb:'A generous amount of storage space in the cabinet and under the couch.' },
  { name:'Welded aluminum frame', verb:'Every camper is built with an aluminum frame that is made to flex with your truck bed without coming apart as most camper frames do over time.', photo:'1000000713.jpg' },
  { name:'Materials pride (no particle or pressboard)', verb:'Everyone at All Terrain Campers takes a lot of pride not only in our workmanship but also in the materials we use to build your camper. That\'s why you will never find any particle or pressboard in our campers.' },
  { name:'Overhead bed (cab extension)', verb:'Our standard bed extends 48" over your cab and has a very comfortable 4" thick mattress. The bed\'s overall size varies with the model.' },
  { name:'Built by campers for campers', verb:'When you purchase an All-Terrain camper, you are buying a camper built by campers for campers. We use the campers we build... all the time!' },

  // ---- Items ATC publishes as part of a multi-item standard-features sentence (verbatim fragment) ----
  { name:'Marine/RV Deep-Cycle battery', verb:'Marine/RV Deep-Cycle battery, a screen door with a deadbolt, and a front picture window.' },
  { name:'Screen door with deadbolt', verb:'Marine/RV Deep-Cycle battery, a screen door with a deadbolt, and a front picture window.' },
  { name:'Front picture window', verb:'Marine/RV Deep-Cycle battery, a screen door with a deadbolt, and a front picture window.' },
  { name:'20-pound propane tank', verb:'A 20-pound propane tank with gauge, a 15-gallon water tank w/monitor panel, 4 corners Jack brackets, Roof Struts, Pre-wired for Solar Panel, Marine/RV Deep-Cycle battery, a screen door with a deadbolt, and a front picture window.' },
  { name:'15-gallon water tank with monitor panel', verb:'A 20-pound propane tank with gauge, a 15-gallon water tank w/monitor panel, 4 corners Jack brackets, Roof Struts, Pre-wired for Solar Panel, Marine/RV Deep-Cycle battery, a screen door with a deadbolt, and a front picture window.' },
  { name:'4 corner jack brackets', verb:'A 20-pound propane tank with gauge, a 15-gallon water tank w/monitor panel, 4 corners Jack brackets, Roof Struts, Pre-wired for Solar Panel, Marine/RV Deep-Cycle battery, a screen door with a deadbolt, and a front picture window.' },
  { name:'Roof Struts', verb:'A 20-pound propane tank with gauge, a 15-gallon water tank w/monitor panel, 4 corners Jack brackets, Roof Struts, Pre-wired for Solar Panel, Marine/RV Deep-Cycle battery, a screen door with a deadbolt, and a front picture window.' },
  { name:'Pre-wired for Solar Panel', verb:'A 20-pound propane tank with gauge, a 15-gallon water tank w/monitor panel, 4 corners Jack brackets, Roof Struts, Pre-wired for Solar Panel, Marine/RV Deep-Cycle battery, a screen door with a deadbolt, and a front picture window.' },
  { name:'Portable table', verb:'Standard features include a stainless steel sink with 12-volt pump, 2-burner stove, portable table, a lower couch that makes into a bed, and plenty of storage room in cabinets, and under couches.' },
  { name:'Lower couch that makes into a bed', verb:'Standard features include a stainless steel sink with 12-volt pump, 2-burner stove, portable table, a lower couch that makes into a bed, and plenty of storage room in cabinets, and under couches.' },
  { name:'Storage in cabinets and under couches', verb:'Standard features include a stainless steel sink with 12-volt pump, 2-burner stove, portable table, a lower couch that makes into a bed, and plenty of storage room in cabinets, and under couches.' },

  // ---- Items ATC lists as bullet labels only (no written description) ----
  // Rendered without a verbatim blockquote — we do not invent ATC descriptions.
  { name:'Monitor panel', listed:true },
  { name:'Inside and Porch LED lights', listed:true },
  { name:'LED Marker lights', listed:true },
  { name:'Large passenger side window', listed:true },
  { name:'Curtains', listed:true },
  { name:'5-gallon propane tank', listed:true },
  { name:'Drawer in cabinet', listed:true },
  { name:'Roof vent', listed:true },
  { name:'CO and LP monitor Alarm', listed:true },
];

function renderFeatures(){
  const el = document.getElementById('featList');
  if(!el) return;
  el.innerHTML = FEATURES.map((f,i)=>`
    <li onclick="showFeature(${i})" style="cursor:pointer" title="Click for details">
      <svg viewBox="0 0 24 24"><polyline points="4 12 10 18 20 6"/></svg>
      <span style="flex:1">${f.name}</span>
      <svg viewBox="0 0 24 24" style="width:12px;height:12px;stroke:var(--mute);opacity:.6;flex-shrink:0"><circle cx="12" cy="12" r="10" fill="none"/><line x1="12" y1="16" x2="12" y2="12"/><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none"/></svg>
    </li>
  `).join('');
}

function showFeature(i){
  const f = FEATURES[i];
  if(!f) return;
  const photoUrl = f.photo ? (f.local ? '/images/'+f.photo : IMG_BASE+f.photo+'/:/rs=w:900,m/qt=q:90') : null;
  document.getElementById('imEyebrow').textContent = 'Standard Equipment';
  document.getElementById('imTitle').textContent = f.name;

  // Two render modes:
  //   - verbatim:  a real ATC-published description exists — show as blockquote with source.
  //   - list-only: ATC lists the item as a bullet with no written description — say so honestly,
  //                do not invent a quote.
  const body = f.verb
    ? `<blockquote class="verb">${f.verb}</blockquote>
       <p class="verb-src">Source: allterraincampers.com &mdash; Standard Features page, verbatim.</p>`
    : `<p class="verb-src" style="font-style:normal">Listed on the All Terrain Campers Standard Features page as a standard-equipment bullet. ATC does not publish a separate written description for this item.</p>`;

  document.getElementById('imBody').innerHTML = `
    ${photoUrl ? `<img src="${photoUrl}" alt="${f.name}" style="width:100%;border-radius:10px;margin-bottom:18px;cursor:zoom-in" onclick="document.getElementById('lbImg').src='${photoUrl}';document.getElementById('lightbox').classList.add('open')">` : ''}
    ${body}
    <div class="tm-cta">
      <a href="#config" class="btn btn-primary" onclick="closeInfoModal()">Build a Camper</a>
      <a href="#contact" class="btn btn-ghost" onclick="closeInfoModal()">Ask a Question</a>
    </div>
  `;
  document.getElementById('infoModal').classList.add('open');
  document.body.style.overflow='hidden';
}

/* ================ MODEL DETAIL MODAL ================ */
const MODELS = {
  cougar: {
    tag:"Full Size · Long Bed 8'", name:'Cougar', price:'$21,350',
    floorPlan:'20250815_083327.jpg',
    floorPlanCaption:'Cougar / Puma / Lynx floor plan',
    photos:['1000005253.jpg','1000005253-620cb7f.jpg','20250815_083337.jpg','20250815_083423.jpg','blob.png','20251013_103530.jpg'],
    verbatim:[
      '"Cougar/Puma Floor Plan----Long Bed Trucks"',
      '"The Cougar and Puma models have 96\\" floors and 144\\" roofs. The Cougar is 84\\" wide and the Puma, 78\\" or 72\\"."',
      '"The Cougar\'s couch is 14\\" (28\\" extended) x 79\\". (Optional 19\\", 38\\" extended.)"',
      '"The Cougar\'s upper bed is 48\\" x 82\\". (64 x 82 with optional bed slide)"',
      '"Our campers can weigh 895 pounds - 1200 pounds depending on how you have it built." — ATC pricing page',
      '"The roof is designed to hold 1000 pounds of snow weight in the up position. In the down position, you can put just about anything you want on it." — ATC FAQ',
    ],
    specs:[
      ['Floor Length','96"'],['Roof Length','144"'],['Width','84"'],['Couch','14" (28" extended) × 79"'],['Couch option','19" (38" extended) × 79"'],
      ['Upper Bed','48" × 82"'],['Upper Bed w/ slide','64" × 82"'],
      ['Weight (fully built)','895 – 1,200 lbs'],['Shell Weight','560 – 1,200 lbs'],
      ['Roof Load (up position)','1,000 lbs snow weight'],['Roof Load (down position)','Much higher — unload before raising'],
      ['Fits',"Ford, Chevrolet, RAM, Toyota Tundra (8' bed)"],
      ['Propane Tank','5 gallon'],['Water Tank','15 gallon'],
      ['Price','$21,350'],['Shell Price','$13,300'],
    ],
  },
  puma: {
    tag:"Full Size · Long Bed 8'", name:'Puma', price:'$21,350',
    floorPlan:'20250815_083327.jpg',
    floorPlanCaption:'Cougar / Puma / Lynx floor plan',
    photos:['PU001.jpg','PU002.jpg','20250815_083337.jpg','20251013_104325.jpg','20251013_104420.jpg'],
    verbatim:[
      '"Cougar/Puma Floor Plan----Long Bed Trucks"',
      '"The Cougar and Puma models have 96\\" floors and 144\\" roofs. The Cougar is 84\\" wide and the Puma, 78\\" or 72\\"."',
      '"The Puma\'s couch is 14\\" x 79\\"."',
      '"The Puma\'s upper bed is 48\\" x 76\\". (64\\" X 76\\" with optional bed slide)"',
      '"Our campers can weigh 895 pounds - 1200 pounds depending on how you have it built." — ATC pricing page',
      '"The roof is designed to hold 1000 pounds of snow weight in the up position." — ATC FAQ',
    ],
    specs:[
      ['Floor Length','96"'],['Roof Length','144"'],['Width','78" or 72"'],['Couch','14" × 79"'],
      ['Upper Bed','48" × 76"'],['Upper Bed w/ slide','64" × 76"'],
      ['Weight (fully built)','895 – 1,200 lbs'],['Shell Weight','560 – 1,200 lbs'],
      ['Roof Load (up position)','1,000 lbs snow weight'],
      ['Fits',"Ford, Chevrolet, RAM, Toyota Tundra (8' bed)"],
      ['Propane Tank','5 gallon'],['Water Tank','15 gallon'],
      ['Price','$21,350'],['Shell Price','$13,300'],
    ],
  },
  panther: {
    tag:"Full Size · Short Bed 6.5'", name:'Panther', price:'$20,995',
    photos:['PU002.jpg','20251013_103241.jpg','20251013_103925.jpg','20250815_083118.jpg','20250815_083255.jpg'],
    verbatim:[
      '"Panther/Ocelot Floor Plan / Short Bed Full-size Truck"',
      '"The Panther and Ocelot floor beds are 80\\", the roof length is 128\\", and the camper width is 84\\" for the Panther and 72\\" or 78\\" for the Ocelot."',
      '"This camper is made to fit on a full-size 6\' bed truck, such as a Ford, Chevrolet, Dodge, Toyota Tundra."',
      '"Overhead bed size is 48\\" x 82\\" on Panther models."',
      '"The bottom bed can sleep one person comfortably or two (if friendly). Open Couch bed size is 74\\" x 28\\"."',
      '"Our campers can weigh 895 pounds - 1200 pounds depending on how you have it built." — ATC pricing page',
      '"The roof is designed to hold 1000 pounds of snow weight in the up position." — ATC FAQ',
    ],
    specs:[
      ['Floor Length','80"'],['Roof Length','128"'],['Width','84"'],
      ['Overhead Bed','48" × 82"'],['Couch Bed (open)','74" × 28"'],
      ['Weight (fully built)','895 – 1,200 lbs'],['Shell Weight','560 – 1,200 lbs'],
      ['Roof Load (up position)','1,000 lbs snow weight'],
      ['Fits',"Ford, Chevrolet, Dodge, Toyota Tundra (6' bed)"],
      ['Propane Tank','5 gallon'],['Water Tank','15 gallon'],
      ['Price','$20,995'],['Shell Price','$13,300'],
    ],
  },
  ocelot: {
    tag:"Full Size · Short Bed 6.5'", name:'Ocelot', price:'$20,995',
    photos:['PU003.jpg','/images/landscape_02.jpg','/images/popup_03.jpg','/images/popup_02.jpg','/images/popup_01.jpg','/images/landscape_01.jpg','/images/landscape_03.jpg'],
    verbatim:[
      '"Panther/Ocelot Floor Plan / Short Bed Full-size Truck"',
      '"The Panther and Ocelot floor beds are 80\\", the roof length is 128\\", and the camper width is 84\\" for the Panther and 72\\" or 78\\" for the Ocelot."',
      '"This camper is made to fit on a full-size 6\' bed truck, such as a Ford, Chevrolet, Dodge, Toyota Tundra."',
      '"Overhead bed size is 48\\" x 76\\" on the Ocelot."',
      '"The bottom bed can sleep one person comfortably or two (if friendly). Open Couch bed size is 74\\" x 28\\"."',
      '"Our campers can weigh 895 pounds - 1200 pounds depending on how you have it built." — ATC pricing page',
      '"The roof is designed to hold 1000 pounds of snow weight in the up position." — ATC FAQ',
    ],
    specs:[
      ['Floor Length','80"'],['Roof Length','128"'],['Width','72" or 78"'],
      ['Overhead Bed','48" × 76"'],['Couch Bed (open)','74" × 28"'],
      ['Weight (fully built)','895 – 1,200 lbs'],['Shell Weight','560 – 1,200 lbs'],
      ['Roof Load (up position)','1,000 lbs snow weight'],
      ['Fits',"Ford, Chevrolet, Dodge, Toyota Tundra, Nissan Titan (6' bed)"],
      ['Propane Tank','5 gallon'],['Water Tank','15 gallon'],
      ['Price','$20,995'],['Shell Price','$13,300'],
    ],
  },
  bobcat: {
    tag:"Mid / Mini Size · Short Bed 6.5'", name:'Bobcat', price:'$21,570',
    floorPlan:'20251013_103217.jpg',
    floorPlanCaption:'Bobcat floor plan',
    photos:['BradUpgrades3.jpg','20251013_103925.jpg','20251013_104420.jpg','1000005253-620cb7f.jpg','20251111_154949.jpg'],
    verbatim:[
      '"Bobcat Floor Plan - Mid/Small Trucks - 6\' Bed"',
      '"Bobcat bed size 78\\"X69\\""',
      '"The couch converts to a bed that is 28\\" X75\\""',
      '"The Bobcat camper will fit all small-size trucks with a 6\' bed, such as Toyota Tacoma, Ford Ranger, Dodge Dakota, Chevrolet S-10, and Nissan small trucks." — ATC FAQ',
      '"Our campers can weigh 895 pounds - 1200 pounds depending on how you have it built." — ATC pricing page',
      '"The roof is designed to hold 1000 pounds of snow weight in the up position." — ATC FAQ',
      '"Bobcat Cabinet" and "Under cabinet storage" (labels repeated across 5 storage locations on ATC our-campers page)',
    ],
    specs:[
      ['Main Bed','78" × 69"'],['Convert Couch Bed','28" × 75"'],
      ['Weight (fully built)','895 – 1,200 lbs'],['Shell Weight','560 – 1,200 lbs'],
      ['Roof Load (up position)','1,000 lbs snow weight'],
      ['Fits','Toyota Tacoma, Ford Ranger, Dodge Dakota, Chevrolet S-10, Nissan small trucks'],
      ['Propane Tank','5 gallon'],['Water Tank','15 gallon'],
      ['Build','Welded aluminium frame'],
      ['Price','$21,570'],['Shell Price','$13,875'],
    ],
  },
  lynx: {
    tag:"Mid / Mini Size · Long Bed 8'", name:'Lynx', price:'$21,925',
    floorPlan:'20250815_083327.jpg',
    floorPlanCaption:'Cougar / Puma / Lynx floor plan (the Lynx shares the long-bed plan)',
    photos:['20251013_103241.jpg','20251013_104325.jpg','20251013_104420.jpg','20251111_154949.jpg','20251013_103925.jpg'],
    verbatim:[
      '"Options for Cougar/Puma/Lynx Models" — ATC pricing page',
      '"Our campers can weigh 895 pounds - 1200 pounds depending on how you have it built." — ATC pricing page',
    ],
    specs:[
      ['Fits',"Mid-size trucks with 8' bed"],
      ['Build','Welded aluminium frame'],
      ['Config','Long bed sibling of the Bobcat · shares Cougar/Puma long-bed floor plan'],
      ['Weight (fully built)','895 – 1,200 lbs'],['Shell Weight','560 – 1,200 lbs'],
      ['Roof Load (up position)','1,000 lbs snow weight'],
      ['Propane Tank','5 gallon'],['Water Tank','15 gallon'],
      ['Price','$21,925'],['Shell Price','$13,875'],
    ],
    note:'The Lynx is the mid-size long-bed version of the Bobcat — same welded aluminium build, more floor length.',
  },
  shell: {
    tag:'Build it out yourself · Empty shell', name:'Shell Model', price:'From $13,300',
    photos:['FURGUSON_FLATBED_012.jpg','20251013_104420.jpg','1000000712.jpg','1000000713.jpg','1000000714.jpg'],
    verbatim:[
      '"Shell Model Floor Plan (Ocelot Shown)"',
      '"Yes, we do. Every model camper that we make also has an empty shell version. Our price list also shows some options you may add to a shell model of a camper. If you don\'t see what you need, give us a call!" — ATC FAQ',
      // Shell standard equipment — listed on ATC our-campers page as individual bullet items.
      // Each item below is the verbatim bullet text from allterraincampers.com/our-campers.
      '"Large passenger side window" · "Finished floor" · "Interior walls" · "Front picture window" · "One overhead storage area (not shown in photo)" · "Two inside LED lights" · "Roof vent" · "Roof Struts" · "4 Corner Jack Brackets" · "Pre-Wired for Solar Panel" · "Fire extinguisher" · "LED porch light" · "Screen door"',
      '"Our shells weight 560 pounds - 1200 pounds depending on how you have it built." — ATC pricing page (typo preserved verbatim)',
    ],
    specs:[
      ['Standard Shell · Cougar/Panther/Puma/Ocelot','$13,300'],
      ['Standard Shell · Bobcat/Lynx','$13,875'],
      ['Custom Flatbed Shell','$18,250'],
      ['Shell Weight','560 – 1,200 lbs depending on build'],
      ['Full Camper Weight (if finished out)','895 – 1,200 lbs'],
      ['Roof Load (up position)','1,000 lbs snow weight'],
      ['What\'s Included (standard)','Large passenger window · Finished floor · Interior walls · Front picture window · 1 overhead storage · 2 interior LEDs · Roof vent · Roof struts · 4 corner jack brackets · Pre-wired solar · Fire extinguisher · LED porch light · Screen door'],
      ['Interior Shell Options Available','Automatic Forced Air Furnace ($1,595) · Furnace w/ Stove Top ($1,895) · Couch ($975) · L-Shaped Couch ($1,300) · Large driver-side window ($725) · Table ($225) · 12V outlet w/USB ($100) · Extended Bed Slide Out 28" ($575) · Auxiliary Battery System ($625) · Small driver windows 18"×13" ($425)'],
    ],
    note:'Every ATC model is available as an empty shell. Add your own couch, furnace, fridge, and layout — or add our standard options later. Perfect for custom build-outs.',
  },
};

function showModelDetail(id){
  const m = MODELS[id];
  if(!m) return;
  const firstPhoto = m.photos[0];
  const mainPhotoUrl = firstPhoto.startsWith('/') ? firstPhoto : (IMG_BASE + firstPhoto + '/:/rs=w:1400,m/qt=q:92');
  const body = document.getElementById('modelModalBody');
  body.innerHTML = `
    <div class="md-hero" id="mdHero" style="background-image:url('${mainPhotoUrl}')"></div>
    <div class="md-gallery">
      ${m.photos.map((p,i)=>{
        const thumb = p.startsWith('/') ? p : (IMG_BASE + p + '/:/rs=w:400,m/qt=q:85');
        const full = p.startsWith('/') ? p : (IMG_BASE + p + '/:/rs=w:1400,m/qt=q:92');
        return `<button class="md-thumb${i===0?' active':''}" style="background-image:url('${thumb}')" onclick="mdSwap('${full}',this)" aria-label="Photo ${i+1}"></button>`;
      }).join('')}
    </div>
    <div class="md-body">
      <div class="md-top">
        <div>
          <div class="md-tag">${m.tag}</div>
          <h2 class="md-name">${m.name}</h2>
        </div>
        <div class="md-price">${m.price}</div>
      </div>
      ${m.note?`<p class="md-note">${m.note}</p>`:''}
      <h4>From All Terrain Campers — verbatim:</h4>
      ${m.verbatim.map(v=>`<blockquote class="verb">${v}</blockquote>`).join('')}

      ${m.floorPlan ? `
      <h4>Floor Plan</h4>
      <div class="md-floorplan" onclick="document.getElementById('lbImg').src='${IMG_BASE}${m.floorPlan}/:/rs=w:1600,m/qt=q:92';document.getElementById('lightbox').classList.add('open')" style="cursor:zoom-in">
        <img src="${IMG_BASE}${m.floorPlan}/:/rs=w:900,m/qt=q:90" alt="${m.floorPlanCaption||'Floor plan'}" loading="lazy">
        <div class="md-fp-cap">${m.floorPlanCaption||'Floor plan'} — click to zoom</div>
      </div>
      ` : ''}

      <h4>Detailed Specifications</h4>
      <table class="md-specs">${m.specs.map(s=>`<tr><td>${s[0]}</td><td>${s[1]}</td></tr>`).join('')}</table>
      <h4>Standard Equipment</h4>
      <p style="color:var(--ink-dim);font-size:14px;line-height:1.7">Sink · 12-volt water pump · 2-burner stove · Couch · Table · Monitor panel · 12V outlet with USB · Interior & porch LED lights · LED marker & brake lights · Large passenger window · Front picture window · Screen door with deadbolt · Curtains · Fire extinguisher · 5-gal propane · 15-gal water · Drawer in cabinet · Roof vent · Roof struts · 4 corner jack brackets · Pre-wired for solar · Marine/RV deep-cycle battery · CO and LP monitor alarm · Storage in cabinet and under couch.</p>
      <div class="tm-cta" style="margin-top:26px">
        <a href="#config" class="btn btn-primary" onclick="closeModelModal()">Build This Model →</a>
        <a href="#contact" class="btn btn-ghost" onclick="closeModelModal()">Request Quote</a>
      </div>
    </div>
  `;
  document.getElementById('modelModal').classList.add('open');
  document.body.style.overflow='hidden';
}
function mdSwap(url,btn){
  document.getElementById('mdHero').style.backgroundImage = `url('${url}')`;
  document.querySelectorAll('.md-thumb').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}
function closeModelModal(){
  document.getElementById('modelModal').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&document.getElementById('modelModal').classList.contains('open'))closeModelModal();
});

/* ================ HERO SLIDESHOW ================ */
let heroIdx = 0, heroTimer = null;
function heroGo(i){
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if(!slides.length) return;
  heroIdx = (i+slides.length)%slides.length;
  slides.forEach((s,j)=>s.classList.toggle('active', j===heroIdx));
  dots.forEach((d,j)=>d.classList.toggle('active', j===heroIdx));
  clearInterval(heroTimer);
  heroTimer = setInterval(()=>heroGo(heroIdx+1), 6500);
}
heroTimer = setInterval(()=>heroGo(heroIdx+1), 6500);

/* Hero touch-swipe for quick manual navigation */
(function(){
  const el = document.getElementById('heroSlides');
  if(!el) return;
  let startX=null, startY=null;
  el.addEventListener('touchstart', e=>{
    const t = e.touches[0]; startX = t.clientX; startY = t.clientY;
  }, {passive:true});
  el.addEventListener('touchend', e=>{
    if(startX===null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    if(Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)){
      heroGo(heroIdx + (dx < 0 ? 1 : -1));
    }
    startX = null;
  }, {passive:true});
})();

function heroLightbox(){
  // Hero slides map to GALLERY indices: landscape_02=0, popup_03=1, popup_02=2, popup_01=3, hero-w8=4
  const heroToGallery = {0:0, 1:1, 2:2, 3:3, 4:4};
  openLightbox(heroToGallery[heroIdx] ?? 0);
}

/* ================ SHOP MODAL (product detail + checkout + confirmation) ================ */
function openShopModal(){document.getElementById('shopModal').classList.add('open');document.body.style.overflow='hidden'}
function closeShopModal(){document.getElementById('shopModal').classList.remove('open');document.body.style.overflow=''}

function showProductDetail(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  const body = document.getElementById('shopModalBody');
  body.innerHTML = `
    <div class="pd-grid">
      <div class="pd-image" style="background:#fff">
        <div class="brand-tag">${p.brand||''}</div>
        ${p.img ? `<img src="${p.img}" alt="${p.name}" style="max-width:85%;max-height:85%;object-fit:contain" loading="lazy" onerror="this.style.display='none';this.parentElement.style.background='linear-gradient(135deg,${p.color},${shadeColor(p.color,-30)})';this.parentElement.innerHTML='<div class=brand-tag>${p.brand||''}</div><div class=glyph>${p.iconText||''}</div>'">` : `<div class="glyph">${p.iconText||'•'}</div>`}
      </div>
      <div class="pd-info">
        <div class="pd-cat">${p.cat}</div>
        <h2 class="pd-name">${p.name}</h2>
        <div class="pd-price-row">
          <div class="pd-price">$${p.price.toLocaleString()}</div>
          <div class="pd-price-note">Factory direct · No dealer markup</div>
        </div>
        <p class="pd-desc">${p.desc}</p>
        ${p.verbatim?`<blockquote class="verb">${p.verbatim}</blockquote>`:''}
        <div class="pd-specs">
          <h4>Technical Specifications</h4>
          <table>${p.specs.map(s=>`<tr><td>${s[0]}</td><td>${s[1]}</td></tr>`).join('')}</table>
        </div>
        <div class="pd-qty">
          <label>Quantity</label>
          <div class="pd-qty-box">
            <button onclick="pdQty(-1)" aria-label="Decrease">−</button>
            <span class="q" id="pdQtyVal">1</span>
            <button onclick="pdQty(1)" aria-label="Increase">+</button>
          </div>
        </div>
        <div class="pd-cta">
          <button class="btn btn-ghost" onclick="pdAddToCart('${p.id}','${p.name.replace(/'/g,"\\'")}',${p.price})">Add to Cart</button>
          <button class="btn btn-primary" onclick="pdBuyNow('${p.id}','${p.name.replace(/'/g,"\\'")}',${p.price})">Buy Now →</button>
        </div>
      </div>
    </div>
  `;
  openShopModal();
}
function pdQty(d){
  const el = document.getElementById('pdQtyVal');
  const v = Math.max(1, parseInt(el.textContent)+d);
  el.textContent = v;
}
function pdAddToCart(id,name,price){
  const qty = parseInt(document.getElementById('pdQtyVal').textContent);
  for(let i=0;i<qty;i++) addToCart(id,name,price);
  closeShopModal();
  toggleCart();
}
function pdBuyNow(id,name,price){
  pdAddToCart(id,name,price);
  setTimeout(()=>{closeCart();showCheckout();},200);
}

function showCheckout(){
  if(cart.length===0){alert('Your cart is empty. Add an item first.');return;}
  const body = document.getElementById('shopModalBody');
  const subtotal = cartTotal();
  const shipping = Math.round(subtotal*0.04);
  const tax = Math.round(subtotal*0.0875);
  const total = subtotal+shipping+tax;
  body.innerHTML = `
    <div class="co-wrap">
      <div class="co-head">
        <div class="co-title">Checkout</div>
        <div class="co-steps"><span class="step active">1. Details</span> · <span class="step">2. Review</span></div>
      </div>
      <form class="co-form" id="coForm" onsubmit="placeOrder(event)">
        <div class="co-body">
          <div>
            <h4>Shipping Address</h4>
            <div class="row2">
              <div class="f"><label>First Name *</label><input required name="first"></div>
              <div class="f"><label>Last Name *</label><input required name="last"></div>
            </div>
            <div class="f"><label>Email *</label><input required type="email" name="email"></div>
            <div class="f"><label>Phone *</label><input required type="tel" name="phone"></div>
            <div class="f"><label>Street Address *</label><input required name="addr"></div>
            <div class="row2">
              <div class="f"><label>City *</label><input required name="city"></div>
              <div class="f"><label>State *</label><input required name="state" maxlength="2" placeholder="CA"></div>
            </div>
            <div class="row2">
              <div class="f"><label>ZIP *</label><input required name="zip"></div>
              <div class="f"><label>Country</label><input name="country" value="United States"></div>
            </div>

            <h4>Payment Method</h4>
            <div class="co-pay">
              <label class="co-pay-opt selected" data-pay="card" onclick="selectPay('card')">
                <input type="radio" name="pay" value="card" checked>
                <div class="pay-label">
                  <span class="pay-name">Credit or Debit Card</span>
                  <span class="pay-sub">Visa, Mastercard, Amex, Discover</span>
                </div>
                <div class="pay-logo" style="color:var(--mute);font-size:11px">💳 CARD</div>
              </label>
              <div class="co-card-fields show" id="cardFields">
                <div class="f"><label>Card Number</label><input name="cc" placeholder="•••• •••• •••• ••••" inputmode="numeric" maxlength="19"></div>
                <div class="row2">
                  <div class="f"><label>Expiry (MM/YY)</label><input name="exp" placeholder="MM/YY" maxlength="5"></div>
                  <div class="f"><label>CVV</label><input name="cvv" placeholder="•••" maxlength="4"></div>
                </div>
                <div class="f"><label>Name on Card</label><input name="ccname"></div>
              </div>
              <label class="co-pay-opt" data-pay="paypal" onclick="selectPay('paypal')">
                <input type="radio" name="pay" value="paypal">
                <div class="pay-label">
                  <span class="pay-name">PayPal</span>
                  <span class="pay-sub">You'll be redirected to complete payment</span>
                </div>
                <div class="pay-logo"><span style="font-family:Georgia,serif;font-size:18px;color:#003087;font-weight:800">Pay</span><span style="font-family:Georgia,serif;font-size:18px;color:#009cde;font-weight:800">Pal</span></div>
              </label>
              <div class="co-paypal-note" id="paypalNote">You'll be redirected to PayPal to complete payment after placing the order.</div>
            </div>
          </div>
          <div class="co-summary">
            <h4>Order Summary</h4>
            ${cart.map(c=>`<div class="co-line"><span class="n">${c.name} × ${c.qty}</span><span class="p">$${(c.price*c.qty).toLocaleString()}</span></div>`).join('')}
            <div class="co-line" style="border-top:1px solid var(--rule);margin-top:8px;padding-top:12px"><span class="n">Subtotal</span><span class="p">$${subtotal.toLocaleString()}</span></div>
            <div class="co-line"><span class="n">Shipping (est.)</span><span class="p">$${shipping.toLocaleString()}</span></div>
            <div class="co-line"><span class="n">Tax (est.)</span><span class="p">$${tax.toLocaleString()}</span></div>
            <div class="co-tot"><span>Total</span><span class="pv">$${total.toLocaleString()}</span></div>
            <div class="co-submit">
              <button type="submit">Place Order →</button>
              <p class="note">🔒 Your payment info is never stored. Secure checkout.</p>
            </div>
            <button type="button" class="btn btn-ghost" style="width:100%;margin-top:10px;justify-content:center" onclick="closeShopModal();toggleCart()">← Back to Cart</button>
          </div>
        </div>
      </form>
    </div>
  `;
  openShopModal();
}
function selectPay(method){
  document.querySelectorAll('.co-pay-opt').forEach(el=>el.classList.toggle('selected',el.dataset.pay===method));
  document.getElementById('cardFields').classList.toggle('show',method==='card');
  document.getElementById('paypalNote').classList.toggle('show',method==='paypal');
  const input = document.querySelector(`input[name="pay"][value="${method}"]`);
  if(input) input.checked = true;
}
function placeOrder(e){
  e.preventDefault();
  const form = e.target;
  const first = form.first.value;
  const last = form.last.value;
  const email = form.email.value;
  const orderNum = 'ATC-' + Date.now().toString(36).toUpperCase().slice(-8);
  const subtotal = cartTotal();
  const total = subtotal + Math.round(subtotal*0.04) + Math.round(subtotal*0.0875);
  const body = document.getElementById('shopModalBody');
  body.innerHTML = `
    <div class="oc-wrap">
      <div class="oc-icon">✓</div>
      <h2 class="oc-title">Order received!</h2>
      <p class="oc-sub">Thanks ${first} — we got your order.</p>
      <div class="oc-order">
        <h4>Order Number</h4>
        <div class="oc-num">${orderNum}</div>
        <h4>Total</h4>
        <div style="font-family:Georgia,serif;font-size:22px;color:var(--cta)">$${total.toLocaleString()}</div>
      </div>
      <p class="oc-next">You'll receive a confirmation email at <strong>${email}</strong> within a few minutes. Our team will contact you to confirm install scheduling or shipping details. Most accessories ship within 5–10 business days; install-only items (jacks, awnings, racks) are scheduled at the Sacramento factory.</p>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <a href="tel:+18004461003" class="btn btn-primary">Call Us · 1-800-446-1003</a>
        <button class="btn btn-ghost" onclick="cart=[];saveCart();closeShopModal()">Continue Browsing</button>
      </div>
    </div>
  `;
  // clear cart state
  cart = [];
  saveCart();
}

/* ================ DELIVERED-PRICE CALCULATOR ================
   All numbers come from the DOM: model base price from the selected <option>,
   miles from the user input. Shipping uses ATC's own published $1.50/mile rate.
   Nothing is fetched; nothing is persisted. This is the most honest version
   of a price calculator we can ship without inventing any number. */
function computeDelivered(){
  const sel = document.getElementById('calcModel');
  const milesInput = document.getElementById('calcMiles');
  if(!sel || !milesInput) return;
  const base = parseInt(sel.value, 10) || 0;
  const miles = Math.max(0, parseInt(milesInput.value, 10) || 0);
  const ship = miles * 1.5;
  const total = base + ship;
  const fmt = new Intl.NumberFormat('en-US', {style:'currency', currency:'USD', maximumFractionDigits:0});
  document.getElementById('calcBase').textContent = fmt.format(base);
  document.getElementById('calcShip').textContent = fmt.format(ship);
  document.getElementById('calcTotal').textContent = fmt.format(total);
  document.getElementById('calcMilesOut').textContent = miles.toLocaleString();
}

/* ================ INIT ================ */
renderShop();
renderGallery();
renderTestimonials();
renderFeatures();
renderCart();
resetCarouselTimer();
computeDelivered();

/* show desktop call button on wider screens */
if(window.innerWidth>=1100){document.getElementById('callDesktopBtn').style.display='inline-flex'}

/* hero-card bg images via style attr workaround */
document.querySelectorAll('.feat-card').forEach(c=>{
  const m = (c.getAttribute('style')||'').match(/--bg-img:\s*(url\([^)]+\))/);
  if(m){
    const bg = m[1];
    const before = c.querySelector('.card-body');
    // set background directly on a child pseudo via inline style using data attribute trick
    c.style.setProperty('background-image', bg);
    c.style.backgroundSize = 'cover';
    c.style.backgroundPosition = 'center';
  }
});
