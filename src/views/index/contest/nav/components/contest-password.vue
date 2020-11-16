<template>
  <card-layout class="contest-meta">
    <template #title>
      <i class="el-icon-lock" style="margin-right: 10px"></i>
      {{ $t('contest.password') }}
    </template>
    <el-input placeholder="password" type="password" v-model="password" @keyup.enter.native="handleSubmitPassowrd">
      <el-button slot="append" icon="el-icon-check" @click="handleSubmitPassowrd"></el-button>
    </el-input>
  </card-layout>
</template>

<script>
export default {
  name: 'ContestMeta',
  data() {
    return {
      password: ''
    }
  },
  props: {
    contest: {
      type: Object,
      required: true
    }
  },
  methods: {
    async handleSubmitPassowrd() {
      try {
        // if (this.password.length < 6) {
        //   throw new Error('密码长度不正确！')
        // }
        const { data, error } = await this.$api.checkContestPassword({
          data: {
            contest_id: this.contest.id,
            password: this.password
          }
        })
        if (error) {
          throw new Error(data)
        }
        if (data) {
          this.$message.success('Password Accept !')
          this.$emit('access-change', data)
        } else {
          throw new Error('Access Denied .')
        }
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.contest-meta {
  ul {
    list-style: none;
    padding-inline-start: 5px;
    padding-inline-end: 5px;
    li {
      border-bottom: 1px dotted #e9eaec;
      margin-top: 1rem;

      .label {
        float: left;
      }
      .value {
        float: right;
      }
      &::after {
        content: ' ';
        clear: both;
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
      }
    }
  }

  /deep/ .el-card__body {
    padding: 0.5rem;
  }
}
</style>
