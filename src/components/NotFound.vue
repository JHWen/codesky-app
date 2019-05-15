<template>
  <div id="notFund">
    <div class="page">
      <div class="error">
        <h1 class="header">
          <router-link to="/" class="logo"><img src="../assets/logo_black_trans.png"></router-link>
          404
        </h1>
        <div class="content">
          <p><strong>你似乎来到了没有知识存在的荒原</strong></p>
          <p>来源链接是否正确?用户、话题或问题是否存在?</p>
          <hr>
          <p>
            <router-link to="/">返回首页</router-link>
            <span>或者</span>
            <a @click.stop="back">返回上页</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NotFound",
    methods: {
      back() {
        this.$router.go(-1)
      },
    }
  }
</script>

<style scoped>
  .page .error {
    margin: 169px auto 0;
    width: 404px
  }

  .page .error .header {
    overflow: hidden;
    font-size: 1.8em;
    line-height: 1.2;
    margin: 0 0 .33em .33em
  }

  .page .error .header a {
    text-decoration: none;
    color: #105cb6
  }

  .page .error .header a img {
    vertical-align: text-bottom;
    border: 0
  }

  .page .error a {
    text-decoration: none;
    color: #105cb6
  }

  .page .error p {
    margin: 0 0 1.7em;
    color: #999
  }

  .page .error strong {
    font-size: 1.1em;
    color: #000;
    font-weight: 700
  }

  .page .error hr {
    margin: 1.3em 0
  }

  .page .error .content {
    padding: 2em 1.25em;
    border: 1px solid #babbbc;
    background: #f7f7f7;
    text-align: center
  }

</style>
