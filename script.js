function term() {
    let v = unary();
    while (['*','/','%'].includes(peek()) || imp()) {
      if (imp()) { v *= pow(); continue; }
      const o = next(), r = unary();
      v = o === '*' ? v * r : o === '/' ? v / r : v % r;
    }
    return v;
  }
  function unary() { if (peek() === '-') { next(); return -unary(); } if (peek() === '+') { next(); return unary(); } return pow(); }
  function pow() { const b = post(); if (peek() === '^') { next(); return Math.pow(b, unary()); } return b; }
  function post() { let v = atom(); while (peek() === '!') { next(); v = fact(v); } return v; }
  function atom() {
    const x = next();
    if (x === undefined) throw 0;
    if (/^[\d.]/.test(x)) return parseFloat(x);
    if (x === '(') { const v = expr(); if (next() !== ')') throw 0; return v; }
    if (F[x]) { if (next() !== '(') throw 0; const v = expr(); if (next() !== ')') throw 0; return F[x](v); }
    if (x in K) return K[x];
    throw 0;
  }
  const v = expr();
  if (i < t.length) throw 0;
  return v;
}
function toExpr(s) {
  const n = '(\\d+(?:\\.\\d+)?)';
  s = s.toLowerCase().replace(/ё/g, 'е').replace(/(\d),(\d)/g, '$1.$2');
  s = s.replace(new RegExp(n + '\\s*(?:%|процент\\w*)\\s*от\\s*' + n, 'g'), '($1/100*$2)')
       .replace(/корень\s+(?:квадратный\s+)?из\s+(\d+(?:\.\d+)?|\([^)]*\))/g, 'sqrt($1)')
       .replace(/плюс/g, '+').replace(/минус/g, '-')
       .replace(/(?:умножить|умножь|помножить)\s+на/g, '*')
       .replace(/(?:разделить|раздели|поделить|подели)\s+на/g, '/')
       .replace(/в\s+квадрате/g, '^2').replace(/в\s+кубе/g, '^3').replace(/в\s+степени/g, '^')
       .replace(/[×·]/g, '*').replace(/[÷:]/g, '/')
       .replace(/(\d)\s*[xх]\s*(?=[\d(])/g, '$1*');
  return s.replace(/[^0-9a-zπ+\-*/^%!().\s]/g, ' ').trim();
}
const hasMath = s => /\d/.test(s) && /[-+*/^%!]|[a-z]\s*\(/.test(s);
const fmt = v => (+v.toFixed(10)).toLocaleString('ru', {maximumFractionDigits:10});

function calcBot(text) {
  const t = text.toLowerCase();
  if (/^(привет|здравствуй)/.test(t)) return 'Привет! Присылай пример 🧮';
  if (/помощь|что умеешь|help/.test(t)) return 'Умею: + − × ÷, степени (2^10), скобки, %, факториал (5!), sqrt, sin, cos, tan, ln, log, pi. Можно словами: «15% от 200», «корень из 81», «7 умножить на 8».';
  if (/спасибо/.test(t)) return 'Обращайся! 🙂';
  const s = toExpr(text);
  if (!hasMath(s)) return /\d/.test(s) ? 'Это просто число 🙂 Добавь действие, например: ' + s + ' * 2' : 'Я понимаю только примеры. Напиши, например: 12*(3+4)';
  try {
    const v = calcParse(s);
    if (!isFinite(v)) return 'Результат не определён: на ноль делить нельзя 🙅';
    return s.replace(/\s+/g, ' ') + ' = ' + fmt(v);
  } catch (e) { return 'Не смог разобрать пример. Попробуй так: 12*(3+4)'; }
}

/* ================= ИИ: собеседник Ева ================= */
const LP = {};
function pick(arr, key) {
  let i; do { i = Math.floor(Math.random() * arr.length); } while (arr.length > 1 && i === LP[key]);
  LP[key] = i; return arr[i];
}
const JOKES = [
  'Почему программисты путают Хэллоуин и Рождество? Потому что 31 OCT = 25 DEC 🎃',
  'Жена программисту: «Купи батон, а если будут яйца, возьми десяток». Он вернулся с десятью батонами: яйца были 🥖',
  'Тестировщик зашёл в бар и заказал 1 пиво, 0 пив, -1 пиво, ящерицу. Бар вспыхнул, когда первый клиент спросил, где туалет 🍺'
];
function evaReply(raw) {
  const u = me(), KEY = 'eva_' + u.email, S = st.get(KEY, {});
  const t = raw.toLowerCase().replace(/ё/g, 'е').trim(), d = new Date(), nm = S.name ? ', ' + S.name : '';
  const h = d.getHours(), part = h < 6 ? 'Доброй ночи' : h < 12 ? 'Доброе утро' : h < 18 ? 'Добрый день' : 'Добрый вечер';
  let m;

  const ce = toExpr(t);
  if (hasMath(ce) && !/привет/.test(t)) {
    try { const v = calcParse(ce);
      if (isFinite(v)) return pick([`Это легко: ${fmt(v)}`, `Получается ${fmt(v)}. А для сложных примеров есть Калькулятор 🧮`, `${fmt(v)}. Считать люблю 😄`], 'm');
    } catch (e) {}
  }
  const app = document.getElementById('app');
const $ = id => document.getElementById(id);

/* ================= Supabase ================= */
const SB_URL = 'https://capmrkvpqgajrmuryxak.supabase.co';
const SB_KEY = 'sb_publishable_MmV8k4mmJhxdTpY1fV-HsA_eagQzifs';
const sb = supabase.createClient(SB_URL, SB_KEY);

/* ================= Локальное хранилище (тема, боты) ================= */
const mem = {};
const st = {
  get(k, d) {
    try { const v = localStorage.getItem(k); if (v) return JSON.parse(v); } catch (e) {}
    return k in mem ? mem[k] : d;
  },
  set(k, v) { mem[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};

/* ================= Данные ================= */
const G = [['#7c5cff','#2fb8ff'],['#ff7ab6','#ff9a5c'],['#22c993','#2fb8ff'],['#f5b73b','#ff6b6b'],['#8e6cff','#ff7ab6']];
const BOTS = [
  {id:'calc', name:'Калькулятор', role:'ИИ · считает примеры', g:G[2], type:'bot',
   hi:'Привет! Я считаю любые примеры. Попробуй: 2+2*3, корень из 144, 15% от 200, 2^10, sin(30), 10!. Тригонометрия работает в градусах.'},
  {id:'eva', name:'Ева', role:'ИИ · собеседник', g:G[1], type:'bot',
   hi:'Привет! Я Ева 🙂 Можем поболтать: спрашивай про время, шутки, советы. А как тебя зовут?'}
];
const EM = ['😊','😂','😍','🥰','😎','🤔','😢','😡','👍','👎','👏','🙏','🔥','🎉','💡','❤️','💔','🤝','👀','🚀','⭐','✅','❌','🎁','☕','🍕','🎵','📞','⏰','🌙','☀️','🐱'];
const PAGES = ['home','login','register','chat','profile'];

/* ================= Утилиты ================= */
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const tm = ts => new Date(ts).toLocaleTimeString('ru', {hour:'2-digit', minute:'2-digit'});
let ME = null;                       // текущий пользователь {id, email, name, status, g}
const me = () => ME;
const go = p => { location.hash = p; };

function toast(t) {
  const d = document.createElement('div');
  d.className = 'toast'; d.textContent = t;
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 3200);
}
function av(name, g, size) {
  const ch = (Array.from((name || '?').trim())[0] || '?').toUpperCase();
  const s = size ? `width:${size}px;height:${size}px;font-size:${Math.round(size / 2.6)}px;` : '';
  return `<div class="av" style="background:linear-gradient(135deg,${g[0]},${g[1]});${s}">${esc(ch)}</div>`;
}
const trErr = m => /invalid login/i.test(m) ? 'Неверный email или пароль'
  : /already registered/i.test(m) ? 'Такой email уже зарегистрирован'
  : /rate limit/i.test(m) ? 'Слишком много попыток, подождите немного'
  : /fetch/i.test(m) ? 'Нет связи с сервером. Проверьте интернет и адрес проекта'
  : m;

/* ================= Тема ================= */
const themeNow = () => document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
function applyTheme() { const t = st.get('theme', null); if (t) document.documentElement.dataset.theme = t; }
function toggleTheme() {
  const t = themeNow() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = t;
  st.set('theme', t);
}

/* ================= ИИ: калькулятор ================= */
function calcParse(src) {
  const t = src.match(/\d+\.?\d*|\.\d+|[a-zπ]+|[-+*/^%!(),]/g) || [];
  let i = 0;
  const peek = () => t[i], next = () => t[i++];
  const deg = f => x => f(x * Math.PI / 180);
  const F = {sqrt:Math.sqrt, abs:Math.abs, ln:Math.log, log:Math.log10, exp:Math.exp, floor:Math.floor, ceil:Math.ceil, round:Math.round,
             sin:deg(Math.sin), cos:deg(Math.cos), tan:deg(Math.tan)};
  const K = {pi:Math.PI, 'π':Math.PI, e:Math.E};
  const fact = n => { if (n < 0 || n > 170 || n % 1) throw 0; let r = 1; for (let k = 2; k <= n; k++) r *= k; return r; };
  const imp = () => { const p = peek(); return p === '(' || (p !== undefined && /^[a-zπ]/.test(p)); };

  function expr() { let v = term(); while (peek() === '+' || peek() === '-') v = next() === '+' ? v + term() : v - term(); return v; }
  if ((m = t.match(/(?:меня зовут|мое имя|зови меня)\s+([а-яa-z]{2,15})/))) {
    S.name = m[1][0].toUpperCase() + m[1].slice(1); st.set(KEY, S);
    return pick([`Приятно познакомиться, ${S.name}! 🤝`, `${S.name} — отличное имя! Запомнила 😊`, `Очень рада, ${S.name}! О чём поболтаем?`], 'nm');
  }
  const R = [
    [/как меня зовут|помнишь мое имя/, () => S.name ? pick([`Тебя зовут ${S.name} 😉`, `Конечно помню, ${S.name}!`], 'wn') : 'Пока не знаю. Скажи: «меня зовут ...» 🙂'],
    [/^(привет|здравствуй|хай|ку|добрый|доброе|hello|hi)/, () => pick([`${part}${nm}! Рада тебя видеть 😊`, `Привет${nm}! Как настроение?`, `Хэй${nm}! О чём поболтаем?`], 'hi')],
    [/как (у тебя )?дела|как ты|как жизнь|как настроение/, () => pick(['Отлично, ведь ты написал! А у тебя как?', 'Всё хорошо, пока мне есть с кем поговорить 😊 Как ты?', 'Бодро! Работаю без перерывов и без кофе ☕ А ты как?'], 'ok')],
    [/как тебя зовут|кто ты|ты кто|твое имя/, () => pick(['Я Ева, ИИ-собеседник Pulse 🤖 Живу прямо в этом чате.', 'Меня зовут Ева. Я виртуальный собеседник и люблю поболтать 🙂'], 'who')],
    [/который час|сколько времени|сколько время|время сейчас/, () => `Сейчас ${d.toLocaleTimeString('ru', {hour:'2-digit', minute:'2-digit'})} ⏰`],
    [/какое сегодня число|какой сегодня день|какая сегодня дата|какое число|день недели|какой день/, () => `Сегодня ${d.toLocaleDateString('ru', {weekday:'long', day:'numeric', month:'long', year:'numeric'})} 📅`],
    [/анекдот|шутк|рассмеши/, () => pick(JOKES, 'j')],
    [/монет/, () => `Подбрасываю… ${Math.random() < .5 ? 'Орёл 🦅' : 'Решка 🪙'}`],
    [/кубик|кости/, () => `Выпало: ${1 + Math.floor(Math.random() * 6)} 🎲`],
    [/случайн\w* числ/, () => {
      let a = 0, b = 100; const n = t.match(/от\s*(-?\d+)\s*до\s*(-?\d+)/);
      if (n) { a = +n[1]; b = +n[2]; if (a > b) [a, b] = [b, a]; }
      return `Моё число: ${a + Math.floor(Math.random() * (b - a + 1))} 🎯`;
    }],
    [/спасибо|благодар/, () => pick(['Всегда пожалуйста! 😊', 'Рада помочь!', 'Обращайся, мне приятно 🙂'], 'th')],
    [/^(пока|до свидания|споки|удачи|до встречи)/, () => pick([`Пока${nm}! Заходи ещё 👋`, 'До встречи! Было приятно поболтать 🙂'], 'by')],
    [/что (ты )?умеешь|что ты можешь|помощь|help/, () => 'Я умею болтать, называть время и дату, шутить, подбрасывать монетку и кубик, выдавать случайные числа и запоминать твоё имя. Для сложных примеров лучше Калькулятор 🧮'],
    [/грустн|плохо мне|устал|тоскл|одинок|бесит|злюсь|тревож/, () => pick([`Мне жаль это слышать${nm}. Хочешь рассказать, что случилось?`, 'Такое бывает. Давай по порядку: что тебя расстроило больше всего?', 'Я рядом 🤗 Иногда помогает просто выговориться. Слушаю.'], 'sad')],
    [/отличн|круто|классн|супер|я рад|ура/, () => pick(['Здорово! Расскажи, что случилось 🎉', 'Вот это настроение! Делись подробностями 😄'], 'happy')],
    [/^(ха|аха)+(\s|!|$)|^лол|😂/, () => pick(['Рада, что рассмешила 😄', 'Ха-ха, ну да! 😂'], 'lol')],
    [/погод/, () => 'У меня нет окна в мир, так что погоды не знаю. Загляни в приложение погоды 🌦'],
    [/сколько тебе лет|твой возраст/, () => 'Я родилась, когда ты открыл этот чат, так что совсем юная 🍼'],
    [/ты (бот|человек|живая|настоящая|робот)/, () => 'Я программа, ИИ-собеседник. Но разговариваю с интересом 🙂'],
    [/посоветуй|что делать|как быть/, () => pick(['Начни с самого маленького шага: часто это запускает всё остальное.', 'Выпиши плюсы и минусы, а потом спроси себя, чего ты хочешь на самом деле.', 'Дай себе ночь на размышления. Утром решение обычно виднее 🌙'], 'adv')],
    [/^(да|ага|угу|конечно)\W*$/, () => pick(['Отлично! Расскажи подробнее 🙂', 'Понятно. А что дальше?'], 'y')],
    [/^(нет|неа)\W*$/, () => pick(['Ясно. А почему так?', 'Хорошо, понимаю. Что тогда?'], 'n')]
  ];
  for (const [re, fn] of R) if (re.test(t)) return fn();

  const q = /\?|^(почему|зачем|как|что|кто|где|когда|сколько|какой|какая|какие|можно|можешь|умеешь|будешь)\b/.test(t);
  if (q) {
  if (/^(почему|зачем)/.test(t)) return pick(['Обычно за этим стоит несколько причин. Какую ты подозреваешь?', 'Хороший вопрос! Я бы начала с самого простого объяснения. А у тебя есть догадки?', 'Многое зависит от контекста. Расскажи детали, разберёмся вместе.'], 'why');
    if (/^как\b/.test(t)) return pick(['Лучше всего двигаться по шагам. С какого начнём?', 'Есть несколько способов. Что для тебя важнее: скорость или качество?'], 'how');
    if ((m = t.match(/^что такое\s+(.+?)\??$/))) return `«${m[1]}» — тема непростая, и точного определения у меня нет. Расскажи, где ты это встретил, и разберёмся 🔍`;
    if (/^(можешь|умеешь|будешь)/.test(t)) return pick(['Постараюсь! Объясни, что именно нужно.', 'Давай попробуем, говори 🙂'], 'can');
    return pick(['Хороший вопрос. Сначала скажи, что думаешь ты?', 'Не уверена, что знаю точный ответ, но давай порассуждаем вместе.', 'Интересно! А почему ты об этом спросил?'], 'q');
  }
  const w = t.split(/[^а-яa-z]+/).filter(x => x.length > 4).sort((a, b) => b.length - a.length)[0];
  return w
    ? pick([`Интересно про «${w}». Что тебя в этом зацепило?`, `Расскажи подробнее про «${w}» 🙂`, `Понимаю. А как ты к этому пришёл${nm}?`], 'e')
    : pick(['Понимаю 🙂 Продолжай', 'Угу, слушаю тебя', 'Расскажи ещё']);
}

/* ================= Данные с сервера ================= */
let C = {}, FR = [], MS = {}, cid = null, U = {}, typ = {}, rt = null;
const saveC = () => { if (ME) st.set('c_' + ME.email, C); };
const isBot = id => BOTS.some(b => b.id === id);
const msgsOf = id => (isBot(id) ? C : MS)[id] || [];
function addBot(id, m) { (C[id] = C[id] || []).push(m); saveC(); return m; }
function resetState() {
  C = {}; FR = []; MS = {}; cid = null; U = {}; typ = {}; ME = null;
  if (rt) { sb.removeChannel(rt); rt = null; }
}
function contacts() {
  return BOTS.concat(FR.map(f => ({id:f.id, name:f.name, role:'Друг · ' + f.status, g:G[f.g] || G[0], type:'friend'})));
}
const normMsg = r => ({id:r.id, m:r.sender === ME.id ? 1 : 0, t:r.body, ts:Date.parse(r.created_at)});
function pushMsg(r) {
  const o = r.sender === ME.id ? r.receiver : r.sender;
  const a = MS[o] = MS[o] || [];
  if (a.some(x => x.id === r.id)) return null;
  const m = normMsg(r); a.push(m);
  return {o, m};
}
async function loadFriends() {
  const {data:fr} = await sb.from('friends').select('friend_id').eq('user_id', ME.id);
  const ids = (fr || []).map(x => x.friend_id);
  if (!ids.length) { FR = []; return; }
  const {data:ps} = await sb.from('profiles').select('id,name,status,g').in('id', ids);
  FR = ps || [];
}
async function loadMsgs() {
  const {data} = await sb.from('messages').select('*')
    .or(`sender.eq.${ME.id},receiver.eq.${ME.id}`).order('created_at').limit(1000);
  MS = {}; (data || []).forEach(pushMsg);
}
function subscribe() {
  if (rt) sb.removeChannel(rt);
  rt = sb.channel('pulse-' + ME.id)
    .on('postgres_changes', {event:'INSERT', schema:'public', table:'messages', filter:'receiver=eq.' + ME.id}, p => {
      const x = pushMsg(p.new);
      if (!x || !$('list')) return;
      if (x.o === cid) addMsg(x.m); else U[x.o] = (U[x.o] || 0) + 1;
      refreshList();
    })
    .on('postgres_changes', {event:'INSERT', schema:'public', table:'friends', filter:'user_id=eq.' + ME.id}, async () => {
      await loadFriends(); refreshList();
    })
    .subscribe();
}
async function enter(user) {
  const {data:p} = await sb.from('profiles').select('*').eq('id', user.id).single();
  ME = {id:user.id, email:user.email, name:p ? p.name : 'Без имени', status:p ? p.status : 'На связи', g:p ? p.g : 0};
  await Promise.all([loadFriends(), loadMsgs()]);
  subscribe();
}
async function addFriendById(id) {
  id = (id || '').trim();
  if (!/^[0-9a-f-]{36}$/i.test(id)) { toast('Неверная ссылка приглашения'); return false; }
  if (id === ME.id) { toast('Это ваша собственная ссылка 🙂'); return false; }
  const {error} = await sb.rpc('add_friend', {friend:id});
  if (error) { toast(/not found/.test(error.message) ? 'Пользователь не найден' : 'Не удалось добавить друга'); return false; }
  await loadFriends();
  toast('Друг добавлен 🎉');
  return true;
}
function invite() {
  const link = location.href.split('#')[0] + '#join=' + ME.id;
  const m = document.createElement('div');
  m.className = 'modal';
  m.innerHTML = `<div class="card">
    <div class="fx sb"><h2 style="font-size:22px">Пригласить друга</h2><button class="btn ic" data-act="close">✕</button></div>
    <div class="mut" style="font-size:14px;line-height:1.5">Отправьте ссылку другу. Когда он зарегистрируется или войдёт по ней, вы появитесь в списках друг у друга.</div>
    <input id="lk" readonly value="${esc(link)}">
    <div class="fx"><button class="btn p grow" data-act="copy">Копировать</button>${navigator.share ? '<button class="btn grow" data-act="share">Поделиться</button>' : ''}</div>
    <label>Добавить друга по ссылке<input id="al" placeholder="Вставьте ссылку приглашения"></label>
    <button class="btn" data-act="addlink">Добавить</button></div>`;
  document.body.appendChild(m);
}

/* ================= Главная ================= */
const blobs = '<div class="bg"><i style="width:380px;height:380px;background:#7c5cff;top:-100px;left:-100px"></i><i style="width:340px;height:340px;background:#2fb8ff;bottom:-80px;right:-80px"></i></div>';
const logo = '<a class="logo" href="#home"><span class="lg">💬</span>Pulse</a>';
const tbtn = '<button class="btn ic" data-act="theme" title="Тема">🌓</button>';
function nav() {
  return `<nav class="nav">${logo}<div class="fx">${tbtn}${ME
    ? '<a class="btn p" href="#chat">Открыть чат</a>'
    : '<a class="btn" href="#login">Войти</a><a class="btn p" href="#register">Регистрация</a>'}</div></nav>`;
}
function home() {
  app.innerHTML = `${blobs}${nav()}
  <section class="hero">
    <div class="tx">
      <h1>Общайся <span class="g">быстро</span> и красиво</h1>
      <p>Pulse — веб-мессенджер с ИИ-собеседниками: калькулятор считает любые примеры, а Ева поддержит разговор. Приглашай друзей по ссылке и пиши им с любого устройства.</p>
      <div class="fx" style="flex-wrap:wrap"><a class="btn p" href="#register">Начать бесплатно</a><a class="btn" href="#login">У меня есть аккаунт</a></div>
    </div>
    <div class="mock">
      <div class="b t" style="animation-delay:.2s">Сколько будет 15% от 240?</div>
      <div class="b m" style="animation-delay:1s">36 🧮</div>
      <div class="b t" style="animation-delay:1.8s">Расскажи анекдот</div>
      <div class="b m" style="animation-delay:2.6s">Жена программисту: «Купи батон…» 🥖</div>
    </div>
  </section>
  <section class="feats">
    <div class="feat"><span>🧮</span><b>ИИ-калькулятор</b><small>Скобки, степени, проценты и обычные слова вместо знаков.</small></div>
    <div class="feat"><span>🤖</span><b>Ева</b><small>Понимает вопросы, помнит имя и отвечает каждый раз по-новому.</small></div>
    <div class="feat"><span>🔗</span><b>Друзья по ссылке</b><small>Отправь приглашение, и друг окажется в твоём списке чатов.</small></div>
  </section>`;
}

/* ================= Вход и регистрация ================= */
function auth(p) {
  const reg = p === 'register', pend = st.get('pend', null);
  app.innerHTML = `${blobs}${nav()}<div class="auth"><form class="card" id="f" novalidate>
    <h2>${reg ? 'Создать аккаунт' : 'С возвращением'}</h2>
    <div class="mut" style="font-size:14px">${pend ? 'Вас пригласили в Pulse 🎉 Войдите, чтобы добавить друга' : reg ? 'Это займёт меньше минуты' : 'Войдите, чтобы продолжить'}</div>
    ${reg ? '<label>Имя<input name="name" placeholder="Как вас зовут?" autocomplete="name"></label>' : ''}
    <label>Email<input name="email" type="email" placeholder="you@mail.com" autocomplete="email"></label>
    <label>Пароль<input name="pass" type="password" placeholder="Минимум 6 символов" autocomplete="${reg ? 'new-password' : 'current-password'}"></label>
    ${reg ? '<label>Повторите пароль<input name="pass2" type="password" autocomplete="new-password"></label>' : ''}
    <div class="err" id="err"></div>
    <button class="btn p" type="submit">${reg ? 'Зарегистрироваться' : 'Войти'}</button>
    <div class="mut" style="font-size:14px;text-align:center">${reg
      ? 'Уже есть аккаунт? <a class="g" href="#login"><b>Войти</b></a>'
      : 'Нет аккаунта? <a class="g" href="#register"><b>Регистрация</b></a>'}</div>
  </form></div>`;

  $('f').onsubmit = async e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target)), er = $('err'), btn = e.target.querySelector('button[type=submit]');
    const email = (d.email || '').trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email)) return er.textContent = 'Введите корректный email';
    if ((d.pass || '').length < 6) return er.textContent = 'Пароль должен быть не короче 6 символов';
    if (reg) {
      if ((d.name || '').trim().length < 2) return er.textContent = 'Введите имя';
      if (d.pass !== d.pass2) return er.textContent = 'Пароли не совпадают';
    }
    btn.disabled = true; er.textContent = '';
    let r;
    try {
      r = reg
        ? await sb.auth.signUp({email, password:d.pass, options:{data:{name:d.name.trim()}}})
        : await sb.auth.signInWithPassword({email, password:d.pass});
    } catch (x) { r = {error:{message:String(x.message || x)}}; }
    btn.disabled = false;
    if (r.error) return er.textContent = trErr(r.error.message);
    if (!r.data.session) return er.textContent = 'Нужно подтвердить почту (или отключите Confirm email в Supabase)';
    await enter(r.data.user);
    const pc = st.get('pend', null);
    if (pc) { st.set('pend', null); await addFriendById(pc); }
    go('chat');
  };
}

