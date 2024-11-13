<template>
  <div class="flex flex-col gap-4 text-center">
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
