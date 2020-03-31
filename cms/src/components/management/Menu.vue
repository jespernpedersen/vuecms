<template>
  <aside class="primary-cms-menu">
    <ul class="level-first">
        <li class="active">
            <unicon name="layer-group" />
            <span>Content</span>
            <ul class="level-second">
                <li>
                    <router-link to="/management/pages">
                        <unicon name="window-restore" />
                        <span>Pages</span>
                    </router-link>
                </li>
                <li>
                    <unicon name="cube" />
                    <span>Blocks</span>
                </li>
            </ul>
        </li>
        <li>
            <unicon name="cog" />
            <span>Settings</span>
        </li>
        <li>
            <span>Item 3</span>
        </li>
        <li>
            <span>Item 4</span>
        </li>
        <li>
            <span>Item 5</span>
        </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'Menu'
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
}

.primary-cms-menu > ul {
    width: 65px;
    display: flex;
    height: 100%;
    flex-basis: 65px;
    background-color: #263238;
    color: #FFF;
    flex-direction: column;
}

.primary-cms-menu > ul > li {
    position: relative;
    width: 100%;
    text-align: center;
    display: inline-block;
    padding: 17px 0;
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

.primary-cms-menu > ul > li > ul > li .unicon {
    margin-right: 8px;
}

.primary-cms-menu > ul > li > span {
    display: inline-block;
    width: 65px;
    display: none;
}

.primary-cms-menu > ul > li > ul {
    position: absolute;
    left: 100%;
    top: 0;
    width: 255px;
    background-color: #222;
    height: 100vh;
}

.primary-cms-menu > ul > li > ul > li {  
    padding: 15px 30px 15px 20px;
    text-align: left;
}

.primary-cms-menu > ul > li > ul > li:nth-of-type(odd) {
    background-color: rgba(255, 255, 255, 0.15);

}



</style>
