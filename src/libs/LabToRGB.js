// 补0
function padding0(p) {
    let z = ''
    while (p--) {
        z += '0'
    }
    return z
}

/**
 * 解决小数精度问题
 * @param {*数字} a
 * @param {*数字} b
 * @param {*符号} sign
 * fixedFloat(0.3, 0.2, '-')
 */
function fixedFloat(a, b, sign) {
    function handle(x) {
        let y = String(x)
        let p = y.lastIndexOf('.')
        if (p === -1) {
            return [y, 0]
        } else {
            return [y.replace('.', ''), y.length - p - 1]
        }
    }
    // v 操作数1, w 操作数2, s 操作符, t 精度
    function operate(v, w, s, t) {
        switch (s) {
            case '+': return (v + w) / t
            case '-': return (v - w) / t
            case '*': return (v * w) / (t * t)
            case '/': return (v / w)
        }
    }

    let c = handle(a)
    let d = handle(b)
    let k = 0

    if (c[1] === 0 && d[1] === 0) {
        return operate(+c[0], +d[0], sign, 1)
    } else {
        k = Math.pow(10, Math.max(c[1], d[1]))
        if (c[1] !== d[1]) {
            if (c[1] > d[1]) {
                d[0] += padding0(c[1] - d[1])
            } else {
                c[0] += padding0(d[1] - c[1])
            }
        }
        return operate(+c[0], +d[0], sign, k)
    }
}
// 加
function plus(a, b) {
    return fixedFloat(a, b, '+')
}
// 减
function minus(a, b) {
    return fixedFloat(a, b, '-')
}
// 乘
function multiply(a, b) {
    return fixedFloat(a, b, '*')
}
// 除
function division(a, b) {
    return fixedFloat(a, b, '/')
}

// 操作部分
// let a = document.getElementById('a')
// let b = document.getElementById('b')
// let result = document.getElementById('result')
// document.addEventListener('click', function (e) {
//     if (e.target.nodeName === 'BUTTON') {
//         let v = 0
//         switch (e.target.innerText) {
//             case '加': result.innerText = plus(a.value, b.value)
//                 break
//             case '减': result.innerText = minus(a.value, b.value)
//                 break
//             case '乘': result.innerText = multiply(a.value, b.value)
//                 break
//             case '除': result.innerText = division(a.value, b.value)
//                 break
//         }
//     }
// })

