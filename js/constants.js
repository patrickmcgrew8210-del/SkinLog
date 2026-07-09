/* ══════════════════════════════════════════════
   CONSTANTS — labels, colors, category maps, fixed lookup tables
══════════════════════════════════════════════ */

const VIEWS = ['dashboard','log','history','trends'];
const BREAKOUT_LABELS = ['','Clear','Mild','Moderate','Significant','Severe'];
const REDNESS_LABELS  = ['','Calm','Faint','Noticeable','Inflamed','Reactive'];
const BREAKOUT_COLORS = ['','#d4908a','#c77c74','#b8685e','#a85450','#943f3a'];
const REDNESS_COLORS  = ['','#8fa88a','#7a9a74','#668b60','#527a4c','#3e693a'];
const SLEEP_EMOJI     = { poor:'😞', fair:'😐', good:'🙂', great:'😄', 'not set':'—' };
const FACE_REGIONS = ['forehead', 'left-cheek', 'right-cheek', 'nose', 'chin', 'jawline'];
const FACE_REGION_LABELS = {
  forehead: 'Forehead', 'left-cheek': 'Left Cheek', 'right-cheek': 'Right Cheek',
  nose: 'Nose', chin: 'Chin', jawline: 'Jawline',
};

const PRODUCT_CATEGORIES = ['cleanser', 'treatment', 'moisturizer', 'spf', 'other'];
const PRODUCT_CATEGORY_LABELS = { cleanser: 'Cleanser', treatment: 'Treatment', moisturizer: 'Moisturizer', spf: 'SPF', other: 'Other' };

const TRIGGER_STOPWORDS = new Set([
  'a','an','the','and','or','but','of','to','in','on','at','for','with','from','by',
  'is','was','were','are','be','been','being','it','its','this','that','these','those',
  'i','me','my','we','our','you','your',
  'today','yesterday','day','days','felt','feel','feeling',
  'very','really','just','also','so','too','not','no','yes',
  'got','get','had','have','went','doing','did','still','again','maybe','kind',
]);

const SLEEP_STYLES = {
  poor:  { bg:'#fef2f2', border:'#fca5a5', color:'#991b1b' },
  fair:  { bg:'#fefce8', border:'#fde047', color:'#854d0e' },
  good:  { bg:'#f0fdf4', border:'#86efac', color:'#166534' },
  great: { bg:'#eff6ff', border:'#93c5fd', color:'#1e3a8a' },
};
const PHOTO_MAX_W   = 400;   // max output width in px
const PHOTO_QUALITY = 0.6;   // JPEG compression quality (0–1)

