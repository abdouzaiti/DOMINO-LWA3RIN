/* ═══════════════════════════════════════════════════════════
   DOMINO LWA3RIN — app.js  v2.0
   Developed by Zaiti Abderrahmane

   NEW in v2:
   • Board colour fix (applies live)
   • AI difficulty: Easy / Medium / Hard
   • Game rules: Draw Mode (100-pt match) / Block Mode
   • Turn timer with SVG ring
   • In-game chat with quick-phrase buttons
   • Realistic domino sounds (Web Audio)
   • 3 languages: English / French / Arabic (RTL)
   ═══════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────────────
   1. TRANSLATIONS
   ───────────────────────────────────────────────────────── */
var I18N = {
  en: {
    subtitle:'DOUBLE-SIX DOMINO', play:'▶  PLAY', howto:'📖 How to Play',
    settings:'⚙️ Settings', back:'Back', selectMode:'SELECT MODE',
    vsAI:'1 vs AI', vsAIDesc:'Play against the computer.',
    localMulti:'Local Multiplayer', localMultiDesc:'2–4 players, pass the phone between turns.',
    selectRules:'GAME RULES', drawMode:'Draw Mode', drawModeDesc:'Draw from boneyard. First to 100 pts wins the match!',
    blockMode:'Block Mode', blockModeDesc:'No drawing. Pass if stuck. Lowest pips wins.',
    difficulty:'AI DIFFICULTY', easy:'Easy', easyDesc:'AI plays randomly. Great for beginners.',
    medium:'Medium', mediumDesc:'AI prefers doubles and high tiles.',
    hard:'Hard', hardDesc:'AI plays optimally. Experts only.',
    howManyPlayers:'HOW MANY PLAYERS?', passDevice:'Each player takes turns on this device',
    playerNames:'PLAYER NAMES', playerNamesDesc:'Customize your player names (optional)',
    startGame:'START GAME ▶', howToPlay:'HOW TO PLAY',
    rule1:'Each player draws 7 tiles (5 for 4 players). Rest = boneyard.',
    rule2:'Highest double tile starts. No doubles? Highest pip sum first.',
    rule3:'Match a tile side to an open end of the board chain.',
    rule4:'Draw Mode: draw from boneyard when you can\'t play.',
    rule5:'Block Mode: no drawing — pass if stuck.',
    rule6:'Draw Mode: earn points = loser pip totals. First to 100 wins!',
    rule7:'Block Mode: lowest pip count wins the round.',
    soundLbl:'🔊 Sound Effects', timerLbl:'⏱ Turn Timer', timerDurLbl:'⏱ Timer Duration',
    boardColor:'🎨 Board Color', languageLbl:'🌐 Language',
    colorForest:'Forest', colorNavy:'Navy', colorMaroon:'Maroon', colorSlate:'Slate', colorPurple:'Purple',
    yourTurn:'YOUR TURN', passHint:'Pass the device, then tap to reveal your hand',
    revealHand:'REVEAL MY HAND 👁', paused:'PAUSED', resume:'▶ Resume',
    restart:'🔄 Restart', mainMenu:'🏠 Main Menu', whichEnd:'WHICH END?',
    left:'Left', right:'Right', cancel:'Cancel', pass:'⏭ PASS',
    tilesLbl:'TILES', draw:'DRAW', tapToStart:'TAP A TILE OR DRAG HERE\nTO START',
    nextRound:'▶ Next Round', victory:'VICTORY!', scoreboard:'SCOREBOARD',
    rematch:'🔄 Rematch', yoursTurn:'\'s turn',
    aiThinking:'🤖 AI THINKING...', aiDraws:'🤖 AI draws...',
    aiPasses:'🤖 AI passes!', aiPlays:'🤖 AI plays',
    drew:'🎴 Drew', noFit:'❌ This tile does not fit!',
    noFitEnd:'❌ Does not fit that end!', passed:'⏭ passed',
    goesFirst:'goes first!', roundOver:'ROUND OVER',
    winsRound:'wins the round!', earned:'Earned', pts:'pts',
    blockedWins:'wins (lowest pips, game blocked)',
    emptiedHand:'emptied their hand!', matchWinner:'MATCH WINNER!',
    winsMatch:'wins the match!', drawModeTag:'[DRAW]', blockModeTag:'[BLOCK]',
    quickPhrases:['Good move! 👏','Nice one! 🎯','Lucky! 😄','Uh oh... 😅','Domino! 🎴','Let\'s go! 💪'],
    players:' players', eachTurns:'Each player takes turns',
    teamA:'Team A', teamB:'Team B',
    team2v2:'2 vs 2 Teams', team2v2Desc:'Players 1&3 vs Players 2&4. Share scores!',
    chooseStarter:'Who starts next round?', youStart:'I\'ll start', partnerStart:'Partner starts',
    teamWins:'TEAM WINS!', teamScore:'Team Score',
    winsRoundFor:'wins the round for',
    partnersScore:'Your team earns',
    pipExhausted:'All [N] tiles are played — board is closed!',
    pipWins:'wins (pip [N] exhausted — lowest hand wins)'
  },
  fr: {
    subtitle:'DOMINO DOUBLE-SIX', play:'▶  JOUER', howto:'📖 Comment Jouer',
    settings:'⚙️ Paramètres', back:'Retour', selectMode:'CHOISIR MODE',
    vsAI:'1 vs IA', vsAIDesc:'Jouer contre l\'ordinateur.',
    localMulti:'Multijoueur Local', localMultiDesc:'2–4 joueurs, passez le téléphone à chaque tour.',
    selectRules:'RÈGLES DU JEU', drawMode:'Mode Pioche', drawModeDesc:'Piochez si vous ne pouvez pas jouer. Premier à 100 pts gagne!',
    blockMode:'Mode Blocage', blockModeDesc:'Sans pioche. Passez si bloqué. Moins de pips gagne.',
    difficulty:'NIVEAU IA', easy:'Facile', easyDesc:'L\'IA joue aléatoirement.',
    medium:'Moyen', mediumDesc:'L\'IA préfère les doubles et les tuiles hautes.',
    hard:'Difficile', hardDesc:'L\'IA joue de façon optimale.',
    howManyPlayers:'COMBIEN DE JOUEURS ?', passDevice:'Chaque joueur joue à son tour sur cet appareil',
    playerNames:'NOMS DES JOUEURS', playerNamesDesc:'Personnalisez les noms (optionnel)',
    startGame:'COMMENCER ▶', howToPlay:'COMMENT JOUER',
    rule1:'Chaque joueur tire 7 tuiles (5 pour 4 joueurs). Le reste = pioche.',
    rule2:'Le double le plus haut commence. Sinon, le plus de pips commence.',
    rule3:'Associez un côté de votre tuile à une extrémité ouverte de la chaîne.',
    rule4:'Mode Pioche: piochez si vous ne pouvez pas jouer.',
    rule5:'Mode Blocage: sans pioche — passez si bloqué.',
    rule6:'Mode Pioche: gagnez des points = total des pips adverses. Premier à 100!',
    rule7:'Mode Blocage: le moins de pips gagne la manche.',
    soundLbl:'🔊 Effets Sonores', timerLbl:'⏱ Minuteur de Tour', timerDurLbl:'⏱ Durée du Minuteur',
    boardColor:'🎨 Couleur du Plateau', languageLbl:'🌐 Langue',
    colorForest:'Forêt', colorNavy:'Marine', colorMaroon:'Bordeaux', colorSlate:'Ardoise', colorPurple:'Violet',
    yourTurn:'VOTRE TOUR', passHint:'Passez l\'appareil, puis appuyez pour révéler votre main',
    revealHand:'RÉVÉLER MA MAIN 👁', paused:'PAUSE', resume:'▶ Reprendre',
    restart:'🔄 Recommencer', mainMenu:'🏠 Menu Principal', whichEnd:'QUEL CÔTÉ ?',
    left:'Gauche', right:'Droite', cancel:'Annuler', pass:'⏭ PASSER',
    tilesLbl:'TUILES', draw:'PIOCHER', tapToStart:'APPUYEZ OU GLISSEZ\nPOUR COMMENCER',
    nextRound:'▶ Manche Suivante', victory:'VICTOIRE !', scoreboard:'CLASSEMENT',
    rematch:'🔄 Revanche', yoursTurn:' joue',
    aiThinking:'🤖 IA RÉFLÉCHIT...', aiDraws:'🤖 IA pioche...',
    aiPasses:'🤖 IA passe !', aiPlays:'🤖 IA joue',
    drew:'🎴 Pioché', noFit:'❌ Cette tuile ne convient pas !',
    noFitEnd:'❌ Ne convient pas à ce côté !', passed:'⏭ a passé',
    goesFirst:'commence !', roundOver:'MANCHE TERMINÉE',
    winsRound:'gagne la manche !', earned:'Gagné', pts:'pts',
    blockedWins:'gagne (moins de pips, jeu bloqué)',
    emptiedHand:'a vidé sa main !', matchWinner:'VAINQUEUR DU MATCH !',
    winsMatch:'gagne le match !', drawModeTag:'[PIOCHE]', blockModeTag:'[BLOCAGE]',
    quickPhrases:['Bien joué! 👏','Bravo! 🎯','Chanceux! 😄','Aïe... 😅','Domino! 🎴','Allez! 💪'],
    players:' joueurs', eachTurns:'Chaque joueur à son tour',
    teamA:'Équipe A', teamB:'Équipe B',
    team2v2:'2 vs 2 Équipes', team2v2Desc:'Joueurs 1&3 vs Joueurs 2&4. Scores partagés!',
    chooseStarter:'Qui commence la prochaine manche?', youStart:'Je commence', partnerStart:'Mon partenaire commence',
    teamWins:'ÉQUIPE GAGNE!', teamScore:'Score Équipe',
    winsRoundFor:'gagne la manche pour',
    partnersScore:'Votre équipe gagne',
    pipExhausted:'Toutes les tuiles [N] sont jouées — plateau fermé!',
    pipWins:'gagne (pip [N] épuisé — moins de pips gagne)'
  },
  ar: {
    subtitle:'دومينو ذو ستة مضاعف', play:'▶  العب', howto:'📖 كيف تلعب',
    settings:'⚙️ الإعدادات', back:'رجوع', selectMode:'اختر الوضع',
    vsAI:'1 ضد الذكاء الاصطناعي', vsAIDesc:'العب ضد الكمبيوتر.',
    localMulti:'لعب محلي', localMultiDesc:'2–4 لاعبين، مرر الهاتف بين الأدوار.',
    selectRules:'قواعد اللعبة', drawMode:'وضع السحب', drawModeDesc:'اسحب من الرصيد. أول من يصل لـ100 نقطة يفوز!',
    blockMode:'وضع الحجب', blockModeDesc:'بدون سحب. مرر إذا تعطلت. أقل نقاط يفوز.',
    difficulty:'مستوى الذكاء الاصطناعي', easy:'سهل', easyDesc:'يلعب الذكاء الاصطناعي عشوائيًا.',
    medium:'متوسط', mediumDesc:'يفضل الأضعاف والقطع العالية.',
    hard:'صعب', hardDesc:'يلعب بشكل مثالي. للخبراء فقط.',
    howManyPlayers:'كم عدد اللاعبين؟', passDevice:'كل لاعب يلعب دوره على هذا الجهاز',
    playerNames:'أسماء اللاعبين', playerNamesDesc:'خصص أسماء اللاعبين (اختياري)',
    startGame:'ابدأ اللعبة ▶', howToPlay:'كيف تلعب',
    rule1:'كل لاعب يأخذ 7 قطع (5 لـ4 لاعبين). الباقي = رصيد.',
    rule2:'أعلى ضعف يبدأ. لا أضعاف؟ أعلى مجموع نقاط يبدأ.',
    rule3:'طابق جانب قطعتك مع طرف مفتوح في السلسلة.',
    rule4:'وضع السحب: اسحب من الرصيد إذا لم تستطع اللعب.',
    rule5:'وضع الحجب: بدون سحب — مرر إذا تعطلت.',
    rule6:'وضع السحب: اكسب نقاطًا = مجموع نقاط الخصم. أول من يصل لـ100!',
    rule7:'وضع الحجب: أقل نقاط يفوز بالجولة.',
    soundLbl:'🔊 المؤثرات الصوتية', timerLbl:'⏱ مؤقت الدور', timerDurLbl:'⏱ مدة المؤقت',
    boardColor:'🎨 لون اللوحة', languageLbl:'🌐 اللغة',
    colorForest:'غابة', colorNavy:'أزرق', colorMaroon:'كستنائي', colorSlate:'رمادي', colorPurple:'بنفسجي',
    yourTurn:'دورك', passHint:'مرر الجهاز، ثم اضغط لكشف يدك',
    revealHand:'اكشف يدي 👁', paused:'متوقف', resume:'▶ استمر',
    restart:'🔄 إعادة', mainMenu:'🏠 القائمة الرئيسية', whichEnd:'أي طرف؟',
    left:'يسار', right:'يمين', cancel:'إلغاء', pass:'⏭ تمرير',
    tilesLbl:'قطع', draw:'سحب', tapToStart:'اضغط قطعة أو اسحبها هنا\nللبدء',
    nextRound:'▶ الجولة التالية', victory:'!فوز', scoreboard:'لوحة النتائج',
    rematch:'🔄 مباراة جديدة', yoursTurn:' يلعب',
    aiThinking:'🤖 الذكاء يفكر...', aiDraws:'🤖 الذكاء يسحب...',
    aiPasses:'🤖 الذكاء يمرر!', aiPlays:'🤖 الذكاء يلعب',
    drew:'🎴 سحب', noFit:'❌ هذه القطعة لا تناسب!',
    noFitEnd:'❌ لا تناسب هذا الطرف!', passed:'⏭ مرر',
    goesFirst:'يبدأ!', roundOver:'انتهت الجولة',
    winsRound:'فاز بالجولة!', earned:'ربح', pts:'نقطة',
    blockedWins:'يفوز (أقل نقاط، اللعبة محجوبة)',
    emptiedHand:'أفرغ يده!', matchWinner:'!فائز المباراة',
    winsMatch:'فاز بالمباراة!', drawModeTag:'[سحب]', blockModeTag:'[حجب]',
    quickPhrases:['أحسنت! 👏','رائع! 🎯','محظوظ! 😄','آخ... 😅','دومينو! 🎴','هيا! 💪'],
    players:' لاعبين', eachTurns:'كل لاعب بدوره',
    teamA:'الفريق أ', teamB:'الفريق ب',
    team2v2:'2 ضد 2 فرق', team2v2Desc:'اللاعبون 1&3 ضد 2&4. نقاط مشتركة!',
    chooseStarter:'من يبدأ الجولة التالية؟', youStart:'سأبدأ أنا', partnerStart:'شريكي يبدأ',
    teamWins:'الفريق يفوز!', teamScore:'نقاط الفريق',
    winsRoundFor:'يفوز بالجولة لصالح',
    partnersScore:'فريقك يكسب',
    pipExhausted:'كل قطع [N] لُعبت — اللوحة مغلقة!',
    pipWins:'يفوز (قطع [N] نفدت — أقل نقاط يفوز)'
  }
};

