<template>
  <card-layout class="about-faq">
    <template #title>常见问题</template>
    <ul>
      <li>
        Where is the input and the output?
        <p>Your program shall read input from stdin ('Standard Input') and write output to stdout ('Standard Output') For example,you can use scanf in C or cin in C++ to read from stdin,and use printf in C or cout in C++ to write to stdout. User programs are not allowed to read or write files, or you will get a Runtime Error.</p>
      </li>
      <li>
        What's the meaning of the submission execution time?
        <p>The onlinejudge might test your code multiple times with different input files. If your code gives the correct answer within the time limit for each input file, the execution time displayed is the max of the time spent for each test case. Otherwise, the execution time will have no sense.</p>
      </li>
      <li>
        How can I use C++ Int64?
        <p>You should declare aslong long and use with cin/cout or %lld, using __int64 will result in Compile Error.</p>
      </li>
      <li>
        Java specifications?
        <p>All programs must begin in a static main method in a Main class. Do not use public classes: even Main must be non public to avoid compile error.Use buffered I/O to avoid time limit exceeded due to excesive flushing.</p>
      </li>
      <li>
        About presentation error?
        <p>There is no presentation error in this oj.The judger will trim the blacks and wraps in your ouput's last line. if it's still different with the correct output, the result will be Wrong Answer.</p>
      </li>
      <li>
        How to report bugs about this oj?
        <p>The onlinejudge is open source, you can open an issue in Github The details(like env, version..) about a bug is required, which will help us a lot to solve the bug. Certainly, we are very pleased to merge your pull requests.</p>
      </li>
    </ul>
  </card-layout>
</template>

<script>
export default {
  name: 'AboutFAQ'
}
</script>
