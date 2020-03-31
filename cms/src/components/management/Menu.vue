<template>
  <aside class="primary-cms-menu">
    <ul class="level-first">
        <li><span>Item 1</span>
            <ul class="level-second">
                <li>
                    <span>Sub-Item 1</span>
                </li>
                <li>
                    <span>Sub-Item 2</span>
                </li>
            </ul>
        </li>
        <li>
            <span>Item 2</span>
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
}

.primary-cms-menu > ul > li > span {
    display: inline-block;
    width: 65px;
    padding: 10px 0;
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
    padding: 15px 30px;
    text-align: left;
}

.primary-cms-menu > ul > li > ul > li:nth-of-type(odd) {
    background-color: rgba(255, 255, 255, 0.15);

}



</style>
