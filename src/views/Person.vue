<template>
  <div class="profile">
    <div class="profile-header">
      <el-image class="user-avatar"
                src="https://pic4.zhimg.com/7b8e72c144e581881f769b179b98b309_xl.jpg" fit="cover">
      </el-image>
      <div class="profile-meta">
        <div class="profile-header-title">
          <span class="profile-header-name">Alex Wang</span>
          <span class="profile-header-headline">高级工程师，Coder，Team leader</span>
        </div>
        <div class="profile-header-content">
          <div class="profile-content-item">
            <span>居住地</span>
            <span>现居北京</span>
          </div>
          <div class="profile-content-item">
            <span>所在行业</span>
            <span>计算机软件</span>
          </div>
          <div class="profile-content-item">
            <span>个人简介</span>
            <span>Android研究中,Java闭关中</span>
          </div>
        </div>
      </div>

      <div class="profile-header-footer">
        <el-row>
          <el-col :span="6">
            <el-button type="text" icon="el-icon-arrow-up">收起详细资料</el-button>
          </el-col>
          <el-col style="text-align: right" :span="4" :offset="8">
            <el-button type="primary" size="medium" plain>编辑个人资料</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="profile-main">
      <el-container>
        <el-main class="profile-main-content">
          <el-menu :default-active="activeIndex" mode="horizontal">
            <el-menu-item index="1">动态</el-menu-item>
            <el-menu-item index="2">回答 427</el-menu-item>
            <el-menu-item index="3">提问 3</el-menu-item>
            <el-menu-item index="4">文章 36</el-menu-item>
            <el-menu-item index="5">专栏 1</el-menu-item>
            <el-menu-item index="6">想法 8</el-menu-item>
            <el-menu-item index="7">关注</el-menu-item>
          </el-menu>

        </el-main>

        <el-aside class="profile-main-side">
          <el-card style="text-align: left" class="side-card">
            <div slot="header">
              <span>个人成就</span>
            </div>
            <div class="text item"><i class="el-icon-thumb"></i>获得 5,291 次赞同</div>
            <div class="text item"><i class="el-icon-star-on"></i>获得 615 次感谢 ， 7,085 次收藏</div>
            <div class="text item"><i class="el-icon-edit"></i>参与 11 次公共编辑</div>
          </el-card>
        </el-aside>
      </el-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PersonalPage",
    data() {
      return {
        activeIndex: '1'
      }
    }
  }
</script>

<style scoped>
  .profile {
    text-align: left;
  }

  .user-avatar {
    float: left;
    margin: 10px;
    width: 200px;
    height: 200px
  }

  .profile-meta {
    margin-left: 220px;
  }


  .profile-main-content {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin: 8px;
  }

  .profile-main-side {
    margin-top: 8px;
    margin-right: 8px;
  }
</style>
