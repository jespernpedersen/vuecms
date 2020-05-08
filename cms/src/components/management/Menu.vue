<template>
  <aside class="primary-cms-menu">
    <ul class="level-first">
        <li v-on:click="menuview = 'content-menu'">
            <unicon name="layer-group" />
            <span>Content</span>
        </li>
        <li>
            <router-link to="/management/content/upload">
                <unicon name="images" />
            </router-link>
        </li>
        
        <li class="disabled" v-on:click="menuview = 'user-menu'">
            <unicon name="users-alt" />
            <span>Users</span>
        </li>
        <li class="disabled">
            <unicon name="cog" />
            <span>Settings</span>
        </li>
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
      menuview: "content-menu"
    }
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
    background-color: #263238;
    color: #FFF;
    flex-direction: column;
}

.primary-cms-menu .level-first > li {
    position: relative;
    width: 100%;
    text-align: center;
    display: inline-block;
    padding: 17px 0;
    cursor: pointer;
}

.primary-cms-menu > ul > li.active {
    background-color: rgba(255, 255, 255, 0.1);
}

.primary-cms-menu > ul > li .unicon {
    fill: white;
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
    background-color: #222;
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

.disabled {
    opacity: 0.3;
}



</style>
