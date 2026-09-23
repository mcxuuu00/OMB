// Generates the four WordPress Custom HTML pages from shared parts.
const fs = require('fs');
const path = require('path');
const OUT = process.argv[2] || path.join(__dirname, '..', 'wordpress');
fs.mkdirSync(OUT, { recursive: true });

const PHONE = '+31 647096911';
const TEL = 'tel:+31647096911';
const WA = 'https://wa.me/31647096911';
const MAIL = 'info@cxclusives.nl';
const URL = { home: '/', aanbod: '/aanbod/', lease: '/lease/', contact: '/contact/' };

const css = `
.cxc{--cxc-red:#e2231a;--cxc-ink:#141414;--cxc-ink2:#1e1e1e;--cxc-g4:#4a4a4a;--cxc-g6:#6e6e6e;--cxc-ga:#a6a6a6;--cxc-gd:#d9d9d9;--cxc-ge:#ececec;--cxc-gf:#f6f6f6;
  --cxc-anton:'Anton',Impact,'Arial Narrow',sans-serif;--cxc-audio:'Audiowide','Anton',sans-serif;--cxc-inter:'Inter',Arial,sans-serif;--cxc-crimson:'Crimson Text',Georgia,serif;--cxc-serif:'Source Serif 4','Source Serif Pro',Georgia,serif;
  font-family:var(--cxc-anton);font-weight:400;color:var(--cxc-ink2);background:#fff;line-height:1.5;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.cxc *,.cxc *::before,.cxc *::after{box-sizing:border-box}
.cxc h1,.cxc h2,.cxc h3,.cxc h4,.cxc p,.cxc ul,.cxc li,.cxc figure,.cxc form{margin:0;padding:0;font:inherit;color:inherit;letter-spacing:inherit;text-transform:inherit;border:0;background:none}
.cxc ul{list-style:none}
.cxc a{color:inherit;text-decoration:none;box-shadow:none;border:0}
.cxc a:hover,.cxc a:focus{color:inherit;text-decoration:none}
.cxc img{max-width:100%;height:auto;display:block}
.cxc .cxc-red{color:var(--cxc-red)}
.cxc .cxc-wrap{width:100%;max-width:1174px;margin:0 auto;padding:0 24px}
.cxc .cxc-wrap--wide{max-width:1204px}
/* topbar */
.cxc .cxc-topbar{background:var(--cxc-ink);color:var(--cxc-gd);font-size:12.5px;line-height:21.2px}
.cxc .cxc-topbar .cxc-wrap{display:flex;justify-content:space-between;align-items:center;min-height:41px;gap:16px}
/* header */
.cxc .cxc-header{background:#fff;border-bottom:1px solid var(--cxc-ge);position:relative;z-index:20}
.cxc .cxc-header .cxc-wrap{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;min-height:86px}
.cxc .cxc-logo{display:inline-flex;flex-direction:column;line-height:1}
.cxc .cxc-logo__name{font-size:27px;line-height:37px;text-transform:uppercase;color:var(--cxc-ink2)}
.cxc .cxc-logo__name b{font-weight:400;color:var(--cxc-red)}
.cxc .cxc-logo__tag{font-family:var(--cxc-crimson);font-weight:600;font-size:12.5px;line-height:21.2px;letter-spacing:3.24px;text-transform:uppercase;color:var(--cxc-ink2);margin-top:-7px}
.cxc .cxc-nav{display:flex;gap:32px}
.cxc .cxc-nav a{font-size:12.5px;line-height:21.2px;letter-spacing:1.25px;text-transform:uppercase;color:var(--cxc-ink2);padding-bottom:4px;border-bottom:2px solid transparent;transition:color .2s}
.cxc .cxc-nav a:hover{color:var(--cxc-red)}
.cxc .cxc-nav a.is-active{color:var(--cxc-red);border-bottom-color:var(--cxc-red)}
.cxc .cxc-header__phone{justify-self:end;font-size:12.5px;line-height:21.2px;letter-spacing:1px;text-transform:uppercase;color:var(--cxc-ink2)}
.cxc .cxc-header__phone:hover{color:var(--cxc-red)}
.cxc .cxc-menu-toggle,.cxc .cxc-burger{display:none}
/* buttons */
.cxc .cxc-btn{display:inline-flex;align-items:center;justify-content:center;min-height:54px;padding:15px 32px;border:1px solid var(--cxc-red);border-radius:2px;background:var(--cxc-red);color:#fff;font-family:var(--cxc-anton);font-size:13.1px;line-height:22.3px;letter-spacing:1.57px;text-transform:uppercase;text-align:center;cursor:pointer;transition:background .2s,color .2s,border-color .2s}
.cxc .cxc-btn:hover,.cxc .cxc-btn:focus{background:#c51d15;border-color:#c51d15;color:#fff}
.cxc .cxc-btn--ghost{background:transparent;border-color:rgba(255,255,255,.5);color:#fff}
.cxc .cxc-btn--ghost:hover,.cxc .cxc-btn--ghost:focus{background:#fff;border-color:#fff;color:var(--cxc-ink)}
.cxc .cxc-btn--line{background:transparent;border-color:var(--cxc-gd);color:var(--cxc-ink)}
.cxc .cxc-btn--line:hover,.cxc .cxc-btn--line:focus{background:transparent;border-color:var(--cxc-ink);color:var(--cxc-ink)}
.cxc .cxc-btn--dark{background:var(--cxc-ink);border-color:var(--cxc-ink);color:#fff}
.cxc .cxc-btn--dark:hover,.cxc .cxc-btn--dark:focus{background:var(--cxc-red);border-color:var(--cxc-red);color:#fff}
/* type */
.cxc .cxc-eyebrow{font-family:var(--cxc-audio);font-size:12.5px;line-height:21.2px;letter-spacing:3.24px;text-transform:uppercase;color:var(--cxc-red)}
.cxc .cxc-eyebrow--anton{font-family:var(--cxc-anton)}
.cxc .cxc-eyebrow--serif{font-family:var(--cxc-serif);font-weight:900}
.cxc .cxc-h2{font-size:24px;line-height:36px;letter-spacing:.24px;text-transform:uppercase;color:var(--cxc-ink)}
.cxc .cxc-lead{font-size:16px;line-height:27.2px;color:var(--cxc-g6)}
.cxc .cxc-center{text-align:center}
/* hero (home) */
.cxc .cxc-hero{position:relative;background:var(--cxc-ink);color:#fff;overflow:hidden}
.cxc .cxc-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 50% 50% at 50% 50%,rgba(238,227,227,.16) 0%,rgba(115,112,112,0) 60%,rgba(73,62,62,.02) 100%)}
.cxc .cxc-hero .cxc-wrap{position:relative;max-width:1550px;display:flex;align-items:center;justify-content:space-between;gap:48px;min-height:760px;padding-top:116px;padding-bottom:116px}
.cxc .cxc-hero__text{max-width:577px}
.cxc .cxc-hero h1{font-size:73.6px;line-height:79.5px;letter-spacing:.74px;text-transform:uppercase;color:#fff}
.cxc .cxc-hero__intro{font-family:var(--cxc-inter);font-size:16.3px;line-height:27.7px;color:var(--cxc-gd);max-width:422px;margin-top:8px}
.cxc .cxc-hero__btns{display:flex;flex-wrap:wrap;gap:16px 55px;margin-top:30px}
.cxc .cxc-hero__usp{font-family:var(--cxc-crimson);font-weight:700;font-size:11.8px;line-height:20.1px;letter-spacing:1.18px;text-transform:uppercase;color:#fff;margin-top:12px}
.cxc .cxc-photo{display:flex;align-items:center;justify-content:center;background:var(--cxc-gf);border:1px solid var(--cxc-gd);border-radius:4px;overflow:hidden;color:var(--cxc-ga);font-size:12.5px;line-height:21.2px;letter-spacing:1.25px;text-transform:uppercase;text-align:center;padding:24px}
.cxc .cxc-photo img{width:100%;height:100%;object-fit:cover}
.cxc .cxc-photo:has(img){padding:0}
.cxc .cxc-hero .cxc-photo{flex:0 0 656px;height:492px}
/* page hero (subpages) */
.cxc .cxc-phero{position:relative;background:var(--cxc-ink);color:#fff;text-align:center;overflow:hidden;padding:92px 24px 72px}
.cxc .cxc-phero .cxc-glow{left:50%;right:auto;width:1231px;margin-left:-615px;background:radial-gradient(ellipse 50% 50% at 50% 50%,rgba(255,241,241,.16) 0%,rgba(255,255,255,0) 60%,rgba(255,255,255,.02) 100%)}
.cxc .cxc-phero > *{position:relative}
.cxc .cxc-phero h1{font-size:51.2px;line-height:55.3px;letter-spacing:.51px;text-transform:uppercase;margin-top:14px}
.cxc .cxc-phero p.cxc-phero__intro{font-size:16px;line-height:27.2px;color:var(--cxc-gd);margin:25px auto 0;max-width:560px}
/* brands */
.cxc .cxc-brands{border-bottom:1px solid var(--cxc-ge)}
.cxc .cxc-brands ul{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 62px;padding:30px 24px 31px}
.cxc .cxc-brands li{font-family:var(--cxc-audio);font-size:15.2px;line-height:25.8px;letter-spacing:.61px;text-transform:uppercase;color:var(--cxc-g4)}
/* stock */
.cxc .cxc-stock .cxc-h2{margin-top:8px}
.cxc .cxc-stock .cxc-lead{margin-top:13px}
.cxc .cxc-stock .cxc-lead b{font-weight:400;color:var(--cxc-ink2)}
.cxc .cxc-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:50px}
.cxc .cxc-card{background:#fff;border:1px solid var(--cxc-ge);border-radius:4px;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .2s,transform .2s}
.cxc .cxc-card:hover{box-shadow:0 12px 32px rgba(20,20,20,.08);transform:translateY(-2px)}
.cxc .cxc-card__media{position:relative;height:224px;background:var(--cxc-gf);border-bottom:1px solid var(--cxc-ge);display:flex;align-items:center;justify-content:center;overflow:hidden}
.cxc .cxc-card__media img{width:100%;height:100%;object-fit:cover}
.cxc .cxc-card__media svg{width:165px;height:82px;opacity:.28}
.cxc .cxc-badge{position:absolute;top:12px;left:12px;z-index:1;background:var(--cxc-red);color:#fff;border-radius:2px;padding:5px 10px;font-size:10.6px;line-height:16px;letter-spacing:.63px;text-transform:uppercase}
.cxc .cxc-card__body{padding:19px 23px 25px;display:flex;flex-direction:column;flex:1}
.cxc .cxc-card__brand{font-size:10.9px;line-height:17px;letter-spacing:1.09px;text-transform:uppercase;color:var(--cxc-g6)}
.cxc .cxc-card__title{font-size:18.4px;line-height:28px;letter-spacing:.18px;text-transform:uppercase;color:var(--cxc-ink)}
.cxc .cxc-card__specs{font-size:13.4px;line-height:22.85px;color:var(--cxc-g6);margin-top:12px}
.cxc .cxc-card__price{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;border-top:1px solid var(--cxc-ge);margin-top:auto;padding-top:15px}
.cxc .cxc-card__specs + .cxc-card__price{margin-top:17px}
.cxc .cxc-card__price strong{font-weight:400;font-size:19.2px;line-height:32.6px;color:var(--cxc-ink2)}
.cxc .cxc-card__price span{font-size:11.8px;line-height:20.1px;color:var(--cxc-g6);padding-bottom:4px}
.cxc .cxc-card__btn{display:flex;align-items:center;justify-content:center;min-height:44px;margin-top:16px;border:1px solid var(--cxc-ink);font-size:11.8px;line-height:20.1px;letter-spacing:1.18px;text-transform:uppercase;color:var(--cxc-ink2);transition:background .2s,color .2s}
.cxc .cxc-card__btn:hover,.cxc .cxc-card__btn:focus{background:var(--cxc-ink);color:#fff}
.cxc .cxc-more{text-align:center;margin-top:40px}
/* dash list */
.cxc .cxc-dash li{display:flex;gap:17px;font-size:15.2px;line-height:25.8px;color:var(--cxc-ink2)}
.cxc .cxc-dash li + li{margin-top:12px}
.cxc .cxc-dash li::before{content:"\\2014";color:var(--cxc-red);flex:0 0 auto}
/* why */
.cxc .cxc-why{background:var(--cxc-gf);padding:119px 0 120px}
.cxc .cxc-why .cxc-wrap{max-width:1313px;display:flex;align-items:center;justify-content:space-between;gap:48px}
.cxc .cxc-why__text{max-width:533px}
.cxc .cxc-why__kicker{font-size:24px;line-height:39px;letter-spacing:3.24px;text-transform:uppercase;color:var(--cxc-ink2)}
.cxc .cxc-why__kicker b{font-weight:400;font-size:32px}
.cxc .cxc-why__kicker b.cxc-red{color:var(--cxc-red)}
.cxc .cxc-why .cxc-dash{margin-top:25px}
.cxc .cxc-why__body{font-family:var(--cxc-inter);font-size:16px;line-height:27.2px;color:var(--cxc-g4);margin-top:37px}
.cxc .cxc-why__claim{font-size:16px;line-height:27.2px;color:var(--cxc-ink);margin-top:42px}
.cxc .cxc-why .cxc-btn{margin-top:18px}
.cxc .cxc-why .cxc-photo{flex:0 0 532px;height:399px;border-color:var(--cxc-ink2)}
/* CTA */
.cxc .cxc-cta{background:var(--cxc-ink);color:#fff;text-align:center;padding:84px 24px 85px}
.cxc .cxc-cta .cxc-h2{color:#fff;margin-top:8px}
.cxc .cxc-cta p.cxc-cta__text{font-family:var(--cxc-inter);font-size:16px;line-height:27.2px;color:var(--cxc-gd);max-width:600px;margin:8px auto 0}
.cxc .cxc-cta p.cxc-cta__text--anton{font-family:var(--cxc-anton)}
.cxc .cxc-cta .cxc-btn{margin-top:30px}
/* reviews */
.cxc .cxc-reviews{text-align:center;padding:66px 24px 81px}
.cxc .cxc-reviews__stars{font-size:20.8px;line-height:35.4px;letter-spacing:2.5px;color:var(--cxc-red)}
.cxc .cxc-reviews__score{font-size:15.2px;line-height:25.8px;color:var(--cxc-g4);margin-top:16px}
.cxc .cxc-reviews__score a{color:var(--cxc-red);border-bottom:1px solid var(--cxc-red)}
.cxc .cxc-reviews__score a:hover{color:var(--cxc-ink);border-bottom-color:var(--cxc-ink)}
/* stock note (aanbod) */
.cxc .cxc-note{background:var(--cxc-gf);border-left:3px solid var(--cxc-red);padding:19px 24px 20px;font-size:14.7px;line-height:25px;color:var(--cxc-g4)}
.cxc .cxc-note b{font-weight:400;color:var(--cxc-ink)}
.cxc .cxc-note a{color:var(--cxc-red)}
.cxc .cxc-note a:hover{text-decoration:underline}
.cxc .cxc-note + .cxc-cards{margin-top:40px}
/* lease plans */
.cxc .cxc-plans{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}
.cxc .cxc-plan{border:1px solid var(--cxc-ink);border-radius:4px;padding:43px 37px 41px;background:#fff}
.cxc .cxc-plan--dark{background:var(--cxc-ink);color:#fff}
.cxc .cxc-plan__tag{display:inline-block;background:#fdeceb;color:var(--cxc-red);border-radius:2px;padding:5px 12px;font-size:10.9px;line-height:18.5px;letter-spacing:1.09px;text-transform:uppercase}
.cxc .cxc-plan--dark .cxc-plan__tag{background:rgba(226,35,26,.18)}
.cxc .cxc-plan .cxc-h2{margin-top:12px}
.cxc .cxc-plan--dark .cxc-h2{color:#fff}
.cxc .cxc-plan__desc{font-size:14.7px;line-height:25px;color:var(--cxc-g6);margin-top:11px}
.cxc .cxc-plan--dark .cxc-plan__desc{color:var(--cxc-gd)}
.cxc .cxc-plan .cxc-dash{margin-top:20px}
.cxc .cxc-plan .cxc-dash li{font-size:14.9px;line-height:25.3px;gap:13px}
.cxc .cxc-plan--dark .cxc-dash li{color:#fff}
.cxc .cxc-plan .cxc-btn{margin-top:28px;padding-left:31px;padding-right:31px}
/* steps */
.cxc .cxc-steps{background:var(--cxc-gf);padding:78px 0 79px;text-align:center}
.cxc .cxc-steps .cxc-h2{margin-top:8px}
.cxc .cxc-steps ol{list-style:none;margin:85px 0 0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
.cxc .cxc-steps li{margin:0;padding:0}
.cxc .cxc-steps h3{font-size:16px;line-height:24px;letter-spacing:.16px;text-transform:uppercase;color:var(--cxc-ink)}
.cxc .cxc-steps li p{font-size:14.4px;line-height:24.5px;color:var(--cxc-g6);margin-top:11px}
/* contact */
.cxc .cxc-contact{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:56px;align-items:start}
.cxc .cxc-contact .cxc-h2{margin-top:8px}
.cxc .cxc-info{margin-top:20px}
.cxc .cxc-info li{display:flex;gap:13px;padding:15px 0 16px;border-bottom:1px solid var(--cxc-ge);font-size:15.2px;line-height:25.8px;color:var(--cxc-ink2)}
.cxc .cxc-info__icon{flex:0 0 auto;width:16px;text-align:center}
.cxc .cxc-info__label{display:block;font-size:11.2px;line-height:19px;letter-spacing:.9px;text-transform:uppercase;color:var(--cxc-g6);margin-bottom:2px}
.cxc .cxc-info a:hover{color:var(--cxc-red)}
.cxc .cxc-contact .cxc-btn{margin-top:28px}
.cxc .cxc-map{margin-top:28px;height:401px;border:1px solid var(--cxc-ink);border-radius:4px;overflow:hidden;background:var(--cxc-gf)}
.cxc .cxc-map iframe{display:block;width:100%;height:100%;border:0}
.cxc .cxc-contact__h2--form{font-size:22.4px;line-height:24.2px;letter-spacing:.22px;margin-top:14px}
.cxc .cxc-form{margin-top:20px}
.cxc .cxc-field + .cxc-field{margin-top:20px}
.cxc .cxc-field label{display:block;font-size:11.8px;line-height:20.1px;letter-spacing:.95px;text-transform:uppercase;color:var(--cxc-g6);margin:4px 0 2px}
.cxc .cxc-form input,.cxc .cxc-form textarea{display:block;width:100%;height:51px;margin:0;padding:12px 16px;background:#fff;border:1px solid var(--cxc-gd);border-radius:2px;box-shadow:none;font-family:var(--cxc-inter);font-size:15px;line-height:1.5;color:var(--cxc-ink2);outline:0;transition:border-color .2s}
.cxc .cxc-form textarea{height:120px;resize:vertical}
.cxc .cxc-form input:focus,.cxc .cxc-form textarea:focus{border-color:var(--cxc-ink)}
.cxc .cxc-form .cxc-btn{margin-top:29px;min-height:49px;padding:13px 30px;line-height:1}
.cxc .cxc-hp{position:absolute!important;left:-9999px!important}
/* footer */
.cxc .cxc-footer{background:var(--cxc-ink);color:var(--cxc-gd);text-align:center;padding-top:124px}
.cxc .cxc-footer .cxc-logo{text-align:left}
.cxc .cxc-footer .cxc-logo__name{color:#fff}
.cxc .cxc-footer .cxc-logo__tag{color:var(--cxc-gf)}
.cxc .cxc-fcols{display:grid;grid-template-columns:repeat(3,234px);gap:30px;justify-content:center;text-align:left;margin-top:54px}
.cxc .cxc-fcols h4{font-size:11.8px;line-height:20.1px;letter-spacing:1.18px;text-transform:uppercase;color:var(--cxc-ga)}
.cxc .cxc-fcols ul{margin-top:14px}
.cxc .cxc-fcols li{font-size:14.4px;line-height:24.5px;color:var(--cxc-gd)}
.cxc .cxc-fcols li + li{margin-top:10px}
.cxc .cxc-fcols a:hover{color:#fff}
.cxc .cxc-social{display:flex;justify-content:center;flex-wrap:wrap;gap:8px 18px;margin-top:41px}
.cxc .cxc-social a{font-size:12.8px;line-height:21.8px;letter-spacing:1.02px;text-transform:uppercase;color:var(--cxc-gd)}
.cxc .cxc-social a:hover{color:var(--cxc-red)}
.cxc .cxc-legal{max-width:1126px;margin:31px auto 0;border-top:1px solid rgba(255,255,255,.12);display:flex;justify-content:center;flex-wrap:wrap;gap:4px 23px;padding:22px 24px 20px;font-size:12.2px;line-height:20.7px;color:var(--cxc-ga)}
.cxc .cxc-legal a:hover{color:#fff}
/* whatsapp float */
.cxc .cxc-wa{position:fixed;right:24px;bottom:24px;z-index:9999;display:inline-flex;align-items:center;gap:4px;background:var(--cxc-ink);color:#fff;border-radius:999px;padding:10px 14px;font-size:12.5px;line-height:21.2px;letter-spacing:1px;text-transform:uppercase;box-shadow:0 8px 24px rgba(0,0,0,.25);transition:background .2s}
.cxc .cxc-wa:hover,.cxc .cxc-wa:focus{background:var(--cxc-red);color:#fff}
/* responsive */
@media (max-width:1200px){
  .cxc .cxc-hero .cxc-photo{flex-basis:48%;height:auto;aspect-ratio:656/492}
  .cxc .cxc-why .cxc-photo{flex-basis:45%;height:auto;aspect-ratio:532/399}
}
@media (max-width:960px){
  .cxc .cxc-header .cxc-wrap{grid-template-columns:1fr auto;min-height:72px}
  .cxc .cxc-burger{display:flex;flex-direction:column;justify-content:center;gap:5px;width:44px;height:44px;margin-right:-10px;padding:10px;cursor:pointer;justify-self:end}
  .cxc .cxc-burger span{display:block;height:2px;background:var(--cxc-ink2);transition:transform .2s,opacity .2s}
  .cxc .cxc-nav{display:none;grid-column:1/-1;flex-direction:column;gap:0;padding:8px 0 16px}
  .cxc .cxc-nav a{padding:10px 0;border-bottom:1px solid var(--cxc-ge);font-size:14px}
  .cxc .cxc-nav a.is-active{border-bottom-color:var(--cxc-ge)}
  .cxc .cxc-header__phone{display:none}
  .cxc .cxc-menu-toggle:checked ~ .cxc-nav{display:flex}
  .cxc .cxc-menu-toggle:checked ~ .cxc-burger span:nth-child(1){transform:translateY(7px) rotate(45deg)}
  .cxc .cxc-menu-toggle:checked ~ .cxc-burger span:nth-child(2){opacity:0}
  .cxc .cxc-menu-toggle:checked ~ .cxc-burger span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
  .cxc .cxc-hero .cxc-wrap,.cxc .cxc-why .cxc-wrap{flex-direction:column;align-items:stretch;min-height:0;padding-top:72px;padding-bottom:72px}
  .cxc .cxc-why{padding:0}
  .cxc .cxc-hero .cxc-photo,.cxc .cxc-why .cxc-photo{flex:none;width:100%}
  .cxc .cxc-hero h1{font-size:clamp(44px,9vw,73.6px);line-height:1.08}
  .cxc .cxc-cards{grid-template-columns:repeat(2,minmax(0,1fr))}
  .cxc .cxc-plans,.cxc .cxc-contact{grid-template-columns:1fr}
  .cxc .cxc-contact{gap:64px}
  .cxc .cxc-fcols{grid-template-columns:repeat(3,minmax(0,1fr));max-width:762px;margin-left:auto;margin-right:auto;padding:0 24px}
  .cxc .cxc-footer{padding-top:72px}
  .cxc .cxc-br{display:none}
}
@media (max-width:640px){
  .cxc .cxc-topbar .cxc-wrap{justify-content:center;text-align:center;flex-wrap:wrap;gap:0 16px;padding-top:6px;padding-bottom:6px}
  .cxc .cxc-topbar__addr{display:none}
  .cxc .cxc-cards,.cxc .cxc-steps ol,.cxc .cxc-fcols{grid-template-columns:1fr}
  .cxc .cxc-steps ol{gap:32px;margin-top:48px}
  .cxc .cxc-fcols{gap:32px;max-width:320px}
  .cxc .cxc-phero{padding:64px 24px 56px}
  .cxc .cxc-phero h1{font-size:40px;line-height:1.1}
  .cxc .cxc-hero__btns{gap:12px}
  .cxc .cxc-hero__btns .cxc-btn{width:100%}
  .cxc .cxc-brands ul{gap:8px 28px;padding:22px 24px}
  .cxc .cxc-plan{padding:32px 24px}
  .cxc .cxc-cta{padding:64px 24px}
  .cxc .cxc-wa{right:16px;bottom:16px}
}
`.trim();

