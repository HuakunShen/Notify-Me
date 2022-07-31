<template>
  <div>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <NuxtLink to="/" class="btn btn-ghost normal-case text-xl"
          >Notify Me</NuxtLink
        >
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal p-0">
          <li><NuxtLink to="/setting">Setting</NuxtLink></li>
          <li>
            <a href="https://github.com/HuakunShen/Notify-Me" target="_blank">
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </div>
    <slot />
  </div>
</template>
