<style scoped>
.fdiv {
  overflow: hidden;
  vertical-align: middle;
}
.brod {
  border-style: dashed;
  border-width: 1px;
  height: 365px;
  width: 260px;
  margin: 10px 0px 0px 1px;
  padding:10px 10px ;
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

      <Row>
        <Col span="12" class="brod">
        <div style="text-align:center">
          <h2>ID:{{sample.StyleId}}</h2>
          <img :src="dataUrl+'/pic/minpic/'+picstr"></img>
        </div>
        </Col>
        <Col span="11" style="" class="brod">
        <h4>款号:{{sample.StyleNo}}</h4>
        <h4>可外借:{{canlendout}}</h4>
        <h4>现货:{{haveStock}}</h4>
        <h4>成份:</h4><p v-for="item in mList" :key="item.yranId">{{item.yarnId}}:{{item.Material}}{{item.counts==""?"":"支数："+item.counts}}</p>
        <h4 v-if="sample.Counts!=''">支数:{{sample.Counts}}</h4>
        <h4>针型:{{sample.Gauge}}</h4>
        <h4>克重:{{sample.Weight}}G</h4>
        <h4>零售价:{{sample.SalePrice}}元</h4>
        <div id="qrcode" style="text-align:center"></div>
        <h3>钉钉扫码查看更多信息</h3>
        </Col>
      </Row>
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
      mList:[],
      Material: "",
      MaterialEn:"",
      salePrice: 0,
      dataUrl:this.$util.dataUrl
    };
  },
  computed: {
    canlendout() {
      if (this.sample.CanLendOut) return "是";
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
        let _this=this;
        this.$util
          .get("/Print/GetSample", {
            params: { styleId: this.id }
          })
          .then(result => {
            console.log(result);
            result.data.PicList.forEach(item => {
              item.url = "/pic/minPic/" + item.name;
            });
            this.sample = result.data;
            this.picstr = this.sample.PicList[0].name;
            console.log("sample:", this.sample);
            for (let p of this.sample.Material) {
              if(!p.yarnId) p.yarnId=1;
              if(!p.enName) p.enName="";
              let m=this.mList.find(t=>{
                return t.yarnId==p.yarnId;
               });
               if(m){
                    m.Material = m.Material + p.percent + "%" + p.materials +'('+p.enName + ')'+" ";
               }else{
                  let nm={
                      yarnId:p.yarnId,
                      Material:'',
                      MaterialEn:'',
                      counts:p.counts?p.counts:"",
                  };
                  nm.Material = nm.Material + p.percent + "%" + p.materials +'('+p.enName + ')'+" ";
                  _this.mList.push(nm);
               }

              // this.Material = this.Material + p.percent + "%" + p.materials + " ";
              //   if(p.enName) this.MaterialEn=this.MaterialEn + p.percent + "%" + p.enName + " ";
            }
             console.log("mlist",this.mList);
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
          this.$util.qrcode("qrcode", val, 95, p => {
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
     
        // setTimeout(() => {
        //  this.$util.print2(this.$refs.print);
        // }, 500);
      });
  }
};
</script>