const fonts = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Anton&family=Audiowide&family=Crimson+Text:wght@600;700&family=Inter:wght@400&family=Source+Serif+4:opsz,wght@8..60,900&display=swap" rel="stylesheet">`;

const logo = (cls = '') => `<a class="cxc-logo ${cls}" href="${URL.home}" aria-label="CXclusives – home"><span class="cxc-logo__name"><b>CX</b>clusives</span><span class="cxc-logo__tag">See exclusive cars</span></a>`;

const header = (active) => `
<div class="cxc-topbar"><div class="cxc-wrap"><span>Ma–Zo op afspraak geopend</span><span class="cxc-topbar__addr">Europalaan Oost 28, 6075 ED Herkenbosch</span></div></div>
<header class="cxc-header"><div class="cxc-wrap">
${logo()}
<input type="checkbox" id="cxc-menu" class="cxc-menu-toggle" aria-label="Menu openen">
<label for="cxc-menu" class="cxc-burger" aria-hidden="true"><span></span><span></span><span></span></label>
<nav class="cxc-nav" aria-label="Hoofdmenu">
${[['home', 'Home'], ['aanbod', 'Aanbod'], ['lease', 'Lease'], ['contact', 'Contact']].map(([k, t]) => `<a href="${URL[k]}"${k === active ? ' class="is-active" aria-current="page"' : ''}>${t}</a>`).join('\n')}
</nav>
<a class="cxc-header__phone" href="${TEL}">${PHONE}</a>
</div></header>`;

