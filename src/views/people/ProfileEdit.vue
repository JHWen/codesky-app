<template>
  <div class="profile-edit">
    <div class="profile-avatar">
      <el-upload class="image-upload" :limit="1"
                 action=""
                 :with-credentials="true">
        <el-image :src="userInfo.avatarUrl"
                  style="width:168px;height: 168px;" fit="cover"></el-image>
        <span slot="tip" style=" padding: 8px;font-size: 14px;color: #8590a6;">点击修改头像</span>
      </el-upload>
    </div>
    <div class="profile-edit-content">
      <div class="profile-header">
        <el-row>
          <el-col :span="6">
            <span class="profile-header-title">笑忆微凉</span>
          </el-col>
          <el-col :offset="14" :span="4">
            <router-link :to="`/people/${userComputed.username}`" style="text-decoration: none; line-height: 30px;">
              <el-link type="info" :underline="false">返回我的主页<i class="el-icon-arrow-right"></i></el-link>
            </router-link>
          </el-col>
        </el-row>
      </div>
      <div class="profile-edit-fields">
        <el-form label-position="left" label-width="100px" :model="profileForm" v-show="isShowForm.gender">
          <el-form-item label="性别">
            <el-radio-group v-model="profileForm.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium">保存</el-button>
            <el-button size="medium" @click="hiddenEditForm('gender')" plain>取消</el-button>
          </el-form-item>
        </el-form>
        <div v-show="!isShowForm.gender">
          <el-row>
            <el-col :span="4">
              <span class="field-label">性别</span>
            </el-col>
            <el-col :span="10">
              <span>{{userComputed.nameOfGender}}</span>
              <el-button type="text" icon="el-icon-edit" @click="showFormAction('gender')">修改</el-button>
            </el-col>
          </el-row>
        </div>
        <el-divider></el-divider>

        <el-form label-position="left" label-width="100px" :model="profileForm" v-show="isShowForm.headline">
          <el-form-item label="一句话介绍">
            <el-input type="text" v-model="profileForm.headline" maxlength="20" show-word-limit></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium">保存</el-button>
            <el-button size="medium" @click="hiddenEditForm('headline')" plain>取消</el-button>
          </el-form-item>
        </el-form>
        <div v-show="!isShowForm.headline">
          <el-row>
            <el-col :span="4">
              <span class="field-label">一句话介绍</span>
            </el-col>
            <el-col :span="10">
              <span>{{userInfo.headline}}</span>
              <el-button type="text" icon="el-icon-edit" @click="showFormAction('headline')">修改</el-button>
            </el-col>
          </el-row>
        </div>
        <el-divider></el-divider>

        <el-form label-position="left" label-width="100px" :model="profileForm" v-show="isShowForm.address">
          <el-form-item label="居住地">
            <el-input type="text" v-model="profileForm.address" maxlength="20" show-word-limit></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium">保存</el-button>
            <el-button size="medium" @click="hiddenEditForm('address')" plain>取消</el-button>
          </el-form-item>
        </el-form>
        <div v-show="!isShowForm.address">
          <el-row>
            <el-col :span="4">
              <span class="field-label">居住地</span>
            </el-col>
            <el-col :span="10">
              <span>{{userInfo.address}}</span>
              <el-button type="text" icon="el-icon-edit" @click="showFormAction('address')">修改</el-button>
            </el-col>
          </el-row>

        </div>
        <el-divider></el-divider>

        <el-form label-position="left" label-width="100px" :model="profileForm" v-show="isShowForm.business">
          <el-form-item label="所在行业">
            <el-select v-model="profileForm.business" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium">保存</el-button>
            <el-button size="medium" @click="hiddenEditForm('business')" plain>取消</el-button>
          </el-form-item>
        </el-form>
        <div v-show="!isShowForm.business">
          <el-row>
            <el-col :span="4">
              <span class="field-label">所在行业</span>
            </el-col>
            <el-col :span="10">
              <span>{{userInfo.business}}</span>
              <el-button type="text" icon="el-icon-edit" @click="showFormAction('business')">修改</el-button>
            </el-col>
          </el-row>
        </div>
        <el-divider></el-divider>

        <el-form label-position="left" label-width="100px" :model="profileForm" v-show="isShowForm.description">
          <el-form-item label="个人简介">
            <el-input type="textarea" v-model="profileForm.headline"
                      maxlength="200" show-word-limit
                      :autosize="{ minRows: 2, maxRows: 4 }">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium">保存</el-button>
            <el-button size="medium" @click="hiddenEditForm('description')" plain>取消</el-button>
          </el-form-item>
        </el-form>
        <div v-show="!isShowForm.description">
          <el-row>
            <el-col :span="4">
              <span class="field-label">个人简介</span>
            </el-col>
            <el-col :span="10">
              <span>{{userInfo.description}}</span>
              <el-button type="text" icon="el-icon-edit" @click="showFormAction('description')">修改</el-button>
            </el-col>
          </el-row>
        </div>
        <el-divider></el-divider>

      </div>
    </div>
  </div>