/* ================= Чат ================= */
function listHtml(q) {
  const items = contacts().filter(c => c.name.toLowerCase().includes(q.trim().toLowerCase()));
  if (!items.length) return '<div class="hint">Ничего не найдено</div>';
  let html = items.map(c => {
    const l = msgsOf(c.id).slice(-1)[0];
    const prev = typ[c.id] ? 'печатает…' : l ? (l.m ? 'Вы: ' : '') + esc(l.t) : esc(c.role);
    return `<div class="row ${c.id === cid ? 'on' : ''}" data-id="${c.id}">${av(c.name, c.g)}
      <div class="grow">
        <div class="fx sb"><b class="ell">${esc(c.name)}</b><small>${l ? tm(l.ts) : ''}</small></div>
        <div class="fx sb"><span class="mut ell" style="font-size:14px">${prev}</span>${U[c.id] ? `<i class="bd">${U[c.id]}</i>` : ''}</div>
      </div></div>`;
  }).join('');
  if (!FR.length && !q) html += '<div class="hint">Пригласите друга кнопкой 🔗 вверху</div>';
  return html;
}
function refreshList() { const l = $('list'), q = $('q'); if (l && q) l.innerHTML = listHtml(q.value); }
const setSub = t => { const s = $('sub'); if (s) s.textContent = t; };
const msgHtml = (m, isNew) => `<div class="msg ${m.m ? 'me' : 'th'}${isNew ? ' new' : ''}">${esc(m.t)}<small>${tm(m.ts)}</small></div>`;
function addMsg(m) {
  const box = $('msgs');
  if (!box) return;
  box.insertAdjacentHTML('beforeend', msgHtml(m, true));
  box.scrollTop = box.scrollHeight;
}

