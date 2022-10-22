<script setup></script>

<template>
    <div class="auth-page">
        <div class="auth-page__container">
            <div class="auth-page__content">
                <div style="width: 2000px">LOGO AND IMAGE COMING SOON</div>
                <div class="auth-page__form">
                    <div class="auth-page__form-wrapper">
                        <div class="auth-page__form-content">
                            <RouterView />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.auth-page {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100vh;
    padding: 40px 0;

    &__container {
        width: 100%;
        max-width: 1420px;
        margin-right: auto;
        margin-left: auto;
        padding-right: 15px;
        padding-left: 15px;
        flex-grow: 1;
    }

    &__content {
        display: flex;
        justify-content: space-between;
    }
}

.auth-page {
    &__form {
        background: red;
        position: relative; // для лого
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;

        &-wrapper {
            position: relative;
            display: block;
            height: calc(100vh - 100px);
            min-height: 790px;
        }

        &-content {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>
