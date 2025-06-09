/*
 * This script contains the language-specific data used by searchtools.js,
 * namely the list of stopwords, stemmer, scorer and splitter.
 */

var stopwords = ["aber", "alle", "allem", "allen", "aller", "alles", "als", "also", "am", "an", "ander", "andere", "anderem", "anderen", "anderer", "anderes", "anderm", "andern", "anderr", "anders", "auch", "auf", "aus", "bei", "bin", "bis", "bist", "da", "damit", "dann", "das", "dasselbe", "dazu", "da\u00df", "dein", "deine", "deinem", "deinen", "deiner", "deines", "dem", "demselben", "den", "denn", "denselben", "der", "derer", "derselbe", "derselben", "des", "desselben", "dessen", "dich", "die", "dies", "diese", "dieselbe", "dieselben", "diesem", "diesen", "dieser", "dieses", "dir", "doch", "dort", "du", "durch", "ein", "eine", "einem", "einen", "einer", "eines", "einig", "einige", "einigem", "einigen", "einiger", "einiges", "einmal", "er", "es", "etwas", "euch", "euer", "eure", "eurem", "euren", "eurer", "eures", "f\u00fcr", "gegen", "gewesen", "hab", "habe", "haben", "hat", "hatte", "hatten", "hier", "hin", "hinter", "ich", "ihm", "ihn", "ihnen", "ihr", "ihre", "ihrem", "ihren", "ihrer", "ihres", "im", "in", "indem", "ins", "ist", "jede", "jedem", "jeden", "jeder", "jedes", "jene", "jenem", "jenen", "jener", "jenes", "jetzt", "kann", "kein", "keine", "keinem", "keinen", "keiner", "keines", "k\u00f6nnen", "k\u00f6nnte", "machen", "man", "manche", "manchem", "manchen", "mancher", "manches", "mein", "meine", "meinem", "meinen", "meiner", "meines", "mich", "mir", "mit", "muss", "musste", "nach", "nicht", "nichts", "noch", "nun", "nur", "ob", "oder", "ohne", "sehr", "sein", "seine", "seinem", "seinen", "seiner", "seines", "selbst", "sich", "sie", "sind", "so", "solche", "solchem", "solchen", "solcher", "solches", "soll", "sollte", "sondern", "sonst", "um", "und", "uns", "unse", "unsem", "unsen", "unser", "unses", "unter", "viel", "vom", "von", "vor", "war", "waren", "warst", "was", "weg", "weil", "weiter", "welche", "welchem", "welchen", "welcher", "welches", "wenn", "werde", "werden", "wie", "wieder", "will", "wir", "wird", "wirst", "wo", "wollen", "wollte", "w\u00e4hrend", "w\u00fcrde", "w\u00fcrden", "zu", "zum", "zur", "zwar", "zwischen", "\u00fcber"];


