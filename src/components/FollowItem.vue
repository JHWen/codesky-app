<template>
  <div class="follow-item">
    <div class="list-item">
      <el-image class="list-item-avatar" :src="avatarUrl" alt="hello world"></el-image>
      <div class="list-item-header">
        <div class="list-item-title">{{username}}</div>
        <div class="list-item-meta">
          <div class="list-item-headline">
            {{headline}}
          </div>
          <div class="list-item-status">
            <span class="status-item">{{answersCount}} 回答</span>
            <el-divider direction="vertical"></el-divider>
            <span class="status-item">{{articlesCount}} 文章</span>
            <el-divider direction="vertical"></el-divider>
            <span class="status-item">{{followersCount}} 关注者</span>
          </div>
        </div>
      </div>
      <div class="list-item-side">
        <el-button type="primary" size="medium" plain>已关注</el-button>
      </div>
    </div>
    <el-divider></el-divider>
  </div>

</template>

<script>
  export default {
    name: "FollowItem",
    props: {
      id: Number,
      username: String,
      avatarUrl: String,
      headline: String,
      answersCount: Number,
      articlesCount: Number,
      followersCount: Number
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>
  .list-item {
    position: relative;
    margin-top: 8px;
  }

  .list-item-avatar {
    display: inline-block;
    vertical-align: middle;
    width: 60px;
    height: 60px;
  }

  .list-item-header {
    display: inline-block;
    vertical-align: middle;
    margin-left: 12px;
  }

  .list-item-title {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.6;
  }

  .list-item-side {
    position: absolute;
    float: right;
    top: 50%;
    right: 0;
    height: 36px;
    margin-top: -18px;
  }

  .list-item-status {
    margin-top: 5px;
    color: #8590a6;
    font-size: 14px;
  }
</style>