const footer = (visitNote) => `
<footer class="cxc-footer">
${logo()}
<div class="cxc-fcols">
<div><h4>Navigatie</h4><ul><li><a href="${URL.home}">Home</a></li><li><a href="${URL.aanbod}">Aanbod</a></li><li><a href="${URL.lease}">Lease</a></li><li><a href="${URL.contact}">Contact</a></li></ul></div>
<div><h4>Contact</h4><ul><li><a href="${TEL}">${PHONE}</a></li><li><a href="mailto:${MAIL}">${MAIL}</a></li><li>Europalaan Oost 28<br>6075 ED Herkenbosch</li></ul></div>
<div><h4>Openingstijden</h4><ul><li>Ma–Zo: op afspraak</li><li>${visitNote}</li></ul></div>
</div>
<div class="cxc-social"><a href="${WA}" target="_blank" rel="noopener">WhatsApp</a><a href="#INSTAGRAM-URL" target="_blank" rel="noopener">Instagram</a><a href="#FACEBOOK-URL" target="_blank" rel="noopener">Facebook</a></div>
<div class="cxc-legal"><span>© 2026 CXclusives - alle rechten behouden</span><span>RDW-erkend</span><a href="/algemene-voorwaarden/">Algemene voorwaarden</a><a href="/privacyverklaring/">Privacyverklaring</a></div>
</footer>
<a class="cxc-wa" href="${WA}" target="_blank" rel="noopener" aria-label="Contact ons via WhatsApp">💬 Contact ons</a>`;

