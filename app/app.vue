<script setup lang="ts">
import type { DropdownItem } from '#ui/types'

const { loggedIn, user, clear } = useUserSession()
const colorMode = useColorMode()

const isMobileMenuOpen = ref(false)

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo('/')
  }
})

function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'icon', href: '/icon.png' }]
})

useSeoMeta({
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  title: 'LOUIE TODO',
  description:
    'A Nuxt demo hosted with edge-side rendering, authentication and queyring a Cloudflare D1 database',
  ogImage: '/social-image.png',
  twitterImage: '/social-image.png',
  twitterCard: 'summary_large_image'
})

const userMenuItems = [
  [{
    label: 'Profile',
    icon: 'i-heroicons-user-circle',
    to: '/profile'
  }, {
    label: 'Settings',
    icon: 'i-heroicons-cog-6-tooth',
    to: '/settings'
  }],
  [{
    label: 'Logout',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: () => console.log('Logout clicked')
  }]
]

const items = [
  [
    {
      label: 'Logout',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: clear
    }
  ]
] satisfies DropdownItem[][]
</script>

<template>

  <div class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-end sm:justify-between h-16 items-center">
        <!-- Logo -->
        <h3 class="text-lg font-semibold leading-6 text-center hidden sm:block">
          <NuxtLink to="/">
            Yeah, That's such a good Louie!! 
          </NuxtLink>
        </h3>

        <UButton
          square
          color="white"
          icon="i-heroicons-bars-3"
          @click="toggleMobileMenu"
          class="flex sm:hidden"
        />

        <div
          class="hidden sm:flex flex-wrap justify-end -mx-2 sm:mx-0 "
          v-if="loggedIn"
        >
          <UButton
            to="/todos"
            icon="i-heroicons-list-bullet"
            label="Todos"
            :color="$route.path === '/todos' ? 'primary' : 'gray'"
            variant="ghost"
          />
          <UButton
            to="/optimistic-todos"
            icon="i-heroicons-sparkles"
            label="Optimistic Todos"
            :color="$route.path === '/optimistic-todos' ? 'primary' : 'gray'"
            variant="ghost"
          />
        </div>

        <div class="flex items-center space-x-4">

          <UButton
            square
            variant="ghost"
            color="black"
            :icon="$colorMode.preference === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'"
            @click="toggleColorMode"
          />

          <UDropdown
            v-if="user"
            :items="items"
          >
            <UButton
              color="white"
              trailing-icon="i-heroicons-chevron-down-20-solid"
            >
              <UAvatar
                :src="`https://github.com/${user.login}.png`"
                :alt="user.login"
                size="3xs"
              />
              {{ user.login }}
            </UButton>
          </UDropdown>

        </div>
      </div>
    </div>
  </div>



  <UContainer class="min-h-screen flex flex-col my-4">

    <NuxtPage />

    <footer v-if="loggedIn" class="text-center mt-2">
      <NuxtLink
        href=""
        target="_blank"
        class="text-sm text-gray-500 hover:text-gray-700"
      >
        We can make these link to anywhere
      </NuxtLink>
      ·
      <NuxtLink
        href=""
        target="_blank"
        class="text-sm text-gray-500 hover:text-gray-700"
      >
        This would be another link
      </NuxtLink>
    </footer>
  </UContainer>
  <UNotifications />
</template>

<style lang="postcss">
body {
  @apply font-sans text-gray-950 bg-gray-50 dark:bg-gray-950 dark:text-gray-50;
}
</style>
