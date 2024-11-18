<script setup lang="ts">
import type { DropdownItem } from '#ui/types'

const { loggedIn, user, clear } = useUserSession()
const colorMode = useColorMode()

const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

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
  <div class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 fixed w-full left-0 top-0">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <h3 class="text-lg font-semibold leading-6 text-center hidden sm:block">
          <NuxtLink to="/">
            Get Stuff Done!! 
          </NuxtLink>
        </h3>

        <UButton
          square
          color="white"
          icon="i-heroicons-bars-3"
          @click="toggleMobileMenu"
          class="flex sm:hidden"
        />

        <!-- Desktop navigation -->
        <div
          class="hidden sm:flex flex-wrap justify-end -mx-2 sm:mx-0"
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

  <!-- Mobile Navigation -->
  <div>
    <!-- Backdrop -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40"
      @click="closeMobileMenu"
    />

    <!-- Sliding sidebar -->
    <div
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Mobile menu content -->
      <div class="h-full flex flex-col">
        <!-- Header -->
        <div class="px-4 py-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <NuxtLink 
              to="/"
              class="text-lg font-semibold"
              @click="closeMobileMenu"
            >
              Get Stuff Done!!
            </NuxtLink>
            <UButton
              square
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark"
              @click="closeMobileMenu"
            />
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-4 space-y-2" v-if="loggedIn">
          <UButton
            to="/todos"
            icon="i-heroicons-list-bullet"
            label="Todos"
            :color="$route.path === '/todos' ? 'primary' : 'gray'"
            variant="ghost"
            block
            class="justify-start"
            @click="closeMobileMenu"
          />
          <UButton
            to="/optimistic-todos"
            icon="i-heroicons-sparkles"
            label="Optimistic Todos"
            :color="$route.path === '/optimistic-todos' ? 'primary' : 'gray'"
            variant="ghost"
            block
            class="justify-start"
            @click="closeMobileMenu"
          />
        </nav>

        <!-- User section -->
        <div class="px-4 py-4 border-t border-gray-200 dark:border-gray-700" v-if="user">
          <div class="flex items-center space-x-3 mb-4">
            <UAvatar
              :src="`https://github.com/${user.login}.png`"
              :alt="user.login"
              size="sm"
            />
            <span class="text-sm font-medium">{{ user.login }}</span>
          </div>
          <UButton
            icon="i-heroicons-arrow-left-on-rectangle"
            label="Logout"
            color="gray"
            variant="ghost"
            class="justify-start"
            block
            @click="clear"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Add margin-top to account for fixed header -->
  <div class="pt-16 text-left">
    <NuxtPage />
  </div>
  <UNotifications />
</template>

<style lang="postcss">
body {
  @apply font-sans text-gray-950 bg-gray-50 dark:bg-gray-950 dark:text-gray-50;
}
</style>