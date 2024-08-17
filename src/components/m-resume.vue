<template>
  <div class="m-resume-box">
    <div class="m-resume">
      <div class="resume-title">
        <h1>{{ resume.title }}</h1>
      </div>
      <!--基本信息-->
      <div class="resume-item">
        <h3>基本信息</h3>
        <div class="resume-item-content resume-item-between">
          <ul>
            <li v-for="( info, index ) in resume.personInfo.left"
              :key="`resume-person-info-left-${index}`"
            >
              <span class="resume-info-name">{{ info.name }}{{ colon }}</span>
              <span v-html="info.value"></span>
            </li>
          </ul>
          <ul>
            <li v-for="( info, index) in resume.personInfo.right"
              :key="`resume-person-info-right-${index}`"
            >
              <span class="resume-info-name">{{ info.name }}{{ colon }}</span>
              <span v-html="info.value"></span>
            </li>
          </ul>
        </div>
      </div>
      <!--工作经历-->
      <m-resume-experience :projects="resume.companies" title="工作经历" :colon="colon"></m-resume-experience>
      <!--项目经验-->
      <m-resume-experience :projects="resume.projects" title="项目经验" :colon="colon"></m-resume-experience>
      <!--个人项目-->
      <m-resume-experience :projects="resume.individualProjects" title="个人项目" :colon="colon"></m-resume-experience>
      <!--技能-->
      <div class="resume-item" :class="{ 'hide': resume.skills.length === 0 }">
        <h3>技能</h3>
        <div class="skill-show">
          <div class="skill-item" v-for="(skill, index) in resume.skills" :key="`skill-item-${index}`">
            <span class="skill-name">{{ skill.name }}</span>
            <b-progress
              :value="skill.level"
              height="12px"
              class="skill-progress"></b-progress>
          </div>
        </div>
      </div>
      <!--其他-->
      <div class="resume-item" :class="{ 'hide': resume.others.length === 0 }">
        <h3>其他</h3>
        <div class="patent">
          <div class="patent-item" v-for="( patent, index ) in resume.others" :key="`patent-item-${index}`">
            <span v-if="patent.iconName" :class="`icon-${patent.iconName}`" alt="Patent ICON"></span>
            <span v-if="patent.iconLink" class="icon-link" :style="{ backgroundImage: `url(${patent.iconLink})` }"></span>
            <span>
              {{ patent.name }}
              <span v-if="patent.linkContent">
                [<a :href="patent.link" target="_blank" rel="noopener">{{ patent.linkContent }}</a>]
              </span>
            </span>
          </div>
        </div>
      </div>
      <!--底部-->
      <div class="resume-footer">
        <div class="footer-line"></div>
        <div class="footer-content">
          <span>Made with 💖 by <a class="author" href="https://github.com/mazeyqian" target="_blank" rel="noopener">Mazey</a>（End）</span>
        </div>
        <div class="footer-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import resume from '../conf/resume';
  import MResumeExperience from './m-resume-experience.vue';

  export default {
    name: 'm-resume',
    components: {
      MResumeExperience,
    },
    data () {
      return {
        resume,
        colon: resume.language === 'ZH' ? '：' : ': ',
      };
    },
    created () {
      document.title = this.resume.pageAndFileName;
    },
    mounted () {},
  };
</script>
