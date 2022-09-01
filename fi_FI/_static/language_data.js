/*
 * language_data.js
 * ~~~~~~~~~~~~~~~~
 *
 * This script contains the language-specific data used by searchtools.js,
 * namely the list of stopwords, stemmer, scorer and splitter.
 *
 * :copyright: Copyright 2007-2021 by the Sphinx team, see AUTHORS.
 * :license: BSD, see LICENSE for details.
 *
 */

var stopwords = ["ei","eiv\u00e4t","emme","en","et","ette","ett\u00e4","he","heid\u00e4n","heid\u00e4t","heihin","heille","heill\u00e4","heilt\u00e4","heiss\u00e4","heist\u00e4","heit\u00e4","h\u00e4n","h\u00e4neen","h\u00e4nelle","h\u00e4nell\u00e4","h\u00e4nelt\u00e4","h\u00e4nen","h\u00e4ness\u00e4","h\u00e4nest\u00e4","h\u00e4net","h\u00e4nt\u00e4","itse","ja","johon","joiden","joihin","joiksi","joilla","joille","joilta","joina","joissa","joista","joita","joka","joksi","jolla","jolle","jolta","jona","jonka","jos","jossa","josta","jota","jotka","kanssa","keiden","keihin","keiksi","keille","keill\u00e4","keilt\u00e4","kein\u00e4","keiss\u00e4","keist\u00e4","keit\u00e4","keneen","keneksi","kenelle","kenell\u00e4","kenelt\u00e4","kenen","kenen\u00e4","keness\u00e4","kenest\u00e4","kenet","ketk\u00e4","ket\u00e4","koska","kuin","kuka","kun","me","meid\u00e4n","meid\u00e4t","meihin","meille","meill\u00e4","meilt\u00e4","meiss\u00e4","meist\u00e4","meit\u00e4","mihin","miksi","mik\u00e4","mille","mill\u00e4","milt\u00e4","mink\u00e4","minua","minulla","minulle","minulta","minun","minussa","minusta","minut","minuun","min\u00e4","miss\u00e4","mist\u00e4","mitk\u00e4","mit\u00e4","mukaan","mutta","ne","niiden","niihin","niiksi","niille","niill\u00e4","niilt\u00e4","niin","niin\u00e4","niiss\u00e4","niist\u00e4","niit\u00e4","noiden","noihin","noiksi","noilla","noille","noilta","noin","noina","noissa","noista","noita","nuo","nyt","n\u00e4iden","n\u00e4ihin","n\u00e4iksi","n\u00e4ille","n\u00e4ill\u00e4","n\u00e4ilt\u00e4","n\u00e4in\u00e4","n\u00e4iss\u00e4","n\u00e4ist\u00e4","n\u00e4it\u00e4","n\u00e4m\u00e4","ole","olemme","olen","olet","olette","oli","olimme","olin","olisi","olisimme","olisin","olisit","olisitte","olisivat","olit","olitte","olivat","olla","olleet","ollut","on","ovat","poikki","se","sek\u00e4","sen","siihen","siin\u00e4","siit\u00e4","siksi","sille","sill\u00e4","silt\u00e4","sinua","sinulla","sinulle","sinulta","sinun","sinussa","sinusta","sinut","sinuun","sin\u00e4","sit\u00e4","tai","te","teid\u00e4n","teid\u00e4t","teihin","teille","teill\u00e4","teilt\u00e4","teiss\u00e4","teist\u00e4","teit\u00e4","tuo","tuohon","tuoksi","tuolla","tuolle","tuolta","tuon","tuona","tuossa","tuosta","tuota","t\u00e4h\u00e4n","t\u00e4ksi","t\u00e4lle","t\u00e4ll\u00e4","t\u00e4lt\u00e4","t\u00e4m\u00e4","t\u00e4m\u00e4n","t\u00e4n\u00e4","t\u00e4ss\u00e4","t\u00e4st\u00e4","t\u00e4t\u00e4","vaan","vai","vaikka","yli"];


