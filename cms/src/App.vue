<template>
  <div id="app">
    <div id="nav" >
      <router-link to="/">Website</router-link> |
      <router-link to="/management/content/pages" :class="{ active: backendActive}">Control Seat CMS</router-link>
      <div class="user">
        Welcome back, Jesper
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backendActive: false,
    }
  },
  mounted() {
    const text = this.$router.app._route.path;
    const regex = "management";
    const found = text.match(regex)

    if(found) {
      this.backendActive = true
      console.log(this.backendActive)
    }
    else {
      console.log(this.$router.app._route.path)
      this.backendActive = false
      console.log(this.backendActive)
    }
  }
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700&display=swap');

.user {
    float: right;
    padding-right: 20px;
    font-size: 14px;
    line-height: 21px;
}

.logo {
  background-repeat: no-repeat;
  background-size: 100% auto;
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: calc(100vh - 34px);
}

#app * {
font-family: 'Open Sans', sans-serif;
}

.version {
    position: fixed;
    opacity: 0.3;
    bottom: 21px;
    left: 88px;
    color: #FFF;
}

.container {
    max-width: 1199px;
    margin-left: auto;
    margin-right: auto;
}

#nav {
  padding: 5px 10px 8px 10px;
  background-color: #222;
  color: #FFF;
  text-align: left;
  position: fixed;
  z-index: 20;
  width: 100%;
  top: 0;

  a {
    color: inherit;

    &.router-link-exact-active {
      color: #f8cb5d;
    }
  }
}

#nav a.active {
   color: #f8cb5d;
}

nav {

  a {
    color: inherit;
    text-decoration: none;
    display: block;
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

// Laptop-sized
@media screen and (max-width: 1280px) {
  .container {
    max-width: 992px;
  }
}

// Desktop to iPad size
@media screen and (max-width: 991px) {
    .version {
      display: none;
    }
}

// Mobile starts
@media screen and (max-width: 767px) {

  .user {
    display: none;
  }

}

// Small Mobile
@media screen and (max-width: 540px) {

}

</style>
