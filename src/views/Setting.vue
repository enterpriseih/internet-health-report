<template>
    <div>
        <div id="IHR_contact-page">
            <div class="subscribe">
                <h6>Subscribe settings</h6>
                <q-btn class="savebnt" color="orange-5" label="save" @click="saveChannel()" no-caps />
            </div>
            <div class="verbosity">
                <p class="title">Verbosity</p>
                <div v-for="(item, index) in dataList" :key="index" class="item">
                    <el-tag type="warning">{{ item.value.split(' ')[0] }}</el-tag>
                    <q-btn-toggle v-model="item.model" rounded unelevated class="toggle" toggle-color="positive"
                        :options="[
                            { label: 'low', value: 'low' },
                            { label: 'normal', value: 'normal' },
                            { label: 'high', value: 'high' },
                        ]" no-caps />
                </div>
            </div>
        </div>
        <div class="IHR_background" :style="{
            backgroundImage: 'url(' + require('@/assets/imgs/ihr_logo.svg') + ')',
        }"></div>
        <q-dialog v-model="emailSent">
            <q-card style="width: 300px">
                <q-card-section>
                    <div class="text-h6">Alert</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    {{ message }}
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="OK" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
export default {
    name: 'SettingPage',
    components: {},
    data() {
        return {
            dataList: [],
            emailSent: false,
            message: "",
        }
    },
    created() {
        this.dataList = JSON.parse(this.$route.query.data)
    },
    methods: {
        saveChannel() {
            let arr = []
            for (let i = 0; i < this.dataList.length; i++) {
                arr.push(this.dataList[i].value)
            }
            this.$ihr_api.saveChannel(arr,
                res => {
                    this.emailSent = true
                    this.message = res.msg
                    if (res.code === 200) {
                        this.$router.push('/en-us')
                    }
                },
                error => {
                    console.log(error)
                });
        },
    }
}
</script>

<style>
#IHR_contact-page {
    width: 60%;
    margin: 0 auto;
}

.IHR_background {
    width: 1000px;
    height: 1000px;
    background-repeat: no-repeat;
    background-position: left top;
    background-size: 1000px 1000px;
    opacity: 0.1;
    position: absolute;
    left: 60%;
    top: 450px;
    overflow-x: hidden;
    position: fixed;
}

.subscribe {
    position: relative;
    padding-bottom: 0px;
    border-bottom: 1px solid #ccc;
}

.title {
    margin-top: 20px;
    font-size: 20px;
    color: #000;
    font-weight: 500;
}

.savebnt {
    position: absolute;
    width: 100px;
    height: 38px;
    top: 0;
    right: 0;
}

.item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
    padding-right: 300px;
    border-bottom: 1px solid #ddd;
}

.toggle {
    border: 1px solid #d1d1d1;
}
</style>