/* Non-minified version is copied as a separate JS file, is available */
BaseStemmer=function(){this.setCurrent=function(r){this.current=r;this.cursor=0;this.limit=this.current.length;this.limit_backward=0;this.bra=this.cursor;this.ket=this.limit};this.getCurrent=function(){return this.current};this.copy_from=function(r){this.current=r.current;this.cursor=r.cursor;this.limit=r.limit;this.limit_backward=r.limit_backward;this.bra=r.bra;this.ket=r.ket};this.in_grouping=function(r,t,i){if(this.cursor>=this.limit)return false;var s=this.current.charCodeAt(this.cursor);if(s>i||s<t)return false;s-=t;if((r[s>>>3]&1<<(s&7))==0)return false;this.cursor++;return true};this.in_grouping_b=function(r,t,i){if(this.cursor<=this.limit_backward)return false;var s=this.current.charCodeAt(this.cursor-1);if(s>i||s<t)return false;s-=t;if((r[s>>>3]&1<<(s&7))==0)return false;this.cursor--;return true};this.out_grouping=function(r,t,i){if(this.cursor>=this.limit)return false;var s=this.current.charCodeAt(this.cursor);if(s>i||s<t){this.cursor++;return true}s-=t;if((r[s>>>3]&1<<(s&7))==0){this.cursor++;return true}return false};this.out_grouping_b=function(r,t,i){if(this.cursor<=this.limit_backward)return false;var s=this.current.charCodeAt(this.cursor-1);if(s>i||s<t){this.cursor--;return true}s-=t;if((r[s>>>3]&1<<(s&7))==0){this.cursor--;return true}return false};this.eq_s=function(r){if(this.limit-this.cursor<r.length)return false;if(this.current.slice(this.cursor,this.cursor+r.length)!=r){return false}this.cursor+=r.length;return true};this.eq_s_b=function(r){if(this.cursor-this.limit_backward<r.length)return false;if(this.current.slice(this.cursor-r.length,this.cursor)!=r){return false}this.cursor-=r.length;return true};this.find_among=function(r){var t=0;var i=r.length;var s=this.cursor;var e=this.limit;var h=0;var u=0;var n=false;while(true){var c=t+(i-t>>>1);var a=0;var f=h<u?h:u;var l=r[c];var o;for(o=f;o<l[0].length;o++){if(s+f==e){a=-1;break}a=this.current.charCodeAt(s+f)-l[0].charCodeAt(o);if(a!=0)break;f++}if(a<0){i=c;u=f}else{t=c;h=f}if(i-t<=1){if(t>0)break;if(i==t)break;if(n)break;n=true}}do{var l=r[t];if(h>=l[0].length){this.cursor=s+l[0].length;if(l.length<4)return l[2];var v=l[3](this);this.cursor=s+l[0].length;if(v)return l[2]}t=l[1]}while(t>=0);return 0};this.find_among_b=function(r){var t=0;var i=r.length;var s=this.cursor;var e=this.limit_backward;var h=0;var u=0;var n=false;while(true){var c=t+(i-t>>1);var a=0;var f=h<u?h:u;var l=r[c];var o;for(o=l[0].length-1-f;o>=0;o--){if(s-f==e){a=-1;break}a=this.current.charCodeAt(s-1-f)-l[0].charCodeAt(o);if(a!=0)break;f++}if(a<0){i=c;u=f}else{t=c;h=f}if(i-t<=1){if(t>0)break;if(i==t)break;if(n)break;n=true}}do{var l=r[t];if(h>=l[0].length){this.cursor=s-l[0].length;if(l.length<4)return l[2];var v=l[3](this);this.cursor=s-l[0].length;if(v)return l[2]}t=l[1]}while(t>=0);return 0};this.replace_s=function(r,t,i){var s=i.length-(t-r);this.current=this.current.slice(0,r)+i+this.current.slice(t);this.limit+=s;if(this.cursor>=t)this.cursor+=s;else if(this.cursor>r)this.cursor=r;return s};this.slice_check=function(){if(this.bra<0||this.bra>this.ket||this.ket>this.limit||this.limit>this.current.length){return false}return true};this.slice_from=function(r){var t=false;if(this.slice_check()){this.replace_s(this.bra,this.ket,r);t=true}return t};this.slice_del=function(){return this.slice_from("")};this.insert=function(r,t,i){var s=this.replace_s(r,t,i);if(r<=this.bra)this.bra+=s;if(r<=this.ket)this.ket+=s};this.slice_to=function(){var r="";if(this.slice_check()){r=this.current.slice(this.bra,this.ket)}return r};this.assign_to=function(){return this.current.slice(0,this.limit)}};
FinnishStemmer=function(){var r=new BaseStemmer;var i=[["pa",-1,1],["sti",-1,2],["kaan",-1,1],["han",-1,1],["kin",-1,1],["hÃ¤n",-1,1],["kÃ¤Ã¤n",-1,1],["ko",-1,1],["pÃ¤",-1,1],["kÃ¶",-1,1]];var e=[["lla",-1,-1],["na",-1,-1],["ssa",-1,-1],["ta",-1,-1],["lta",3,-1],["sta",3,-1]];var a=[["llÃ¤",-1,-1],["nÃ¤",-1,-1],["ssÃ¤",-1,-1],["tÃ¤",-1,-1],["ltÃ¤",3,-1],["stÃ¤",3,-1]];var s=[["lle",-1,-1],["ine",-1,-1]];var t=[["nsa",-1,3],["mme",-1,3],["nne",-1,3],["ni",-1,2],["si",-1,1],["an",-1,4],["en",-1,6],["Ã¤n",-1,5],["nsÃ¤",-1,3]];var u=[["aa",-1,-1],["ee",-1,-1],["ii",-1,-1],["oo",-1,-1],["uu",-1,-1],["Ã¤Ã¤",-1,-1],["Ã¶Ã¶",-1,-1]];var l=[["a",-1,8],["lla",0,-1],["na",0,-1],["ssa",0,-1],["ta",0,-1],["lta",4,-1],["sta",4,-1],["tta",4,2],["lle",-1,-1],["ine",-1,-1],["ksi",-1,-1],["n",-1,7],["han",11,1],["den",11,-1,S],["seen",11,-1,C],["hen",11,2],["tten",11,-1,S],["hin",11,3],["siin",11,-1,S],["hon",11,4],["hÃ¤n",11,5],["hÃ¶n",11,6],["Ã¤",-1,8],["llÃ¤",22,-1],["nÃ¤",22,-1],["ssÃ¤",22,-1],["tÃ¤",22,-1],["ltÃ¤",26,-1],["stÃ¤",26,-1],["ttÃ¤",26,2]];var c=[["eja",-1,-1],["mma",-1,1],["imma",1,-1],["mpa",-1,1],["impa",3,-1],["mmi",-1,1],["immi",5,-1],["mpi",-1,1],["impi",7,-1],["ejÃ¤",-1,-1],["mmÃ¤",-1,1],["immÃ¤",10,-1],["mpÃ¤",-1,1],["impÃ¤",12,-1]];var n=[["i",-1,-1],["j",-1,-1]];var f=[["mma",-1,1],["imma",0,-1]];var o=[17,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8];var b=[119,223,119,1];var _=[17,65,16,1,0,0,0,0,0,0,0,0,0,0,0,0,8,0,32];var m=[17,65,16,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,32];var k=[17,97,24,1,0,0,0,0,0,0,0,0,0,0,0,0,8,0,32];var d=false;var v="";var w=0;var g=0;function p(){g=r.limit;w=r.limit;r:while(true){var i=r.cursor;i:{if(!r.in_grouping(_,97,246)){break i}r.cursor=i;break r}r.cursor=i;if(r.cursor>=r.limit){return false}r.cursor++}r:while(true){i:{if(!r.out_grouping(_,97,246)){break i}break r}if(r.cursor>=r.limit){return false}r.cursor++}g=r.cursor;r:while(true){var e=r.cursor;i:{if(!r.in_grouping(_,97,246)){break i}r.cursor=e;break r}r.cursor=e;if(r.cursor>=r.limit){return false}r.cursor++}r:while(true){i:{if(!r.out_grouping(_,97,246)){break i}break r}if(r.cursor>=r.limit){return false}r.cursor++}w=r.cursor;return true}function h(){if(!(w<=r.cursor)){return false}return true}function q(){var e;if(r.cursor<g){return false}var a=r.limit_backward;r.limit_backward=g;r.ket=r.cursor;e=r.find_among_b(i);if(e==0){r.limit_backward=a;return false}r.bra=r.cursor;r.limit_backward=a;switch(e){case 1:if(!r.in_grouping_b(k,97,246)){return false}break;case 2:if(!h()){return false}break}if(!r.slice_del()){return false}return true}function j(){var i;if(r.cursor<g){return false}var u=r.limit_backward;r.limit_backward=g;r.ket=r.cursor;i=r.find_among_b(t);if(i==0){r.limit_backward=u;return false}r.bra=r.cursor;r.limit_backward=u;switch(i){case 1:{var l=r.limit-r.cursor;r:{if(!r.eq_s_b("k")){break r}return false}r.cursor=r.limit-l}if(!r.slice_del()){return false}break;case 2:if(!r.slice_del()){return false}r.ket=r.cursor;if(!r.eq_s_b("kse")){return false}r.bra=r.cursor;if(!r.slice_from("ksi")){return false}break;case 3:if(!r.slice_del()){return false}break;case 4:if(r.find_among_b(e)==0){return false}if(!r.slice_del()){return false}break;case 5:if(r.find_among_b(a)==0){return false}if(!r.slice_del()){return false}break;case 6:if(r.find_among_b(s)==0){return false}if(!r.slice_del()){return false}break}return true}function C(){if(r.find_among_b(u)==0){return false}return true}function S(){if(!r.eq_s_b("i")){return false}if(!r.in_grouping_b(m,97,246)){return false}return true}function B(){var i;if(r.cursor<g){return false}var e=r.limit_backward;r.limit_backward=g;r.ket=r.cursor;i=r.find_among_b(l);if(i==0){r.limit_backward=e;return false}r.bra=r.cursor;r.limit_backward=e;switch(i){case 1:if(!r.eq_s_b("a")){return false}break;case 2:if(!r.eq_s_b("e")){return false}break;case 3:if(!r.eq_s_b("i")){return false}break;case 4:if(!r.eq_s_b("o")){return false}break;case 5:if(!r.eq_s_b("Ã¤")){return false}break;case 6:if(!r.eq_s_b("Ã¶")){return false}break;case 7:var a=r.limit-r.cursor;r:{var s=r.limit-r.cursor;i:{var t=r.limit-r.cursor;e:{if(!C()){break e}break i}r.cursor=r.limit-t;if(!r.eq_s_b("ie")){r.cursor=r.limit-a;break r}}r.cursor=r.limit-s;if(r.cursor<=r.limit_backward){r.cursor=r.limit-a;break r}r.cursor--;r.bra=r.cursor}break;case 8:if(!r.in_grouping_b(_,97,246)){return false}if(!r.in_grouping_b(b,98,122)){return false}break}if(!r.slice_del()){return false}d=true;return true}function F(){var i;if(r.cursor<w){return false}var e=r.limit_backward;r.limit_backward=w;r.ket=r.cursor;i=r.find_among_b(c);if(i==0){r.limit_backward=e;return false}r.bra=r.cursor;r.limit_backward=e;switch(i){case 1:{var a=r.limit-r.cursor;r:{if(!r.eq_s_b("po")){break r}return false}r.cursor=r.limit-a}break}if(!r.slice_del()){return false}return true}function W(){if(r.cursor<g){return false}var i=r.limit_backward;r.limit_backward=g;r.ket=r.cursor;if(r.find_among_b(n)==0){r.limit_backward=i;return false}r.bra=r.cursor;r.limit_backward=i;if(!r.slice_del()){return false}return true}function x(){var i;if(r.cursor<g){return false}var e=r.limit_backward;r.limit_backward=g;r.ket=r.cursor;if(!r.eq_s_b("t")){r.limit_backward=e;return false}r.bra=r.cursor;var a=r.limit-r.cursor;if(!r.in_grouping_b(_,97,246)){r.limit_backward=e;return false}r.cursor=r.limit-a;if(!r.slice_del()){return false}r.limit_backward=e;if(r.cursor<w){return false}var s=r.limit_backward;r.limit_backward=w;r.ket=r.cursor;i=r.find_among_b(f);if(i==0){r.limit_backward=s;return false}r.bra=r.cursor;r.limit_backward=s;switch(i){case 1:{var t=r.limit-r.cursor;r:{if(!r.eq_s_b("po")){break r}return false}r.cursor=r.limit-t}break}if(!r.slice_del()){return false}return true}function y(){if(r.cursor<g){return false}var i=r.limit_backward;r.limit_backward=g;var e=r.limit-r.cursor;r:{var a=r.limit-r.cursor;if(!C()){break r}r.cursor=r.limit-a;r.ket=r.cursor;if(r.cursor<=r.limit_backward){break r}r.cursor--;r.bra=r.cursor;if(!r.slice_del()){return false}}r.cursor=r.limit-e;var s=r.limit-r.cursor;r:{r.ket=r.cursor;if(!r.in_grouping_b(o,97,228)){break r}r.bra=r.cursor;if(!r.in_grouping_b(b,98,122)){break r}if(!r.slice_del()){return false}}r.cursor=r.limit-s;var t=r.limit-r.cursor;r:{r.ket=r.cursor;if(!r.eq_s_b("j")){break r}r.bra=r.cursor;i:{var u=r.limit-r.cursor;e:{if(!r.eq_s_b("o")){break e}break i}r.cursor=r.limit-u;if(!r.eq_s_b("u")){break r}}if(!r.slice_del()){return false}}r.cursor=r.limit-t;var l=r.limit-r.cursor;r:{r.ket=r.cursor;if(!r.eq_s_b("o")){break r}r.bra=r.cursor;if(!r.eq_s_b("j")){break r}if(!r.slice_del()){return false}}r.cursor=r.limit-l;r.limit_backward=i;r:while(true){var c=r.limit-r.cursor;i:{if(!r.out_grouping_b(_,97,246)){break i}r.cursor=r.limit-c;break r}r.cursor=r.limit-c;if(r.cursor<=r.limit_backward){return false}r.cursor--}r.ket=r.cursor;if(!r.in_grouping_b(b,98,122)){return false}r.bra=r.cursor;v=r.slice_to();if(v==""){return false}if(!r.eq_s_b(v)){return false}if(!r.slice_del()){return false}return true}this.stem=function(){var i=r.cursor;p();r.cursor=i;d=false;r.limit_backward=r.cursor;r.cursor=r.limit;var e=r.limit-r.cursor;q();r.cursor=r.limit-e;var a=r.limit-r.cursor;j();r.cursor=r.limit-a;var s=r.limit-r.cursor;B();r.cursor=r.limit-s;var t=r.limit-r.cursor;F();r.cursor=r.limit-t;r:{i:{if(!d){break i}var u=r.limit-r.cursor;W();r.cursor=r.limit-u;break r}var l=r.limit-r.cursor;x();r.cursor=r.limit-l}var c=r.limit-r.cursor;y();r.cursor=r.limit-c;r.cursor=r.limit_backward;return true};this["stemWord"]=function(i){r.setCurrent(i);this.stem();return r.getCurrent()}};
Stemmer = FinnishStemmer;



