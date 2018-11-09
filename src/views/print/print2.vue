<style scoped>
.fdiv {
  overflow: hidden;
  vertical-align: middle;
}
img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
<template>
  <div>
    <div ref="print">

      <Card style="width:240px">
        <br>
        <h3>ID:{{sample.styleId}}</h3>

        <div style="text-align:center">
          <img :src="'/pic/minpic/'+picstr"></img>
        </div>
        <h5>款号:{{sample.styleNo}}</h5>
        <h5>可外借:{{canlendout}}</h5>
        <h5>现货:{{haveStock}}</h5>
        <h5>成份:{{Material}}</h5>
        <h5>零售价:{{sample.salePrice}}元</h5>
        <br>
        <div id="qrcode" style="text-align:center"></div>
        <br>
        <h3>钉钉扫码查看更多信息</h3>
      </Card>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      url: "hh",
      id: "",
      isfinsh: false,
      sample: {},
      picstr: "",
      Material: "",
      salePrice: 0
    };
  },
  computed: {
    canlendout() {
      if (this.sample.canLendOut) return "是";
      else return "否";
    },
    haveStock() {
      if (this.sample.HaveStock) return "有现货";
      else return "无现货";
    }
  },
  methods: {
    getData() {
      let p = new Promise((resolve, reject) => {
        console.log("getdata");
        this.$util
          .get("/Print/GetSample", {
            params: { styleId: this.id }
          })
          .then(result => {
            result.data.picList.forEach(item => {
              item.url = "/pic/minPic/" + item.name;
            });
            this.sample = result.data;
            this.picstr = this.sample.picList[0].name;
            console.log("sample:", this.sample);
            for (let p of this.sample.material) {
              this.Material =
                this.Material + p.percent + "%" + p.materials + " ";
            }
            resolve(this.sample);
          });
      });
      return p;
    },
    creatQrCode() {
      console.log("creatQrcode");
      let val = this.$util.PrintUrl + this.id + "?showmenu=false";
      let p = new Promise(resolve => {
        if (this.id) {
          this.$util.qrcode("qrcode", val, p => {
            console.log("step1");
            resolve(p);
          });
        }
      });
      return p;
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getData()
      .then(p => {
        this.creatQrCode();
      })
      .then(p => {
        console.log("print");
        setTimeout(() => {
          this.$util.print2(this.$refs.print);
        }, 500);
      });
  }
};
</script>