var lang = 'en';

function t(key) { return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key; }

function setLang(l) {
  lang = l;
  var html = document.getElementById('htmlRoot');
  html.setAttribute('lang', l);
  html.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
  // Highlight lang buttons
  ['en','fr','ar'].forEach(function(x) {
    var b = document.getElementById('lb-' + x);
    if (b) b.classList.toggle('active', x === l);
    var s = document.getElementById('slng-' + x);
    if (s) s.classList.toggle('active', x === l);
  });
  applyI18n();
  // Rebuild dynamic content that uses t()
  rebuildPlayerCountBtns();
  buildQuickPhrases();
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    var val = t(key);
    if (val !== undefined) el.textContent = val;
  });
}


/* ─────────────────────────────────────────────────────────
   2. CONFIG & CONSTANTS
   ───────────────────────────────────────────────────────── */
var cfg = {
  sound:      true,
  boardColor: 'green',
  timerOn:    false,
  timerDur:   30
};

var PLAYER_COLORS = ['#d4a843','#2ecc71','#e74c3c','#9b59b6'];
var PLAYER_EMOJIS = ['👤','🟢','🔴','🟣'];

var BOARD_GRADIENTS = {
  green:  'radial-gradient(ellipse at center,#1d5c38 0%,#0b2618 100%)',
  navy:   'radial-gradient(ellipse at center,#1a2a52 0%,#060c1c 100%)',
  maroon: 'radial-gradient(ellipse at center,#521820 0%,#1c0608 100%)',
  slate:  'radial-gradient(ellipse at center,#283040 0%,#0c1018 100%)',
  purple: 'radial-gradient(ellipse at center,#2d1b4e 0%,#0e0718 100%)'
};

var PIP_POSITIONS = {
  0:[],1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,1,2,6,7,8]
};

var DRAW_WIN_SCORE = 100;


/* ─────────────────────────────────────────────────────────
   3. GAME STATE
   ───────────────────────────────────────────────────────── */
var mode           = 'ai';    // 'ai' | 'multi'
var gameRule       = 'draw';  // 'draw' | 'block'
var aiDiff         = 'medium';
var numPlayers     = 2;
var players        = [];
var curPlayer      = 0;
var board          = [];
var L              = null;
var R              = null;
var BY             = [];
var aiTmr          = null;
var dragT          = null;
var pendT          = null;
var handoffPending = false;
var msgTmr         = null;
var timerTmr       = null;
var timerSec       = 0;
var chatMessages   = [];
var lastRoundWinner = -1;  // who won the last round (starts next)
var teamMode       = false; // true when 4 players (2v2)
// Teams: players[0]&[2] = Team A, players[1]&[3] = Team B
// teamScores[0]=Team A total, teamScores[1]=Team B total
var teamScores     = [0,0];
var pendingWinIdx  = -1;   // winner waiting to choose who starts next round


/* ─────────────────────────────────────────────────────────
   4. DECK HELPERS
   ───────────────────────────────────────────────────────── */
function makeDeck() {
  var deck = []; var id = 0;
  for (var a = 0; a <= 6; a++)
    for (var b = a; b <= 6; b++)
      deck.push({a:a,b:b,id:id++});
  return deck;
}
function shuffle(arr) {
  var d = arr.slice();
  for (var i = d.length-1; i > 0; i--) {
    var j = Math.floor(Math.random()*(i+1)), tmp = d[i]; d[i]=d[j]; d[j]=tmp;
  }
  return d;
}


/* ─────────────────────────────────────────────────────────
   5. GAME LOGIC
   ───────────────────────────────────────────────────────── */
function sumH(hand) { return hand.reduce(function(s,t){return s+t.a+t.b;},0); }

function canPlay(tile,le,re) {
  if (le===null) return true;
  return tile.a===le||tile.b===le||tile.a===re||tile.b===re;
}

function getEnds(tile,le,re) {
  if (le===null) return ['right'];
  var ends=[];
  if (tile.a===le||tile.b===le) ends.push('left');
  if (tile.a===re||tile.b===re) ends.push('right');
  return ends;
}

function bestStart() {
  // If there was a previous round winner, they start
  if(lastRoundWinner >= 0 && lastRoundWinner < players.length) return lastRoundWinner;
  // First game: highest double, else highest pip sum
  var best=-1,who=0;
  players.forEach(function(p,i){
    p.hand.forEach(function(t){if(t.a===t.b&&t.a>best){best=t.a;who=i;}});
  });
  if (best>=0) return who;
  var maxPip=0,who2=0;
  players.forEach(function(p,i){
    var m=Math.max.apply(null,p.hand.map(function(t){return t.a+t.b;}));
    if(m>maxPip){maxPip=m;who2=i;}
  });
  return who2;
}