const car = `<svg viewBox="0 0 165 82" aria-hidden="true"><g fill="none" stroke="#1e1e1e" stroke-width="2.46" stroke-linecap="round" stroke-linejoin="round"><path d="M12 57.83C12 46.42 21.95 39.32 34.27 36.5L47.47 23.38C52.97 18.69 60.91 16 69.73 16H100.25C109.79 16 118.53 19.95 125.82 27.48L134.07 36.5C147.09 38.02 156.33 43.6 156.33 56.19V62.75H141.49"/><path d="M26.02 62.75L12 57.83V62.75"/><circle cx="41.24" cy="63.97" r="9.07"/><circle cx="127.85" cy="63.97" r="9.07"/></g></svg>`;

const CARS = [
  ['Net binnen', 'BMW', '3 Serie', '320i Business Edition | LED | Navi · 2020 · 61.500 km · Automaat · Benzine'],
  ['Rijklaar', 'Volkswagen', 'Golf', '1.5 TSI Highline | Pano | ACC · 2019 · 78.000 km · Automaat · Diesel'],
  ['Topper', 'Audi', 'A4 Avant', '2.0 TDI S-Line | Trekhaak | Camera · 2018 · 92.000 km · Automaat · Diesel'],
];
const cards = () => `
<!-- Voorbeeld-auto's. Vervang dit blok door de Mobilox-voorraadwidget/shortcode, of pas de gegevens per auto aan. Foto: zet <img src="..." alt="..."> in plaats van de <svg>. -->
<div class="cxc-cards">
${CARS.map(([badge, brand, model, specs]) => `<article class="cxc-card">
<div class="cxc-card__media"><span class="cxc-badge">${badge}</span>${car}</div>
<div class="cxc-card__body">
<p class="cxc-card__brand">${brand}</p>
<h3 class="cxc-card__title">${model}</h3>
<p class="cxc-card__specs">${specs}</p>
<div class="cxc-card__price"><strong>Vraag naar prijs</strong><span>Lease mogelijk</span></div>
<a class="cxc-card__btn" href="#">Bekijk voertuig</a>
</div>
</article>`).join('\n')}
</div>`;

