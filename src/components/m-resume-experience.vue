<template>
  <div class="resume-item" :class="{ 'hide': projects.length === 0 }">
    <h3>{{ title }}</h3>
    <div :class="`resume-experience ${project.hideInPrint ? 'hide-in-print' : ''}`" v-for="(project, index) in projects" :key="`resume-experience-${index}`">
      <div class="resume-experience-timeline">
        <div class="timeline-line-before"></div>
        <div class="timeline-circle"></div>
        <div class="timeline-line"></div>
      </div>
      <div class="resume-experience-content">
        <div class="content-title">
          <div class="company project">
            <span class="company-name project-name">
              <span v-if="project.iconName" :class="`company-logo-${project.iconName}`">
                <i class="icon-company"></i>
              </span>
              <div v-if="project.iconLink" :class="`project-logo`">
                <i class="icon" :style="{ backgroundImage: `url(${project.iconLink})` }"></i>
              </div>
              <span v-html="project.name"></span>
              <span class="project-badges">
                <b-badge v-for="(tag, index) in project.tags"
                  :key="`project-badges-${index}`"
                  :pill="true"
                  class="project-badge"
                  :class="tag.bgc"
                >
                  {{ tag.name }}
                </b-badge>
              </span>
            </span>
            <span>
              <span>{{ project.timeRangeStart }}</span>
              &nbsp;
              <span v-if="project.timeRangeStart && project.timeRangeEnd">-</span>
              &nbsp;
              <span>{{ project.timeRangeEnd }}</span>
            </span>
          </div>
          <div class="department">
            <span>{{ project.department }}</span>
            <span>{{ project.position }}</span>
          </div>
        </div>
        <div class="content-description">
          <span v-html="project.description"></span>
        </div>
        <div class="project-detail" v-for="(detail, index) in project.details" :key="`project-detail-${index}`">
          <div class="detail-name">{{ detail.name }}{{ colon }}</div>
          <div class="detail-content" v-html="detail.value"></div>
        </div>
        <div class="products-badges">
          <b-badge v-for="(product, index) in project.products"
            :key="`product-badge-${index}`"
            :pill="true"
            class="product-badge"
            :class="product.bgc || ''"
            :style="{
              backgroundColor: product.bgcColor || '',
            }"
            :href="product.link"
            target="_blank"
          >
            <span v-if="product.iconName" class="product-icon" :class="`icon-${product.iconName}`"></span>
            <span v-if="product.iconLink" class="product-icon" :style="{ backgroundImage: `url(${product.iconLink})` }"></span>
            <span class="product-name">{{ product.name }}</span>
          </b-badge>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "m-resume-experience",
  props: {
    projects: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    colon: {
      type: String,
      required: true,
    },
  },
};
</script>
