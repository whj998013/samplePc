
let ColorHelp = {
    /// <CIE 1976 L*a*b*色差公式>
    /// </summary>
    /// <param name="L1"></param>
    /// <param name="a1"></param>
    /// <param name="b1"></param>
    /// <param name="L2"></param>
    /// <param name="a2"></param>
    /// <param name="b2"></param>
    /// <returns></returns>
    Delta_Eab: function (L1, a1, b1, L2, a2, b2) {
        L1 = parseFloat(L1);
        a1 = parseFloat(a1);
        b1 = parseFloat(b1);
        L2 = parseFloat(L2);
        a2 = parseFloat(a2);
        b2 = parseFloat(b2);

        let Eab = 0;             //  △Eab
        let chafang_L = 0;             //  (L1-L2)*(L1-L2)
        let chafang_a = 0;             //   (a1-a2)*(a1-a2)
        let chafang_b = 0;             //   (b1-b2)*(b1-b2)

        chafang_L = (L1 - L2) * (L1 - L2);      //差-方
        chafang_a = (a1 - a2) * (a1 - a2);
        chafang_b = (b1 - b2) * (b1 - b2);

        Eab = Math.pow(chafang_L + chafang_a + chafang_b, 0.5);

        return Eab;
    },

    /// <CIE DE 2000色差公式>
    /// </summary>
    /// <param name="L1"></param>
    /// <param name="a1"></param>
    /// <param name="b1"></param>
    /// <param name="L2"></param>
    /// <param name="a2"></param>
    /// <param name="b2"></param>
    /// <returns></returns>
    Delta_E00: function (L1, a1, b1, L2, a2, b2) {
        //参考《现代颜色技术原理及应用》P88数据
        L1 = parseFloat(L1);
        a1 = parseFloat(a1);
        b1 = parseFloat(b1);
        L2 = parseFloat(L2);
        a2 = parseFloat(a2);
        b2 = parseFloat(b2);

        let E00 = 0;               //CIEDE2000色差E00
        let LL1, LL2, aa1, aa2, bb1, bb2; //声明L' a' b' （1,2）
        let delta_LL, delta_CC, delta_hh, delta_HH;        // 第二部的四个量
        let kL, kC, kH;
        let RT = 0;                //旋转函数RT
        let G = 0;                  //G表示CIELab 颜色空间a轴的调整因子,是彩度的函数.
        let mean_Cab = 0;    //两个样品彩度的算术平均值
        let SL, SC, SH, T;
        //------------------------------------------
        //参考实验条件见P88
        kL = 1;
        kC = 1;
        kH = 1;
        //------------------------------------------
        mean_Cab = (this.CaiDu(a1, b1) + this.CaiDu(a2, b2)) / 2;
        let mean_Cab_pow7 = Math.pow(mean_Cab, 7);       //两彩度平均值的7次方
        G = 0.5 * (1 - Math.pow(mean_Cab_pow7 / (mean_Cab_pow7 + Math.pow(25, 7)), 0.5));

        LL1 = L1;
        aa1 = a1 * (1 + G);
        bb1 = b1;

        LL2 = L2;
        aa2 = a2 * (1 + G);
        bb2 = b2;

        let CC1, CC2;               //两样本的彩度值
        CC1 = this.CaiDu(aa1, bb1);
        CC2 = this.CaiDu(aa2, bb2);
        let hh1, hh2;                  //两样本的色调角
        hh1 = this.SeDiaoJiao(aa1, bb1);
        hh2 = this.SeDiaoJiao(aa2, bb2);

        delta_LL = LL1 - LL2;
        delta_CC = CC1 - CC2;
        delta_hh = this.SeDiaoJiao(aa1, bb1) - this.SeDiaoJiao(aa2, bb2);
        delta_HH = 2 * Math.sin(Math.PI * delta_hh / 360) * Math.pow(CC1 * CC2, 0.5);

        //-------第三步--------------
        //计算公式中的加权函数SL,SC,SH,T
       // debugger;
        let mean_LL = LL1 + LL2 / 2;
        let mean_CC = (CC1 + CC2) / 2;
        let mean_hh = (hh1 + hh2) / 2;

        SL = 1 + 0.015 * Math.pow(mean_LL - 50, 2) / Math.pow(20 + Math.pow(mean_LL - 50, 2), 0.5);
        SC = 1 + 0.045 * mean_CC;
        T = 1 - 0.17 * Math.cos((mean_hh - 30) * Math.PI / 180) + 0.24 * Math.cos((2 * mean_hh) * Math.PI / 180)
            + 0.32 * Math.cos((3 * mean_hh + 6) * Math.PI / 180) - 0.2 * Math.cos((4 * mean_hh - 63) * Math.PI / 180);
        SH = 1 + 0.015 * mean_CC * T;

        //------第四步--------
        //计算公式中的RT
        let mean_CC_pow7 = Math.pow(mean_CC, 7);
        let RC = 2 * Math.pow(mean_CC_pow7 / (mean_CC_pow7 + Math.pow(25, 7)), 0.5);
        let delta_xita = 30 * Math.exp(-Math.pow((mean_hh - 275) / 25, 2));        //△θ 以°为单位
        RT = -Math.sin((2 * delta_xita) * Math.PI / 180) * RC;

        let L_item, C_item, H_item;
        L_item = delta_LL / (kL * SL);
        C_item = delta_CC / (kC * SC);
        H_item = delta_HH / (kH * SH);

        E00 = Math.pow(L_item * L_item + C_item * C_item + H_item * H_item + RT * C_item * H_item, 0.5);

        return E00;
    },
    //彩度计算
    CaiDu: function (a, b) {
        let Cab = 0;
        Cab = Math.pow(a * a + b * b, 0.5);
        return Cab;
    },
    //色调角计算
    SeDiaoJiao: function (a, b) {
        let h = 0;
        let hab = 0;

        h = (180 / Math.PI) * Math.atan(b / a);           //有正有负

        if (a > 0 && b > 0) {
            hab = h;
        }
        else if (a < 0 && b > 0) {
            hab = 180 + h;
        }
        else if (a < 0 && b < 0) {
            hab = 180 + h;
        }
        else     //a>0&&b<0
        {
            hab = 360 + h;
        }
        return hab;
    }
};
export default ColorHelp;