function winHtml() {
  if (!cid) return '<div class="empty"><span>💬</span><b style="font-size:20px;color:var(--text)">Выберите чат</b><div>и начните общение</div></div>';
  const c = contacts().find(x => x.id === cid);
  if (!c) return '';
  const bot = c.type === 'bot';
  const sub = typ[cid] ? 'печатает…' : bot ? 'ИИ · в сети' : 'друг';
  return `<div class="wh"><button class="btn ic back" data-act="back">←</button>${av(c.name, c.g)}
    <div class="grow"><b class="ell">${esc(c.name)}</b><div class="mut" id="sub" style="font-size:13px">${sub}</div></div>
    ${bot ? '<button class="btn ic" data-act="clear" title="Очистить чат">🗑</button>' : ''}</div>
    <div class="msgs" id="msgs">${msgsOf(cid).map(m => msgHtml(m)).join('')}</div>
    <form class="comp" id="cf">
    <div class="ep" id="ep" hidden>${EM.map(e => `<button type="button" data-em="${e}">${e}</button>`).join('')}</div>
      <button type="button" class="btn ic" data-act="emoji">😊</button>
      <input id="inp" placeholder="Напишите сообщение…" autocomplete="off">
      <button class="btn p" type="submit">➤</button>
    </form>`;
}

