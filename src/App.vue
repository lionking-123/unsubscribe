<script setup lang="ts">
import RouterPage from "./router/RoutePage.vue";
import "bootstrap/dist/css/bootstrap.css";
import { useRecaptchaProvider } from 'vue-recaptcha'
useRecaptchaProvider()

</script>
<template>
  <div id="app">
    <RouterPage class="view"></RouterPage>
  </div>
</template>