const brands = `<div class="cxc-brands"><ul><li>Tesla</li><li>Audi</li><li>BMW</li><li>Mercedes</li><li>Porsche</li></ul></div>`;

const reviews = `
<section class="cxc-reviews">
<p class="cxc-reviews__stars" aria-label="4,4 van 5 sterren">★★★★★</p>
<p class="cxc-reviews__score"><span class="cxc-red">4.4</span>/5 op basis van Google Reviews — <a href="#GOOGLE-REVIEWS-URL" target="_blank" rel="noopener">bekijk onze reviews</a></p>
<!-- Notitie uit het ontwerp: "Plaats hier jullie actuele Google-beoordeling en aantal reviews" -->
</section>`;

const cta = ({ eyebrow, eyebrowCls = '', title, text, textCls = '', btn, href }) => `
<section class="cxc-cta">
<p class="cxc-eyebrow ${eyebrowCls}">${eyebrow}</p>
<h2 class="cxc-h2">${title}</h2>
<p class="cxc-cta__text ${textCls}">${text}</p>
<a class="cxc-btn" href="${href}">${btn}</a>
</section>`;

const phero = ({ eyebrow, eyebrowCls = '', title, intro, maxw }) => `
<section class="cxc-phero">
<div class="cxc-glow"></div>
<p class="cxc-eyebrow ${eyebrowCls}">${eyebrow}</p>
<h1>${title}</h1>
<p class="cxc-phero__intro"${maxw ? ` style="max-width:${maxw}px"` : ''}>${intro}</p>
</section>`;

