<style scoped>
  .sample {
    padding: 10px 5px 10px 5px;
  }
  
  .menuid {
    height: 40px;
    border-bottom: 1px solid #e8eaec;
  }
  
  .box {
    display: inline;
  }
</style>

<template>
  <div>
    <Row type="flex" class="menuid" justify="space-between">
      <Col span='8'>
      <Input search enter-button  placeholder="输入搜索" v-model="seachObj.key" @on-enter="beginSeach" @on-search="beginSeach" style="width: 100%" />
      </Col>
      <Col span='10'>
      <p class="box">&nbsp&nbsp&nbsp入库时间：</p>
      <DatePicker v-model="dateValue" @on-change="handDateChange" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="选择时间段" style="width: 70%"></DatePicker>
      </Col>
      <Col >
       <Button @click="reload">&emsp;&emsp;刷新&emsp;&emsp;</Button>
      </Col>
    </Row>
    <Row type="flex">
      <sampleview ref="view" :action='$sra.sample_getsamplelist' :canSelect="canSelect" :limtView='limtView' :haveAction='haveAction' :haveLend='haveLend' :haveEdit='haveEdit' :haveDelete='haveDelete' :haveReturn='haveReturn' :havePrint='havePrint' :haveInStorage='haveInStorage'
        :haveAcceptInStorage='haveAcceptInStorage' :haveAcceptLend='haveAcceptLend' :haveAcceptReturn='haveAcceptReturn'></sampleview>
    </Row>
  </div>
</template>

<script>
  import sampleview from "../commpent/sampleView.vue";
  import drop from "../commpent/sgDropdown.vue";
  export default {
      inject: ["reload"],
    components: {
      sampleview,
      drop
    },
    props: {
      canSelect: {
        type: Boolean,
        default: false
      },
      haveAction: {
        type: Boolean,
        default: true
      },
      havePage: {
        type: Boolean,
        default: true
      },
      haveLend: {
        type: Boolean,
        default: false
      },
      haveReturn: {
        type: Boolean,
        default: false
      },
      haveEdit: {
        type: Boolean,
        default: false
      },
      haveDelete: {
        type: Boolean,
        default: false
      },
      havePrint: {
        type: Boolean,
        default: false
      },
      haveInStorage: {
        type: Boolean,
        default: false
      },
      haveAcceptInStorage: {
        type: Boolean,
        default: false
      },
      haveAcceptLend: {
        type: Boolean,
        default: false
      },
      haveAcceptReturn: {
        type: Boolean,
        default: false
      },
      limtView: {
        type: Boolean,
        default: false
      }
    },
    data: function() {
      return {
        stateList: [{
            name: "待入库",
            key: 2
          },
          {
            name: "在库",
            key: 3
          },
          {
            name: "借出",
            key: 5
          }
        ],
        gaugeList: ["12G", "14G", "17G", "16G"],
        dateValue: [],
        seachObj: {
          key: "",
          dateValue: ["", ""],
          State: "",
          UserId: []
        },
        sampleList: []
      };
    },
    methods: {
      handDateChange() {
        this.seachObj.beginDate = this.dateValue[0].toDateString();
        this.seachObj.endDate = this.dateValue[1].toDateString();
         console.log("date",this.seachObj);
        
        this.beginSeach();
      },
  
      newSample() {
        this.$router.push("/sample/addSample");
      },
      getSampleList() {},
      beginSeach() {
        this.$refs.view.Seach(this.seachObj);
        
      }
    },
    mounted: function() {}
  };
</script>