function chat() {
  C = st.get('c_' + ME.email, {});
  BOTS.forEach(b => { if (!C[b.id] || !C[b.id].length) C[b.id] = [{m:0, t:b.hi, ts:Date.now()}]; });
  saveC();
  app.innerHTML = `<div class="chat" id="ch">
    <aside>
      <div class="ah">
        <div class="fx sb">
          <a class="fx" href="#profile" style="min-width:0">${av(ME.name, G[ME.g] || G[0], 40)}
            <div style="min-width:0"><b>${esc(ME.name)}</b><div class="mut ell" style="font-size:12px;max-width:130px">${esc(ME.status)}</div></div></a>
          <div class="fx">${tbtn}<button class="btn ic" data-act="invite" title="Пригласить друга">🔗</button><button class="btn ic" data-act="out" title="Выйти">⎋</button></div>
        </div>
        <input id="q" placeholder="🔍 Поиск">
      </div>
      <div class="list" id="list">${listHtml('')}</div>
    </aside>
    <section class="win" id="win">${winHtml()}</section>
  </div>`;
  bindWin();
  $('q').oninput = refreshList;
}

function bindWin() {
  const f = $('cf');
  if (!f) return;
  const box = $('msgs');
  box.scrollTop = box.scrollHeight;
  f.onsubmit = e => {
    e.preventDefault();
    const i = $('inp'), t = i.value.trim();
    if (!t) return;
    i.value = '';
    $('ep').hidden = true;
    send(t);
  };
}

