/*
 * This script contains the language-specific data used by searchtools.js,
 * namely the list of stopwords, stemmer, scorer and splitter.
 */

var stopwords = ["aan", "al", "alles", "als", "altijd", "andere", "ben", "bij", "daar", "dan", "dat", "de", "der", "deze", "die", "dit", "doch", "doen", "door", "dus", "een", "eens", "en", "er", "ge", "geen", "geweest", "haar", "had", "heb", "hebben", "heeft", "hem", "het", "hier", "hij", "hoe", "hun", "iemand", "iets", "ik", "in", "is", "ja", "je", "kan", "kon", "kunnen", "maar", "me", "meer", "men", "met", "mij", "mijn", "moet", "na", "naar", "niet", "niets", "nog", "nu", "of", "om", "omdat", "onder", "ons", "ook", "op", "over", "reeds", "te", "tegen", "toch", "toen", "tot", "u", "uit", "uw", "van", "veel", "voor", "want", "waren", "was", "wat", "werd", "wezen", "wie", "wil", "worden", "wordt", "zal", "ze", "zelf", "zich", "zij", "zijn", "zo", "zonder", "zou"];


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
DutchStemmer = function() {
    var base = new BaseStemmer();
    /** @const */ var a_0 = [
        ["", -1, 6],
        ["\u00E1", 0, 1],
        ["\u00E4", 0, 1],
        ["\u00E9", 0, 2],
        ["\u00EB", 0, 2],
        ["\u00ED", 0, 3],
        ["\u00EF", 0, 3],
        ["\u00F3", 0, 4],
        ["\u00F6", 0, 4],
        ["\u00FA", 0, 5],
        ["\u00FC", 0, 5]
    ];

    /** @const */ var a_1 = [
        ["", -1, 3],
        ["I", 0, 2],
        ["Y", 0, 1]
    ];

    /** @const */ var a_2 = [
        ["dd", -1, -1],
        ["kk", -1, -1],
        ["tt", -1, -1]
    ];

    /** @const */ var a_3 = [
        ["ene", -1, 2],
        ["se", -1, 3],
        ["en", -1, 2],
        ["heden", 2, 1],
        ["s", -1, 3]
    ];

    /** @const */ var a_4 = [
        ["end", -1, 1],
        ["ig", -1, 2],
        ["ing", -1, 1],
        ["lijk", -1, 3],
        ["baar", -1, 4],
        ["bar", -1, 5]
    ];

    /** @const */ var a_5 = [
        ["aa", -1, -1],
        ["ee", -1, -1],
        ["oo", -1, -1],
        ["uu", -1, -1]
    ];

    /** @const */ var /** Array<int> */ g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128];

    /** @const */ var /** Array<int> */ g_v_I = [1, 0, 0, 17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128];

    /** @const */ var /** Array<int> */ g_v_j = [17, 67, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128];

    var /** number */ I_p2 = 0;
    var /** number */ I_p1 = 0;
    var /** boolean */ B_e_found = false;


    /** @return {boolean} */
    function r_prelude() {
        var /** number */ among_var;
        var /** number */ v_1 = base.cursor;
        while(true)
        {
            var /** number */ v_2 = base.cursor;
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
                        if (!base.slice_from("a"))
                        {
                            return false;
                        }
                        break;
                    case 2:
                        if (!base.slice_from("e"))
                        {
                            return false;
                        }
                        break;
                    case 3:
                        if (!base.slice_from("i"))
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
                        if (!base.slice_from("u"))
                        {
                            return false;
                        }
                        break;
                    case 6:
                        if (base.cursor >= base.limit)
                        {
                            break lab0;
                        }
                        base.cursor++;
                        break;
                }
                continue;
            }
            base.cursor = v_2;
            break;
        }
        base.cursor = v_1;
        var /** number */ v_3 = base.cursor;
        lab1: {
            base.bra = base.cursor;
            if (!(base.eq_s("y")))
            {
                base.cursor = v_3;
                break lab1;
            }
            base.ket = base.cursor;
            if (!base.slice_from("Y"))
            {
                return false;
            }
        }
        while(true)
        {
            var /** number */ v_4 = base.cursor;
            lab2: {
                golab3: while(true)
                {
                    var /** number */ v_5 = base.cursor;
                    lab4: {
                        if (!(base.in_grouping(g_v, 97, 232)))
                        {
                            break lab4;
                        }
                        base.bra = base.cursor;
                        lab5: {
                            var /** number */ v_6 = base.cursor;
                            lab6: {
                                if (!(base.eq_s("i")))
                                {
                                    break lab6;
                                }
                                base.ket = base.cursor;
                                if (!(base.in_grouping(g_v, 97, 232)))
                                {
                                    break lab6;
                                }
                                if (!base.slice_from("I"))
                                {
                                    return false;
                                }
                                break lab5;
                            }
                            base.cursor = v_6;
                            if (!(base.eq_s("y")))
                            {
                                break lab4;
                            }
                            base.ket = base.cursor;
                            if (!base.slice_from("Y"))
                            {
                                return false;
                            }
                        }
                        base.cursor = v_5;
                        break golab3;
                    }
                    base.cursor = v_5;
                    if (base.cursor >= base.limit)
                    {
                        break lab2;
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
        golab0: while(true)
        {
            lab1: {
                if (!(base.in_grouping(g_v, 97, 232)))
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
                if (!(base.out_grouping(g_v, 97, 232)))
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
            if (!(I_p1 < 3))
            {
                break lab4;
            }
            I_p1 = 3;
        }
        golab5: while(true)
        {
            lab6: {
                if (!(base.in_grouping(g_v, 97, 232)))
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
                if (!(base.out_grouping(g_v, 97, 232)))
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
                among_var = base.find_among(a_1);
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
                        if (!base.slice_from("i"))
                        {
                            return false;
                        }
                        break;
                    case 3:
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
    function r_undouble() {
        var /** number */ v_1 = base.limit - base.cursor;
        if (base.find_among_b(a_2) == 0)
        {
            return false;
        }
        base.cursor = base.limit - v_1;
        base.ket = base.cursor;
        if (base.cursor <= base.limit_backward)
        {
            return false;
        }
        base.cursor--;
        base.bra = base.cursor;
        if (!base.slice_del())
        {
            return false;
        }
        return true;
    };

    /** @return {boolean} */
    function r_e_ending() {
        B_e_found = false;
        base.ket = base.cursor;
        if (!(base.eq_s_b("e")))
        {
            return false;
        }
        base.bra = base.cursor;
        if (!r_R1())
        {
            return false;
        }
        var /** number */ v_1 = base.limit - base.cursor;
        if (!(base.out_grouping_b(g_v, 97, 232)))
        {
            return false;
        }
        base.cursor = base.limit - v_1;
        if (!base.slice_del())
        {
            return false;
        }
        B_e_found = true;
        if (!r_undouble())
        {
            return false;
        }
        return true;
    };

    /** @return {boolean} */
    function r_en_ending() {
        if (!r_R1())
        {
            return false;
        }
        var /** number */ v_1 = base.limit - base.cursor;
        if (!(base.out_grouping_b(g_v, 97, 232)))
        {
            return false;
        }
        base.cursor = base.limit - v_1;
        {
            var /** number */ v_2 = base.limit - base.cursor;
            lab0: {
                if (!(base.eq_s_b("gem")))
                {
                    break lab0;
                }
                return false;
            }
            base.cursor = base.limit - v_2;
        }
        if (!base.slice_del())
        {
            return false;
        }
        if (!r_undouble())
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
            among_var = base.find_among_b(a_3);
            if (among_var == 0)
            {
                break lab0;
            }
            base.bra = base.cursor;
            switch (among_var) {
                case 1:
                    if (!r_R1())
                    {
                        break lab0;
                    }
                    if (!base.slice_from("heid"))
                    {
                        return false;
                    }
                    break;
                case 2:
                    if (!r_en_ending())
                    {
                        break lab0;
                    }
                    break;
                case 3:
                    if (!r_R1())
                    {
                        break lab0;
                    }
                    if (!(base.out_grouping_b(g_v_j, 97, 232)))
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
        var /** number */ v_2 = base.limit - base.cursor;
        r_e_ending();
        base.cursor = base.limit - v_2;
        var /** number */ v_3 = base.limit - base.cursor;
        lab1: {
            base.ket = base.cursor;
            if (!(base.eq_s_b("heid")))
            {
                break lab1;
            }
            base.bra = base.cursor;
            if (!r_R2())
            {
                break lab1;
            }
            {
                var /** number */ v_4 = base.limit - base.cursor;
                lab2: {
                    if (!(base.eq_s_b("c")))
                    {
                        break lab2;
                    }
                    break lab1;
                }
                base.cursor = base.limit - v_4;
            }
            if (!base.slice_del())
            {
                return false;
            }
            base.ket = base.cursor;
            if (!(base.eq_s_b("en")))
            {
                break lab1;
            }
            base.bra = base.cursor;
            if (!r_en_ending())
            {
                break lab1;
            }
        }
        base.cursor = base.limit - v_3;
        var /** number */ v_5 = base.limit - base.cursor;
        lab3: {
            base.ket = base.cursor;
            among_var = base.find_among_b(a_4);
            if (among_var == 0)
            {
                break lab3;
            }
            base.bra = base.cursor;
            switch (among_var) {
                case 1:
                    if (!r_R2())
                    {
                        break lab3;
                    }
                    if (!base.slice_del())
                    {
                        return false;
                    }
                    lab4: {
                        var /** number */ v_6 = base.limit - base.cursor;
                        lab5: {
                            base.ket = base.cursor;
                            if (!(base.eq_s_b("ig")))
                            {
                                break lab5;
                            }
                            base.bra = base.cursor;
                            if (!r_R2())
                            {
                                break lab5;
                            }
                            {
                                var /** number */ v_7 = base.limit - base.cursor;
                                lab6: {
                                    if (!(base.eq_s_b("e")))
                                    {
                                        break lab6;
                                    }
                                    break lab5;
                                }
                                base.cursor = base.limit - v_7;
                            }
                            if (!base.slice_del())
                            {
                                return false;
                            }
                            break lab4;
                        }
                        base.cursor = base.limit - v_6;
                        if (!r_undouble())
                        {
                            break lab3;
                        }
                    }
                    break;
                case 2:
                    if (!r_R2())
                    {
                        break lab3;
                    }
                    {
                        var /** number */ v_8 = base.limit - base.cursor;
                        lab7: {
                            if (!(base.eq_s_b("e")))
                            {
                                break lab7;
                            }
                            break lab3;
                        }
                        base.cursor = base.limit - v_8;
                    }
                    if (!base.slice_del())
                    {
                        return false;
                    }
                    break;
                case 3:
                    if (!r_R2())
                    {
                        break lab3;
                    }
                    if (!base.slice_del())
                    {
                        return false;
                    }
                    if (!r_e_ending())
                    {
                        break lab3;
                    }
                    break;
                case 4:
                    if (!r_R2())
                    {
                        break lab3;
                    }
                    if (!base.slice_del())
                    {
                        return false;
                    }
                    break;
                case 5:
                    if (!r_R2())
                    {
                        break lab3;
                    }
                    if (!B_e_found)
                    {
                        break lab3;
                    }
                    if (!base.slice_del())
                    {
                        return false;
                    }
                    break;
            }
        }
        base.cursor = base.limit - v_5;
        var /** number */ v_9 = base.limit - base.cursor;
        lab8: {
            if (!(base.out_grouping_b(g_v_I, 73, 232)))
            {
                break lab8;
            }
            var /** number */ v_10 = base.limit - base.cursor;
            if (base.find_among_b(a_5) == 0)
            {
                break lab8;
            }
            if (!(base.out_grouping_b(g_v, 97, 232)))
            {
                break lab8;
            }
            base.cursor = base.limit - v_10;
            base.ket = base.cursor;
            if (base.cursor <= base.limit_backward)
            {
                break lab8;
            }
            base.cursor--;
            base.bra = base.cursor;
            if (!base.slice_del())
            {
                return false;
            }
        }
        base.cursor = base.limit - v_9;
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

Stemmer = DutchStemmer;