var splitChars = (function() {
    var result = {};
    var singles = [96, 180, 187, 191, 215, 247, 749, 885, 903, 907, 909, 930, 1014, 1648,
         1748, 1809, 2416, 2473, 2481, 2526, 2601, 2609, 2612, 2615, 2653, 2702,
         2706, 2729, 2737, 2740, 2857, 2865, 2868, 2910, 2928, 2948, 2961, 2971,
         2973, 3085, 3089, 3113, 3124, 3213, 3217, 3241, 3252, 3295, 3341, 3345,
         3369, 3506, 3516, 3633, 3715, 3721, 3736, 3744, 3748, 3750, 3756, 3761,
         3781, 3912, 4239, 4347, 4681, 4695, 4697, 4745, 4785, 4799, 4801, 4823,
         4881, 5760, 5901, 5997, 6313, 7405, 8024, 8026, 8028, 8030, 8117, 8125,
         8133, 8181, 8468, 8485, 8487, 8489, 8494, 8527, 11311, 11359, 11687, 11695,
         11703, 11711, 11719, 11727, 11735, 12448, 12539, 43010, 43014, 43019, 43587,
         43696, 43713, 64286, 64297, 64311, 64317, 64319, 64322, 64325, 65141];
    var i, j, start, end;
    for (i = 0; i < singles.length; i++) {
        result[singles[i]] = true;
    }
    var ranges = [[0, 47], [58, 64], [91, 94], [123, 169], [171, 177], [182, 184], [706, 709],
         [722, 735], [741, 747], [751, 879], [888, 889], [894, 901], [1154, 1161],
         [1318, 1328], [1367, 1368], [1370, 1376], [1416, 1487], [1515, 1519], [1523, 1568],
         [1611, 1631], [1642, 1645], [1750, 1764], [1767, 1773], [1789, 1790], [1792, 1807],
         [1840, 1868], [1958, 1968], [1970, 1983], [2027, 2035], [2038, 2041], [2043, 2047],
         [2070, 2073], [2075, 2083], [2085, 2087], [2089, 2307], [2362, 2364], [2366, 2383],
         [2385, 2391], [2402, 2405], [2419, 2424], [2432, 2436], [2445, 2446], [2449, 2450],
         [2483, 2485], [2490, 2492], [2494, 2509], [2511, 2523], [2530, 2533], [2546, 2547],
         [2554, 2564], [2571, 2574], [2577, 2578], [2618, 2648], [2655, 2661], [2672, 2673],
         [2677, 2692], [2746, 2748], [2750, 2767], [2769, 2783], [2786, 2789], [2800, 2820],
         [2829, 2830], [2833, 2834], [2874, 2876], [2878, 2907], [2914, 2917], [2930, 2946],
         [2955, 2957], [2966, 2968], [2976, 2978], [2981, 2983], [2987, 2989], [3002, 3023],
         [3025, 3045], [3059, 3076], [3130, 3132], [3134, 3159], [3162, 3167], [3170, 3173],
         [3184, 3191], [3199, 3204], [3258, 3260], [3262, 3293], [3298, 3301], [3312, 3332],
         [3386, 3388], [3390, 3423], [3426, 3429], [3446, 3449], [3456, 3460], [3479, 3481],
         [3518, 3519], [3527, 3584], [3636, 3647], [3655, 3663], [3674, 3712], [3717, 3718],
         [3723, 3724], [3726, 3731], [3752, 3753], [3764, 3772], [3774, 3775], [3783, 3791],
         [3802, 3803], [3806, 3839], [3841, 3871], [3892, 3903], [3949, 3975], [3980, 4095],
         [4139, 4158], [4170, 4175], [4182, 4185], [4190, 4192], [4194, 4196], [4199, 4205],
         [4209, 4212], [4226, 4237], [4250, 4255], [4294, 4303], [4349, 4351], [4686, 4687],
         [4702, 4703], [4750, 4751], [4790, 4791], [4806, 4807], [4886, 4887], [4955, 4968],
         [4989, 4991], [5008, 5023], [5109, 5120], [5741, 5742], [5787, 5791], [5867, 5869],
         [5873, 5887], [5906, 5919], [5938, 5951], [5970, 5983], [6001, 6015], [6068, 6102],
         [6104, 6107], [6109, 6111], [6122, 6127], [6138, 6159], [6170, 6175], [6264, 6271],
         [6315, 6319], [6390, 6399], [6429, 6469], [6510, 6511], [6517, 6527], [6572, 6592],
         [6600, 6607], [6619, 6655], [6679, 6687], [6741, 6783], [6794, 6799], [6810, 6822],
         [6824, 6916], [6964, 6980], [6988, 6991], [7002, 7042], [7073, 7085], [7098, 7167],
         [7204, 7231], [7242, 7244], [7294, 7400], [7410, 7423], [7616, 7679], [7958, 7959],
         [7966, 7967], [8006, 8007], [8014, 8015], [8062, 8063], [8127, 8129], [8141, 8143],
         [8148, 8149], [8156, 8159], [8173, 8177], [8189, 8303], [8306, 8307], [8314, 8318],
         [8330, 8335], [8341, 8449], [8451, 8454], [8456, 8457], [8470, 8472], [8478, 8483],
         [8506, 8507], [8512, 8516], [8522, 8525], [8586, 9311], [9372, 9449], [9472, 10101],
         [10132, 11263], [11493, 11498], [11503, 11516], [11518, 11519], [11558, 11567],
         [11622, 11630], [11632, 11647], [11671, 11679], [11743, 11822], [11824, 12292],
         [12296, 12320], [12330, 12336], [12342, 12343], [12349, 12352], [12439, 12444],
         [12544, 12548], [12590, 12592], [12687, 12689], [12694, 12703], [12728, 12783],
         [12800, 12831], [12842, 12880], [12896, 12927], [12938, 12976], [12992, 13311],
         [19894, 19967], [40908, 40959], [42125, 42191], [42238, 42239], [42509, 42511],
         [42540, 42559], [42592, 42593], [42607, 42622], [42648, 42655], [42736, 42774],
         [42784, 42785], [42889, 42890], [42893, 43002], [43043, 43055], [43062, 43071],
         [43124, 43137], [43188, 43215], [43226, 43249], [43256, 43258], [43260, 43263],
         [43302, 43311], [43335, 43359], [43389, 43395], [43443, 43470], [43482, 43519],
         [43561, 43583], [43596, 43599], [43610, 43615], [43639, 43641], [43643, 43647],
         [43698, 43700], [43703, 43704], [43710, 43711], [43715, 43738], [43742, 43967],
         [44003, 44015], [44026, 44031], [55204, 55215], [55239, 55242], [55292, 55295],
         [57344, 63743], [64046, 64047], [64110, 64111], [64218, 64255], [64263, 64274],
         [64280, 64284], [64434, 64466], [64830, 64847], [64912, 64913], [64968, 65007],
         [65020, 65135], [65277, 65295], [65306, 65312], [65339, 65344], [65371, 65381],
         [65471, 65473], [65480, 65481], [65488, 65489], [65496, 65497]];
    for (i = 0; i < ranges.length; i++) {
        start = ranges[i][0];
        end = ranges[i][1];
        for (j = start; j <= end; j++) {
            result[j] = true;
        }
    }
    return result;
})();

function splitQuery(query) {
    var result = [];
    var start = -1;
    for (var i = 0; i < query.length; i++) {
        if (splitChars[query.charCodeAt(i)]) {
            if (start !== -1) {
                result.push(query.slice(start, i));
                start = -1;
            }
        } else if (start === -1) {
            start = i;
        }
    }
    if (start !== -1) {
        result.push(query.slice(start));
    }
    return result;
}


