<template>
  <aside class="primary-cms-menu">
    <ul class="level-first">
        <li v-on:click="menuview = 'content-menu'" v-bind:class="[menuview === 'content-menu' ? 'active' : '']">
            <unicon name="layer-group" />
            <span>Content</span>
        </li>
        <li v-on:click="menuview = 'image-menu'" v-bind:class="[menuview === 'image-menu' ? 'active' : '']">
            <router-link to="/management/image/upload">
                <unicon name="images" />
            </router-link>
        </li>
        
        <li class="disabled" v-on:click="menuview = 'user-menu'">
            <unicon name="users-alt" />
            <span>Users</span>
        </li>
        <li class="disabled">
            <router-link to="/management/image/upload">
                <unicon name="cog" />
            </router-link>
        </li>
        <div class="logo" :style="logo"></div>
    </ul>

    <!-- View for Content Submenu -->
    <ul class="level-second content-menu" v-if="menuview === 'content-menu'">
    
        <li>
            <router-link to="/management/content/banner">
                <unicon name="comment-alt-exclamation" />
                <span>Status Banner</span>               
            </router-link>
        </li>
        <li>
            <router-link to="/management/content/pages">
                <unicon name="window-restore" />
                <span>Pages</span>
            </router-link>
        </li>
        <li>
            <router-link to="/management/content/blocks">
                <unicon name="cube" />
                <span>Blocks</span>               
            </router-link>
        </li>
        <li>
            <router-link to="/management/content/menu">
                <unicon name="list-ul" />
                <span>Menu Management</span>               
            </router-link>
        </li>
    </ul>
    
    <!-- View for User Menu's Submenu -->
    <ul class="user-menu level-second" v-if="menuview === 'user-menu'">
        <li class="disabled">
            <router-link to="/management/people/customers">
                <unicon name="bitcoin-circle" />
                <span>Customers</span>
            </router-link>
        </li>
        <li class="disabled">
            <router-link to="/management/people/accounts">
                <unicon name="user-square" />
                <span>Accounts</span>               
            </router-link>
        </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      contentmenu: false,
      menuview: ''
    }
  },
  computed : {
    logo() {
      return "background-image : url('" + require('@/assets/logo.png') + "'";
    }
  },
  mounted() {
    this.menuview = this.$router.app._route.params.backendpage + "-menu"
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

/* Reset */
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

a {
    color: inherit;
    text-decoration: none;
}



.primary-cms-menu {
    height: 100vh;
    flex-shrink: 0;
    display: flex;
    position: fixed;
    top: 34px;
}

.primary-cms-menu .level-first {
    width: 65px;
    display: flex;
    height: 100%;
    flex-basis: 65px;
    
    background-color: #f8cb5d;
    color: #FFF;
    flex-direction: column;
    position: relative;
}

.primary-cms-menu .level-first > li {
    position: relative;
    width: 100%;
    text-align: center;
    display: inline-block;
    padding: 16px 0;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}

.primary-cms-menu .level-first > li:not(.disabled):hover {  
    background-color: rgba(255, 255, 255, 0.4); 
}


.primary-cms-menu > ul > li.active {
    background-color: rgba(255, 255, 255, 0.4); 
}

.primary-cms-menu > ul > li .unicon {
    fill: #333;
    vertical-align: middle;
}

.primary-cms-menu > ul > li > .unicon {
    height: 24px;
}

.primary-cms-menu .level-second > li  {
    transition: 0.3s ease-in-out;
    background-color: transparent;
}

.primary-cms-menu .level-second > li .unicon {
    fill: #fff;
}

.primary-cms-menu .level-second > li .unicon {
    margin-right: 8px;
}

.primary-cms-menu .level-first > li > span {
    display: inline-block;
    width: 65px;
    display: none;
}

.primary-cms-menu .level-second {
    top: 0;
    width: 255px;
    background-color: #263238;
    height: 100vh;
}

.primary-cms-menu .level-second > li a {
    display: block;
    padding: 15px 30px 15px 20px;
    text-align: left;
    color: #FFF;
}

.primary-cms-menu .level-second li .router-link-active {
    background-color: rgba(255, 255, 255, 0.15);
}

.primary-cms-menu .level-second li .router-link-active .unicon {
    fill: #f8cb5d;
}

.disabled {
    opacity: 0.3;
}

.logo {
    position: absolute;
    bottom: 45px;
    height: 45px;
    background-size: 45px auto;
    background-repeat: no-repeat;
    background-position: center center;
    display: block;
    width: 100%;
}

    /* Desktop to iPad size */
    @media screen and (max-width: 991px) {
        html .primary-cms-menu .level-second {
            width: 65px;
        }

        html .primary-cms-menu .level-second > li a {
            font-size: 14px;
        }
        html .primary-cms-menu .level-second > li a span {
            display: none;
        }
    }

    /* Mobile starts */
    @media screen and (max-width: 767px) {
        html .primary-cms-menu {
            position: fixed;
            bottom: 0px;
            top: auto;
            width: 100%;
            height: 30px;
        }

        html .primary-cms-menu .level-first {
            width: 100%;
            position: fixed;
            bottom: 0px;
            flex-direction: row;
            height: auto;
        }

        html .primary-cms-menu .level-first .unicon {
            height: auto;
        }

        .logo {
            display: none;
        }

        html .primary-cms-menu .level-second {
            width: 100%;
            position: absolute;
            bottom: 61px;
            top: auto;
            height: auto;
        }

        html .primary-cms-menu .level-second > li a {
            width: 100%;
            text-align: left;
        }

        html .primary-cms-menu .level-second > li a span{
            display: inline-block
        }

        .primary-cms-menu .level-second > li a {
            text-align: center;
            padding: 15px 20px 15px 20px;
        }

    }

    /* Small Mobile */
    @media screen and (max-width: 540px) {

    }
</style>