/* Non-minified version is copied as a separate JS file, if available */
/**@constructor*/
BaseStemmer = function() {
    this.setCurrent = function(value) {
        this.current = value;
        this.cursor = 0;
        this.limit = this.current.length;
        this.limit_backward = 0;
        this.bra = this.cursor;
        this.ket = this.limit;
    };

    this.getCurrent = function() {
        return this.current;
    };

    this.copy_from = function(other) {
        this.current          = other.current;
        this.cursor           = other.cursor;
        this.limit            = other.limit;
        this.limit_backward   = other.limit_backward;
        this.bra              = other.bra;
        this.ket              = other.ket;
    };

    this.in_grouping = function(s, min, max) {
        if (this.cursor >= this.limit) return false;
        var ch = this.current.charCodeAt(this.cursor);
        if (ch > max || ch < min) return false;
        ch -= min;
        if ((s[ch >>> 3] & (0x1 << (ch & 0x7))) == 0) return false;
        this.cursor++;
        return true;
    };

    this.in_grouping_b = function(s, min, max) {
        if (this.cursor <= this.limit_backward) return false;
        var ch = this.current.charCodeAt(this.cursor - 1);
        if (ch > max || ch < min) return false;
        ch -= min;
        if ((s[ch >>> 3] & (0x1 << (ch & 0x7))) == 0) return false;
        this.cursor--;
        return true;
    };

    this.out_grouping = function(s, min, max) {
        if (this.cursor >= this.limit) return false;
        var ch = this.current.charCodeAt(this.cursor);
        if (ch > max || ch < min) {
            this.cursor++;
            return true;
        }
        ch -= min;
        if ((s[ch >>> 3] & (0X1 << (ch & 0x7))) == 0) {
            this.cursor++;
            return true;
        }
        return false;
    };

    this.out_grouping_b = function(s, min, max) {
        if (this.cursor <= this.limit_backward) return false;
        var ch = this.current.charCodeAt(this.cursor - 1);
        if (ch > max || ch < min) {
            this.cursor--;
            return true;
        }
        ch -= min;
        if ((s[ch >>> 3] & (0x1 << (ch & 0x7))) == 0) {
            this.cursor--;
            return true;
        }
        return false;
    };

    this.eq_s = function(s)
    {
        if (this.limit - this.cursor < s.length) return false;
        if (this.current.slice(this.cursor, this.cursor + s.length) != s)
        {
            return false;
        }
        this.cursor += s.length;
        return true;
    };

    this.eq_s_b = function(s)
    {
        if (this.cursor - this.limit_backward < s.length) return false;
        if (this.current.slice(this.cursor - s.length, this.cursor) != s)
        {
            return false;
        }
        this.cursor -= s.length;
        return true;
    };

    /** @return {number} */ this.find_among = function(v)
    {
        var i = 0;
        var j = v.length;

        var c = this.cursor;
        var l = this.limit;

        var common_i = 0;
        var common_j = 0;

        var first_key_inspected = false;

        while (true)
        {
            var k = i + ((j - i) >>> 1);
            var diff = 0;
            var common = common_i < common_j ? common_i : common_j; // smaller
            // w[0]: string, w[1]: substring_i, w[2]: result, w[3]: function (optional)
            var w = v[k];
            var i2;
            for (i2 = common; i2 < w[0].length; i2++)
            {
                if (c + common == l)
                {
                    diff = -1;
                    break;
                }
                diff = this.current.charCodeAt(c + common) - w[0].charCodeAt(i2);
                if (diff != 0) break;
                common++;
            }
            if (diff < 0)
            {
                j = k;
                common_j = common;
            }
            else
            {
                i = k;
                common_i = common;
            }
            if (j - i <= 1)
            {
                if (i > 0) break; // v->s has been inspected
                if (j == i) break; // only one item in v

                // - but now we need to go round once more to get
                // v->s inspected. This looks messy, but is actually
                // the optimal approach.

                if (first_key_inspected) break;
                first_key_inspected = true;
            }
        }
        do {
            var w = v[i];
            if (common_i >= w[0].length)
            {
                this.cursor = c + w[0].length;
                if (w.length < 4) return w[2];
                var res = w[3](this);
                this.cursor = c + w[0].length;
                if (res) return w[2];
            }
            i = w[1];
        } while (i >= 0);
        return 0;
    };

    // find_among_b is for backwards processing. Same comments apply
    this.find_among_b = function(v)
    {
        var i = 0;
        var j = v.length

        var c = this.cursor;
        var lb = this.limit_backward;

        var common_i = 0;
        var common_j = 0;

        var first_key_inspected = false;

        while (true)
        {
            var k = i + ((j - i) >> 1);
            var diff = 0;
            var common = common_i < common_j ? common_i : common_j;
            var w = v[k];
            var i2;
            for (i2 = w[0].length - 1 - common; i2 >= 0; i2--)
            {
                if (c - common == lb)
                {
                    diff = -1;
                    break;
                }
                diff = this.current.charCodeAt(c - 1 - common) - w[0].charCodeAt(i2);
                if (diff != 0) break;
                common++;
            }
            if (diff < 0)
            {
                j = k;
                common_j = common;
            }
            else
            {
                i = k;
                common_i = common;
            }
            if (j - i <= 1)
            {
                if (i > 0) break;
                if (j == i) break;
                if (first_key_inspected) break;
                first_key_inspected = true;
            }
        }
        do {
            var w = v[i];
            if (common_i >= w[0].length)
            {
                this.cursor = c - w[0].length;
                if (w.length < 4) return w[2];
                var res = w[3](this);
                this.cursor = c - w[0].length;
                if (res) return w[2];
            }
            i = w[1];
        } while (i >= 0);
        return 0;
    };

    /* to replace chars between c_bra and c_ket in this.current by the
     * chars in s.
     */
    this.replace_s = function(c_bra, c_ket, s)
    {
        var adjustment = s.length - (c_ket - c_bra);
        this.current = this.current.slice(0, c_bra) + s + this.current.slice(c_ket);
        this.limit += adjustment;
        if (this.cursor >= c_ket) this.cursor += adjustment;
        else if (this.cursor > c_bra) this.cursor = c_bra;
        return adjustment;
    };

    this.slice_check = function()
    {
        if (this.bra < 0 ||
            this.bra > this.ket ||
            this.ket > this.limit ||
            this.limit > this.current.length)
        {
            return false;
        }
        return true;
    };

    this.slice_from = function(s)
    {
        var result = false;
        if (this.slice_check())
        {
            this.replace_s(this.bra, this.ket, s);
            result = true;
        }
        return result;
    };

    this.slice_del = function()
    {
        return this.slice_from("");
    };

    this.insert = function(c_bra, c_ket, s)
    {
        var adjustment = this.replace_s(c_bra, c_ket, s);
        if (c_bra <= this.bra) this.bra += adjustment;
        if (c_bra <= this.ket) this.ket += adjustment;
    };

    this.slice_to = function()
    {
        var result = '';
        if (this.slice_check())
        {
            result = this.current.slice(this.bra, this.ket);
        }
        return result;
    };

    this.assign_to = function()
    {
        return this.current.slice(0, this.limit);
    };
};