function openChat(id) {
  cid = id; U[id] = 0;
  $('win').innerHTML = winHtml();
  $('ch').classList.add('open');
  refreshList(); bindWin();
  if (matchMedia('(min-width:761px)').matches) { const i = $('inp'); if (i) i.focus(); }
}

async function send(t) {
  const id = cid, email = ME.email;
  if (isBot(id)) {
    addMsg(addBot(id, {m:1, t, ts:Date.now()}));
    refreshList();
    typ[id] = 1; setSub('печатает…'); refreshList();
    const out = id === 'calc' ? calcBot(t) : evaReply(t);
    setTimeout(() => {
      typ[id] = 0;
      if (!ME || ME.email !== email) return;
      const r = addBot(id, {m:0, t:out, ts:Date.now()});
      if (cid === id && $('msgs')) { addMsg(r); setSub('ИИ · в сети'); } else U[id] = (U[id] || 0) + 1;
      refreshList();
    }, id === 'calc' ? 400 : 700 + Math.min(t.length * 25, 1200));
  } else {
    const {data, error} = await sb.from('messages').insert({sender:ME.id, receiver:id, body:t}).select().single();
    if (error) return toast('Не удалось отправить сообщение');
    const x = pushMsg(data);
    if (x && cid === id) addMsg(x.m);
    refreshList();
  }
}