const gap = (h) => `<div style="height:${h}px" aria-hidden="true"></div>`;

function page(slug, title, active, body, visitNote = 'Bezoek altijd na WhatsApp-contact') {
  return `<!-- ===================================================================
  CXclusives – ${title}
  Plak ALLES hieronder in één "Aangepaste HTML"-blok (Custom HTML) op de
  WordPress-pagina "${title}". Gebruik een paginasjabloon zonder titel en
  zonder zijbalk (bijv. "Full width" / "Canvas" / "Blank"), zodat header en
  footer van het thema niet dubbel verschijnen.
  Alle CSS is afgeschermd met de klasse .cxc en botst niet met je thema.
==================================================================== -->
${fonts}
<style>
${css}
</style>
<div class="cxc cxc-page-${slug}">
${header(active)}
<main>
${body}
</main>
${footer(visitNote)}
</div>
`;
}

/* ---------------- HOME ---------------- */
const home = page('home', 'Home', 'home', `
<section class="cxc-hero">
<div class="cxc-glow"></div>
<div class="cxc-wrap">
<div class="cxc-hero__text">
<h1>waar jouw<br><span class="cxc-red">droomauto</span><br>echt gevonden<br>wordt</h1>
<p class="cxc-hero__intro">RDW-erkende autodealer in Herkenbosch, exclusieve occasions, persoonlijke begeleiding en dezelfde dag rijklaar voor jou.</p>
<div class="cxc-hero__btns"><a class="cxc-btn" href="${URL.aanbod}">Bekijk onze collectie</a><a class="cxc-btn cxc-btn--ghost" href="${URL.contact}">Plan een testrit</a></div>
<p class="cxc-hero__usp">RDW-erkend, Laagste prijsgarantie en Dezelfde dag rijklaar.</p>
</div>
<!-- SFEERFOTO: vervang de tekst hieronder door <img src="JOUW-FOTO.jpg" alt="CXclusives"> -->
<div class="cxc-photo">sfeerfoto,<br>bijv<br>sengxu aan t klussen<br>sengxu die auto ophaalt<br>achter laptop research</div>
</div>
</section>
${brands}
${gap(32)}
<section class="cxc-stock"><div class="cxc-wrap">
<div class="cxc-center">
<p class="cxc-eyebrow cxc-eyebrow--serif">Voorraad</p>
<h2 class="cxc-h2">NIEUW binnen gekregen</h2>
<p class="cxc-lead">Een greep uit onze actuele collectie, word automatisch ververst via ons voorraadsysteem <b>Mobilox</b>.</p>
</div>
${cards()}
<div class="cxc-more"><a class="cxc-btn cxc-btn--line" href="${URL.aanbod}">Bekijk de volledige collectie</a></div>
</div></section>
${gap(72)}
<section class="cxc-why"><div class="cxc-wrap">
<div class="cxc-why__text">
<p class="cxc-why__kicker">Waarom <b class="cxc-red">CX</b><b>clusives</b>?</p>
<h2 class="cxc-h2">Waar perfectie en service samenkomen</h2>
<ul class="cxc-dash"><li>Breed aanbod van gecontroleerde occasions</li><li>Persoonlijke begeleiding op maat</li><li>RDW-erkende werkwijze &amp; optioneel Autotrust garantie</li></ul>
<p class="cxc-why__body">Bij ons kies je voor betrouwbaarheid, service en zekerheid. Of je nu particulier rijdt of zakelijk onderweg bent, wij bieden via onze partners aantrekkelijke lease- mogelijkheden op maat, zodat je flexibel en zorgeloos kunt rijden.</p>
<p class="cxc-why__claim">Kies voor kwaliteit, kies voor zekerheid — kies voor ons.</p>
<a class="cxc-btn cxc-btn--dark" href="${URL.lease}">Bekijk lease-mogelijkheden</a>
</div>
<!-- SFEERFOTO: vervang de tekst hieronder door <img src="JOUW-FOTO.jpg" alt="Showroom CXclusives"> -->
<div class="cxc-photo">Ruimte voor een sfeerfoto van de “showroom”<br>(foto waar je klust)</div>
</div></section>
${cta({ eyebrow: 'Kom langs of neem contact op', title: 'Wij helpen <span class="cxc-red">jou</span> graag verder', text: 'Testrit inplannen, vraag over een auto, of gewoon even sparren over lease? <br class="cxc-br">Wij staan klaar.', btn: 'Naar de contactpagina', href: URL.contact })}
${reviews}`, 'Bezoek altijd na Mail/whatsapp-contact');