</template>

<script>

  import ElRadioGroup from "element-ui/packages/radio/src/radio-group";
  import ElRadio from "element-ui/packages/radio/src/radio";
  import ElImage from "element-ui/packages/image/src/main";
  import ElUpload from "element-ui/packages/upload/src/index";

  export default {
    name: "ProfileEdit",
    components: {ElUpload, ElImage, ElRadio, ElRadioGroup},
    data() {
      let options = [{
        value: '高新科技',
        label: '高新科技'
      }, {
        value: '电子商务',
        label: '电子商务'
      }, {
        value: '电子游戏',
        label: '电子游戏'
      }, {
        value: '互联网',
        label: '互联网'
      }, {
        value: '计算机软件',
        label: '计算机软件'
      }, {
        value: '计算机硬件',
        label: '计算机硬件'
      }, {
        value: '其他',
        label: '其他'
      }];
      return {
        options,
        isShowForm: {
          username: '',
          gender: false,
          headline: false,
          address: false,
          business: false,
          description: false,
        },
        profileForm: {
          username: '笑忆微凉',
          gender: 1,
          address: '北京',
          avatarUrl: 'https://pic1.zhimg.com/v2-2ce302bddb6e4c00c51bfed50132b92f_xl.jpg',
          headline: '不会写代码的程序员',
          business: '计算机软件',
          description: 'Java闭关修炼',
          gmtCreated: '',
          gmtModified: '',
        },
        userInfo: {
          username: '笑忆微凉',
          gender: 1,
          address: '北京',
          avatarUrl: 'https://pic1.zhimg.com/v2-2ce302bddb6e4c00c51bfed50132b92f_xl.jpg',
          headline: '不会写代码的程序员',
          business: '计算机软件',
          description: 'Java闭关修炼',
          gmtCreated: '',
          gmtModified: '',
        }
      }
    }, computed: {
      userComputed() {
        let nameOfGender = this.userInfo.gender === 1 ? '男' : '女';
        let username = this.$store.state.username;
        return {
          nameOfGender, username
        }
      }
    },
    methods: {
      showFormAction: function (name) {
        console.log(name);
        this.isShowForm[name] = true;
      },
      hiddenEditForm: function (name) {
        console.log(name);
        this.isShowForm[name] = false;
      }
    }
  }
</script>

<style scoped>
  .profile-edit {
    width: 1000px;
    margin: 68px auto;
    background-color: #FFFFFF;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }

  .profile-avatar {
    float: left;
    width: 180px;
    height: 180px;
  }

  .image-upload {
    padding: 10px;
  }

  .profile-edit-content {
    margin-left: 200px;
    margin-top: 32px;
  }

  .profile-header {
    text-align: left;
    height: 50px;
    padding: 20px;
  }

  .profile-header-title {
    font-size: 26px;
    font-weight: 600;
    line-height: 30px;
  }


  .profile-edit-fields {
    text-align: left;
    padding: 20px;
  }

  .field-label {
    font-size: 15px;
    font-weight: 600;
    line-height: 36px;
    color: #444;
  }

</style>