/* ================= Профиль ================= */
function profile() {
  const u = ME;
  app.innerHTML = `${blobs}${nav()}<div class="auth"><form class="card" id="pf" style="max-width:440px">
    <div class="fx" style="flex-direction:column;gap:8px"><div id="pav">${av(u.name, G[u.g] || G[0], 88)}</div>
      <span class="mut" style="font-size:14px">${esc(u.email)}</span></div>
    <label>Имя<input name="name" id="pn" value="${esc(u.name)}"></label>
    <label>Статус<input name="status" value="${esc(u.status)}" maxlength="40"></label>
    <label>Цвет аватара<div class="sw">${G.map((g, i) =>
      `<i data-g="${i}" class="${i === u.g ? 'on' : ''}" style="background:linear-gradient(135deg,${g[0]},${g[1]})"></i>`).join('')}</div></label>
    <div class="err" id="err"></div>
    <button class="btn p" type="submit">Сохранить</button>
    <button type="button" class="btn" data-act="invite">🔗 Пригласить друга</button>
    <a class="btn" href="#chat" style="text-align:center">← Вернуться в чат</a>
    <button type="button" class="btn" data-act="out" style="color:#ff4d6d">Выйти из аккаунта</button>
  </form></div>`;

  let g = u.g;
  const preview = () => { $('pav').innerHTML = av($('pn').value || u.name, G[g] || G[0], 88); };
  $('pn').oninput = preview;
  document.querySelector('.sw').onclick = e => {
    const i = e.target.closest('i');
    if (!i) return;
    g = +i.dataset.g;
    document.querySelectorAll('.sw i').forEach(x => x.classList.toggle('on', +x.dataset.g === g));
    preview();
  };
  $('pf').onsubmit = async e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    if (d.name.trim().length < 2) return $('err').textContent = 'Имя слишком короткое';
    const nu = {name:d.name.trim(), status:d.status.trim() || 'На связи', g};
    const {error} = await sb.from('profiles').update(nu).eq('id', ME.id);
    if (error) return $('err').textContent = 'Не удалось сохранить, попробуйте ещё раз';
    Object.assign(ME, nu);
    go('chat');
  };
}

