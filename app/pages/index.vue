<template>
  <div class="background"></div>
  <div class="">
    <h1 class="text-3xl font-bold">Hey Nicole!! </h1>
    <p class="text-base text-gray-500">Welcome to our hub of getting shit done!! I love you so so much</p>
    <UButton
      v-if="!loggedIn"
      to="/api/auth/github"
      label="LOGIN"
      color="white"
      size="xl"
      external
      block
      class="text-center"
    />
  </div>
</template>

<style>
.background {
  @apply
  bg-gray-200
  dark:bg-gray-800
  ;
  display: block;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.login {
  @apply
  flex
  flex-col
  gap-4
  text-center
  relative
  ;
}
</style>
