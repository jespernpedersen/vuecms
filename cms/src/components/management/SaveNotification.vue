<template>
    <div v-bind:class="{ active: unsavedChanges}">
        <div class="notification">
            <h3 style="text-align: center;">You've unsaved changes!</h3>
            <button type="button" class="btn btn-default" @click="SaveBlock(block)">Save Menus</button>
        </div>
    </div>
</template>