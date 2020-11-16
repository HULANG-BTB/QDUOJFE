<template>
  <div class="user-home">
    <el-row type="flex" justify="center">
      <el-col :span="19">
        <div class="avator">
          <el-avatar :size="140" :src="profile.avatar"></el-avatar>
        </div>
        <div class="detail">
          <card-layout>
            <div class="content">
              <div v-if="profile.user" class="username">{{ profile.user.username }}</div>
              <el-divider></el-divider>
              <div class="statistic">
                <div class="accepted">
                  <span>Sloved</span>
                  <div>{{ profile.accepted_number }}</div>
                </div>
                <div class="divider"></div>
                <div class="submissions">
                  <span>Submissions</span>
                  <div>{{ profile.submission_number }}</div>
                </div>
                <div class="divider"></div>
                <div class="score">
                  <span>Score</span>
                  <div>{{ profile.total_score }}</div>
                </div>
              </div>
              <div class="problem">
                <div class="title">解决的问题:</div>
                <div class="list">
                  <el-tag v-for="problem in problems" :key="problem" @click="handleProblemClick(problem)">{{ problem }}</el-tag>
                </div>
              </div>
            </div>
          </card-layout>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UserHome',
  data() {
    return {
      profile: {}
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/profile']
    },
    problems() {
      let problems = []
      const { acm_problems_status, oi_problems_status } = JSON.parse(JSON.stringify(this.profile))
      if (acm_problems_status?.problems) {
        Object.keys(acm_problems_status.problems).forEach((key) => {
          if (problems.indexOf(acm_problems_status.problems[key]._id) === -1) {
            problems.push(acm_problems_status.problems[key]._id)
          }
        })
      }
      if (oi_problems_status?.problems) {
        Object.keys(oi_problems_status.problems).forEach((key) => {
          if (problems.indexOf(oi_problems_status.problems[key]._id) === -1) {
            problems.push(oi_problems_status.problems[key]._id)
          }
        })
      }
      return problems
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.profile = this.user
    },

    handleProblemClick(problem_id) {
      this.$router.push({ name: 'ProblemDetail', params: { problem_id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-home {
  .detail {
    margin-top: -50px;
  }

  .content {
    padding-top: 50px;

    .username {
      text-align: center;
      font-size: 2rem;
    }

    .statistic {
      display: flex;
      flex-direction: row;
      justify-content: center;
      text-align: center;

      .divider {
        width: 1px;
        background-color: #dcdfe6;
      }

      div:not(.divider) {
        flex-grow: 1;

        div {
          padding: 3rem 0;
          font-size: 3rem;
        }
      }
    }

    .problem {
      text-align: center;

      .title {
        color: #495060;
        font-size: 1.2rem;
      }

      .list {
        margin-top: 1rem;
      }
    }
  }
}
</style>