/* ---------------- AANBOD ---------------- */
const aanbod = page('aanbod', 'Aanbod', 'aanbod', `
${phero({ eyebrow: 'See exclusive cars', title: 'Onze collectie', intro: 'Elke auto is gecontroleerd, RDW-erkend en dezelfde dag rijklaar te <br class="cxc-br">maken.', maxw: 470 })}
${brands}
${gap(81)}
<section class="cxc-stock"><div class="cxc-wrap">
<p class="cxc-note">Deze pagina wordt automatisch gevuld vanuit <b>Mobilox</b>, ons voorraadsysteem — staat een auto er nog niet bij of zoekt u iets specifieks? Stuur ons een <a href="${WA}" target="_blank" rel="noopener">WhatsApp-bericht</a>, we denken graag mee.</p>
${cards()}
</div></section>
${gap(102)}
${cta({ eyebrow: 'jouw droomauto er niet tussen?', title: 'Wij denken <span class="cxc-red">graag</span> mee', text: 'Via ons netwerk vinden wij ook auto\'s die niet in de huidige <br class="cxc-br">voorraad staan.', btn: 'Neem contact op', href: URL.contact })}
${reviews}`);

/* ---------------- LEASE ---------------- */
const lease = page('lease', 'Lease', 'lease', `
${phero({ eyebrow: 'Flexibel rijden', title: 'jouw lease, bij <span class="cxc-red">ons</span> geregeld', intro: 'Via onze partners bieden wij aantrekkelijke lease-mogelijkheden op <br class="cxc-br">maat — particulier en zakelijk.', maxw: 480 })}
${gap(84)}
<section><div class="cxc-wrap"><div class="cxc-plans">
<div class="cxc-plan">
<span class="cxc-plan__tag">Particulier</span>
<h2 class="cxc-h2">Privatelease</h2>
<p class="cxc-plan__desc">Eén vast maandbedrag, geen verrassingen.</p>
<ul class="cxc-dash"><li>Onderhoud en verzekering inbegrepen</li><li>Looptijd en kilometrage op maat</li><li>Rijden in een gecontroleerde occasion</li></ul>
<a class="cxc-btn cxc-btn--line" href="${URL.contact}">Vraag een voorstel aan</a>
</div>
<div class="cxc-plan cxc-plan--dark">
<span class="cxc-plan__tag">Zakelijk</span>
<h2 class="cxc-h2">Zakelijk lease</h2>
<p class="cxc-plan__desc">Flexibel en fiscaal aantrekkelijk voor uw onderneming.</p>
<ul class="cxc-dash"><li>Geen kapitaal vast in wagenpark</li><li>Vaste maandlasten, makkelijk te begroten</li><li>Advies op maat via onze leasepartners</li></ul>
<a class="cxc-btn" href="${URL.contact}">Vraag een voorstel aan</a>
</div>
</div></div></section>
${gap(84)}
<section class="cxc-steps"><div class="cxc-wrap">
<p class="cxc-eyebrow">Hoe werkt het</p>
<h2 class="cxc-h2">In drie stappen op de weg</h2>
<ol>
<li><h3>Contact opnemen</h3><p>Stuur ons uw wensen via WhatsApp of de website.</p></li>
<li><h3>Auto &amp; voorwaarden kiezen</h3><p>Wij stellen een leasevoorstel op maat samen.</p></li>
<li><h3>Rijden</h3><p>Rijklaar ophalen of laten bezorgen — klaar!</p></li>
</ol>
</div></section>
${gap(83)}
<section class="cxc-stock"><div class="cxc-wrap">
<div class="cxc-center">
<p class="cxc-eyebrow">Alvast oriënteren</p>
<h2 class="cxc-h2">Beschikbaar voor lease</h2>
<p class="cxc-lead">Een selectie uit onze collectie, geschikt voor lease.</p>
</div>
${cards()}
</div></section>
${gap(92)}
${cta({ eyebrow: 'Vragen over lease?', eyebrowCls: 'cxc-eyebrow--anton', title: 'Wij denken <span class="cxc-red">graag</span> met u mee', text: 'Geen verplichtingen, gewoon een eerlijk advies op maat.', textCls: 'cxc-cta__text--anton', btn: 'Naar de contactpagina', href: URL.contact })}`);