function place(tile,side) {
  var sA,sB,newL=L,newR=R,nb;
  if (L===null) {
    nb=board.concat([{id:tile.id,sA:tile.a,sB:tile.b}]);
    return {nb:nb,newL:tile.a,newR:tile.b};
  }
  nb=board.slice();
  if (side==='left') {
    if (tile.a===L){sA=tile.b;sB=tile.a;newL=tile.b;}
    else if(tile.b===L){sA=tile.a;sB=tile.b;newL=tile.a;}
    else return null;
    nb.unshift({id:tile.id,sA:sA,sB:sB});
  } else {
    if (tile.a===R){sA=tile.a;sB=tile.b;newR=tile.b;}
    else if(tile.b===R){sA=tile.b;sB=tile.a;newR=tile.a;}
    else return null;
    nb.push({id:tile.id,sA:sA,sB:sB});
  }
  return {nb:nb,newL:newL,newR:newR};
}

/* ─────────────────────────────────────────────────────────
   5b. PIP EXHAUSTION CHECK
   If ALL tiles of a certain value are on the board (none in
   any hand or boneyard), the open ends cannot be matched any
   further — the game ends like a blocked game.
   ───────────────────────────────────────────────────────── */
function checkPipExhaustion() {
  if (L === null) return; // board empty, nothing to check
  // Count how many times each pip value (0-6) still exists
  // outside the board (in hands + boneyard)
  var remaining = {0:0,1:0,2:0,3:0,4:0,5:0,6:0};
  players.forEach(function(p) {
    p.hand.forEach(function(t) { remaining[t.a]++; remaining[t.b]++; });
  });
  BY.forEach(function(t) { remaining[t.a]++; remaining[t.b]++; });

  // Check if either open end value is completely exhausted outside the board
  var ends = [L, R];
  // De-duplicate (spinner doubles have same end on both sides)
  if (L === R) ends = [L];

  for (var e = 0; e < ends.length; e++) {
    var val = ends[e];
    if (remaining[val] === 0) {
      // Every tile with this pip is already on the board — no one can ever extend this end
      // Check if both ends are blocked
      var lBlocked = remaining[L] === 0;
      var rBlocked = remaining[R] === 0;
      if (lBlocked && rBlocked) {
        // Both ends fully exhausted — trigger blocked-game logic immediately
        stopTimer();
        var min=Infinity, winIdx=0;
        players.forEach(function(p,i){ var s=sumH(p.hand); if(s<min){min=s;winIdx=i;} });
        var msg = t('pipExhausted').replace('[N]', val);
        setMsg('🔒 '+msg, 3000);
        setTimeout(function() {
          if (gameRule==='draw') {
            var winner=players[winIdx], col=PLAYER_COLORS[winIdx];
            var earned=0;
            players.forEach(function(p,i){if(i!==winIdx)earned+=sumH(p.hand);});
            winner.score+=earned;
            if(winner.score>=DRAW_WIN_SCORE){sfxWin();showMatchWinner(winIdx,'pipexhaust');return;}
            sfxWin();
            document.getElementById('roundTitle').textContent=t('roundOver');
            document.getElementById('roundSub').textContent=winner.name+' '+t('pipWins').replace('[N]',val);
            document.getElementById('roundSub').style.color=col;
            var rsEl=document.getElementById('roundScores'); rsEl.innerHTML='';
            players.forEach(function(p,i){
              var c2=PLAYER_COLORS[i];
              var row=document.createElement('div'); row.className='round-score-row'+(i===winIdx?' winner':'');
              row.innerHTML='<span style="color:'+c2+';font-weight:700">'+PLAYER_EMOJIS[i]+' '+p.name+'</span><span style="color:'+c2+';font-weight:900;font-family:monospace;font-size:20px">'+p.score+'<span style="font-size:11px;opacity:.6"> / '+DRAW_WIN_SCORE+'</span></span>';
              rsEl.appendChild(row);
            });
            document.getElementById('roundOvl').style.display='flex';
          } else {
            sfxWin();
            showMatchWinner(winIdx,'pipexhaust');
          }
        }, 1200);
        return true; // exhaustion triggered
      }
    }
  }
  return false; // no exhaustion
}

/* ─────────────────────────────────────────────────────────
   6. SOUND ENGINE — realistic domino sounds via Web Audio
   ───────────────────────────────────────────────────────── */
var AudioCtx = null;
function getAC() {
  if (!AudioCtx) AudioCtx = new(window.AudioContext||window.webkitAudioContext)();
  return AudioCtx;
}

/* Generic oscillator tone */
function tone(hz,wave,dur,vol,at) {
  if (!cfg.sound) return;
  vol=vol||0.2; at=at||0;
  try {
    var ac=getAC(),o=ac.createOscillator(),g=ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type=wave; o.frequency.value=hz;
    var t0=ac.currentTime+at;
    g.gain.setValueAtTime(vol,t0);
    g.gain.exponentialRampToValueAtTime(0.001,t0+dur);
    o.start(t0); o.stop(t0+dur);
  } catch(e){}
}

/* Noise burst helper (for impact sounds) */
function noiseBurst(dur,vol,at) {
  if (!cfg.sound) return;
  vol=vol||0.3; at=at||0;
  try {
    var ac=getAC();
    var buf=ac.createBuffer(1,ac.sampleRate*dur,ac.sampleRate);
    var data=buf.getChannelData(0);
    for(var i=0;i<data.length;i++) data[i]=(Math.random()*2-1);
    var src=ac.createBufferSource();
    src.buffer=buf;
    var g=ac.createGain();
    var filt=ac.createBiquadFilter();
    filt.type='bandpass'; filt.frequency.value=800; filt.Q.value=0.8;
    src.connect(filt); filt.connect(g); g.connect(ac.destination);
    var t0=ac.currentTime+at;
    g.gain.setValueAtTime(vol,t0);
    g.gain.exponentialRampToValueAtTime(0.001,t0+dur);
    src.start(t0); src.stop(t0+dur);
  } catch(e){}
}

/* 🎴 Place tile — woody clack */
function sfxPlace() {
  noiseBurst(0.04,0.5);
  tone(180,'sine',0.08,0.3,0.01);
  noiseBurst(0.02,0.2,0.04);
}

/* 🎴 Draw from boneyard — soft slide */
function sfxDraw() {
  noiseBurst(0.06,0.2);
  tone(220,'sine',0.1,0.15,0.02);
}

/* 🏆 Win — ascending chime */
function sfxWin() {
  [523,659,784,1047].forEach(function(f,i){tone(f,'sine',0.3,0.35,i*0.13);});
  noiseBurst(0.05,0.15,0.52);
}

/* ⏭ Pass — dull thud */
function sfxPass() {
  tone(100,'triangle',0.12,0.25);
  noiseBurst(0.03,0.1,0.04);
}

/* ⏱ Timer warning tick */
function sfxTick() {
  tone(880,'square',0.04,0.12);
}

/* ❌ Illegal move */
function sfxError() {
  tone(180,'sawtooth',0.08,0.2);
  tone(140,'sawtooth',0.08,0.2,0.06);
}

/* 💬 Chat message received */
function sfxChat() {
  tone(660,'sine',0.05,0.1);
  tone(880,'sine',0.05,0.08,0.06);
}


/* ─────────────────────────────────────────────────────────
   7. TILE / PIP DOM BUILDERS
   ───────────────────────────────────────────────────────── */
function makePipGrid(val,sz) {
  var active={};
  (PIP_POSITIONS[val]||[]).forEach(function(i){active[i]=1;});
  var pipSz=Math.max(5,Math.floor(sz*0.24));
  var pad=Math.floor(sz*0.07);
  var grid=document.createElement('div');
  grid.style.cssText='display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);width:'+sz+'px;height:'+sz+'px;padding:'+pad+'px;box-sizing:border-box;';
  for(var i=0;i<9;i++){
    var cell=document.createElement('div');
    cell.style.cssText='display:flex;align-items:center;justify-content:center;';
    if(active[i]){
      var pip=document.createElement('div');
      pip.style.cssText='width:'+pipSz+'px;height:'+pipSz+'px;border-radius:50%;background:#1a1a1a;box-shadow:inset 0 1px 2px rgba(0,0,0,.7),0 1px 0 rgba(255,255,255,.12);flex-shrink:0;';
      cell.appendChild(pip);
    }
    grid.appendChild(cell);
  }
  return grid;
}

function makeTile(sA,sB,orient,hs,opts) {
  opts=opts||{};
  var isH=(orient==='H');
  var W=isH?hs*2+2:hs, H=isH?hs:hs*2+2;
  var bc='#b8a870',sh='0 4px 14px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.5)';
  if(opts.playable){bc='#2ecc71';sh='0 0 0 2px rgba(46,204,113,.85),0 4px 16px rgba(46,204,113,.3)';}
  if(opts.hidden){bc='#2a5888';}
  var el=document.createElement('div');
  el.style.cssText='display:inline-flex;flex-direction:'+(isH?'row':'column')+';width:'+W+'px;height:'+H+'px;border-radius:8px;border:2px solid '+bc+';background:'+(opts.hidden?'linear-gradient(145deg,#1c3d6a,#0c1e38)':'linear-gradient(155deg,#fefcf4 0%,#f0e8d4 100%)')+';box-shadow:'+sh+';user-select:none;position:relative;flex-shrink:0;overflow:hidden;transition:transform .15s cubic-bezier(.34,1.56,.64,1),box-shadow .15s;'+(opts.playable?'cursor:pointer;':'');
  if(opts.hidden){
    var pat=document.createElement('div');
    pat.style.cssText='position:absolute;inset:4px;border:1px solid rgba(255,255,255,.07);border-radius:4px;background:repeating-linear-gradient(45deg,transparent,transparent 5px,rgba(255,255,255,.03) 5px,rgba(255,255,255,.03) 10px);';
    el.appendChild(pat); return el;
  }
  var gs=Math.floor(hs*0.86);
  var hA=document.createElement('div');
  hA.style.cssText='display:flex;align-items:center;justify-content:center;width:'+hs+'px;height:'+hs+'px;flex-shrink:0;';
  hA.appendChild(makePipGrid(sA,gs)); el.appendChild(hA);
  var dv=document.createElement('div');
  if(isH){dv.style.cssText='width:2px;background:#9a8860;opacity:.7;flex-shrink:0;align-self:stretch;margin:'+(hs*.1)+'px 0;';}
  else{dv.style.cssText='height:2px;background:#9a8860;opacity:.7;flex-shrink:0;align-self:stretch;margin:0 '+(hs*.1)+'px;';}
  el.appendChild(dv);
  var hB=document.createElement('div');
  hB.style.cssText='display:flex;align-items:center;justify-content:center;width:'+hs+'px;height:'+hs+'px;flex-shrink:0;';
  hB.appendChild(makePipGrid(sB,gs)); el.appendChild(hB);
  if(opts.playable){
    var ring=document.createElement('div');
    ring.style.cssText='position:absolute;inset:-3px;border-radius:10px;border:2px solid rgba(46,204,113,.6);animation:glow 1.4s ease-in-out infinite;pointer-events:none;';
    el.appendChild(ring);
  }
  return el;
}


