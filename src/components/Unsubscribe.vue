<template>
    <div class="container">
        <div class="mt-10 relative justify-center flex">
            <img src="/logo.jpg" alt="" width="40%">
        </div>
        <div class="relative top-[30px]">
            <div class="md:text-[26px] text-[16px] text-center">
                Do you want to unsubscribe?
            </div>
            <div class="md:text-[16px] text-[10px] text-center text-[#cec3c3]">
                If you unsubscribe, you will stop receiving our weekly newsletter.
            </div>
        </div>
        <div class="relative top-[140px] justify-center flex">
            <div class="g-recaptcha" :data-sitekey="rcapt_sig_key"></div>
            <!-- <Checkbox v-model="response" :key="theme" :theme="theme" /> -->
        </div>
        <div class="relative top-[180px] justify-center flex">
            <v-btn @click="unsubscribe" class="uppercase w-[164px] mx-6 !bg-[#d64eb9]" color="red">Unsubscribe</v-btn>
            <v-btn class="uppercase w-[164px]  !bg-[#cec3c3]" color="red">Cancel</v-btn>
        </div>
    </div>

</template>
<script>
import { computed, ref } from 'vue';
import { Checkbox } from 'vue-recaptcha';

export default {
    data: () => ({
        scanerror: false,
        decodedContent: '',
        rcapt_sig_key: import.meta.env.VITE_SITE_KEY,
        rcapt_id: 0 // will be used later

    }),
    created() {
        console.log(this.$route.query);
    },
    setup() {
        const theme = ref < 'light' | 'dark' > ('light')
        const response = ref()

        const siteKey = computed(() => {
            return import.meta.env.VITE_SITE_KEY;
        });
        const handleError = (error) => {
            console.log(error, 'eeeror');
        };
        const handleSuccess = (res) => {
            console.log(res, '33333')
        }
        return {
            siteKey,
            handleError,
            handleSuccess,
            theme,
            response
        }
    },
    methods: {
        gotoFaq() {
            return this.$router.push('faq');
        },
        gotoScan() {
            return this.$router.push("scan")
        },
        async unsubscribe() {
            const recaptcha = grecaptcha.getResponse();
            if (!recaptcha) {
                this.$toastr.error('Please solve captcha.');
                return grecaptcha.reset();
            } else {
                const email = encodeURIComponent(location.search.split("?email=")[1]);
                const res = await fetch(`https://us-central1-dev-tests-425508.cloudfunctions.net/unsubscribe?email=${email}`);
                if (res.status != 200) {
                    return this.$toastr.error('have issues on server');
                } else {
                    return this.$toastr.success('Yes, completed.', 'Success');
                }
            }
            
        },
        validateEmail(email) {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(email)) {
                return false;
            } else {
                return true;
            }
        },
    },
    mounted() {
        if (window.grecaptcha) {
            this.rcapt_id = grecaptcha.render($('.g-recaptcha')[0], { sitekey: this.rcapt_sig_key });
        }
    },
    components: {
        Checkbox
        // VueRecaptcha
    }
}
</script>