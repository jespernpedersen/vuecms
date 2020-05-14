<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">
                            Modal Header 
                            <button class="modal-default-button" @click="emit('close-modal')">X</button>
                        </slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                            Modal Body
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;
    }
    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    .modal-container {
        width: 1199px;
        margin: 0px auto;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
    }

    .modal-header,
    .modal-body,
    .modal-footer {
        padding: 20px 30px;
    }

    .modal-header {
        background-color: #f8cb5d;
        color: #333;
        font-weight: 700;
        text-align: left;
    }

    .modal-default-button {
        float: right;
        background-color: transparent;
        border: none;
        padding: 0 15px;
    }
    
</style>