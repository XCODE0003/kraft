<script setup>
import { useVfm } from 'vue-final-modal';
import { VueFinalModal } from 'vue-final-modal'
import { useContactModalStore } from '../../Stores/Modals/ContactStore';

const vfm = useVfm();
const options = useContactModalStore().options;
</script>

<template>
    <VueFinalModal v-model="options.modelValue" :teleport-to="options.teleportTo"
        :display-directive="options.displayDirective" :hide-overlay="options.hideOverlay"
        :overlay-transition="options.overlayTransition" :content-transition="options.contentTransition"
        :click-to-close="options.clickToClose" :esc-to-close="options.escToClose" :background="options.background"
        :lock-scroll="options.lockScroll" :reserve-scroll-bar-gap="options.reserveScrollBarGap"
        :swipe-to-close="options.swipeToClose" class="flex justify-center items-center"
        content-class="max-w-[450px] p-6 rounded-2xl bg-white flex-col gap-6 flex">
        <div class="flex items-start gap-6">
            <div class="flex flex-col gap-2">
                <p class="text-2xl font-bold RF-Dewi-Extended">Нужна консультация по выбору металлопроката?</p>
                <p class="text-gray_icon">Оставьте заявку, и наш специалист свяжется с вами для подробной консультации.
                </p>
            </div>
            <div @click="useContactModalStore().closeModal()" class="flex-shrink-0 pt-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z"
                        fill="#969696" />
                </svg>
            </div>



        </div>
        <div class="flex flex-col gap-5">
            <div class="input-label-block">
                <label for="name">Имя и Фамилия <span>*</span></label>
                <div class="input-wrapper">
                    <input type="text" id="name" placeholder="Имя и фамилия" autocomplete="off">
                </div>

            </div>
            <div class="input-label-block">
                <label for="phone">Контактный телефон <span>*</span></label>
                <div class="input-wrapper">
                    <input type="tel" id="phone" placeholder="+7 (900) 000-00-00" autocomplete="off">
                </div>
            </div>
            <div class="input-label-block">
                <label for="time">Удобное для вас время</label>
                <div class="input-wrapper">
                    <input type="text" id="time" placeholder="Пятница 12:00" autocomplete="off">
                </div>
            </div>
            <div class="input-label-block">
                <label for="email">E-mail</label>
                <div class="input-wrapper">
                    <input type="email" id="email" v-model="useContactModalStore().options.data.email"
                        placeholder="you@email.com" autocomplete="off">
                </div>
                <p v-if="useContactModalStore().options.errors?.length > 0" class="text-red text-xs">
                    {{ useContactModalStore().options.errors[0] }}
                </p>
            </div>

        </div>
        <button class="btn text-center btn-primary  justify-center" @click="useContactModalStore().validate()">
            Заказать звонок
        </button>
    </VueFinalModal>


</template>

<style scoped>
.btn-primary {
    @apply py-4
}

.input-label-block {
    @apply flex flex-col gap-2;
}
</style>