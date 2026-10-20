/**
 * Jelvan® Cloudflare Pages production authentication foundation.
 * Rendered into each project as _worker.js by build-workers.py.
 * Dependencies: AUTH_DB (D1), TURNSTILE_SITE_KEY, TURNSTILE_SECRET,
 * ADMIN_USERNAME, ADMIN_PASSWORD (min 12 characters).
 * No credentials are embedded. Fail closed until configured.
 */
const APP = {"title":"NewWebsite","eyebrow":"DIGITAL EXPERIENCE","sub":"The web, thoughtfully composed.","accent":"#d7672a","background":"#faf7f2","surface":"#fffdf9","fg":"#26211d","subfg":"#776b63","stroke":"#e4d8ca","btnfg":"#ffffff","slug":"newwebsite-showcase"};
const COOKIE = '__Host-jelvan_session';
const EXPIRE_SECONDS = 60 * 60 * 8;
const encoder = new TextEncoder();
const htmlEscape = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rand = (n) => crypto.getRandomValues(new Uint8Array(n));
const hex = (x) => [...new Uint8Array(x)].map(b => b.toString(16).padStart(2,'0')).join('');
const bytesToHex = a => [...a].map(b => b.toString(16).padStart(2,'0')).join('');
const sha256 = async (v) => hex(await crypto.subtle.digest('SHA-256', encoder.encode(v)));
const b64url = a => btoa(String.fromCharCode(...a)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const secureEqual = async (a, b) => {
  const A = new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(String(a))));
  const B = new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(String(b))));
  let mismatch = 0;
  for (let i=0; i<A.length; i++) mismatch |= A[i]^B[i];
  return mismatch===0;
};
const now = () => Math.floor(Date.now()/1000);
const cookieSet = (token,maxAge) => `${COOKIE}=${token}; Path=/; Max-Age=${maxAge}; Secure; HttpOnly; SameSite=None; Partitioned`;
const securityHeaders = (login=false) => ({
  'Content-Security-Policy': login
    ? "default-src 'none'; script-src https://challenges.cloudflare.com; style-src 'unsafe-inline'; frame-src https://challenges.cloudflare.com; connect-src https://challenges.cloudflare.com; form-action 'self'; frame-ancestors 'self' https://portfolio.jelvan.pro; base-uri 'none'"
    : "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; form-action 'self'; frame-ancestors 'self' https://portfolio.jelvan.pro; base-uri 'none'",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'X-Frame-Options': undefined,
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive'
});
function responsePage(content,status=200,login=false) {
  const h = new Headers(securityHeaders(login));
  h.delete('X-Frame-Options'); h.set('Content-Type','text/html; charset=UTF-8');
  return new Response(content, {status,headers:h});
}
function redirect(to,token) {
  const h = new Headers({'Location':to, 'Cache-Control':'no-store','Referrer-Policy':'no-referrer'});
  if(token!==undefined) h.append('Set-Cookie',cookieSet(token,token?EXPIRE_SECONDS:0));
  return new Response(null,{status:303,headers:h});
}
function originValid(req) {
  const o=req.headers.get('Origin');
  return o===new URL(req.url).origin;
}
function setupReady(env) {
  return !!(env.AUTH_DB && env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET &&
    env.ADMIN_USERNAME && env.ADMIN_PASSWORD && String(env.ADMIN_PASSWORD).length>=12);
}
async function turnstile(req,env,token) {
  if (!token || token.length>2048) return false;
  try {
    const form=new FormData();
    form.set('secret',env.TURNSTILE_SECRET);
    form.set('response',token);
    const ip=req.headers.get('CF-Connecting-IP');
    if(ip)form.set('remoteip',ip);
    const res=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:form});
    if(!res.ok)return false;
    const verdict=await res.json();
    return verdict.success===true && verdict.hostname===new URL(req.url).hostname && verdict.action==='login';
  } catch { return false; }
}
function siteChrome(contents,login=false) {
  const accent=APP.accent,fg=APP.fg,bg=APP.background,pane=APP.surface,stroke=APP.stroke,secondary=APP.subfg;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="${bg}"><title>${htmlEscape(APP.title)} — Jelvan®</title><style>
  *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;grid-template-rows:1fr auto;background:${bg};color:${fg};font:15px/1.55 Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
  a{color:${accent}}main{max-width:1160px;margin:auto;width:100%;padding:48px 20px}.brand{font-weight:800;letter-spacing:-.04em;color:${accent};font-size:16px}.layout{display:grid;grid-template-columns:1fr 430px;gap:52px;align-items:center}
  .eyebrow{text-transform:uppercase;font-weight:800;color:${accent};letter-spacing:.17em;font-size:11px;margin:15px 0}.hero{font-size:clamp(38px,5vw,66px);line-height:1.08;letter-spacing:-.065em;margin:12px 0 20px;font-weight:740}.sub{max-width:430px;color:${secondary};font-size:16px}
  .card{background:${pane};border:1px solid ${stroke};border-radius:18px;padding:32px;box-shadow:0 20px 45px #00000010}.card h2{margin:0 0 8px;font-size:23px;letter-spacing:-.04em}.info{color:${secondary};font-size:13px;margin-bottom:20px}
  label{display:block;margin:17px 0 7px;font-size:12px;font-weight:700}.field{display:block;width:100%;background:${bg};border:1px solid ${stroke};border-radius:10px;padding:12px;color:${fg};font:inherit}.field:focus{outline:2px solid ${accent}}
  .btn{display:inline-block;width:100%;padding:13px;border-radius:10px;border:none;background:${accent};color:${APP.btnfg};font:inherit;font-weight:740;margin-top:22px;cursor:pointer}.btn.secondary{width:auto;background:${pane};border:1px solid ${stroke};color:${fg};margin:4px}
  .error{border:1px solid #d66a6a;color:#d55d5d;padding:10px;border-radius:9px;font-size:13px;margin-top:15px}.foot{text-align:center;padding:22px 20px;border-top:1px solid ${stroke};font-size:12px;color:${secondary}}.foot a{text-decoration:none;font-weight:760}.foot a:hover{text-decoration:underline}
  .note{color:${secondary};font-size:12px;margin-top:15px}.list{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:11px 0;border-bottom:1px solid ${stroke}}.list small{color:${secondary}}
  @media(max-width:760px){.layout{grid-template-columns:1fr;gap:20px}.hero{font-size:38px}.card{padding:22px}main{padding:30px 17px}}
  </style></head><body><main><div class="layout"><section><div class="brand">JELVAN® / ${htmlEscape(APP.title)}</div><div class="eyebrow">${htmlEscape(APP.eyebrow)}</div><h1 class="hero">${htmlEscape(APP.sub)}</h1><p class="sub">A distinct, premium workspace built for ${htmlEscape(APP.title)}. Account access is protected by Cloudflare Turnstile and server-side sessions.</p></section><section class="card">${contents}</section></div></main><footer class="foot"><a href="https://portfolio.jelvan.pro" target="_blank" rel="noopener noreferrer">Developed and Designed by Jelvan®</a></footer></body></html>`;
}
function loginPage(env,failed=false) {
  return siteChrome(`<h2>Sign in</h2><div class="info">Use your authorized ${htmlEscape(APP.title)} account.</div><form action="/api/login" method="POST"><label for="username">Username</label><input class="field" type="text" name="username" id="username" autocomplete="username" maxlength="180" required><label for="password">Password</label><input class="field" type="password" name="password" id="password" autocomplete="current-password" required><div style="margin-top:22px"><div class="cf-turnstile" data-sitekey="${htmlEscape(env.TURNSTILE_SITE_KEY)}" data-action="login" data-theme="auto"></div></div><button class="btn" type="submit">Sign in securely</button>${failed?'<p role="alert" class="error">Sign-in failed. Check the credentials or complete a new verification challenge.</p>':''}</form><div class="note">This site requires valid credentials and a successful server-verified Turnstile challenge.</div><script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>`,true);
}
function configurationPage() {
  return siteChrome('<h2>Secure setup pending</h2><p class="info">The application is closed to visitors while an administrator configures its credentials and server-side security. No default or test credentials are enabled.</p><p class="note">Configure ADMIN_USERNAME and a strong ADMIN_PASSWORD as Cloudflare Pages secrets.</p>');
}
function adminPage(users,actor) {
  const list=users.map(x=>`<div class="list"><span>${htmlEscape(x.name||x.username)}<br><small>${htmlEscape(x.username)} · ${x.disabled?'Disabled':'Active'}</small></span><form action="/admin/toggle" method="post"><input type="hidden" name="id" value="${htmlEscape(x.id)}"><button type="submit" class="btn secondary">${x.disabled?'Enable':'Disable'}</button></form></div>`).join('');
  return siteChrome(`<h2>Account administration</h2><div class="info">Signed in as ${htmlEscape(actor.username)}</div>${list||'<p class="info">No additional users yet.</p>'}<h2 style="margin-top:24px">Create user</h2><form action="/admin/users" method="post"><label>Display name</label><input name="name" class="field" maxlength="100" required><label>Username</label><input name="username" class="field" maxlength="180" required><label>Temporary password (12+ characters)</label><input name="password" type="password" class="field" minlength="12" required><button class="btn">Create account</button></form><form action="/api/logout" method="post"><button class="btn secondary">Sign out</button></form>`);
}
async function sessionFor(req,env) {
  const cookies=req.headers.get('Cookie')||'';
  const match=cookies.split(';').map(x=>x.trim()).find(x=>x.startsWith(COOKIE+'='));
  const token=match?.slice(COOKIE.length+1);
  if (!token||token.length>200)return null;
  const token_hash=await sha256(token);
  const session=await env.AUTH_DB.prepare('SELECT username,role,expires_at FROM auth_sessions WHERE token_hash=? AND app=? AND revoked_at IS NULL').bind(token_hash,APP.slug).first();
  if(!session||session.expires_at<=now())return null;
  if(session.role!=='admin'){
    const user=await env.AUTH_DB.prepare('SELECT disabled FROM app_users WHERE app=? AND username=?').bind(APP.slug,session.username).first();
    if(!user||user.disabled)return null;
  }
  return {username:session.username,role:session.role,token_hash};
}
async function recordAttempt(env,k,outcome){
  await env.AUTH_DB.prepare('INSERT INTO auth_attempts(app,user_key,attempted_at,outcome) VALUES(?,?,?,?)').bind(APP.slug,k,now(),outcome).run();
}
async function credentialsValid(env,username,password){
  if(username===env.ADMIN_USERNAME){return (await secureEqual(password,env.ADMIN_PASSWORD))?{role:'admin'}:null;}
  const u=await env.AUTH_DB.prepare('SELECT password_salt,password_hash,iterations,disabled FROM app_users WHERE app=? AND username=?').bind(APP.slug,username).first();
  if(!u||u.disabled){await secureEqual(password,'unavailable-account-random-check');return null;}
  const salt=Uint8Array.from(atob(u.password_salt),c=>c.charCodeAt(0));
  const base=await crypto.subtle.importKey('raw',encoder.encode(password),'PBKDF2',false,['deriveBits']);
  const raw=await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:u.iterations,hash:'SHA-256'},base,256);
  let mismatch=0;const val=bytesToHex(new Uint8Array(raw));
  for(let i=0;i<val.length;i++)mismatch|=val.charCodeAt(i)^u.password_hash.charCodeAt(i);
  return mismatch===0?{role:'user'}:null;
}
async function createUser(env,username,name,password){
  const salt=rand(16);
  const base=await crypto.subtle.importKey('raw',encoder.encode(password),'PBKDF2',false,['deriveBits']);
  const output=await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:210000,hash:'SHA-256'},base,256);
  await env.AUTH_DB.prepare('INSERT INTO app_users(id,app,username,name,role,password_salt,password_hash,iterations) VALUES(?,?,?,?,?,?,?,?)')
    .bind(crypto.randomUUID(),APP.slug,username,name,'user',btoa(String.fromCharCode(...salt)),bytesToHex(new Uint8Array(output)),210000).run();
}
async function handleLogin(req,env){
  if(!originValid(req))return new Response('Bad origin',{status:403});
  const length=Number(req.headers.get('Content-Length')||0);
  if(length>8192)return new Response('Too large',{status:413});
  let form;
  try{form=await req.formData();}catch{return redirect('/login?error=1');}
  const username=String(form.get('username')||'').trim();
  const password=String(form.get('password')||'');
  const token=String(form.get('cf-turnstile-response')||'');
  if(!username||username.length>180||password.length>2048||!token)return redirect('/login?error=1');
  const ip=req.headers.get('CF-Connecting-IP')||'unknown';
  const k=await sha256(APP.slug+'|'+ip+'|'+username.toLowerCase());
  const count=await env.AUTH_DB.prepare("SELECT COUNT(*) AS c FROM auth_attempts WHERE app=? AND user_key=? AND outcome='fail' AND attempted_at>?").bind(APP.slug,k,now()-900).first();
  if((count?.c||0)>=5)return new Response('Too many attempts. Try again later.',{status:429,headers:{'Retry-After':'900','Cache-Control':'no-store'}});
  const challenge=await turnstile(req,env,token);
  const credential=challenge?await credentialsValid(env,username,password):null;
  if(!credential){await recordAttempt(env,k,'fail');return redirect('/login?error=1');}
  const value=b64url(rand(32)),hash=await sha256(value);
  await env.AUTH_DB.prepare('INSERT INTO auth_sessions(token_hash,app,username,role,created_at,expires_at) VALUES(?,?,?,?,?,?)').bind(hash,APP.slug,username,credential.role,now(),now()+EXPIRE_SECONDS).run();
  await recordAttempt(env,k,'success');
  return redirect('/',value);
}
async function handleAdmin(req,env,user,url){
  if(!user||user.role!=='admin')return new Response('Forbidden',{status:403});
  if(req.method==='GET'){
    const users=await env.AUTH_DB.prepare('SELECT id,username,name,disabled FROM app_users WHERE app=? ORDER BY created_at DESC LIMIT 100').bind(APP.slug).all();
    return responsePage(adminPage(users.results||[],user));
  }
  if(req.method!=='POST'||!originValid(req))return new Response('Forbidden',{status:403});
  let f;
  try{f=await req.formData();}catch{return new Response('Invalid form',{status:400});}
  if(url.pathname==='/admin/users'){
    const name=String(f.get('name')||'').trim().slice(0,100),username=String(f.get('username')||'').trim().slice(0,180),password=String(f.get('password')||'');
    if(!name||!/^[a-zA-Z0-9_+@.\-]{3,180}$/.test(username)||password.length<12||password.length>200)return new Response('Invalid user details or weak password',{status:400});
    if(username===env.ADMIN_USERNAME)return new Response('Reserved username',{status:400});
    try{await createUser(env,username,name,password);}catch{return new Response('Unable to create user. Username may already exist.',{status:409});}
  } else if(url.pathname==='/admin/toggle'){
    const id=String(f.get('id')||'');
    if(!/^[0-9a-f-]{36}$/.test(id))return new Response('Invalid user ID',{status:400});
    await env.AUTH_DB.prepare('UPDATE app_users SET disabled=1-disabled WHERE app=? AND id=?').bind(APP.slug,id).run();
  } else return new Response('Not found',{status:404});
  return redirect('/admin');
}
export default {
 async fetch(request,env) {
  const url=new URL(request.url);const path=url.pathname;
  try {
    if(path==='/health')return Response.json({status:'ok',name:APP.title,authentication:'server-required'},{headers:{'Cache-Control':'no-store'}});
    if(!setupReady(env))return responsePage(configurationPage(),503);
    if(path==='/api/login')return request.method==='POST'?await handleLogin(request,env):new Response('Method not allowed',{status:405});
    const user=await sessionFor(request,env);
    if(path==='/login'){
      if(user)return redirect('/');
      if(request.method!=='GET')return new Response('Method not allowed',{status:405});
      return responsePage(loginPage(env,url.searchParams.has('error')),200,true);
    }
    if(path==='/api/logout' && request.method==='POST'){
      if(!originValid(request))return new Response('Forbidden',{status:403});
      if(user)await env.AUTH_DB.prepare('UPDATE auth_sessions SET revoked_at=? WHERE token_hash=? AND app=?').bind(now(),user.token_hash,APP.slug).run();
      return redirect('/login','');
    }
    if(path==='/api/me')return Response.json(user?{username:user.username,role:user.role,app:APP.slug}:{error:'unauthenticated'},{status:user?200:401,headers:{'Cache-Control':'no-store'}});
    if(!user){
      if(path.startsWith('/api/'))return Response.json({error:'unauthenticated'},{status:401,headers:{'Cache-Control':'no-store'}});
      return redirect('/login');
    }
    if(path==='/api/workspace'){
      if(request.method==='GET'){
        const row=await env.AUTH_DB.prepare('SELECT content,updated_at FROM app_workspace WHERE app=? AND username=?').bind(APP.slug,user.username).first();
        return Response.json({data:row?JSON.parse(row.content):null,updated_at:row?.updated_at||null},{headers:{'Cache-Control':'no-store'}});
      }
      if(request.method!=='PUT')return new Response('Method not allowed',{status:405});
      if(!originValid(request))return new Response('Forbidden',{status:403});
      if(Number(request.headers.get('Content-Length')||0)>180000)return new Response('Payload too large',{status:413});
      const raw=await request.text();if(raw.length>180000)return new Response('Payload too large',{status:413});
      let parsed;try{parsed=JSON.parse(raw)}catch{return new Response('Invalid JSON',{status:400})}
      if(!parsed||typeof parsed!=='object'||Array.isArray(parsed)||!Array.isArray(parsed.items)||parsed.items.length>5000)return new Response('Invalid workspace schema',{status:400});
      await env.AUTH_DB.prepare(`INSERT INTO app_workspace(app,username,content,updated_at) VALUES(?,?,?,CURRENT_TIMESTAMP) ON CONFLICT(app,username) DO UPDATE SET content=excluded.content,updated_at=CURRENT_TIMESTAMP`).bind(APP.slug,user.username,raw).run();
      return Response.json({ok:true},{headers:{'Cache-Control':'no-store'}});
    }
    if(path.startsWith('/admin'))return handleAdmin(request,env,user,url);
    if(path.startsWith('/api/'))return new Response('Not found',{status:404});
    const asset=await env.ASSETS.fetch(request);
    const h=new Headers(asset.headers);
    for (const [k,v] of Object.entries(securityHeaders(false)))if(v)h.set(k,v);
    h.delete('X-Frame-Options');
    return new Response(asset.body,{status:asset.status,headers:h});
  } catch(err){
    // No user input, passwords, or secrets are written to logs.
    return new Response('Service temporarily unavailable',{status:503,headers:{'Cache-Control':'no-store'}});
  }
 }
};
