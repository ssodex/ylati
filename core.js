export const STORAGE_KEY = 'italiano-pwa-v1';
export const clean = value => String(value).normalize('NFC').trim().replace(/\s+/g, ' ');
export const normalize = value => clean(value).toLocaleLowerCase('cs');
export const pairKey = c => JSON.stringify([normalize(c.it), normalize(c.cs)]);
export function uid() { return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`; }
export function makeCard(it, cs, category = '') { return { id: uid(), it: clean(it), cs: clean(cs), category: clean(category), rating: 'new', reviews: 0, lastReviewed: 0 }; }
export const starter = [
['ciao','ahoj','základní'],['buongiorno','dobrý den','základní'],['buonasera','dobrý večer','základní'],['arrivederci','na shledanou','základní'],['grazie','děkuji','základní'],['prego','není zač','základní'],['per favore','prosím','základní'],['scusa','promiň','základní'],['sì','ano','základní'],['no','ne','základní'],['come stai?','jak se máš?','seznámení'],['mi chiamo…','jmenuji se…','seznámení'],['piacere','těší mě','seznámení'],['non capisco','nerozumím','základní'],['puoi ripetere?','můžeš to zopakovat?','základní'],['parlo un po’ di italiano','mluvím trochu italsky','seznámení'],['un caffè, per favore','jednu kávu, prosím','kavárna'],['il conto, per favore','účet, prosím','restaurace'],['acqua naturale','neperlivá voda','restaurace'],['sono vegetariano','jsem vegetarián','restaurace'],['quanto costa?','kolik to stojí?','nakupování'],['dov’è il bagno?','kde je toaleta?','cestování'],['un biglietto','jedna jízdenka','cestování'],['la stazione','nádraží','cestování']
];
export function initialState() { return {version:1,cards:starter.map(x=>makeCard(...x)),history:[]}; }
export function parseImport(text, existing=[]) {
 const seen=new Set(existing.map(pairKey)); const cards=[]; const errors=[]; let duplicates=0;
 text.split(/\r?\n/).forEach((line,index)=>{const s=line.trim();if(!s||s.startsWith('```'))return;
 const parts=s.split('|').map(clean);
 if(parts.length<2||parts.length>3||!parts[0]||!parts[1]||parts[0].length>300||parts[1].length>300||(parts[2]||'').length>60){errors.push(index+1);return;}
 const c=makeCard(...parts);const key=pairKey(c);if(seen.has(key)){duplicates++;return;}seen.add(key);cards.push(c);});
 return {cards,errors,duplicates};
}
export function distance(a,b) {a=Array.from(a);b=Array.from(b);let row=Array.from({length:b.length+1},(_,i)=>i);for(let i=0;i<a.length;i++){let next=[i+1];for(let j=0;j<b.length;j++)next[j+1]=Math.min(next[j]+1,row[j+1]+1,row[j]+(a[i]===b[j]?0:1));row=next;}return row[b.length];}
export function judge(answer, expected) { const a=normalize(answer),b=normalize(expected);if(a===b)return 'correct';if(!a)return 'wrong';const d=distance(a,b);return d<=(b.length>=9?2:1)&&b.length>=4?'almost':'wrong'; }
export function pickCard(cards, previousId=null, random=Math.random) {let pool=cards.filter(c=>c.id!==previousId);if(!pool.length)pool=cards; if(!pool.length)return null;const weight=c=>({again:7,hard:4,new:3,good:1}[c.rating]||3);let point=random()*pool.reduce((n,c)=>n+weight(c),0);for(const c of pool){point-=weight(c);if(point<0)return c;}return pool.at(-1);}
export function choicesFor(card,cards,field,random=Math.random) {const map=new Map();for(const c of cards)if(normalize(c[field])!==normalize(card[field]))map.set(normalize(c[field]),c[field]);let wrong=[...map.values()];shuffle(wrong,random);let result=[card[field],...wrong.slice(0,3)];return shuffle(result,random);}
export function shuffle(a,random=Math.random){for(let i=a.length-1;i>0;i--){let j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function dayKey(time=Date.now()){const d=new Date(time);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function validateState(x) {
 if(!x||x.version!==1||!Array.isArray(x.cards)||!Array.isArray(x.history)||x.cards.length>50000||x.history.length>200000)throw Error('Neplatný formát zálohy.');
 const ids=new Set(); const cards=x.cards.map(c=>{if(!c||typeof c.id!=='string'||!c.id||ids.has(c.id)||typeof c.it!=='string'||typeof c.cs!=='string'||typeof c.category!=='string'||!clean(c.it)||!clean(c.cs)||c.it.length>300||c.cs.length>300||c.category.length>60||!['new','again','hard','good'].includes(c.rating)||!Number.isSafeInteger(c.reviews)||c.reviews<0||!Number.isFinite(c.lastReviewed)||c.lastReviewed<0)throw Error('Záloha obsahuje neplatnou kartičku.');ids.add(c.id);return {...makeCard(c.it,c.cs,c.category),id:c.id,rating:c.rating,reviews:c.reviews,lastReviewed:c.lastReviewed};});
 const history=x.history.map(h=>{if(!h||typeof h.cardId!=='string'||!Number.isFinite(h.time)||h.time<0||!['again','hard','good'].includes(h.rating)||!['flash','write','choice'].includes(h.mode)||!['it-cs','cs-it'].includes(h.direction)||![null,'correct','almost','wrong'].includes(h.result))throw Error('Záloha obsahuje neplatný pokrok.');return {cardId:h.cardId,time:h.time,rating:h.rating,mode:h.mode,direction:h.direction,result:h.result};});
 return {version:1,cards,history};
}