/* ================= Клики ================= */
document.addEventListener('click', async e => {
  const ep = $('ep');
  if (ep && !e.target.closest('#ep') && !e.target.closest('[data-act="emoji"]')) ep.hidden = true;

  if (e.target.classList.contains('modal')) return e.target.remove();
  const em = e.target.closest('[data-em]');
  if (em) {
    const i = $('inp'), s = i.selectionStart == null ? i.value.length : i.selectionStart, en = i.selectionEnd == null ? s : i.selectionEnd;
    i.value = i.value.slice(0, s) + em.dataset.em + i.value.slice(en);
    i.focus(); i.setSelectionRange(s + em.dataset.em.length, s + em.dataset.em.length);
    return;
  }
  const row = e.target.closest('.row[data-id]');
  if (row) return openChat(row.dataset.id);

  const a = e.target.closest('[data-act]');
  if (!a) return;
  const k = a.dataset.act;
  if (k === 'theme') toggleTheme();
  if (k === 'out') { await sb.auth.signOut(); resetState(); go('home'); }
  if (k === 'back') { cid = null; $('ch').classList.remove('open'); $('win').innerHTML = winHtml(); refreshList(); }
  if (k === 'emoji') $('ep').hidden = !$('ep').hidden;
  if (k === 'invite') invite();
  if (k === 'close') document.querySelector('.modal').remove();
  if (k === 'clear' && confirm('Очистить этот чат?')) { C[cid] = []; saveC(); $('msgs').innerHTML = ''; refreshList(); }
  if (k === 'copy') {
    const l = $('lk'); l.select();
    (navigator.clipboard ? navigator.clipboard.writeText(l.value) : Promise.reject())
      .then(() => toast('Ссылка скопирована ✅'))
      .catch(() => { try { document.execCommand('copy'); toast('Ссылка скопирована ✅'); } catch (er) { toast('Скопируйте ссылку вручную'); } });
  }
  if (k === 'share') navigator.share({title:'Pulse', text:'Присоединяйся ко мне в Pulse', url:$('lk').value}).catch(() => {});
  if (k === 'addlink') {
    const v = $('al').value, j = v.indexOf('join=');
    if (j < 0) return toast('Вставьте ссылку приглашения');
    if (await addFriendById(v.slice(j + 5))) { document.querySelector('.modal').remove(); refreshList(); }
  }
});

/* ================= Роутер и запуск ================= */
async function route() {
  const h = (location.hash || '#home').slice(1);
  if (h.startsWith('join=')) {                       // открыта ссылка-приглашение
    const code = h.slice(5);
    history.replaceState(null, '', ME ? '#chat' : '#register');
    if (ME) await addFriendById(code); else st.set('pend', code);
    return route();
  }
  const p = PAGES.includes(h) ? h : 'home';
  if (!ME && (p === 'chat' || p === 'profile')) return go('login');
  if (ME && (p === 'login' || p === 'register')) return go('chat');
  if (p !== 'chat') cid = null;
  ({home, login:auth, register:auth, chat, profile})[p](p);
}

(async () => {
  applyTheme();
  app.innerHTML = '<div class="empty"><span>💬</span>Загрузка…</div>';
  try {
    const {data} = await sb.auth.getSession();
    if (data.session) await enter(data.session.user);
  } catch (e) {}
  addEventListener('hashchange', route);
  route();
})();
