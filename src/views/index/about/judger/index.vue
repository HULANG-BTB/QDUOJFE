<template>
  <div class="about-judger">
    <card-layout class="judger">
      <template #title>编译和评测</template>
      <div class="markdown-body">
        <ul>
          <li v-for="language in languages" :key="language.name">
            {{ language.name }} ( {{ language.description }} )
            <pre>{{ language.config.compile.compile_command }}</pre>
          </li>
        </ul>
      </div>
    </card-layout>
    <card-layout class="result" style="margin-top: 20px">
      <template #title>结果解释</template>
      <ul>
        <li>
          <b>{{ $t('about.judger.pending_judging.title') }}</b> : {{ $t('about.judger.pending_judging.value') }}
        </li>
        <li>
          <b>{{ $t('about.judger.compile_error.title') }}</b> : {{ $t('about.judger.compile_error.value') }}
        </li>
        <li>
          <b>{{ $t('about.judger.accepted.title') }}</b> : {{ $t('about.judger.accepted.value') }}
        </li>
        <li>
          <b>{{ $t('about.judger.wrong_answer.title') }}</b> : {{ $t('about.judger.wrong_answer.value') }}
        </li>
        <li>
          <b>{{ $t('about.judger.runtime_error.title') }}</b> : {{ $t('about.judger.runtime_error.value') }}
        </li>
        <li>
          <b>{{ $t('about.judger.time_limit_exceeded.title') }}</b> : {{ $t('about.judger.time_limit_exceeded.value') }}
        </li>
        <li>
          <b>{{ $t('about.judger.memory_limit_exceeded.title') }}</b> : {{ $t('about.judger.memory_limit_exceeded.value') }}
        </li>
        <li>
          <b>{{ $t('about.judger.system_error.title') }}</b> : {{ $t('about.judger.system_error.value') }}
        </li>
      </ul>
    </card-layout>
  </div>
</template>

<script>
export default {
  name: 'AboutJudger',
  computed: {
    languages() {
      return this.$store.getters['language/languages'] || []
    }
  }
}
</script>