/* ─────────────────────────────────────────────────────────
   8. TIMER
   ───────────────────────────────────────────────────────── */
var TIMER_CIRCUMFERENCE = 2 * Math.PI * 15; // r=15 => ~94.25

function startTimer() {
  stopTimer();
  if (!cfg.timerOn) return;
  var p = players[curPlayer];
  if (p && p.isAI) return;
  timerSec = cfg.timerDur;
  var badge = document.getElementById('timerBadge');
  var arc   = document.getElementById('timerArc');
  var num   = document.getElementById('timerNum');
  badge.style.display = 'flex';
  arc.classList.remove('warn');
  num.classList.remove('warn');
  updateTimerUI();
  timerTmr = setInterval(function() {
    timerSec--;
    updateTimerUI();
    if (timerSec <= 5) { sfxTick(); arc.classList.add('warn'); num.classList.add('warn'); }
    if (timerSec <= 0) {
      stopTimer();
      // Auto-pass or auto-draw
      var pp = players[curPlayer];
      var playable = pp.hand.filter(function(t){return canPlay(t,L,R);});
      if (playable.length === 0 && BY.length > 0 && gameRule === 'draw') {
        playerDraw();
      } else {
        setMsg('⏱ ' + pp.name + ' ' + t('passed'), 1500);
        nextTurn();
      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerTmr);
  timerTmr = null;
  if (!cfg.timerOn) {
    var badge = document.getElementById('timerBadge');
    if (badge) badge.style.display = 'none';
  }
}

function updateTimerUI() {
  var arc = document.getElementById('timerArc');
  var num = document.getElementById('timerNum');
  if (!arc) return;
  var pct = timerSec / cfg.timerDur;
  var offset = TIMER_CIRCUMFERENCE * (1 - pct);
  arc.style.strokeDashoffset = offset;
  num.textContent = timerSec;
}

function toggleTimerSetting() {
  cfg.timerOn = !cfg.timerOn;
  var tog  = document.getElementById('togTimer');
  var knob = document.getElementById('togTimerKnob');
  if (cfg.timerOn) {
    tog.classList.remove('off'); knob.style.left = '22px';
    document.getElementById('timerDurRow').style.display = 'flex';
  } else {
    tog.classList.add('off'); knob.style.left = '2px';
    document.getElementById('timerDurRow').style.display = 'none';
  }
}

function setTimerDur(sec, btn) {
  cfg.timerDur = sec;
  document.querySelectorAll('#timerDurRow .seg-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
}


/* ─────────────────────────────────────────────────────────
   9. CHAT
   ───────────────────────────────────────────────────────── */
function toggleChat() {
  var panel = document.getElementById('chatPanel');
  var isHidden = panel.style.display === 'none';
  panel.style.display = isHidden ? 'flex' : 'none';
  if (isHidden) {
    document.getElementById('chatInp').focus();
    scrollChat();
  }
}

function sendChat() {
  var inp = document.getElementById('chatInp');
  var text = inp.value.trim();
  if (!text) return;
  inp.value = '';
  addChatMsg(players[curPlayer].name, text, curPlayer);
}

function sendQuick(text) {
  addChatMsg(players[curPlayer].name, text, curPlayer);
}

function addChatMsg(name, text, playerIdx) {
  var col = PLAYER_COLORS[playerIdx] || '#8898a8';
  chatMessages.push({name:name, text:text, col:col});
  var msgs = document.getElementById('chatMsgs');
  var row = document.createElement('div');
  row.className = 'chat-msg';
  row.innerHTML = '<span class="chat-msg-name" style="color:'+col+'">'+escHtml(name)+':</span><span class="chat-msg-text"> '+escHtml(text)+'</span>';
  msgs.appendChild(row);
  scrollChat();
  sfxChat();
}

function scrollChat() {
  var msgs = document.getElementById('chatMsgs');
  msgs.scrollTop = msgs.scrollHeight;
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function buildQuickPhrases() {
  var container = document.getElementById('quickBtns');
  if (!container) return;
  container.innerHTML = '';
  var phrases = t('quickPhrases');
  if (!Array.isArray(phrases)) return;
  phrases.forEach(function(p) {
    var btn = document.createElement('button');
    btn.className = 'quick-btn';
    btn.textContent = p;
    btn.onclick = function() { sendQuick(p); };
    container.appendChild(btn);
  });
}


/* ─────────────────────────────────────────────────────────
   10. RENDER
   ───────────────────────────────────────────────────────── */
/* ── SNAKING BOARD RENDERER ─────────────────────────────────
   • Tiles snake: RIGHT → corner-turn → LEFT → corner-turn → RIGHT...
   • Doubles perpendicular to travel direction
   • Whole chain is CENTERED in the board area
   • Auto-zooms out (CSS scale) when chain is bigger than board
   ─────────────────────────────────────────────────────────── */
function renderBoard() {
  var emptyEl = document.getElementById('emptyBoard');
  var rowEl   = document.getElementById('boardRow');
  var tilesEl = document.getElementById('bTiles');
  var dropLEl = document.getElementById('dropL');
  var dropREl = document.getElementById('dropR');
  var boardEl = document.getElementById('boardArea');

  tilesEl.innerHTML = '';
  dropLEl.style.display = 'none';
  dropREl.style.display = 'none';

  if (board.length === 0) {
    emptyEl.style.display = 'block';
    rowEl.style.display   = 'none';
    rowEl.style.transform = '';
    return;
  }
  emptyEl.style.display = 'none';
  rowEl.style.display   = 'block';

  /* ── tile sizes ────────────────────────────────────────── */
  var S   = 30;           // half-tile (one face square) in px
  var GAP = 3;            // gap between adjacent tiles
  var TL  = S * 2 + GAP; // long side of a normal (non-double) tile
  var TS  = S;            // short side
  var PAD = 10;           // padding inside the canvas

  /* board area pixel size */
  var areaW = boardEl.clientWidth  || 320;
  var areaH = boardEl.clientHeight || 220;

  /* max tiles in one horizontal row before wrapping */
  var perRow = Math.max(3, Math.floor((areaW - PAD * 2) / (TL + GAP)));

  /* ── position computation ──────────────────────────────── */
  /* Walk every board tile and record its pixel top-left + orientation.
     Coordinate system: px/py relative to (0,0) canvas origin.
     After computing all positions we shift the whole set to center it. */

  var positions = []; // { px, py, orient, isCorner, dir }
  var cx = 0, cy = 0;       // current pixel cursor (top-left of next tile)
  var dir = 'right';
  var rowTiles = 0;          // how many tiles placed in current horizontal run

  for (var i = 0; i < board.length; i++) {
    var bt       = board[i];
    var isDouble = (bt.sA === bt.sB);

    /* Is this the last tile of a horizontal run (acts as corner connector)? */
    var isCorner = (rowTiles === perRow - 1) && (i < board.length - 1);

    /* Orientation:
       corner connector → always V (vertical, like the photo)
       double in H run  → V (perpendicular)
       normal in H run  → H */
    var orient = (isCorner || isDouble) ? 'V' : 'H';

    /* tile pixel width / height for this orientation */
    var tW = (orient === 'H') ? TL : TS;
    var tH = (orient === 'H') ? TS : TL;

    positions.push({ px: cx, py: cy, orient: orient, isCorner: isCorner, dir: dir, tW: tW, tH: tH });

    /* Advance cursor */
    if (isCorner) {
      /* Corner: next tile goes on the row below, same horizontal anchor */
      cy += TL + GAP;   /* move down one full row height */
      /* flip direction */
      dir = (dir === 'right') ? 'left' : 'right';
      rowTiles = 0;
      /* cursor x stays where the corner ends (right edge for right-going, left edge for left-going) */
      if (dir === 'right') {
        cx = 0;          /* new row starts from left */
      } else {
        cx = (perRow - 1) * (TL + GAP); /* new row starts from right */
      }
    } else {
      rowTiles++;
      if (dir === 'right') {
        cx += tW + GAP;
      } else {
        cx -= tW + GAP;
      }
    }
  }

  /* ── bounding box ──────────────────────────────────────── */
  var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  positions.forEach(function(p) {
    if (p.px       < minX) minX = p.px;
    if (p.py       < minY) minY = p.py;
    if (p.px + p.tW > maxX) maxX = p.px + p.tW;
    if (p.py + p.tH > maxY) maxY = p.py + p.tH;
  });

  var chainW = maxX - minX + PAD * 2;
  var chainH = maxY - minY + PAD * 2;

  /* ── center the chain ──────────────────────────────────── */
  /* Shift all positions so the chain sits centered in areaW × areaH */
  var offX = Math.round((areaW - chainW) / 2) - minX + PAD;
  var offY = Math.round((areaH - chainH) / 2) - minY + PAD;

  /* ── auto-zoom ─────────────────────────────────────────── */
  /* If chain is larger than the board area, scale it down uniformly */
  var scaleX = (chainW > areaW) ? (areaW  / chainW) : 1;
  var scaleY = (chainH > areaH) ? (areaH  / chainH) : 1;
  var scale  = Math.min(scaleX, scaleY, 1) * 0.97; /* tiny extra margin */

  /* When scaling, center around origin, then let CSS center it */
  if (scale < 1) {
    /* reset scroll — not needed when fully zoomed out */
    boardEl.scrollLeft = 0;
    boardEl.scrollTop  = 0;
    /* place the canvas at (0,0) and let transform-origin center it */
    rowEl.style.width          = areaW + 'px';
    rowEl.style.height         = areaH + 'px';
    rowEl.style.position       = 'relative';
    rowEl.style.transformOrigin= 'center center';
    rowEl.style.transform      = 'scale(' + scale + ')';
    /* re-center offsets so unscaled chain fills the full canvas */
    offX = Math.round((areaW - chainW) / 2) - minX + PAD;
    offY = Math.round((areaH - chainH) / 2) - minY + PAD;
  } else {
    /* chain fits: canvas is exactly chainW × chainH */
    rowEl.style.width          = chainW + 'px';
    rowEl.style.height         = chainH + 'px';
    rowEl.style.position       = 'relative';
    rowEl.style.transform      = '';
    rowEl.style.transformOrigin= '';
  }

  /* ── draw tiles ────────────────────────────────────────── */
  positions.forEach(function(pos, i) {
    var bt  = board[i];
    var el  = makeTile(bt.sA, bt.sB, pos.orient, S);
    if (i === board.length - 1) {
      el.style.animation = 'tileIn .28s cubic-bezier(.34,1.56,.64,1)';
    }
    el.style.position = 'absolute';
    el.style.left     = (pos.px + offX) + 'px';
    el.style.top      = (pos.py + offY) + 'px';
    tilesEl.appendChild(el);
  });

  /* ── drop zones at chain ends ──────────────────────────── */
  var fp = positions[0];
  var lp = positions[positions.length - 1];

  function placeDropZone(el, x, y) {
    el.style.display       = 'flex';
    el.style.position      = 'absolute';
    el.style.width         = '26px';
    el.style.height        = '26px';
    el.style.left          = x + 'px';
    el.style.top           = y + 'px';
  }

  /* Left-end drop: opposite side of the first tile's travel direction */
  var fCx = fp.px + offX, fCy = fp.py + offY;
  if (fp.dir === 'right') {
    placeDropZone(dropLEl, fCx - 30, fCy + (fp.tH - 26) / 2);
  } else {
    placeDropZone(dropLEl, fCx + fp.tW + 4, fCy + (fp.tH - 26) / 2);
  }

  /* Right-end drop: after the last tile */
  var lCx = lp.px + offX, lCy = lp.py + offY;
  if (lp.isCorner) {
    placeDropZone(dropREl, lCx + (lp.tW - 26) / 2, lCy + lp.tH + 4);
  } else if (lp.dir === 'right') {
    placeDropZone(dropREl, lCx + lp.tW + 4, lCy + (lp.tH - 26) / 2);
  } else {
    placeDropZone(dropREl, lCx - 30, lCy + (lp.tH - 26) / 2);
  }

  /* ── scroll to latest tile (only when not zoomed out) ─── */
  if (scale >= 1) {
    setTimeout(function() {
      var lp2 = positions[positions.length - 1];
      var tx  = lp2.px + offX;
      var ty  = lp2.py + offY;
      boardEl.scrollLeft = tx - areaW / 2 + S;
      boardEl.scrollTop  = ty - areaH / 2 + S;
    }, 60);
  }
}


function renderCurrentHand() {
  var p=players[curPlayer];
  var handEl=document.getElementById('playerHand');
  handEl.innerHTML='';
  // NEVER show AI tiles face-up
  if(p.isAI){
    document.getElementById('handLabel').innerHTML='';
    return;
  }
  var playIds={};
  p.hand.filter(function(t){return canPlay(t,L,R);}).forEach(function(t){playIds[t.id]=1;});
  p.hand.forEach(function(t,i){
    var isP=!!playIds[t.id];
    var el=makeTile(t.a,t.b,'V',36,{playable:isP});
    el.style.animation='handUp .26s ease '+(i*.05)+'s both';
    if(isP){
      el.addEventListener('click',function(){onTap(t);});
      el.setAttribute('draggable','true');
      el.addEventListener('dragstart',function(e){dragT=t;e.dataTransfer.effectAllowed='move';});
      el.addEventListener('dragend',function(){dragT=null;});
    }
    handEl.appendChild(el);
  });
  var col=PLAYER_COLORS[curPlayer];
  document.getElementById('handLabel').innerHTML=
    '<span style="color:'+col+';font-weight:900">'+PLAYER_EMOJIS[curPlayer]+' '+p.name+'</span> — '+
    p.hand.length+' '+t('tilesLbl')+' · PIPS: '+sumH(p.hand);
}

function renderAIArea() {
  var aiAreaEl=document.getElementById('aiArea');
  if(mode!=='ai'){aiAreaEl.style.display='none';return;}
  aiAreaEl.style.display='block';
  var ai=players[1], c=document.getElementById('aiHand');
  c.innerHTML='';
  ai.hand.forEach(function(t,i){
    var el=makeTile(0,0,'V',26,{hidden:true});
    el.style.animation='handUp .22s ease '+(i*.04)+'s both';
    c.appendChild(el);
  });
  document.getElementById('aiCnt').textContent=ai.hand.length;
  document.getElementById('aiPip').textContent='?'; // hidden
}

function renderOpponents() {
  var oppsArea=document.getElementById('oppsArea');
  var oppsRow=document.getElementById('oppsRow');
  if(mode!=='multi'||numPlayers<=2){oppsArea.style.display='none';return;}
  oppsArea.style.display='block'; oppsRow.innerHTML='';
  players.forEach(function(p,i){
    if(i===curPlayer) return;
    var col=PLAYER_COLORS[i];
    var group=document.createElement('div'); group.className='opp-group';
    var label=document.createElement('div'); label.className='opp-label'; label.style.color=col;
    label.textContent=PLAYER_EMOJIS[i]+' '+p.name+' ('+p.hand.length+')';
    group.appendChild(label);
    var tiles=document.createElement('div'); tiles.className='opp-tiles';
    var show=Math.min(p.hand.length,5);
    for(var j=0;j<show;j++) tiles.appendChild(makeTile(0,0,'V',20,{hidden:true}));
    if(p.hand.length>show){var more=document.createElement('div');more.className='opp-more';more.textContent='+'+(p.hand.length-show);tiles.appendChild(more);}
    group.appendChild(tiles); oppsRow.appendChild(group);
  });
}

function renderStatus() {
  var p=players[curPlayer], col=PLAYER_COLORS[curPlayer];
  document.getElementById('tDot').style.background=col;
  document.getElementById('tLbl').textContent=p.isAI?t('aiThinking'):(p.name.toUpperCase()+(t('yoursTurn')||"'S TURN").toUpperCase());
  document.getElementById('tLbl').style.color=col;
  document.getElementById('byCnt').textContent=BY.length;
  document.getElementById('boneCnt').textContent=BY.length;
  var scoreEl=document.getElementById('scoreDisp');
  if(mode==='ai'){
    scoreEl.innerHTML='<b style="color:'+PLAYER_COLORS[0]+'">'+players[0].score+'</b> — <b style="color:'+PLAYER_COLORS[1]+'">'+players[1].score+'</b>';
  } else {
    scoreEl.textContent=players.map(function(p){return p.score;}).join(' – ');
  }
  renderMenuScores();
  // Pass button
  var playable=p.isAI?[]:p.hand.filter(function(t){return canPlay(t,L,R);});
  var needPass=!p.isAI&&!handoffPending&&playable.length===0&&(BY.length===0||gameRule==='block');
  var btnP=document.getElementById('btnPass');
  btnP.setAttribute('data-pass-ready', needPass?'1':'0');
  btnP.style.opacity=needPass?'1':'0.28';
  btnP.style.cursor=needPass?'pointer':'default';
  btnP.style.background=needPass?'rgba(192,57,43,.22)':'rgba(192,57,43,.04)';
  btnP.style.color=needPass?'#e74c3c':'rgba(231,76,60,.35)';
  btnP.style.boxShadow=needPass?'0 0 18px rgba(231,76,60,.3)':'none';
  // Boneyard active (only draw mode)
  var canDraw=gameRule==='draw'&&!p.isAI&&p.hand.filter(function(t){return canPlay(t,L,R);}).length===0&&BY.length>0;
  var boneEl=document.getElementById('boneyard');
  boneEl.classList.toggle('active',canDraw);
  // Show/hide boneyard in block mode
  boneEl.style.display=gameRule==='block'?'none':'flex';
}

/* Board color — FIX: always write to #boardArea directly */
function renderBoardBg() {
  var area = document.getElementById('boardArea');
  area.style.background = BOARD_GRADIENTS[cfg.boardColor] || BOARD_GRADIENTS.green;
}

function renderMenuScores() {
  var container=document.getElementById('menuScores'); container.innerHTML='';
  players.forEach(function(p,i){
    var col=PLAYER_COLORS[i];
    var card=document.createElement('div'); card.className='score-card';
    card.innerHTML='<div class="score-card-icon">'+PLAYER_EMOJIS[i]+'</div><div class="score-card-val" style="color:'+col+'">'+p.score+'</div><div class="score-card-label">'+p.name+'</div>';
    container.appendChild(card);
  });
}

/* Draw mode goal bars (progress to 100) */
function renderGoalBar() {
  var bar=document.getElementById('goalBar');
  var inner=document.getElementById('goalInner');
  if(gameRule!=='draw'){bar.style.display='none';return;}
  bar.style.display='block'; inner.innerHTML='';
  if(teamMode){
    [[0,t('teamA')],[1,t('teamB')]].forEach(function(tv){
      var tidx=tv[0],tnm=tv[1];
      var col=tidx===0?PLAYER_COLORS[0]:PLAYER_COLORS[1];
      var members=players.filter(function(p){return p.team===tidx;}).map(function(p){return p.name;}).join(' & ');
      var pct=Math.min(100,Math.round(teamScores[tidx]/DRAW_WIN_SCORE*100));
      var row=document.createElement('div'); row.className='goal-row'; row.style.color=col;
      row.innerHTML='<span class="goal-name">'+members+'</span>'+
        '<div class="goal-track"><div class="goal-fill" style="width:'+pct+'%;background:'+col+'"></div></div>'+
        '<span class="goal-val">'+teamScores[tidx]+'</span>';
      inner.appendChild(row);
    });
  } else {
    players.forEach(function(p,i){
      var col=PLAYER_COLORS[i];
      var pct=Math.min(100,Math.round(p.score/DRAW_WIN_SCORE*100));
      var row=document.createElement('div'); row.className='goal-row'; row.style.color=col;
      row.innerHTML='<span class="goal-name">'+p.name+'</span>'+
        '<div class="goal-track"><div class="goal-fill" style="width:'+pct+'%;background:'+col+'"></div></div>'+
        '<span class="goal-val">'+p.score+'</span>';
      inner.appendChild(row);
    });
  }
}

function renderAll() {
  renderBoard(); renderAIArea(); renderOpponents();
  renderCurrentHand(); renderStatus(); renderGoalBar();
}

var msgTmr=null;
function setMsg(msg,dur){
  document.getElementById('topMsg').textContent=msg;
  clearTimeout(msgTmr);
  if(dur){
    msgTmr=setTimeout(function(){
      var p=players[curPlayer];
      document.getElementById('topMsg').textContent=p&&p.isAI?t('aiThinking'):(p?p.name+t('yoursTurn'):'');
    },dur);
  }
}


/* ─────────────────────────────────────────────────────────
   11. SETTINGS ACTIONS
   ───────────────────────────────────────────────────────── */
function setGameRule(rule) { gameRule = rule; }
function setDiff(d)        { aiDiff  = d; }

function toggleSound() {
  cfg.sound=!cfg.sound;
  var tog=document.getElementById('togSnd'), knob=document.getElementById('togKnob');
  tog.classList.toggle('off',!cfg.sound);
  knob.style.left=cfg.sound?'22px':'2px';
}

/* THE FIX: setColor now always calls renderBoardBg() which writes directly to #boardArea */
function setColor(color, swatchEl) {
  cfg.boardColor = color;
  document.querySelectorAll('.color-swatch').forEach(function(s){s.classList.remove('active');});
  swatchEl.classList.add('active');
  renderBoardBg(); // Always apply immediately
}


/* ─────────────────────────────────────────────────────────
   12. MODE SETUP
   ───────────────────────────────────────────────────────── */
function startVsAI() {
  mode='ai'; numPlayers=2; teamMode=false; lastRoundWinner=-1; teamScores=[0,0];
  players=[
    {name:'You',hand:[],score:0,isAI:false},
    {name:'AI', hand:[],score:0,isAI:true}
  ];
  launchGame();
}

function rebuildPlayerCountBtns() {
  var container=document.getElementById('playerCountBtns');
  if(!container) return;
  container.innerHTML='';
  var iconMap={2:'👤👤',3:'👤👤👤',4:'👤👤👤👤'};
  [2,3,4].forEach(function(n){
    var btn=document.createElement('button'); btn.className='player-count-btn';
    btn.innerHTML=
      '<div class="player-count-icons">'+iconMap[n]+'</div>'+
      '<div><div class="player-count-name">'+n+' '+t('players').trim()+'</div><div class="player-count-hint">'+t('eachTurns')+'</div></div>'+
      '<div class="player-count-arrow">▶</div>';
    btn.addEventListener('click',function(){setupMultiPlayers(n);});
    container.appendChild(btn);
  });
}

function setupMultiPlayers(n) {
  numPlayers=n;
  var fields=document.getElementById('nameFields'); fields.innerHTML='';
  // For 4 players: add team header dividers
  if(n===4){
    var hA=document.createElement('div');
    hA.style.cssText='font-size:10px;font-weight:900;letter-spacing:2px;color:'+PLAYER_COLORS[0]+';padding:4px 0 2px;border-bottom:1px solid '+PLAYER_COLORS[0]+'44;margin-bottom:6px;';
    hA.textContent='⚡ TEAM A';
    fields.appendChild(hA);
  }
  for(var i=0;i<n;i++){
    (function(idx){
      var col=PLAYER_COLORS[idx];
      // Insert Team B header before player 2
      if(n===4&&idx===2){
        var hB=document.createElement('div');
        hB.style.cssText='font-size:10px;font-weight:900;letter-spacing:2px;color:'+PLAYER_COLORS[1]+';padding:10px 0 2px;border-bottom:1px solid '+PLAYER_COLORS[1]+'44;margin-bottom:6px;';
        hB.textContent='⚡ TEAM B';
        fields.appendChild(hB);
      }
      var row=document.createElement('div'); row.className='name-row';
      var icon=document.createElement('div'); icon.className='name-row-icon'; icon.textContent=PLAYER_EMOJIS[idx];
      var inp=document.createElement('input'); inp.id='nameInp'+idx; inp.type='text';
      inp.placeholder='Player '+(idx+1)+(n===4?' (Team '+(idx%2===0?'A':'B')+')':'');
      inp.maxLength=12; inp.className='name-input';
      inp.style.borderColor=col;
      row.appendChild(icon); row.appendChild(inp); fields.appendChild(row);
    })(i);
  }
  go('scrNames');
}

function startMulti() {
  mode='multi'; players=[]; lastRoundWinner=-1; teamScores=[0,0];
  teamMode=(numPlayers===4);
  for(var i=0;i<numPlayers;i++){
    var inp=document.getElementById('nameInp'+i);
    var nm=(inp&&inp.value.trim())||('Player '+(i+1));
    // team: players 0&2 = team 0, players 1&3 = team 1
    var team=teamMode?(i%2):i;
    players.push({name:nm,hand:[],score:0,isAI:false,team:team});
  }
  launchGame();
}

function launchGame() {
  clearTimeout(aiTmr); stopTimer(); hideAll();
  pendT=null; dragT=null; handoffPending=false;
  chatMessages=[];
  document.getElementById('chatMsgs').innerHTML='';
  document.getElementById('chatPanel').style.display='none';
  var HAND_SIZE=numPlayers<=3?7:5;
  var deck=shuffle(makeDeck()); var ptr=0;
  players.forEach(function(p){p.hand=deck.slice(ptr,ptr+HAND_SIZE);ptr+=HAND_SIZE;});
  BY=deck.slice(ptr);
  board=[]; L=null; R=null;
  curPlayer=bestStart();
  go('scrGame'); renderAll(); renderBoardBg();
  var p=players[curPlayer];
  var ruleTag=gameRule==='draw'?t('drawModeTag'):t('blockModeTag');
  setMsg(ruleTag+' '+(p.isAI?'🤖 AI':'🎯 '+p.name)+' '+t('goesFirst'),2400);
  if(mode==='multi'){showHandoff();return;}
  if(p.isAI) schedAI();
  else startTimer();
}

function restartGame() { lastRoundWinner=-1; teamScores=[0,0]; players.forEach(function(p){p.score=0;}); launchGame(); }
function nextRound()   { launchGame(); } // lastRoundWinner preserved


/* ─────────────────────────────────────────────────────────
   13. HANDOFF
   ───────────────────────────────────────────────────────── */
function showHandoff() {
  var p=players[curPlayer], col=PLAYER_COLORS[curPlayer];
  document.getElementById('hoEmoji').textContent=PLAYER_EMOJIS[curPlayer];
  document.getElementById('hoName').textContent=p.name.toUpperCase();
  document.getElementById('hoName').style.color=col;
  document.getElementById('hoTileCount').textContent=
    p.hand.length+' '+t('tilesLbl')+' ('+sumH(p.hand)+' pips)';
  document.getElementById('playerHand').innerHTML='';
  handoffPending=true;
  document.getElementById('handoffOvl').style.display='flex';
}

function handoffReveal() {
  handoffPending=false;
  document.getElementById('handoffOvl').style.display='none';
  renderCurrentHand();
  var p=players[curPlayer];
  var play=p.hand.filter(function(t){return canPlay(t,L,R);});
  var noMoves=play.length===0&&(BY.length===0||gameRule==='block');
  if(noMoves){
    setMsg('⏭ '+p.name+' '+t('passed'),2000);
    var btnP=document.getElementById('btnPass');
    btnP.setAttribute('data-pass-ready','1');
    btnP.style.opacity='1';btnP.style.cursor='pointer';
    btnP.style.background='rgba(192,57,43,.22)';
    btnP.style.color='#e74c3c';
    btnP.style.boxShadow='0 0 18px rgba(231,76,60,.3)';
  } else {
    startTimer();
  }
}


/* ─────────────────────────────────────────────────────────
   14. APPLY PLACE & END GAME
   ───────────────────────────────────────────────────────── */
function applyPlace(tile,side) {
  var res=place(tile,side);
  if(!res){sfxError();return false;}
  board=res.nb; L=res.newL; R=res.newR;
  var p=players[curPlayer];
  p.hand=p.hand.filter(function(t){return t.id!==tile.id;});
  sfxPlace(); stopTimer(); renderAll();
  // Check if a pip value is fully exhausted on both ends
  if(checkPipExhaustion()) return true;
  if(p.hand.length===0){
    endRound(curPlayer);
    return true;
  }
  return false;
}

/* ── Round end ────────────────────────────────────────────
   Draw mode: winner earns points = sum of all opponents' remaining pips.
   Block mode: single win by lowest pips.
*/
function endRound(winIdx) {
  var winner=players[winIdx];
  var col=PLAYER_COLORS[winIdx];
  stopTimer();
  lastRoundWinner=winIdx; // this player (or team partner) starts next round

  if(gameRule==='draw') {
    var earned=0;
    if(teamMode) {
      // 2v2: winning team earns sum of BOTH losing team members' pips
      var losingTeam=1-winner.team;
      players.forEach(function(p){ if(p.team===losingTeam) earned+=sumH(p.hand); });
      // Add to both winning team members' scores
      players.forEach(function(p){ if(p.team===winner.team) p.score+=earned; });
      teamScores[winner.team]+=earned;
    } else {
      players.forEach(function(p,i){if(i!==winIdx) earned+=sumH(p.hand);});
      winner.score+=earned;
    }
    // Check match win
    var matchWon=false;
    if(teamMode){
      matchWon=teamScores[winner.team]>=DRAW_WIN_SCORE;
    } else {
      matchWon=winner.score>=DRAW_WIN_SCORE;
    }
    if(matchWon){ sfxWin(); showMatchWinner(winIdx); return; }
    sfxWin();
    // Show round summary then "who starts next?"
    pendingWinIdx=winIdx;
    document.getElementById('roundTitle').textContent=t('roundOver');
    var subMsg=teamMode
      ? winner.name+' '+t('winsRoundFor')+' '+(winner.team===0?t('teamA'):t('teamB'))+' +'+earned+' '+t('pts')
      : winner.name+' '+t('winsRound')+' +'+earned+' '+t('pts');
    document.getElementById('roundSub').textContent=subMsg;
    document.getElementById('roundSub').style.color=col;
    var rsEl=document.getElementById('roundScores'); rsEl.innerHTML='';
    if(teamMode) {
      // Show team scores
      [[0,t('teamA')],[1,t('teamB')]].forEach(function(tv){
        var tidx=tv[0], tnm=tv[1];
        var tc=tidx===0?PLAYER_COLORS[0]:PLAYER_COLORS[1];
        var row=document.createElement('div'); row.className='round-score-row'+(tidx===winner.team?' winner':'');
        row.innerHTML='<span style="color:'+tc+';font-weight:700">'+tnm+' ('+players.filter(function(p){return p.team===tidx;}).map(function(p){return p.name;}).join(' & ')+')</span>'+
          '<span style="color:'+tc+';font-weight:900;font-family:monospace;font-size:20px">'+teamScores[tidx]+'<span style="font-size:11px;opacity:.6"> / '+DRAW_WIN_SCORE+'</span></span>';
        rsEl.appendChild(row);
      });
    } else {
      players.forEach(function(p,i){
        var c2=PLAYER_COLORS[i];
        var row=document.createElement('div'); row.className='round-score-row'+(i===winIdx?' winner':'');
        row.innerHTML='<span style="color:'+c2+';font-weight:700">'+PLAYER_EMOJIS[i]+' '+p.name+'</span>'+
          '<span style="color:'+c2+';font-weight:900;font-family:monospace;font-size:20px">'+p.score+'<span style="font-size:11px;opacity:.6"> / '+DRAW_WIN_SCORE+'</span></span>';
        rsEl.appendChild(row);
      });
    }
    // If 2v2: show "who starts" buttons inside round overlay; else just show Next Round
    if(teamMode) {
      buildTeamStarterChoice(winIdx, rsEl.parentNode);
    }
    // Re-show Next Round button (may have been hidden by previous 2v2 round)
    var nrBtn=document.querySelector('#roundOvl .btn-gold'); if(nrBtn) nrBtn.style.display='block';
    document.getElementById('roundOvl').style.display='flex';
  } else {
    sfxWin();
    showMatchWinner(winIdx,'emptied');
  }
}

function checkBlocked() {
  var allStuck=players.every(function(p){return !p.hand.some(function(t){return canPlay(t,L,R);});});
  if(allStuck&&(BY.length===0||gameRule==='block')){
    stopTimer();
    // Find winner by lowest pip — in team mode, compare team totals
    var winIdx=0;
    if(teamMode){
      var tA=players.filter(function(p){return p.team===0;}).reduce(function(s,p){return s+sumH(p.hand);},0);
      var tB=players.filter(function(p){return p.team===1;}).reduce(function(s,p){return s+sumH(p.hand);},0);
      var winTeam=tA<=tB?0:1;
      // pick the player from winning team who has fewer pips (will be shown as winner)
      var best=Infinity;
      players.forEach(function(p,i){if(p.team===winTeam&&sumH(p.hand)<best){best=sumH(p.hand);winIdx=i;}});
    } else {
      var min=Infinity;
      players.forEach(function(p,i){var s=sumH(p.hand);if(s<min){min=s;winIdx=i;}});
    }
    lastRoundWinner=winIdx;
    if(gameRule==='draw'){
      endRound(winIdx); // reuse endRound for scoring
    } else {
      sfxWin();
      showMatchWinner(winIdx,'blocked');
    }
  }
}


/* Show "who starts next round" choice for 2v2 winner */
function buildTeamStarterChoice(winIdx, container) {
  // Remove any existing next-round button from roundOvl
  var existing=document.querySelector('#roundOvl .btn-gold');
  if(existing) existing.style.display='none';

  var winTeam=players[winIdx].team;
  // Find the partner (same team, different player index)
  var partnerIdx=-1;
  players.forEach(function(p,i){if(i!==winIdx&&p.team===winTeam) partnerIdx=i;});

  var col=PLAYER_COLORS[winIdx];
  var box=document.createElement('div');
  box.style.cssText='margin-top:14px;text-align:center;';
  var lbl=document.createElement('div');
  lbl.style.cssText='color:#5a6e88;font-size:11px;letter-spacing:1px;margin-bottom:10px;';
  lbl.textContent=t('chooseStarter');
  box.appendChild(lbl);

  var btnRow=document.createElement('div');
  btnRow.style.cssText='display:flex;gap:8px;';

  var btnMe=document.createElement('button');
  btnMe.style.cssText='flex:1;padding:11px 0;border-radius:10px;border:none;background:linear-gradient(135deg,'+col+','+col+'99);color:#000;font-weight:900;font-size:13px;cursor:pointer;';
  btnMe.textContent=PLAYER_EMOJIS[winIdx]+' '+players[winIdx].name;
  btnMe.onclick=function(){ lastRoundWinner=winIdx; document.getElementById('roundOvl').style.display='none'; launchGame(); };

  btnRow.appendChild(btnMe);

  if(partnerIdx>=0){
    var pCol=PLAYER_COLORS[partnerIdx];
    var btnPart=document.createElement('button');
    btnPart.style.cssText='flex:1;padding:11px 0;border-radius:10px;border:none;background:linear-gradient(135deg,'+pCol+','+pCol+'99);color:#000;font-weight:900;font-size:13px;cursor:pointer;';
    btnPart.textContent=PLAYER_EMOJIS[partnerIdx]+' '+players[partnerIdx].name;
    btnPart.onclick=function(){ lastRoundWinner=partnerIdx; document.getElementById('roundOvl').style.display='none'; launchGame(); };
    btnRow.appendChild(btnPart);
  }

  box.appendChild(btnRow);
  container.appendChild(box);
}

function showMatchWinner(winIdx,reason) {
  var winner=players[winIdx], col=PLAYER_COLORS[winIdx];
  document.getElementById('goEmoji').textContent='🏆';
  document.getElementById('goTitle').style.color=col;
  document.getElementById('goTitle').style.filter='drop-shadow(0 0 28px '+col+'aa)';
  document.getElementById('govl').style.background='radial-gradient(ellipse at center,'+col+'44 0%,rgba(4,8,14,.97) 65%)';
  var panel=document.getElementById('goPanel');

  if(teamMode) {
    var winTeam=winner.team;
    var teamName=winTeam===0?t('teamA'):t('teamB');
    var teamMembers=players.filter(function(p){return p.team===winTeam;}).map(function(p){return p.name;}).join(' & ');
    document.getElementById('goTitle').textContent=t('teamWins');
    document.getElementById('goSub').textContent=teamName+': '+teamMembers;
    document.getElementById('goSub').style.color=col;
    document.getElementById('goReason').textContent=(reason==='blocked'||reason==='pipexhaust')?winner.name+' '+t('blockedWins'):winner.name+' '+t('emptiedHand');
    panel.innerHTML='<div class="go-scoreboard-title">'+t('teamScore')+'</div>';
    [[0,t('teamA')],[1,t('teamB')]].forEach(function(tv){
      var tidx=tv[0],tnm=tv[1];
      var tc=tidx===0?PLAYER_COLORS[0]:PLAYER_COLORS[1];
      var row=document.createElement('div'); row.className='go-score-row'+(tidx===winTeam?' winner':'');
      var nameS=document.createElement('span'); nameS.className='go-name'; nameS.style.color=tidx===winTeam?tc:'#5a6e88';
      nameS.textContent=(tidx===winTeam?'🥇 ':'')+tnm+' ('+players.filter(function(p){return p.team===tidx;}).map(function(p){return p.name;}).join(' & ')+')';
      var ptsS=document.createElement('span'); ptsS.className='go-points'; ptsS.style.color=tc;
      ptsS.textContent=teamScores[tidx];
      row.appendChild(nameS); row.appendChild(ptsS); panel.appendChild(row);
    });
  } else {
    document.getElementById('goTitle').textContent=t('victory');
    document.getElementById('goSub').textContent=winner.name+' '+t('winsMatch');
    document.getElementById('goSub').style.color=col;
    document.getElementById('goReason').textContent=(reason==='blocked'||reason==='pipexhaust')?winner.name+' '+t('blockedWins'):winner.name+' '+t('emptiedHand');
    panel.innerHTML='<div class="go-scoreboard-title">'+t('scoreboard')+'</div>';
    var sorted=players.map(function(p,i){return{p:p,i:i};}).sort(function(a,b){return b.p.score-a.p.score;});
    sorted.forEach(function(s){
      var isW=s.i===winIdx, c2=PLAYER_COLORS[s.i];
      var row=document.createElement('div'); row.className='go-score-row'+(isW?' winner':'');
      var nameS=document.createElement('span'); nameS.className='go-name'; nameS.style.color=isW?c2:'#5a6e88';
      nameS.textContent=(isW?'🥇 ':'')+PLAYER_EMOJIS[s.i]+' '+s.p.name;
      var ptsS=document.createElement('span'); ptsS.className='go-points'; ptsS.style.color=c2;
      ptsS.textContent=s.p.score;
      row.appendChild(nameS); row.appendChild(ptsS); panel.appendChild(row);
    });
  }
  document.getElementById('govl').style.display='flex';
  document.getElementById('roundOvl').style.display='none';
  renderMenuScores();
}


/* ─────────────────────────────────────────────────────────
   15. NEXT TURN
   ───────────────────────────────────────────────────────── */
function nextTurn() {
  stopTimer();
  curPlayer=(curPlayer+1)%players.length;
  var p=players[curPlayer];
  renderAll();
  setMsg(p.name+t('yoursTurn'),0);
  if(p.isAI){schedAI();return;}
  if(mode==='multi'){showHandoff();return;}
  var play=p.hand.filter(function(t){return canPlay(t,L,R);});
  var noMoves=play.length===0&&(BY.length===0||gameRule==='block');
  if(noMoves) checkBlocked();
  else startTimer();
}


/* ─────────────────────────────────────────────────────────
   16. PLAYER ACTIONS
   ───────────────────────────────────────────────────────── */
function onTap(tile) {
  if(handoffPending) return;
  if(L===null){var w=applyPlace(tile,'right');if(!w)nextTurn();return;}
  var ends=getEnds(tile,L,R);
  if(!ends.length){sfxError();setMsg(t('noFit'),1800);return;}
  if(ends.length===1){var w2=applyPlace(tile,ends[0]);if(!w2)nextTurn();}
  else{
    pendT=tile;
    document.getElementById('csLv').textContent=L;
    document.getElementById('csRv').textContent=R;
    var p=document.getElementById('csPrev'); p.innerHTML='';
    p.appendChild(makeTile(tile.a,tile.b,'V',42));
    document.getElementById('csovl').style.display='flex';
  }
}

function pickSide(side){
  if(!pendT) return;
  document.getElementById('csovl').style.display='none';
  var tile=pendT; pendT=null;
  var w=applyPlace(tile,side); if(!w) nextTurn();
}

function csCancel(){pendT=null;document.getElementById('csovl').style.display='none';}

function playerDraw(){
  if(handoffPending) return;
  if(gameRule==='block') return;
  var p=players[curPlayer];
  if(p.isAI||BY.length===0) return;
  if(p.hand.filter(function(t){return canPlay(t,L,R);}).length>0) return;
  var drawn=BY.pop(); p.hand.push(drawn);
  sfxDraw();
  setMsg(t('drew')+' ['+drawn.a+'|'+drawn.b+']',2000);
  renderAll();
  var np=p.hand.filter(function(t){return canPlay(t,L,R);});
  if(np.length===0&&BY.length===0) checkBlocked();
}

function playerPass(){
  var btn=document.getElementById('btnPass');
  if(btn && btn.getAttribute('data-pass-ready')==='0') return;
  if(handoffPending) return;
  sfxPass();
  setMsg('⏭ '+players[curPlayer].name+' '+t('passed'),1500);
  nextTurn();
}

function dropBoard(side){
  if(!dragT||handoffPending) return;
  var tile=dragT; dragT=null;
  if(L===null){var w=applyPlace(tile,'right');if(!w)nextTurn();return;}
  var ends=getEnds(tile,L,R);
  if(!ends.includes(side)){sfxError();setMsg(t('noFitEnd'),1800);return;}
  var w2=applyPlace(tile,side); if(!w2) nextTurn();
}


/* ─────────────────────────────────────────────────────────
   17. AI
   ───────────────────────────────────────────────────────── */
function schedAI(){clearTimeout(aiTmr);aiTmr=setTimeout(runAI,980);}

function runAI(){
  var p=players[curPlayer];
  if(!p||!p.isAI) return;
  var playable=p.hand.filter(function(t){return canPlay(t,L,R);});

  if(!playable.length){
    if(gameRule==='draw'&&BY.length>0){
      var drawn=BY.pop(); p.hand.push(drawn); sfxDraw();
      setMsg(t('aiDraws'),0); renderAIArea(); renderStatus();
      aiTmr=setTimeout(runAI,800); return;
    }
    setMsg(t('aiPasses'),1500); nextTurn(); return;
  }

  var chosen;
  if(aiDiff==='easy'){
    // Random play
    chosen=playable[Math.floor(Math.random()*playable.length)];
  } else if(aiDiff==='medium'){
    // Prefer doubles, then highest pip
    var dbl=playable.filter(function(t){return t.a===t.b;});
    var pool=dbl.length?dbl:playable;
    chosen=pool.reduce(function(b,t){return(t.a+t.b)>(b.a+b.b)?t:b;},pool[0]);
  } else {
    // Hard: minimax-like — play tile that blocks opponent the most
    // Score each playable tile: higher = better for AI
    var scored=playable.map(function(t){
      var testL=L, testR=R;
      // Simulate placement on right
      var simR=t.a===R?t.b:(t.b===R?t.a:null);
      var simL=t.a===L?t.b:(t.b===L?t.a:null);
      // Count how many opponent tiles can play after this move
      var oppBlocked=0;
      players.forEach(function(op,i){
        if(players[i].isAI) return;
        op.hand.forEach(function(ot){
          var nL=simL!==null?simL:testL;
          var nR=simR!==null?simR:testR;
          if(!canPlay(ot,nL,nR)) oppBlocked++;
        });
      });
      return {tile:t,score:(t.a+t.b)+oppBlocked*2};
    });
    scored.sort(function(a,b){return b.score-a.score;});
    chosen=scored[0].tile;
  }

  var side='right';
  if(L!==null){
    var cL=chosen.a===L||chosen.b===L;
    var cR=chosen.a===R||chosen.b===R;
    if(cL&&!cR) side='left';
  }
  setMsg(t('aiPlays')+' ['+chosen.a+'|'+chosen.b+']',1800);
  var w=applyPlace(chosen,side); if(!w) nextTurn();
}


/* ─────────────────────────────────────────────────────────
   18. NAVIGATION
   ───────────────────────────────────────────────────────── */
function go(id){
  document.querySelectorAll('.scr').forEach(function(s){s.classList.remove('on');});
  document.getElementById(id).classList.add('on');
  // Re-apply board bg whenever game screen shown
  if(id==='scrGame') renderBoardBg();
}

function hideAll(){
  ['povl','govl','csovl','handoffOvl','roundOvl'].forEach(function(id){
    document.getElementById(id).style.display='none';
  });
}

function pauseOn(){stopTimer();clearTimeout(aiTmr);document.getElementById('povl').style.display='flex';}
function pauseOff(){
  document.getElementById('povl').style.display='none';
  var p=players[curPlayer];
  if(p&&p.isAI) schedAI();
  else startTimer();
}
function goMenu(){clearTimeout(aiTmr);stopTimer();hideAll();go('scrMenu');}


/* ─────────────────────────────────────────────────────────
   19. DRAG & DROP SETUP
   ───────────────────────────────────────────────────────── */
function setupDragDrop(){
  var eb=document.getElementById('emptyBoard');
  eb.addEventListener('dragover',function(e){e.preventDefault();eb.classList.add('drag-over');});
  eb.addEventListener('dragleave',function(){eb.classList.remove('drag-over');});
  eb.addEventListener('drop',function(e){e.preventDefault();eb.classList.remove('drag-over');dropBoard('right');});
  var dL=document.getElementById('dropL');
  dL.addEventListener('dragover',function(e){e.preventDefault();dL.classList.add('drag-over');});
  dL.addEventListener('dragleave',function(){dL.classList.remove('drag-over');});
  dL.addEventListener('drop',function(e){e.preventDefault();dL.classList.remove('drag-over');dropBoard('left');});
  var dR=document.getElementById('dropR');
  dR.addEventListener('dragover',function(e){e.preventDefault();dR.classList.add('drag-over');});
  dR.addEventListener('dragleave',function(){dR.classList.remove('drag-over');});
  dR.addEventListener('drop',function(e){e.preventDefault();dR.classList.remove('drag-over');dropBoard('right');});
}


/* ─────────────────────────────────────────────────────────
   20. INITIALIZATION
   ───────────────────────────────────────────────────────── */
(function init(){
  // Default players
  players=[
    {name:'You',hand:[],score:0,isAI:false},
    {name:'AI', hand:[],score:0,isAI:true}
  ];

  // Apply default language
  setLang('en');

  renderMenuScores();

  // Menu preview tiles
  var prev=document.getElementById('menuPreview');
  [{a:6,b:6},{a:5,b:3},{a:4,b:1}].forEach(function(t){prev.appendChild(makeTile(t.a,t.b,'H',26));});

  // Decorative bg tiles
  var bgEl=document.getElementById('menuBg');
  [[9,7,18],[24,38,52],[66,10,74],[80,55,118],[47,70,148],[56,22,-28]].forEach(function(p,i){
    var wrap=document.createElement('div');
    wrap.style.cssText='position:absolute;left:'+p[0]+'%;top:'+p[1]+'%;opacity:.045;transform:rotate('+p[2]+'deg);pointer-events:none;';
    wrap.appendChild(makeTile(i,Math.min(i+2,6),'V',44));
    bgEl.appendChild(wrap);
  });

  // Player count buttons
  rebuildPlayerCountBtns();

  // Quick chat phrases
  buildQuickPhrases();

  // Drag and drop
  setupDragDrop();
})();
