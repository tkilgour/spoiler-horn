<template>
  <div class="layout">
    <header class="header">
      <h1>The Spoiler Horn</h1>
    </header>
    <main>
      <slot/>
    </main>
    <footer>
      <div>Timestamp icon by <a href="https://www.flaticon.com/authors/lucy-g" title="Lucy G">Lucy G</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    </footer>
  </div>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<style>
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  background-color: rgb(253, 252, 250);
  margin:0;
  padding:0;
  line-height: 1.5;
}

h1 {
  /* text-transform: uppercase; */
  font-variant: small-caps;
}

a {
  text-decoration: none;
  color: rgb(57, 106, 133);
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

footer {
  margin-top: 40px;
  margin-bottom: 20px;
  opacity: 0.6;
  font-size: 14px;
}
</style>
