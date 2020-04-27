<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Frontend</router-link> |
      <router-link to="/management/content/pages">Backend</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: calc(100vh - 34px);
}

#nav {
  padding: 8px;
  background-color: #222;
  color: #FFF;
  text-align: left;
  position: fixed;
  width: 100%;
  top: 0;

  a {
    color: inherit;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}


    pre {
      width: 100%;
      text-align: left;
    }
    
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
</style>