// Generated by Snowball 2.1.0 - https://snowballstem.org/

/**@constructor*/
GermanStemmer = function() {
    var base = new BaseStemmer();
    /** @const */ var a_0 = [
        ["", -1, 5],
        ["U", 0, 2],
        ["Y", 0, 1],
        ["\u00E4", 0, 3],
        ["\u00F6", 0, 4],
        ["\u00FC", 0, 2]
    ];

    /** @const */ var a_1 = [
        ["e", -1, 2],
        ["em", -1, 1],
        ["en", -1, 2],
        ["ern", -1, 1],
        ["er", -1, 1],
        ["s", -1, 3],
        ["es", 5, 2]
    ];

    /** @const */ var a_2 = [
        ["en", -1, 1],
        ["er", -1, 1],
        ["st", -1, 2],
        ["est", 2, 1]
    ];

    /** @const */ var a_3 = [
        ["ig", -1, 1],
        ["lich", -1, 1]
    ];

    /** @const */ var a_4 = [
        ["end", -1, 1],
        ["ig", -1, 2],
        ["ung", -1, 1],
        ["lich", -1, 3],
        ["isch", -1, 2],
        ["ik", -1, 2],
        ["heit", -1, 3],
        ["keit", -1, 4]
    ];

    /** @const */ var /** Array<int> */ g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32, 8];

    /** @const */ var /** Array<int> */ g_s_ending = [117, 30, 5];

    /** @const */ var /** Array<int> */ g_st_ending = [117, 30, 4];

    var /** number */ I_x = 0;
    var /** number */ I_p2 = 0;
    var /** number */ I_p1 = 0;


    /** @return {boolean} */
    function r_prelude() {
        var /** number */ v_1 = base.cursor;
        while(true)
        {
            var /** number */ v_2 = base.cursor;
            lab0: {
                lab1: {
                    var /** number */ v_3 = base.cursor;
                    lab2: {
                        base.bra = base.cursor;
                        if (!(base.eq_s("\u00DF")))
                        {
                            break lab2;
                        }
                        base.ket = base.cursor;
                        if (!base.slice_from("ss"))
                        {
                            return false;
                        }
                        break lab1;
                    }
                    base.cursor = v_3;
                    if (base.cursor >= base.limit)
                    {
                        break lab0;
                    }
                    base.cursor++;
                }
                continue;
            }
            base.cursor = v_2;
            break;
        }
        base.cursor = v_1;
        while(true)
        {
            var /** number */ v_4 = base.cursor;
            lab3: {
                golab4: while(true)
                {
                    var /** number */ v_5 = base.cursor;
                    lab5: {
                        if (!(base.in_grouping(g_v, 97, 252)))
                        {
                            break lab5;
                        }
                        base.bra = base.cursor;
                        lab6: {
                            var /** number */ v_6 = base.cursor;
                            lab7: {
                                if (!(base.eq_s("u")))
                                {
                                    break lab7;
                                }
                                base.ket = base.cursor;
                                if (!(base.in_grouping(g_v, 97, 252)))
                                {
                                    break lab7;
                                }
                                if (!base.slice_from("U"))
                                {
                                    return false;
                                }
                                break lab6;
                            }
                            base.cursor = v_6;
                            if (!(base.eq_s("y")))
                            {
                                break lab5;
                            }
                            base.ket = base.cursor;
                            if (!(base.in_grouping(g_v, 97, 252)))
                            {
                                break lab5;
                            }
                            if (!base.slice_from("Y"))
                            {
                                return false;
                            }
                        }
                        base.cursor = v_5;
                        break golab4;
                    }
                    base.cursor = v_5;
                    if (base.cursor >= base.limit)
                    {
                        break lab3;
                    }
                    base.cursor++;
                }
                continue;
            }
            base.cursor = v_4;
            break;
        }
        return true;
    };

    /** @return {boolean} */
    function r_mark_regions() {
        I_p1 = base.limit;
        I_p2 = base.limit;
        var /** number */ v_1 = base.cursor;
        {
            var /** number */ c1 = base.cursor + 3;
            if (c1 > base.limit)
            {
                return false;
            }
            base.cursor = c1;
        }
        I_x = base.cursor;
        base.cursor = v_1;
        golab0: while(true)
        {
            lab1: {
                if (!(base.in_grouping(g_v, 97, 252)))
                {
                    break lab1;
                }
                break golab0;
            }
            if (base.cursor >= base.limit)
            {
                return false;
            }
            base.cursor++;
        }
        golab2: while(true)
        {
            lab3: {
                if (!(base.out_grouping(g_v, 97, 252)))
                {
                    break lab3;
                }
                break golab2;
            }
            if (base.cursor >= base.limit)
            {
                return false;
            }
            base.cursor++;
        }
        I_p1 = base.cursor;
        lab4: {
            if (!(I_p1 < I_x))
            {
                break lab4;
            }
            I_p1 = I_x;
        }
        golab5: while(true)
        {
            lab6: {
                if (!(base.in_grouping(g_v, 97, 252)))
                {
                    break lab6;
                }
                break golab5;
            }
            if (base.cursor >= base.limit)
            {
                return false;
            }
            base.cursor++;
        }
        golab7: while(true)
        {
            lab8: {
                if (!(base.out_grouping(g_v, 97, 252)))
                {
                    break lab8;
                }
                break golab7;
            }
            if (base.cursor >= base.limit)
            {
                return false;
            }
            base.cursor++;
        }
        I_p2 = base.cursor;
        return true;
    };

    /** @return {boolean} */
    function r_postlude() {
        var /** number */ among_var;
        while(true)
        {
            var /** number */ v_1 = base.cursor;
            lab0: {
                base.bra = base.cursor;
                among_var = base.find_among(a_0);
                if (among_var == 0)
                {
                    break lab0;
                }
                base.ket = base.cursor;
                switch (among_var) {
                    case 1:
                        if (!base.slice_from("y"))
                        {
                            return false;
                        }
                        break;
                    case 2:
                        if (!base.slice_from("u"))
                        {
                            return false;
                        }
                        break;
                    case 3:
                        if (!base.slice_from("a"))
                        {
                            return false;
                        }
                        break;
                    case 4:
                        if (!base.slice_from("o"))
                        {
                            return false;
                        }
                        break;
                    case 5:
                        if (base.cursor >= base.limit)
                        {
                            break lab0;
                        }
                        base.cursor++;
                        break;
                }
                continue;
            }
            base.cursor = v_1;
            break;
        }
        return true;
    };

    /** @return {boolean} */
    function r_R1() {
        if (!(I_p1 <= base.cursor))
        {
            return false;
        }
        return true;
    };

    /** @return {boolean} */
    function r_R2() {
        if (!(I_p2 <= base.cursor))
        {
            return false;
        }
        return true;
    };

    /** @return {boolean} */
    function r_standard_suffix() {
        var /** number */ among_var;
        var /** number */ v_1 = base.limit - base.cursor;
        lab0: {
            base.ket = base.cursor;
            among_var = base.find_among_b(a_1);
            if (among_var == 0)
            {
                break lab0;
            }
            base.bra = base.cursor;
            if (!r_R1())
            {
                break lab0;
            }
            switch (among_var) {
                case 1:
                    if (!base.slice_del())
                    {
                        return false;
                    }
                    break;
                case 2:
                    if (!base.slice_del())
                    {
                        return false;
                    }
                    var /** number */ v_2 = base.limit - base.cursor;
                    lab1: {
                        base.ket = base.cursor;
                        if (!(base.eq_s_b("s")))
                        {
                            base.cursor = base.limit - v_2;
                            break lab1;
                        }
                        base.bra = base.cursor;
                        if (!(base.eq_s_b("nis")))
                        {
                            base.cursor = base.limit - v_2;
                            break lab1;
                        }
                        if (!base.slice_del())
                        {
                            return false;
                        }
                    }
                    break;
                case 3:
                    if (!(base.in_grouping_b(g_s_ending, 98, 116)))
                    {
                        break lab0;
                    }
                    if (!base.slice_del())
                    {
                        return false;
                    }
                    break;
            }
        }
        base.cursor = base.limit - v_1;
        var /** number */ v_3 = base.limit - base.cursor;
        lab2: {
            base.ket = base.cursor;
            among_var = base.find_among_b(a_2);
            if (among_var == 0)
            {
                break lab2;
            }
            base.bra = base.cursor;
            if (!r_R1())
            {
                break lab2;
            }
            switch (among_var) {
                case 1:
                    if (!base.slice_del())
                    {
                        return false;
                    }
                    break;
                case 2:
                    if (!(base.in_grouping_b(g_st_ending, 98, 116)))
                    {
                        break lab2;
                    }
                    {
                        var /** number */ c1 = base.cursor - 3;
                        if (c1 < base.limit_backward)
                        {
                            break lab2;
                        }
                        base.cursor = c1;
                    }
                    if (!base.slice_del())
                    {
                        return false;
                    }
                    break;
            }
        }
        base.cursor = base.limit - v_3;
        var /** number */ v_4 = base.limit - base.cursor;
        lab3: {
            base.ket = base.cursor;
            among_var = base.find_among_b(a_4);
            if (among_var == 0)
            {
                break lab3;
            }
            base.bra = base.cursor;
            if (!r_R2())
            {
                break lab3;
            }
            switch (among_var) {
                case 1:
                    if (!base.slice_del())
                    {
                        return false;
                    }
                    var /** number */ v_5 = base.limit - base.cursor;
                    lab4: {
                        base.ket = base.cursor;
                        if (!(base.eq_s_b("ig")))
                        {
                            base.cursor = base.limit - v_5;
                            break lab4;
                        }
                        base.bra = base.cursor;
                        {
                            var /** number */ v_6 = base.limit - base.cursor;
                            lab5: {
                                if (!(base.eq_s_b("e")))
                                {
                                    break lab5;
                                }
                                base.cursor = base.limit - v_5;
                                break lab4;
                            }
                            base.cursor = base.limit - v_6;
                        }
                        if (!r_R2())
                        {
                            base.cursor = base.limit - v_5;
                            break lab4;
                        }
                        if (!base.slice_del())
                        {
                            return false;
                        }
                    }
                    break;
                case 2:
                    {
                        var /** number */ v_7 = base.limit - base.cursor;
                        lab6: {
                            if (!(base.eq_s_b("e")))
                            {
                                break lab6;
                            }
                            break lab3;
                        }
                        base.cursor = base.limit - v_7;
                    }
                    if (!base.slice_del())
                    {
                        return false;
                    }
                    break;
                case 3:
                    if (!base.slice_del())
                    {
                        return false;
                    }
                    var /** number */ v_8 = base.limit - base.cursor;
                    lab7: {
                        base.ket = base.cursor;
                        lab8: {
                            var /** number */ v_9 = base.limit - base.cursor;
                            lab9: {
                                if (!(base.eq_s_b("er")))
                                {
                                    break lab9;
                                }
                                break lab8;
                            }
                            base.cursor = base.limit - v_9;
                            if (!(base.eq_s_b("en")))
                            {
                                base.cursor = base.limit - v_8;
                                break lab7;
                            }
                        }
                        base.bra = base.cursor;
                        if (!r_R1())
                        {
                            base.cursor = base.limit - v_8;
                            break lab7;
                        }
                        if (!base.slice_del())
                        {
                            return false;
                        }
                    }
                    break;
                case 4:
                    if (!base.slice_del())
                    {
                        return false;
                    }
                    var /** number */ v_10 = base.limit - base.cursor;
                    lab10: {
                        base.ket = base.cursor;
                        if (base.find_among_b(a_3) == 0)
                        {
                            base.cursor = base.limit - v_10;
                            break lab10;
                        }
                        base.bra = base.cursor;
                        if (!r_R2())
                        {
                            base.cursor = base.limit - v_10;
                            break lab10;
                        }
                        if (!base.slice_del())
                        {
                            return false;
                        }
                    }
                    break;
            }
        }
        base.cursor = base.limit - v_4;
        return true;
    };

    this.stem = /** @return {boolean} */ function() {
        var /** number */ v_1 = base.cursor;
        r_prelude();
        base.cursor = v_1;
        var /** number */ v_2 = base.cursor;
        r_mark_regions();
        base.cursor = v_2;
        base.limit_backward = base.cursor; base.cursor = base.limit;
        r_standard_suffix();
        base.cursor = base.limit_backward;
        var /** number */ v_4 = base.cursor;
        r_postlude();
        base.cursor = v_4;
        return true;
    };

    /**@return{string}*/
    this['stemWord'] = function(/**string*/word) {
        base.setCurrent(word);
        this.stem();
        return base.getCurrent();
    };
};

Stemmer = GermanStemmer;
