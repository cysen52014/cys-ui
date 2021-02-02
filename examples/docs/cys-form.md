<script>
  export default {
    data() {
      return {
        formData: {
        merchantName: "", // 商户名
        merchantShortName: "", // 商户简称
        address: [], // 注册地址
        addrInfo: "", //  注册地址 - 详细地址
        signTime: "", // 签约日期

        ossCorpFrontUrl: "", //  oss法人证件存放地址 ,
        photoCorpIdcardFrontUrl: "", // 法人证件存放地址 ,
        ossCorpBackUrl: "", // oss法人身份证反面照片存放地址
        photoCorpIdcardBackUrl: "", // 法人身份证反面照片存放地址
        ossCorpTakeUrl: "", //  oss法人手持身份证照片存放地址 ,
        photoCorpIdcardTakeUrl: "", //  法人手持身份证照片存放地址 ,
        corpType: "IDCARD", // 法人证件类型 身份证 : IDCARD 港澳通行证 : EEPT 台胞证 : MTP
        corpName: "", // 法人名
        corpNo: "", // 法人证件号
        cropPhone: "", // 法人电话
        corpLicStartTime: "", //  法人证件开始时间
        corpLicInvalidTime: "", //  法人证件失效日期
        corpIdardAddr: "", // 法人证件地址
        cropMail: "", // 法人邮箱
        contactName: "", // 联系人名
        contactPhone: "", // 联系人电话
        contactMail: "", // 联系人邮箱
        urgentName: "", // 紧急联系人姓名 ,
        urgentPhone: "", // 紧急联系人电话 ,
        urgentRelation: "", // 紧急联系人关系

        oaBankCode: "", // 银行编码
        settleAccount: "", // 结算账户(银行卡号)
        oaBank: "", //  开户行联行号
        oaName: "", // 开户人
        idNo: "", // 持卡人证件号 ,
        rate: "" //  结算费率 (万分比)
      },
      rules: {
        merchantName: [{ required: true, message: "请输入", trigger: "blur" }],
        merchantShortName: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        address: [
          {
            type: "array",
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        addrInfo: [{ required: true, message: "请输入", trigger: "blur" }],
        signTime: [{ required: true, message: "请输入", trigger: "blur" }],

        ossCorpFrontUrl: [
          {
            required: true,
            message: "请上传法人身份证正面照",
            trigger: "change"
          }
        ],
        ossCorpBackUrl: [
          {
            required: true,
            message: "请上传法人身份证反面照",
            trigger: "change"
          }
        ],
        ossCorpTakeUrl: [
          {
            required: true,
            message: "请上传法人手持身份证照",
            trigger: "change"
          }
        ],
        corpName: [{ required: true, message: "请输入", trigger: "blur" }],
        corpNo: [{ required: true, message: "请输入", trigger: "blur" }],
        cropPhone: [{ required: true, message: "请输入", trigger: "blur" }],
        corpLicStartTime: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        corpLicInvalidTime: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        corpIdardAddr: [{ required: true, message: "请输入", trigger: "blur" }],
        cropMail: [{ required: true, message: "请输入", trigger: "blur" }],
        contactName: [{ required: true, message: "请输入", trigger: "blur" }],
        contactPhone: [{ required: true, message: "请输入", trigger: "blur" }],
        contactMail: [{ required: true, message: "请输入", trigger: "blur" }],
        urgentName: [{ required: true, message: "请输入", trigger: "blur" }],
        urgentPhone: [{ required: true, message: "请输入", trigger: "blur" }],
        urgentRelation: [
          { required: true, message: "请输入", trigger: "blur" }
        ],

        oaBankCode: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        settleAccount: [{ required: true, message: "请输入", trigger: "blur" }],
        oaBank: [{ required: true, message: "请输入", trigger: "change" }],
        oaName: [{ required: true, message: "请输入", trigger: "blur" }],
        idNo: [{ required: true, message: "请输入", trigger: "blur" }],
        rate: [{ required: true, message: "请输入", trigger: "blur" }]
      }
      };
    },
    methods: {
        handleSubmit() {
            console.log(this.$refs.form);
            this.$refs.form.validate((valid) => {
                if (valid)  console.log('提交成功');
                else console.log('校验失败');
            })
        },
        handleReset() { this.$refs.form.resetFields() }
    }
  };
</script>

# CysForm 表单

## 基础用法

:::demo 通过`plain`属性可以设置为朴素的按钮

```html
<template>
  <div>
    <cys-form
      ref="form"
      :rules="rules"
      v-model="formData"
      :label-width="'150px'"
      :inline="true"
    >
      <div>
        <h2>商户资料</h2>
        <h3>营业执照</h3>
        <div class="info-box">
          <div class="form-box">
            <div>
              <cys-form-item label="商户名称：" prop="merchantName">
                <cys-input
                  v-model="formData.merchantName"
                  placeholder="请输入"
            
                ></cys-input>
              </cys-form-item>
              <cys-form-item label="商户简称：" prop="merchantShortName">
                <cys-input
                  v-model="formData.merchantShortName"
                  placeholder="请输入"
            
                ></cys-input>
              </cys-form-item>
            </div>
            <div>
              <cys-form-item label="详细地址：" prop="addrInfo">
                <cys-input
                  v-model="formData.addrInfo"
                  placeholder="请输入"
            
                ></cys-input>
              </cys-form-item>
              <cys-form-item label="签约时间" prop="signTime">
                <cys-date-picker
                  v-model="formData.signTime"
                  placeholder="选择日期"
            
                ></cys-date-picker>
              </cys-form-item>
            </div>
            <div class="tips">提示：请认真填写相关信息</div>
          </div>
        </div>
        <h3>法人信息</h3>
        <div class="info-box">
          <cys-form-item label="" prop="ossCorpFrontUrl">
            <imgUpload
              action="/agent/apply/uploadCorpLicImg"
              :params="{
                payChannel: 1,
                cardSide: 'front',
                corpType: formData.corpType
              }"
              :previewImage="formData.ossCorpFrontUrl"
              desc="上传法人身份证正面"
        
            />
            <cys-input
              v-model="formData.ossCorpFrontUrl"
              style="display:none"
            ></cys-input>
          </cys-form-item>
          &nbsp;&nbsp;
          <cys-form-item label="" prop="ossCorpBackUrl">
            <imgUpload
              action="/agent/apply/uploadCorpLicImg"
              :params="{
                payChannel: 1,
                cardSide: 'back',
                corpType: formData.corpType
              }"
              
              :previewImage="formData.ossCorpBackUrl"
              desc="上传法人身份证反面"
        
            />
            <cys-input
              v-model="formData.ossCorpBackUrl"
              style="display:none"
            ></cys-input>
          </cys-form-item>
          &nbsp;&nbsp;
          <cys-form-item label="" prop="ossCorpTakeUrl">
            <imgUpload
              action="/agent/apply/uploadCorpLicImg"
              :params="{
                payChannel: 1,
                cardSide: 'take',
                corpType: formData.corpType
              }"
             
              :previewImage="formData.ossCorpTakeUrl"
              desc="上传法人手持身份证"
        
            />
            <cys-input
              v-model="formData.ossCorpTakeUrl"
              style="display:none"
            ></cys-input>
          </cys-form-item>
          <div class="form-box">
            <div>
              <cys-form-item label="法人姓名：" prop="corpName">
                <cys-input
                  v-model="formData.corpName"
                  placeholder="请输入"
            
                ></cys-input>
              </cys-form-item>
              <cys-form-item label="法人证件号：" prop="corpNo">
                <cys-input
                  v-model="formData.corpNo"
                  placeholder="请输入"
            
                ></cys-input>
              </cys-form-item>
              <cys-form-item label="法人电话：" prop="cropPhone">
                <cys-input
                  v-model="formData.cropPhone"
                  placeholder="请输入"
            
                ></cys-input>
              </cys-form-item>
            </div>
            <div>
              <cys-form-item label="法人证件开始时间：" prop="corpLicStartTime">
                <cys-date-picker
                  v-model="formData.corpLicStartTime"
                  placeholder="选择日期"
            
                ></cys-date-picker>
              </cys-form-item>
              <cys-form-item
                label="法人证件失效时间："
                prop="corpLicInvalidTime"
              >
                <cys-date-picker
                  v-model="formData.corpLicInvalidTime"
                  placeholder="选择日期"
            
                ></cys-date-picker>
              </cys-form-item>
              <cys-form-item label="法人证件地址：" prop="corpIdardAddr">
                <cys-input
                  v-model="formData.corpIdardAddr"
                  placeholder="请输入"
            
                ></cys-input>
              </cys-form-item>
            </div>
            <div>
              <cys-form-item label="法人邮箱：" prop="cropMail">
                <cys-input
                  v-model="formData.cropMail"
                  placeholder="请输入"
            
                ></cys-input>
              </cys-form-item>
              <cys-form-item label="联系人姓名：" prop="contactName">
                <cys-input
                  v-model="formData.contactName"
                  placeholder="请输入"
            
                ></cys-input>
              </cys-form-item>
              <cys-form-item label="联系人电话：" prop="contactPhone">
                <cys-input
                  v-model="formData.contactPhone"
                  placeholder="请输入"
            
                ></cys-input>
              </cys-form-item>
            </div>
            <div>
              <cys-form-item label="联系人邮箱：" prop="contactMail">
                <cys-input
                  v-model="formData.contactMail"
                  placeholder="请输入"
            
                ></cys-input>
              </cys-form-item>
              <cys-form-item label="紧急联系人：" prop="urgentName">
                <cys-input
                  v-model="formData.urgentName"
                  placeholder="请输入"
            
                ></cys-input>
              </cys-form-item>
              <cys-form-item label="紧急联系人电话：" prop="urgentPhone">
                <cys-input
                  v-model="formData.urgentPhone"
                  placeholder="请输入"
            
                ></cys-input>
              </cys-form-item>
            </div>
            <div>
              <cys-form-item label="紧急联系人关系：" prop="urgentRelation">
                <cys-input
                  v-model="formData.urgentRelation"
                  placeholder="请输入"
            
                ></cys-input>
              </cys-form-item>
            </div>
            <div class="tips">
              提示：请认真校对识别信息
            </div>
          </div>
        </div>
        <h3>结算账户</h3>
        <div class="info-box">
          <div class="form-box">
            <div>
              
              <cys-form-item label="结算账户：" prop="settleAccount">
                <cys-input
                  v-model="formData.settleAccount"
                  placeholder="请输入"
                 
                ></cys-input>
              </cys-form-item>
              <cys-form-item label="开户行联行号：" prop="oaBank">
                <cys-input
                  v-model="formData.oaBank"
                  placeholder="请输入"
                 
                ></cys-input>
                
              </cys-form-item>
            </div>
            <div>
              <cys-form-item label="开户人：" prop="oaName">
                <cys-input
                  v-model="formData.oaName"
                  placeholder="请输入"
      
                ></cys-input>
              </cys-form-item>
              <cys-form-item label="持卡人证件号：" prop="idNo">
                <cys-input
                  v-model="formData.idNo"
                  placeholder="请输入"
            
                ></cys-input>
              </cys-form-item>
              <cys-form-item label="费率：" prop="rate">
                <cys-input
                  v-model="formData.rate"
                  placeholder="请输入"
            
                  ><template slot="append"
                    >‰</template
                  ></cys-input
                >
              </cys-form-item>
            </div>
            <div class="tips">提示：请认真校对识别信息</div>
          </div>
        </div>
      </div>
    </cys-form>
    <cys-button @click="handleSubmit">提交</cys-button>
    <cys-button plain @click="handleReset">重置</cys-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formData: { name: "", mail: "", select: "", date: "" },
        options: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ],
        rules: {
          name: [{ required: true, message: "不能为空", trigger: "blur" }],
          mail: [
            { required: true, message: "不能为空", trigger: "blur" },
            { type: "email", message: "邮箱格式不正确", trigger: "blur" }
          ],
          select: [{ required: true, message: "不能为空", trigger: "change" }],
          date: [{ required: true, message: "不能为空", trigger: "change" }]
        }
      };
    },
    methods: {
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) console.log("提交成功");
          else console.log("校验失败");
        });
      },
      handleReset() {
        this.$refs.form.resetFields();
      }
    }
  };
</script>
```

:::
