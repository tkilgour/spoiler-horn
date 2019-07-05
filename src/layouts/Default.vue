<template>
  <div class="container mx-auto px-4 sm:px-10 lg:px-40 py-2">
    <header class="header">
      <h1 class="mt-2 sm:mt-4 text-4xl">The Spoiler Horn</h1>
    </header>
    <main>
      <slot/>
    </main>
    <footer class="mt-10 mb-5">
      <div class="text-sm">Timestamp icon by <a class="text-blue-700 outline-none hover:text-blue-800 focus:text-white focus:bg-blue-800" href="https://www.flaticon.com/authors/lucy-g" title="Lucy G">Lucy G</a> from <a class="text-blue-700 outline-none hover:text-blue-800 focus:text-white focus:bg-blue-800" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a class="text-blue-700 outline-none hover:text-blue-800 focus:text-white focus:bg-blue-800" href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    </footer>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;

.flex {
  display: flex !important;
  display: -webkit-box !important;
}

@tailwind utilities;
</style>