/* ---------------- CONTACT ---------------- */
const contact = page('contact', 'Contact', 'contact', `
${phero({ eyebrow: 'We staan voor jou klaar', eyebrowCls: 'cxc-eyebrow--anton', title: 'Contact', intro: 'Testrit inplannen, vragen over een auto, of gewoon even sparren? <br class="cxc-br">Wij reageren doorgaans binnen een paar uur.', maxw: 560 })}
${gap(84)}
<section><div class="cxc-wrap"><div class="cxc-contact">
<div>
<p class="cxc-eyebrow cxc-eyebrow--anton">Gegevens</p>
<h2 class="cxc-h2">Kom langs of app ons</h2>
<ul class="cxc-info">
<li><span class="cxc-info__icon" aria-hidden="true">📍</span><span><span class="cxc-info__label">Adres</span>Europalaan Oost 28, 6075 ED Herkenbosch</span></li>
<li><span class="cxc-info__icon" aria-hidden="true">☎</span><span><span class="cxc-info__label">Telefoon (alleen WhatsApp)</span><a href="${WA}" target="_blank" rel="noopener">${PHONE}</a></span></li>
<li><span class="cxc-info__icon" aria-hidden="true">✉</span><span><span class="cxc-info__label">E-mail</span><a href="mailto:${MAIL}">${MAIL}</a></span></li>
<li><span class="cxc-info__icon" aria-hidden="true">🕑</span><span><span class="cxc-info__label">Openingstijden</span>Maandag tot zondag op afspraak</span></li>
</ul>
<a class="cxc-btn" href="${WA}" target="_blank" rel="noopener">App ons direct</a>
<div class="cxc-map"><iframe src="https://www.google.com/maps?q=Europalaan%20Oost%2028%2C%206075%20ED%20Herkenbosch&amp;output=embed" title="Kaart: Europalaan Oost 28, Herkenbosch" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</div>
<div>
<p class="cxc-eyebrow cxc-eyebrow--anton">Stuur een bericht</p>
<h2 class="cxc-h2 cxc-contact__h2--form">Wij reageren zo snel mogelijk</h2>
<!-- FORMULIER: koppel dit aan een verzendservice. Standaard staat Web3Forms ingesteld:
     1) maak gratis een access key aan op https://web3forms.com met info@cxclusives.nl
     2) vervang JOUW-WEB3FORMS-ACCESS-KEY hieronder door die key.
     (Notitie uit het ontwerp: berichten naar cxclusives@gmail.com en info@cxclusives.nl.)
     Liever Contact Form 7 / WPForms? Vervang dan het <form> door de shortcode. -->
<form class="cxc-form" action="https://api.web3forms.com/submit" method="POST">
<input type="hidden" name="access_key" value="JOUW-WEB3FORMS-ACCESS-KEY">
<input type="hidden" name="subject" value="Nieuw bericht via cxclusives.nl">
<input type="checkbox" name="botcheck" class="cxc-hp" tabindex="-1" autocomplete="off">
<div class="cxc-field"><label for="cxc-voornaam">Voornaam*</label><input id="cxc-voornaam" name="voornaam" type="text" autocomplete="given-name" required></div>
<div class="cxc-field"><label for="cxc-achternaam">Achternaam*</label><input id="cxc-achternaam" name="achternaam" type="text" autocomplete="family-name" required></div>
<div class="cxc-field"><label for="cxc-email">Email*</label><input id="cxc-email" name="email" type="email" autocomplete="email" required></div>
<div class="cxc-field"><label for="cxc-tel">Telefoonnummer</label><input id="cxc-tel" name="telefoon" type="tel" autocomplete="tel"></div>
<div class="cxc-field"><label for="cxc-bericht">Bericht</label><textarea id="cxc-bericht" name="bericht"></textarea></div>
<button class="cxc-btn" type="submit">Versturen</button>
</form>
</div>
</div></div></section>
${gap(111)}
${reviews}`);

for (const [f, html] of [['home.html', home], ['aanbod.html', aanbod], ['lease.html', lease], ['contact.html', contact]]) {
  // Custom HTML blocks can be mangled by blank lines (wpautop in some setups) — strip them.
  fs.writeFileSync(path.join(OUT, f), html.replace(/\n\s*\n/g, '\n'));
}
console.log('ok');