let LabToRGB = {
    LabToRgb: function (Lab) {

        let xyz = this.Lab2XYZ(Lab);
        let rgb = this.XYZ2RGB(xyz);
        return rgb;
    },
    LabToRgbX: function (Lab) {
        let xyz = this.Lab2XYZ(Lab);
        let rgb = this.XYZ2RGB(xyz);
        let rx = rgb[0].toString(16);
        let rg = rgb[1].toString(16);
        let rb = rgb[2].toString(16);
        debugger;
        return "#" + rx + rg + rb;
    },

    RgbToLab: function (rgb) {
        let drgb = new Array();
        drgb[0] = rgb[0];
        drgb[1] = rgb[1];
        drgb[2] = rgb[2];
        let xyz = this.RGB2XYZ(drgb);
        let lab = this.XYZ2Lab(xyz);
        return lab;
    },

    Lab2XYZ: function (Lab) {
        let XYZ = new Array();
        let L, a, b;
        let fx, fy, fz;
        let Xn, Yn, Zn;
        Xn = 95.04;
        Yn = 100;
        Zn = 108.89;

        L = Lab[0];
        a = Lab[1];
        b = Lab[2];

        fy = division(plus(L, 16), 116);
        fx = plus(division(a, 500), fy);
        fz = minus(fy, division(b, 200));

        if (fx > 0.2069) {
            XYZ[0] = multiply(Xn, Math.pow(fx, 3));
        }
        else {
            XYZ[0] = multiply(multiply(Xn, multiply(fx, 0.1379)), 0.1284);
        }

        if ((fy > 0.2069) || (L > 8)) {
            XYZ[1] = Yn * Math.pow(fy, 3);
        }
        else {
            XYZ[1] = multiply(multiply(Yn, minus(fy, 0.1379)), 0.1284);
        }

        if (fz > 0.2069) {
            XYZ[2] = multiply(Zn, Math.pow(fz, 3));
        }
        else {
            XYZ[2] = multiply(multiply(Zn, (fz - 0.1379)), 0.1284);
        }

        return XYZ;
    },

    XYZ2Lab: function (XYZ) {
        let Lab = new Array();
        let X, Y, Z;
        X = XYZ[0];
        Y = XYZ[1];
        Z = XYZ[2];
        let Xn, Yn, Zn;
        Xn = 95.04;
        Yn = 100;
        Zn = 108.89;
        let XXn, YYn, ZZn;
        XXn = division(X, Xn);
        YYn = division(Y, Yn);
        ZZn = division(Z, Zn);

        let fx, fy, fz;

        if (XXn > 0.008856) {
            fx = Math.pow(XXn, 0.333333);
        }
        else {
            fx = plus(multiply(7.787, XXn), 0.137931);
        }

        if (YYn > 0.008856) {
            fy = Math.pow(YYn, 0.333333);
        }
        else {
            fy = plus(multiply(7.787, YYn), 0.137931);
        }

        if (ZZn > 0.008856) {
            fz = Math.pow(ZZn, 0.333333);
        }
        else {
            fz = plus(multiply(7.787, ZZn), 0.137931);
        }

        Lab[0] = minus(multiply(116, fy), 16);
        Lab[1] = multiply(500, minus(fx, fy));
        Lab[2] = multiply(200, minus(fy, fz));

        return Lab;
    },

    RGB2XYZ: function (sRGB) {
        let XYZ = new Array();
        let sR, sG, sB;
        sR = sRGB[0];
        sG = sRGB[1];
        sB = sRGB[2];
        sR = division(sR, 255);
        sG = division(sG, 255);
        sB = division(sB, 255);

        if (sR <= 0.04045) {
            sR = division(sR, 12.92);
        }
        else {
            sR = Math.pow(division(plus(sR, 0.055), 1.055), 2.4);
        }

        if (sG <= 0.04045) {
            sG = division(sG, 12.92);
        }
        else {
            sG = Math.pow(division(plus(sG, 0.055), 1.055), 2.4);
        }

        if (sB <= 0.04045) {
            sB = division(sB, 12.92);
        }
        else {
            sB = Math.pow(division(plus(sB, 0.055), 1.055), 2.4);
        }

        XYZ[0] = plus(plus(multiply(41.24, sR), multiply(35.76, sG)), multiply(18.05, sB));
        XYZ[1] = plus(plus(multiply(21.26, sR), multiply(71.52, sG)), multiply(7.2, sB));
        XYZ[2] = plus(plus(multiply(1.93, sR), multiply(11.92, sG)), multiply(95.05, sB));

        return XYZ;
    },

    XYZ2RGB: function (XYZ) {
        let sRGB = new Array();
        let X, Y, Z;
        let dr, dg, db;
        X = XYZ[0];
        Y = XYZ[1];
        Z = XYZ[2];

        dr = minus(minus(multiply(0.032406, X), multiply(0.015371, Y)), multiply(0.0049895, Z));
        dg = plus(plus(multiply(-0.0096891, X), multiply(0.018757, Y)), multiply(0.00041914, Z));
        db = plus(minus(multiply(0.00055708, X), multiply(0.0020401, Y)), multiply(0.01057, Z));

        if (dr <= 0.00313) {
            dr = multiply(dr, 12.92);
        }
        else {
            dr = minus(multiply(Math.exp(division(Math.log(dr), 2.4)), 1.055), 0.055);
        }

        if (dg <= 0.00313) {
            dg = multiply(dg, 12.92);
        }
        else {
            dg = minus(multiply(Math.exp(division(Math.log(dg), 2.4)), 1.055), 0.055);
        }

        if (db <= 0.00313) {
            db = multiply(db, 12.92);
        }
        else {
            db = minus(multiply(Math.exp(division(Math.log(db), 2.4)), 1.055), 0.055);
        }

        dr = multiply(dr, 255);
        dg = multiply(dg, 255);
        db = multiply(db, 255);

        dr = Math.min(255, dr);
        dg = Math.min(255, dg);
        db = Math.min(255, db);
        debugger;
        sRGB[0] = parseInt(Math.min(plus(dr, 0.5)));
        sRGB[1] = parseInt(Math.min(plus(dg, 0.5)));
        sRGB[2] = parseInt(Math.min(plus(db, 0.5)));
        return sRGB;
    }
}
export default LabToRGB;